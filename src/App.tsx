import { useEffect, useState } from "react";
import AudioPage from "./pages/AudioPage/AudioPage";
import {Route, Routes} from 'react-router-dom'
import MainPage from "./pages/MainPage/MainPage";
import { NoPage } from "./pages/Nopage/NoPage";
import { MainLayouts } from "./layouts/MainLayouts";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { BookInfoPage } from "./pages/BookInfoPage/BookInfoPage";
import { EditPage } from "./pages/EditPage/EditPage";
import { useAppDispatch, useAppSelector } from "./redux/store";
import { authUp } from "./api/authUp";
import { loginUser } from "./redux/slices/userSlice";
import { Loader } from "./components/Loader/Loader";



function App() {
  let {userstatus, isAuth} = useAppSelector((state)=>state.user);
  let dispatch = useAppDispatch();

  let[loadend,setloadend]= useState(false);

  useEffect(()=>{
    onopen();
    async function onopen(){
      let logindata = await authUp();
      if (logindata!=='notoken'){
        dispatch(loginUser(logindata));
      }
      setloadend(true);
    }
  },[]);

  return (
    <div className="App">
      <MainLayouts>
        {loadend?
        <>
          <Routes>
          <Route path="/" element={<MainPage/>}/>
          <Route path="/bookInfo/:bookname" element={<BookInfoPage/>}/>
          <Route path="/listen/:bookname" element={<AudioPage/>}/>
          <Route path="/edit/:bookname" element={userstatus==='user'?<NoPage/>:<EditPage/>}/>
          <Route path="/admin" element={isAuth?<NoPage/>:<LoginPage/>}/>
          <Route path="*" element={<NoPage/>}/>
          </Routes>
        </>
        :<Loader shadow={true}/>}
      </MainLayouts>
    </div>
  );
}

export default App;
