import { useShallow } from "zustand/shallow";
import { addTab, closeTab, setActiveTabId, useAppContext } from "../store/useAppContext";
import { AiOutlineClose } from "react-icons/ai";

const FileTab = () => {
  const { tabs, activeTabId} = useAppContext(
    useShallow(state=>({
      tabs: state.tabs,
      activeTabId: state.activeTabId,
    }))
  );

  return (
    <div className="flex shrink-0 items-center overflow-x-auto">
      {tabs.map((tab) => (
        <div
          key={tab.id}
          onClick={() => setActiveTabId(tab.id)}
          className={`group flex items-center gap-2 px-3 py-1.5 rounded-[4px] cursor-pointer text-xl select-none ${
            tab.id === activeTabId
              ? "bg-foreground/10 text-white"
              : "text-neutral-400 hover:bg-muted hover:text-white transition-colors"
          }`}
        >
          <span>{tab.filename}</span>
          {tab.isDirty && <span className="w-1.5 h-1.5 rounded-full bg-white/70" />}
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeTab(tab.id);
            }}
            className="ml-1 text-xl text-neutral-500 opacity-0 group-hover:opacity-100 p-0 hover:text-white transition-opacity"
          >
            <AiOutlineClose />
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
