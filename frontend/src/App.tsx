import { useEffect, useState } from "react";
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { NoPage } from "./pages/Nopage/NoPage";
import { MainLayouts } from "./layouts/MainLayouts";
import { store, useAppSelector } from "./redux/store";
import { Loader } from "./components/Loader/Loader";
import { Provider } from "react-redux";
import { onOpen } from "./Utils/appData/onstart";
import Loadable from 'react-loadable';


const AudioPage = Loadable({
  loader: ()=>import("./pages/AudioPage/AudioPage"),
  loading: ()=><Loader shadow={true}/>
});
const MainPage = Loadable({
  loader: ()=>import("./pages/MainPage/MainPage"),
  loading: ()=><Loader shadow={true}/>
});
const BookInfoPage = Loadable({
  loader: ()=>import("./pages/BookInfoPage/BookInfoPage"),
  loading: ()=><Loader shadow={true}/>
});
const EditPage = Loadable({
  loader: ()=>import("./pages/EditPage/EditPage"),
  loading: ()=><Loader shadow={true}/>
});

function AppComponent() {
  let {userstatus} = useAppSelector((state)=>state.user);
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

