import { Fon } from "./components/fon/Fon";
import { Book } from "./components/book/Book";
import { useState } from "react";
import { Pleer } from "./components/pleer/Pleer";

function App() {
  let [state,setstate]=useState(true);

  let imgurl1="https://фантазеры.рф/wa-data/public/shop/products/28/09/20928/images/56249/56249.750x0.jpg";
  let imgurl2="https://cv3.litres.ru/pub/c/elektronnaya-kniga/cover_max1500/11983630-maks-fray-labirinty-eho-tom-1.jpg";

  //onClick={()=>setstate(!state)}


  return (
    <div className="App" onClick={()=>setstate(!state)}>
      <Fon/>
      <Book imageurl={state?imgurl1:imgurl2}></Book>
      <Pleer/>


    </div>
  );
}

export default App;
