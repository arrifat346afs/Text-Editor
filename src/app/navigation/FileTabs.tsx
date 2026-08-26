import type { Tab } from "@/types";

interface FileTabProps {
  tabs: Tab[];
  activeTabId: string;
  setTabs: React.Dispatch<React.SetStateAction<Tab[]>>;
  setActiveTabId: React.Dispatch<React.SetStateAction<string>>;
}




const FileTab = ({ tabs, activeTabId, setTabs, setActiveTabId }: FileTabProps) => {


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
      content: "",
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