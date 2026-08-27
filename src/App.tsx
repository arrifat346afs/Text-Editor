import "./App.css";
import FileTab from "./app/navigation/FileTabs";
import NaviGation from "./app/navigation/NaviGation";
import TextArea from "./app/TextArea";
import { useAppContext } from "./app/context/useAppContext";
import { useKeyboardShortcuts } from "./hooks/useKeyboardShortcuts";

function App() {
  const { activeTabId } = useAppContext();
  useKeyboardShortcuts()

  return (
    <main className="flex flex-col w-full h-full">
      <NaviGation />
      <FileTab />
      <div className="flex-1 min-h-0">
        <TextArea key={activeTabId} />
      </div>
    </main>
  );
}

export default App;
