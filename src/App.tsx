import { Fon } from "./components/fon/Fon";
import { Book } from "./components/book/Book";
import { PleerUI } from "./components/PleerUI/Pleer";
import AudioPl from "./components/Audiopleer/AudioPl";
import LeftPanel from "./components/leftPanel/LeftPanel";
import { useEffect } from "react";




function App() {
  useEffect(()=>{
    // console.log()
  },[]);



  return (
    <div className="App">
      <Fon/>
      <Book/>
      <PleerUI/>
      <AudioPl/>
      <LeftPanel/>
    </div>
  );
}

export default App;
