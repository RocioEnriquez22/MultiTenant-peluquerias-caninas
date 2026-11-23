import {
    BackgroundCanvas,
    type BackgroundCanvasProps,
} from "@/components/ui/background-canvas";

export interface MeshGradientProps extends Omit<
    BackgroundCanvasProps,
    | "atlas"
    | "colors"
    | "palettes"
    | "scene"
    | "simulation"
    | "still"
    | "uniforms"
> {
    /**
     * Where the light falls from, in degrees clockwise from the top: the lit
     * side is lighter, the far side deeper, and the color areas run across it.
     *
     * @default -45
     */
    angle?: number;
    /**
     * Two to eight CSS colors, handed to the points in order and repeated when
     * there are more points than colors. Theme variables such as
     * `var(--primary)` follow your theme.
     *
     * @default ["#2f6bff", "#7c4dff", "#ff4f9a", "#ff7448"]
     */
    colors?: string[];
    /**
     * How far the lit side and the far side pull apart, and how much each
     * point's shade differs from the next, from 0 (flat color) to 2.
     *
     * @default 1
     */
    contrast?: number;
    /**
     * How much fine curl the bends carry, from 0 (broad sweeps only) to 1.
     *
     * @default 0.5
     */
    detail?: number;
    /**
     * How far each point wanders from where it rests, from 0 (the points hold
     * still and only the bends flow) to 2.
     *
     * @default 1
     */
    drift?: number;
    /**
     * How strongly the color sits on the surface, from 0 to 2. Below 1 it
     * thins toward the surface. At 1 every color is held to a tone copy reads
     * on: light enough on a light surface, deep enough on a dark one. Toward 2
     * that hold lets go and the palette shows as written.
     *
     * @default 1
     */
    intensity?: number;
    /**
     * How many color points the mesh has, from 3 to 8.
     *
     * @default 6
     */
    points?: number;
    /**
     * The size of the bends: higher packs more, smaller curves into the box.
     *
     * @default 1
     */
    scale?: number;
    /**
     * Another layout of the points, from 0 to 20.
     *
     * @default 0
     */
    seed?: number;
    /**
     * How widely neighboring colors melt into each other, from 0 (each color
     * keeps its own area) to 1 (one continuous blend).
     *
     * @default 0.7
     */
    softness?: number;
    /**
     * How far the points sit from the center, from 0.4 (gathered in the
     * middle) to 1.6 (pushed past the edges).
     *
     * @default 1
     */
    spread?: number;
    /**
     * How far the field between the points is bent, from 0 (plain
     * interpolation) to 2 (long, broad sweeps).
     *
     * @default 1
     */
    warp?: number;
}

/** Azure, violet, hot pink and coral. */
const COLORS = ["#2f6bff", "#7c4dff", "#ff4f9a", "#ff7448"];

