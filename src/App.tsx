import "./App.css";
import FileTab from "./app/navigation/FileTabs";
import NaviGation from "./app/navigation/NaviGation";
import TextArea from "./app/TextArea";

function App() {
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
