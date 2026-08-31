import {
    addTab,
    closeTab,
    openFileTab,
    saveActiveTab,
    saveActiveTabAs,
    useAppContext,
} from "@/app/store/useAppContext";
import { useSearchStore } from "@/app/store/useSearchStore";
import { openSearchPanel, closeSearchPanel } from "@codemirror/search";
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

            // Handle Escape separately — it's not a Ctrl/Cmd combo,
            // but it should still close the search bar if it's open,
            // regardless of which element currently has focus.
            if (event.key === "Escape") {
                const view = useSearchStore.getState().view;
                if (view && useSearchStore.getState().isOpen) {
                    closeSearchPanel(view);
                }
                return;
            }

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

                case "f":
                    event.preventDefault();
                    {
                        const view = useSearchStore.getState().view;
                        if (view) openSearchPanel(view);
                    }
                    break;
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [activeTabId]);
}
