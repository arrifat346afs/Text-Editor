import { Tab } from "@/types";
import { create } from "zustand/react";
import { openFile } from "../utils/fileOperations";



interface TabsContextValue {
    tabs: Tab[];
    activeTabId: string;
}

export const useAppContext = create<TabsContextValue>(() => ({
    tabs: [{ id: "1", filename: "Untitled-1", content: "", isDirty: false }],
    activeTabId: "1",
}));



export function setActiveTabId(id: string): void {
    useAppContext.setState({ activeTabId: id })
}

export function updateActiveContent(newContent: string) {
    useAppContext.setState((state) => ({
        tabs: state.tabs.map((t) =>
            t.id === state.activeTabId ? { ...t, content: newContent, isDirty: true } : t
        ),
    }))
}


export function addTab() {
    useAppContext.setState((state) => {
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
    });
}

export function closeTab(id: string): void {
    useAppContext.setState((state) => {
        const filtered = state.tabs.filter((t) => t.id !== id);
        const newActiveTabId =
            state.activeTabId === id && filtered.length > 0 ? filtered[0].id : state.activeTabId;
        return {
            tabs: filtered,
            activeTabId: newActiveTabId,
        };
    })
}


export async function openFileTab() {
    const result = await openFile();
    if (!result) return;
    const newTab: Tab = {
        id: crypto.randomUUID(),
        filename: result.filePath.split(/[\\/]/).pop() ?? "Untitled",
        content: result.content,
        filePath: result.filePath,
        isDirty: false,
    };
    useAppContext.setState((state) => ({
        tabs: [...state.tabs, newTab],
        activeTabId: newTab.id,
    }));
}