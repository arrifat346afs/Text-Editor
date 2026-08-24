
import "./App.css";
import NaviGation from "./app/navigation/NaviGation";
import TextArea from "./app/TextArea";

function App() {


  return (
    <main className=" w-full h-full ">
      <NaviGation />
      <div className="border-2 h-fit">
        <TextArea />
      </div>
    </main>
  );
}

export default App;
