import { Tab } from "@/types";
import { create } from "zustand/react";
import { openFile, saveFile, saveFileAs } from "../utils/fileOperations";

interface TabsContextValue {
    tabs: Tab[];
    activeTabId: string;
    tabHistory: string[];
}

export const useAppContext = create<TabsContextValue>(() => ({
    tabs: [{ id: "1", filename: "Untitled-1", content: "", isDirty: false }],
    activeTabId: "1",
    tabHistory: [],
}));

function getActiveTab(): Tab | undefined {
    const { tabs, activeTabId } = useAppContext.getState();
    return tabs.find((t) => t.id === activeTabId);
}

export function setActiveTabId(id: string) {
    useAppContext.setState((state) => {
        if (state.activeTabId === id) {
            return state;
        }
        const previousActiveTabId = state.activeTabId;
        const historyWithoutNewTab = state.tabHistory.filter(
            (tabId) => tabId !== id,
        );
        const newHistory = [...historyWithoutNewTab, previousActiveTabId];
        return {
            // Keep all existing tabs unchanged.
            tabs: state.tabs,

            // Make the requested tab active.
            activeTabId: id,

            // Save our newly updated history.
            tabHistory: newHistory,
        };
    });
}

export function updateActiveContent(newContent: string) {
    // Update Zustand based on the current state.
    useAppContext.setState((state) => ({
        tabs: state.tabs.map((t) =>
            t.id === state.activeTabId
                ? { ...t, content: newContent, isDirty: true }
                : t,
        ),
    }));
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
            tabHistory: [
                ...state.tabHistory.filter((tabId) => tabId !== state.activeTabId),
                state.activeTabId,
            ],
        };
    });
}

export function closeTab(id: string) {
    useAppContext.setState((state) => {
        const closeTabIndex = state.tabs.findIndex((tab) => tab.id === id);
        const filtered = state.tabs.filter((tab) => tab.id !== id);
        const cleanedHistory = state.tabHistory.filter((tabId) => tabId !== id);
        if (state.activeTabId !== id) {
            return {
                tabs: filtered,
                activeTabId: state.activeTabId,
                tabHistory: cleanedHistory,
            };
        }
        const previousTabId = [...cleanedHistory]
            .reverse()
            .find((tabId) => filtered.some((tabI) => tabI.id === tabId));
        if (previousTabId) {
            return {
                tabs: filtered,
                activeTabId: previousTabId,
                tabHistory: cleanedHistory.filter(
                    (tabId) => tabId !== previousTabId
                )
            }
        }
        const nearestTab = filtered[closeTabIndex] ?? filtered[closeTabIndex - 1]

        return {
            tabs: filtered,
            activeTabId: nearestTab?.id ?? "",
            tabHistory: cleanedHistory,
        }

    });
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
        tabHistory: [
            ...state.tabHistory.filter(
                (tabId) => tabId !== state.activeTabId
            ),
            state.activeTabId,
        ],
    }));
}

export async function saveActiveTab() {
    const tab = getActiveTab();
    if (!tab) return;

    if (!tab.filePath) {
        await saveActiveTabAs();
        return;
    }

    const success = await saveFile(tab.filePath, tab.content);
    if (success) {
        useAppContext.setState((state) => ({
            tabs: state.tabs.map((t) =>
                t.id == tab.id ? { ...t, isDirty: false } : t,
            ),
        }));
    }
}

export async function saveActiveTabAs() {
    const tab = getActiveTab();
    if (!tab) return;

    const result = await saveFileAs(tab.content);
    if (!result) return;

    const filename = result.filePath.split(/[\\/]/).pop() ?? tab.filename;

    useAppContext.setState((state) => ({
        tabs: state.tabs.map((t) =>
            t.id === tab.id
                ? { ...t, filePath: result.filePath, filename, isDirty: false }
                : t,
        ),
    }));
}
