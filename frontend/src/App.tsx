import { useEffect, useState } from "react";
import AudioPage from "./pages/AudioPage/AudioPage";
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import MainPage from "./pages/MainPage/MainPage";
import { NoPage } from "./pages/Nopage/NoPage";
import { MainLayouts } from "./layouts/MainLayouts";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { BookInfoPage } from "./pages/BookInfoPage/BookInfoPage";
import { EditPage } from "./pages/EditPage/EditPage";
import { store, useAppSelector } from "./redux/store";
import { Loader } from "./components/Loader/Loader";
import { Provider } from "react-redux";
import { onOpen } from "./Utils/appData/onstart";

function AppComponent() {
  let {userstatus, isAuth} = useAppSelector((state)=>state.user);
  let[loadend,setloadend]= useState(false);

  useEffect(()=>{
    let start = async()=>{
      await onOpen();
      setloadend(true);
    }
    start();
  },[]);

  return (
    <div className="App" id="App">
      <MainLayouts>
        {loadend?
        <>
          <Routes>
          <Route path="/" element={<MainPage/>}/>
          <Route path="/bookInfo/:bookname" element={<BookInfoPage/>}/>
          <Route path="/listen/:bookname" element={<AudioPage/>}/>
          <Route path="/edit/:bookname" element={userstatus==='user'?<NoPage/>:<EditPage/>}/>
          <Route path="/login" element={isAuth?<NoPage/>:<LoginPage/>}/>
          <Route path="*" element={<NoPage/>}/>
          </Routes>
        </>
        :<Loader shadow={true}/>}
      </MainLayouts>
    </div>
  );
}

export default function App(){
  return <>
    <Provider store={store}>
      <BrowserRouter>
        <AppComponent />
      </BrowserRouter>
    </Provider>
  </>
}

