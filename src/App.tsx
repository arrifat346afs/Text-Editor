
import "./App.css";
import NaviGation from "./app/navigation/NaviGation";
import TextArea from "./app/TextArea";

function App() {


  return (
    <main className=" w-full h-full ">
      <NaviGation />
      <div className="border-5 h-screen">
        <TextArea />
      </div>
    </main>
  );
}

export default App;
