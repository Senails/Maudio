import { Fon } from "./components/fon/Fon";
import { Book } from "./components/book/Book";
import { PleerUI } from "./components/PleerUI/Pleer";
import AudioPl from "./components/Audiopleer/AudioPl";
import LeftPanel from "./components/leftPanel/LeftPanel";




function App() {
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
