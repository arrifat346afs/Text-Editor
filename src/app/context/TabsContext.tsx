import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { Tab } from "@/types";
import { openFile } from "../utils/fileOperations";

interface TabsContextValue {
    tabs: Tab[];
    activeTabId: string;
    activeTab: Tab | undefined;
    setActiveTabId: (id: string) => void;
    updateActiveContent: (newContent: string) => void;
    addTab: () => void;
    closeTab: (id: string) => void;
    openFileTab: () => Promise<void>;
}

const TabsContext = createContext<TabsContextValue | null>(null);

export const TabsProvider = ({ children }: { children: ReactNode }) => {
    const [tabs, setTabs] = useState<Tab[]>([
        { id: "1", filename: "Untitled-1", content: "", isDirty: false },
    ]);
    const [activeTabId, setActiveTabId] = useState("1");
    const activeTab = tabs.find((t) => t.id === activeTabId);

    const updateActiveContent = (newContent: string) => {
        setTabs((prev) =>
            prev.map((t) => (t.id === activeTabId ? { ...t, content: newContent, isDirty: true } : t))
        );
    };

    const addTab = () => {
        const newTab: Tab = {
            id: crypto.randomUUID(),
            filename: `Untitled-${tabs.length + 1}`,
            content: "",
            isDirty: false,
        };
        setTabs((prev) => [...prev, newTab]);
        setActiveTabId(newTab.id);
    };

    const closeTab = (id: string) => {
        setTabs((prev) => {
            const filtered = prev.filter((t) => t.id !== id);
            setActiveTabId((current) =>
                current === id && filtered.length > 0 ? filtered[0].id : current
            );
            return filtered;
        });
    };

    const openFileTab = async () => {
        const result = await openFile();
        if (!result) return;
        const newTab: Tab = {
            id: crypto.randomUUID(),
            filename: result.filePath.split(/[\\/]/).pop() ?? "Untitled",
            content: result.content,
            filePath: result.filePath,
            isDirty: false,
        };
        setTabs((prev) => [...prev, newTab]);
        setActiveTabId(newTab.id);
    };

    const value = useMemo(
        () => ({
            tabs,
            activeTabId,
            activeTab,
            setActiveTabId,
            updateActiveContent,
            addTab,
            closeTab,
            openFileTab,
        }),
        [tabs, activeTabId, activeTab]
    );

    return <TabsContext.Provider value={value}>{children}</TabsContext.Provider>;
};

export const useTabs = () => {
    const ctx = useContext(TabsContext);
    if (!ctx) throw new Error("useTabs must be used inside a TabsProvider");
    return ctx;
};
