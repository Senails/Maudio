import { useEffect } from "react";
import AudioPage from "./pages/AudioPage/AudioPage";
import {Route, Routes} from 'react-router-dom'
import MainPage from "./pages/MainPage/MainPage";
import { NoPage } from "./pages/Nopage/NoPage";
import { MainLayouts } from "./layouts/MainLayouts";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { BookInfoPage } from "./pages/BookInfoPage/BookInfoPage";
import { EditPage } from "./pages/EditPage/EditPage";
import { useAppSelector } from "./redux/store";



function App() {
  let userStatus = useAppSelector((state)=>state.user.userstatus);

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
          <Route path="/bookInfo/:bookname" element={<BookInfoPage/>}/>
          <Route path="/listen/:bookname" element={<AudioPage/>}/>
          <Route path="/edit/:bookname" element={userStatus==='user'?<NoPage/>:<EditPage/>}/>
          <Route path="/admin" element={<LoginPage/>}/>
          <Route path="*" element={<NoPage/>}/>
        </Routes>
      </MainLayouts>
    </div>
  );
}

export default App;
