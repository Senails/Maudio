import { Fon } from "./components/fon/Fon";
import { Book } from "./components/book/Book";
import { PleerUI } from "./components/PleerUI/Pleer";
import AudioPl from "./components/Audiopleer/AudioPl";
import LeftPanel from "./components/leftPanel/LeftPanel";
import { useEffect } from "react";
import { getAudioSize } from "./Utils/getaudiosize";
import { store, useAppDispatch } from "./redux/store";




function App() {
  

  useEffect(()=>{
    window.addEventListener('unload',unload);
    function unload(){
      let href = window.location.href;

      let state = store.getState();
      localStorage.setItem(href,JSON.stringify(state));
    }
  },[]);

  return (
    <div className="App">
      <Fon/>
      <Book/>
      <PleerUI/>
      <AudioPl/>
      {/* <LeftPanel/> */}
    </div>
  );
}

export default App;
