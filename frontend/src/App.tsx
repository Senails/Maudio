import { useEffect } from "react";
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { NoPage } from "./pages/Nopage/NoPage";
import { MainLayouts } from "./layouts/MainLayouts";
import { store, useAppSelector } from "./redux/store";
import { Provider } from "react-redux";
import { onOpen } from "./Utils/appData/onstart";
import MainPage from "./pages/MainPage/MainPage";
import BookInfoPage from "./pages/BookInfoPage/BookInfoPage";
import AudioPage from "./pages/AudioPage/AudioPage";
import EditPage from "./pages/EditPage/EditPage";


function AppComponent() {
  let {userstatus} = useAppSelector((state)=>state.user);

  useEffect(()=>{
    onOpen();
  },[]);

  return (
    <div className="App" id="App">
      <MainLayouts>
          <Routes>
          <Route path="/" element={<MainPage/>}/>
          <Route path="/bookInfo/:bookname" element={<BookInfoPage/>}/>
          <Route path="/listen/:bookname" element={<AudioPage/>}/>
          <Route path="/edit/:bookname" element={userstatus==='user'?<NoPage/>:<EditPage/>}/>
          <Route path="*" element={<NoPage/>}/>
          </Routes>
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

