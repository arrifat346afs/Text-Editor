import {
    addTab,
    openFileTab,
    saveActiveTab,
    saveActiveTabAs,
} from "@/app/context/useAppContext";
import { useEffect } from "react";

export function useKeyboardShortcuts() {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const isCtrlOrCmd = event.ctrlKey || event.metaKey;

            if (!isCtrlOrCmd) return;

            switch (event.key.toLowerCase()) {
                case "s":
                    event.preventDefault();
                    if (event.shiftKey) {
                        saveActiveTabAs();
                    } else {
                        saveActiveTab();
                    }
                    break;
                case "n":
                    event.preventDefault();
                    addTab();
                    break;
                case "o":
                    event.preventDefault();
                    openFileTab();
                    break;
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);
}
