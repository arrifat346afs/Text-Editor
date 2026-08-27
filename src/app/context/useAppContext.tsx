import { Tab } from "@/types";
import { create } from "zustand/react";
import { openFile, saveFile, saveFileAs } from "../utils/fileOperations";



interface TabsContextValue {
    tabs: Tab[];
    activeTabId: string;
}

export const useAppContext = create<TabsContextValue>(() => ({
    tabs: [{ id: "1", filename: "Untitled-1", content: "", isDirty: false }],
    activeTabId: "1",
}));

function getActiveTab(): Tab | undefined {
    const { tabs, activeTabId } = useAppContext.getState();
    return tabs.find((t) => t.id === activeTabId);
}

export function setActiveTabId(id: string) {
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

export function closeTab(id: string) {
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



export async function saveActiveTab() {
    const tab = getActiveTab()
    if (!tab) return

    if (!tab.filePath) {
        await saveActiveTabAs()
        return
    }

    const success = await saveFile(tab.filePath, tab.content)
    if (success) {
        useAppContext.setState((state) => ({
            tabs: state.tabs.map((t) =>
                t.id == tab.id ? { ...t, isDirty: false } : t
            )
        }))
    }
}


export async function saveActiveTabAs() {
    const tab = getActiveTab()
    if (!tab) return

    const result = await saveFileAs(tab.content)
    if (!result) return;

    const filename = result.filePath.split(/[\\/]/).pop() ?? tab.filename;

    useAppContext.setState((state) => ({
        tabs: state.tabs.map((t) =>
            t.id === tab.id
                ? { ...t, filePath: result.filePath, filename, isDirty: false }
                : t
        )
    }))


}
