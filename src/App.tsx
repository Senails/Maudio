import { Fon } from "./components/fon/Fon";
import AudioPl from "./components/Audiopleer/AudioPl";
import { useEffect } from "react";
import AudioPage from "./pages/AudioPage/AudioPage";
import {Route, Routes} from 'react-router-dom'
import MainPage from "./pages/MainPage/MainPage";
import { NoPage } from "./pages/Nopage/NoPage";



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
      {/* <AudioPage/> */}
      <Routes>
        <Route path="/" element={<MainPage/>}/>
        <Route path="*" element={<NoPage/>}/>
      </Routes>
      <AudioPl/>
    </div>
  );
}

export default App;
