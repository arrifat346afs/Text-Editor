import {
    addTab,
    closeTab,
    openFileTab,
    saveActiveTab,
    saveActiveTabAs,
    useAppContext,
} from "@/app/context/useAppContext";
import { useEffect } from "react";
import { useShallow } from "zustand/shallow";

export function useKeyboardShortcuts() {
    const { activeTabId } = useAppContext(
        useShallow((state) => ({
            activeTabId: state.activeTabId,
        })),
    );
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
                case "w":
                    event.preventDefault();
                    closeTab(activeTabId);
                    break;
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [activeTabId]);
}
