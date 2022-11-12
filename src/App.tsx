import { Fon } from "./components/fon/Fon";
import AudioPl from "./components/Audiopleer/AudioPl";
import { useEffect } from "react";
import AudioPage from "./pages/AudioPage/AudioPage";
import {Route, Routes} from 'react-router-dom'
import MainPage from "./pages/MainPage/MainPage";
import { NoPage } from "./pages/Nopage/NoPage";
import { MainLayouts } from "./layouts/MainLayouts";



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
      <MainLayouts>
        <Routes>
          <Route path="/" element={<MainPage/>}/>
          <Route path="/listen/:bookname" element={<AudioPage/>}/>
          <Route path="*" element={<NoPage/>}/>
        </Routes>
      </MainLayouts>
    </div>
  );
}

export default App;
