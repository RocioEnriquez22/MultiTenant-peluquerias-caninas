import { useEffect, useState } from "react";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ScrollToBottomButton() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            const scrolledToBottom =
                window.innerHeight + window.scrollY >=
                document.documentElement.scrollHeight - 50;

            setIsVisible(!scrolledToBottom);
        };

        // Verifica la posición inicial al cargar (por si la página es corta y no tiene scroll)
        toggleVisibility();

        window.addEventListener("scroll", toggleVisibility);
        window.addEventListener("resize", toggleVisibility);

        return () => {
            window.removeEventListener("scroll", toggleVisibility);
            window.removeEventListener("resize", toggleVisibility);
        };
    }, []);

    const scrollToBottom = () => {
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth",
        });
    };

    return (
        <Button
            variant="outline"
            size="icon"
            onClick={scrollToBottom}
            aria-label="Ir al final de la página"
            className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 rounded-full shadow-md transition-all duration-300 ${
                isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4 pointer-events-none"
            }`}
        >
            <ArrowDown className="h-4 w-4" />
        </Button>
    );
}
