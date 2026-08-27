import { Tab } from "@/types";
import { create } from "zustand/react";
import { openFile } from "../utils/fileOperations";



interface TabsContextValue {
    tabs: Tab[];
    activeTabId: string;
    setActiveTabId: (id: string) => void;
    updateActiveContent: (newContent: string) => void;
    addTab: () => void;
    closeTab: (id: string) => void;
    openFileTab: () => Promise<void>;
}




export const useAppContext = create<TabsContextValue>((set) => ({

    tabs: [{ id: "1", filename: "Untitled-1", content: "", isDirty: false }],
    activeTabId: "1",
    setActiveTabId: (id: string) => set({ activeTabId: id }),
    updateActiveContent: (newContent: string) =>
        set((state) => ({
            tabs: state.tabs.map((t) =>
                t.id === state.activeTabId ? { ...t, content: newContent, isDirty: true } : t
            ),
        })),
    addTab: () =>
        set((state) => {
            const newTab: Tab = {
                id: crypto.randomUUID(),
                filename: `Untitled-${state.tabs.length + 1}`,
                content: "",
                isDirty: false,
            };
            return {
                tabs: [...state.tabs, newTab],
                activeTabId: newTab.id,
            };
        }),
    closeTab: (id: string) =>
        set((state) => {
            const filtered = state.tabs.filter((t) => t.id !== id);
            const newActiveTabId =
                state.activeTabId === id && filtered.length > 0 ? filtered[0].id : state.activeTabId;
            return {
                tabs: filtered,
                activeTabId: newActiveTabId,
            };
        }),
    openFileTab: async () => {
        const result = await openFile();
        if (!result) return;
        const newTab: Tab = {
            id: crypto.randomUUID(),
            filename: result.filePath.split(/[\\/]/).pop() ?? "Untitled",
            content: result.content,
            filePath: result.filePath,
            isDirty: false,
        };
        set((state) => ({
            tabs: [...state.tabs, newTab],
            activeTabId: newTab.id,
        }));
    },              

}));