// data
const SCENE = /* glsl */ `
uniform vec3 uColors[8];
uniform int uColorsCount;
uniform float uAngle;
uniform float uContrast;
uniform float uDetail;
uniform float uDrift;
uniform float uIntensity;
uniform float uPoints;
uniform float uScale;
uniform float uSeed;
uniform float uSoftness;
uniform float uSpread;
uniform float uWarp;

// One color in OKLab, held to a tone copy reads on: lifted on a light surface,
// lowered on a dark one, where a warm color turns to ember red, never brown.
// Past intensity 1 the hold lets go.
vec3 tone(vec3 lab) {
  float push = clamp(uIntensity - 1.0, 0.0, 1.0);
  float lo = mix(0.64, 0.0, push), hi = mix(0.545, 1.0, push);
  float lifted = 0.5 * (lab.x + lo + sqrt((lab.x - lo) * (lab.x - lo) + 0.004));
  float deep = lab.x * mix(0.86, 1.0, push);
  float lowered = 0.5 * (deep + hi - sqrt((deep - hi) * (deep - hi) + 0.004));
  float hue = atan(lab.z, lab.y + 1e-6);
  float warm = smoothstep(0.4, 0.85, hue) * (1.0 - smoothstep(1.8, 2.3, hue));
  float drop = max(lab.x - lowered, 0.0) * warm * uDark;
  float chroma = max(length(lab.yz), 1e-4);
  lab.yz = rotate(min(drop * 2.8, max(hue - 0.35, 0.0))) * lab.yz * clamp(0.2 / chroma, 1.0, 1.0 + drop * 2.4);
  lab.x = mix(lifted, lowered, uDark);
  return lab;
}

vec4 scene(vec2 frag) {
  vec2 box = uResolution / min(uResolution.x, uResolution.y);
  vec2 p = fitted(frag);
  float t = uTime * 0.05;
  float seed = uSeed + 20.0;

  // Coordenadas del cursor normalizadas al espacio del shader
  vec2 pointer = (uPointer.xy / uResolution - 0.5) * box;
  vec2 toMouse = pointer - p;
  float mouseDist2 = dot(toMouse, toMouse);

  float reach = 1.0 / max(sqrt(uScale), uScale);
  vec2 q = p * uScale * 0.5 / max(uWarp, 1.0) + seed * 4.7;
  vec2 flow = vec2(snoise(q + vec2(t, 3.1)), snoise(q + vec2(7.3, -t * 0.9)));

  // Deformación directa del flujo alrededor del cursor (mayor alcance y fuerza)
  vec2 bent = p + flow * 0.3 * uWarp * reach;
  bent += toMouse * uPointer.z * 0.32 * exp(-mouseDist2 * 1.3);

  vec2 r = bent * uScale * 0.9 + seed * 2.9;
  vec2 curl = vec2(snoise(r + vec2(-t * 1.2, 11.0)), snoise(r + vec2(5.0, t * 1.1)));
  vec2 w = bent + curl * 0.05 * uDetail * min(uWarp, 1.0) * reach;

  vec2 toward = vec2(sin(uAngle), cos(uAngle));
  vec2 across = vec2(toward.y, -toward.x);

  float power = mix(2.6, 1.1, uSoftness);
  float core = mix(0.004, 0.06, uSoftness);
  float open = mix(0.55, 1.0, uIntro);

  vec3 sum = vec3(0);
  float total = 0.0, chroma = 0.0;
  for (int i = 0; i < 8; i++) {
    float fi = float(i);
    if (fi >= uPoints) break;
    vec2 h = hash22(vec2(fi * 7.13 + 1.7, seed * 3.91 + 0.37));
    float turn = fi * 2.39996 + seed * 1.618 + h.x * 0.8;
    float ring = sqrt((fi + 0.5) / uPoints) * 0.8 * uSpread * open;
    vec2 at = vec2(cos(turn), sin(turn)) * ring;
    at += vec2(sin(t * (1.6 + h.x * 1.3) + h.y * TAU), cos(t * (1.3 + h.y * 1.5) + h.x * TAU)) * 0.11 * uDrift;
    at *= box;

    // Atracción fuerte y de amplio radio de cada punto de color hacia el mouse
    vec2 pull = pointer - at;
    at += pull * uPointer.z * 1.15 * exp(-dot(pull, pull) * 1.1);

    vec2 d = w - at;
    d = vec2(dot(d, across) * 0.62, dot(d, toward));
    float weight = (0.7 + 0.7 * h.y) * pow(dot(d, d) + core, -power);
    vec3 lab = toOklab(uColors[i % max(uColorsCount, 1)]);
    lab.x += (h.y - 0.5) * 0.1 * uContrast;
    lab = tone(lab);
    sum += lab * weight;
    total += weight;
    chroma += length(lab.yz) * weight;
  }
  vec3 lab = sum / total;
  float kept = length(lab.yz);
  lab.yz *= min(mix(kept, chroma / total, 0.7) / max(kept, 1e-4), 1.8);

  float sheen = snoise(w * 0.5 * uScale + vec2(t * 0.8, 20.0 - t * 0.6));
  float lit = smoothstep(0.0, 1.0, 0.5 + dot(w / box, toward) * 0.65 + sheen * 0.25);
  float shade = (1.0 - lit) * uDark * uContrast / (0.6 + 0.4 * uContrast);
  lab.x *= 1.0 - 0.3 * shade;
  float thin = mix(lit * 0.24 * uContrast, shade * 0.25, uDark);
  float amount = min(uIntensity, 1.0) * clamp(1.0 - thin, 0.0, 1.0);
  return paint(fromOklab(lab), amount);
}
`;

/**
 * A mesh gradient that fills the box behind whatever you put inside it: a
 * handful of color points rest across the box and drift on slow orbits,
 * and the field between them is interpolated in OKLab with
 * inverse-distance weights, then bent by a slow flow and lit from one
 * side. On a light surface the colors are held light enough for dark copy
 * and the lit side thins toward the surface; on a dark one they are held
 * deep enough for light copy, warm colors turn to ember red and the far
 * side sinks into the surface. The points near the pointer are drawn to
 * it. It runs only while it's on screen and holds a still frame with
 * reduced motion.
 */
export const MeshGradient = (props: MeshGradientProps) => {
    const {
        angle = -45,
        colors = COLORS,
        contrast = 1,
        detail = 0.5,
        drift = 1,
        intensity = 1,
        points = 6,
        scale = 1,
        seed = 0,
        softness = 0.7,
        spread = 1,
        warp = 1,
        ...rest
    } = props;
    return (
        <BackgroundCanvas
            data-slot="mesh-gradient"
            palettes={{ uColors: colors }}
            scene={SCENE}
            still={8}
            uniforms={{
                uAngle: (angle * Math.PI) / 180,
                uContrast: contrast,
                uDetail: detail,
                uDrift: drift,
                uIntensity: intensity,
                uPoints: points,
                uScale: scale,
                uSeed: seed,
                uSoftness: softness,
                uSpread: spread,
                uWarp: warp,
            }}
            {...rest}
        />
    );
};
