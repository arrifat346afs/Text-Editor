import{ useState } from "react";

interface Tab {
  id: string;
  filename: string;
  isDirty: boolean;
}

const initialTabs: Tab[] = [
  { id: "1", filename: "Untitled-1", isDirty: false },
  { id: "2", filename: "notes.txt", isDirty: true },
  { id: "3", filename: "app.ts", isDirty: false },
];

const FileTab = () => {
  const [tabs, setTabs] = useState<Tab[]>(initialTabs);
  const [activeTabId, setActiveTabId] = useState("1");

  const closeTab = (id: string) => {
    setTabs((prev) => {
      const filtered = prev.filter((t) => t.id !== id);
      if (activeTabId === id && filtered.length > 0) {
        setActiveTabId(filtered[0].id);
      }
      return filtered;
    });
  };

  const addTab = () => {
    const newTab: Tab = {
      id: crypto.randomUUID(),
      filename: `Untitled-${tabs.length + 1}`,
      isDirty: false,
    };
    setTabs((prev) => [...prev, newTab]);
    setActiveTabId(newTab.id);
  };

  return (
    <div className="flex shrink-0 items-center overflow-x-auto bg-neutral-900 border-b border-neutral-800">
      {tabs.map((tab) => (
        <div
          key={tab.id}
          onClick={() => setActiveTabId(tab.id)}
          className={`group flex items-center gap-2 px-3 py-1.5 border-r border-neutral-800 cursor-pointer text-sm select-none ${
            tab.id === activeTabId
              ? "bg-neutral-800 text-white"
              : "text-neutral-400 hover:bg-neutral-850"
          }`}
        >
          <span>{tab.filename}</span>
          {tab.isDirty && <span className="w-1.5 h-1.5 rounded-full bg-white/70" />}
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeTab(tab.id);
            }}
            className="ml-1 text-neutral-500 opacity-0 group-hover:opacity-100 hover:text-white transition-opacity"
          >
            ×
          </button>
        </div>
      ))}
      <button
        onClick={addTab}
        className="px-3 py-1.5 text-neutral-500 hover:text-white text-sm"
      >
        +
      </button>
    </div>
  );
};

export default FileTab;