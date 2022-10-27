import { Fon } from "./components/fon/Fon";
import AudioPl from "./components/Audiopleer/AudioPl";
import { useEffect } from "react";
import { getAudioSize } from "./Utils/getaudiosize";
import AudioPage from "./pages/AudioPage/AudioPage";




function App() {
  

  useEffect(()=>{


    // return ()=>{
    //   let href = window.location.href;
    //   let state = store.getState();
    //   localStorage.setItem(href,JSON.stringify(state));
    // }
  },[]);

  return (
    <div className="App">
      <Fon/>
      <AudioPage/>
      <AudioPl/>
    </div>
  );
}

export default App;
