import "./App.css";
import FileTab from "./app/navigation/FileTabs";
import NaviGation from "./app/navigation/NaviGation";
import TextArea from "./app/TextArea";
import { useState } from "react";


interface Tab {
  id: string,
  filename: string,
  content: string,
  isDirty: boolean,
}





function App() {
  const [tabs, setTabs] = useState<Tab[]>([
    { id: "1", filename: "Untitled-1", content: "", isDirty: false },
  ]);
 const [activeTabId, setActiveTabId] = useState("1");
 const activeTab = tabs.find((t)=> t.id===activeTabId)
  const updateActiveContent = (newContent: string) => {
    setTabs((prev) =>
      prev.map((t) =>
        t.id === activeTabId ? { ...t, content: newContent, isDirty: true } : t
      )
    );
  };



  return (
    <main className="flex flex-col w-full h-full">
      <NaviGation />
      <FileTab tabs={tabs} activeTabId={activeTabId} setTabs={setTabs} setActiveTabId={setActiveTabId} />
      <div className="flex-1 min-h-0">
        <TextArea content={activeTab?.content ?? ""} onChange={updateActiveContent}/>
      </div>
    </main>
  );
}

export default App;
