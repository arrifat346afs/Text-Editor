import { Table } from "lucide-react";
import "./App.css";
import FileTab from "./app/navigation/FileTabs";
import NaviGation from "./app/navigation/NaviGation";
import TextArea from "./app/TextArea";
import { useState } from "react";


interface tab {
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
 const activetab = tabs.find((t)=> t.id===activeTabId)



  return (
    <main className="flex flex-col w-full h-full">
      <NaviGation />
      <FileTab />
      <div className="flex-1 min-h-0">
        <TextArea />
      </div>
    </main>
  );
}

export default App;
