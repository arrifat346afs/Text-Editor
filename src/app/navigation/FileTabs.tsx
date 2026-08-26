import { useTabs } from "../context/TabsContext";

const FileTab = () => {
  const { tabs, activeTabId, setActiveTabId, closeTab, addTab } = useTabs();

  return (
    <div className="flex shrink-0 items-center overflow-x-auto  border-b border-neutral-800">
      {tabs.map((tab) => (
        <div
          key={tab.id}
          onClick={() => setActiveTabId(tab.id)}
          className={`group flex items-center gap-2 px-3 py-1.5 border-r border-neutral-800 cursor-pointer text-sm select-none ${
            tab.id === activeTabId
              ? "bg-muted text-white"
              : "text-neutral-400 hover:bg-accent/40 hover:text-white transition-colors"
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
