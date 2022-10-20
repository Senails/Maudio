import { Fon } from "./components/fon/Fon";
import { Book } from "./components/book/Book";
import { Pleer } from "./components/pleer/Pleer";
import { useDispatch} from "react-redux";
import { setimage } from "./redux/slices/pleerSlice";

let i = 0;

function App() {
  let dispatch = useDispatch();

  let imgurl1="https://lh3.googleusercontent.com/fife/AAbDypDPeWmeA7BhgpgSq9z4muSoMvQj78py9mNM_MT-Yf52xwj96ucAj4CYGaGbi2rMLzK87M_HpTel1s7arvI7dU5hzxtcAu9ZkGH_22dmxsQuFMZpqSKPiyONBkYEK4tkMq-zskd8A8StSjbXQQMWaOzhopbkZohz-eVZujiOVwAPK7xG3t6gUzn3GAXGX7TX2uoiwrZzHpzx88iGrriLqpjyIa_w1xZfnw7jBNPW1eNHz7nokLLZFnWWvdkND94o9ibdSnNcKvoYE1YzZ4zInDmMb_1L9qJboCUm8W9NLRIk8jCv2xkTMNPS5NC73UAcrHGOI6fcWRDo9cMoDuKMBek1Wm0qO5ds0MD8rjkERQWzybpiSo3ceIOwYwYdqofK9_dJJZP6AVLyFi_nRWFGl0HaU9HzzsSPPqQa-u0S976exFmVT4nhzcEsSWSHbt0B-ABfXZ_19Wg-SIWuvniIyqI0c6wIwC_Ro9Y0fg83ZrVWmI_Om1rU0TLdndJZvDGbbGKTZ4ba9ruVF3Y5eY1mM73_nS4p9KpQkp3xYBkOCz4DMDFYU88bu2tQ9PlYHKGhUtJbDAoGT6_IReUiVc538AWfNB0BC6G5ZErMHivvayGilUjTBeKyX9o21m-k0Q8bHOiCZMVRC1yDsSGZq44fKIhlF-GywwlDTHId82OnTeRTpQJCYRKZDthPF_j7u4ERojPoG1r10WLQKZ_dXkPGUH-_IJ8MirwpkZoBynfVzMBXfNRxil3Kyu40KWfeVCsQk0wyqdOqDKvSANPG6GvSRsiR8DUl6XO_mOHr4I4EwJdc4TqIjanVibPN-kFn28vNghb9KJ-ZNCoUMD_Q76gXBBi-_rPIiieDMa4suuNViCkVLKZth4WHOaG4kwmJBX7kPwuicQTzCmCwmU7aJEdRAwcs3Hf1QWiZ0oNb0TOK7PqpJo99htm5Yv9DgbY6ckJW7nc5O1eSXO-Q5EhDYbbUWWKqMacT3iOWC77DF68_lp4dHKwW3dAFJDN-JzpXHuElgq7i_ze6VwLzfcyeG694r5dvwo-Ys5Ju5HayBXs3YAwm4Bj2-rPOOSpoFLxqI-UppyNfceJP2xY34JFoFMyqc2BqMNiqaN_bjEU8mXKCoilVyfS21QKLEjlWpbhR_jAT9LvLKFjV-3via1PXJgc25QY5a1QCek6APtqtcgMJkRRtvU8EusO60Jca9jV56UciQTnVcpG9U096XY_oQBH-tejMenWxySQVLzNZruhA-nbrIhTxBAoFSwAFXDyOqBtXzjulnyqYgppk0vt19F5bVzyWxIde9abPIYFkY3BqbLcC4m0CK4AlUQ8x81aoNScrzSkXkBPseCQSykWOOg6UTAeVHtwg1DvXpR0Y9MqgLhVg3GO3b_zgl93HCz3q7iUFSNcj0sfljEAhPrfctlP0dSxsZ2HHfolrWiNZ4oz5-ory91hd5r5YFiOMxAfE1MPwBL0mZD3EGOx5t8k8Li0z-Q=w1920-h902";
  let imgurl2="https://lh3.googleusercontent.com/drive-viewer/AJc5JmRCia7uc-NhYKl6xiMwdjLB9mIyAua4xYhH4co8b-bHJ0PcCGyhiulzHmJ6IdTsVmJSSoSbjm8=w1920-h902";

  //onClick={()=>setstate(!state)}


  function clickhandler(){
    if (i==0){
      dispatch(setimage(imgurl1))
      i=1;
    }else{
      dispatch(setimage(imgurl2))
      i=0;
    }
  }


  return (
    <div className="App" onClick={clickhandler}>
      <Fon/>
      <Book/>
      <Pleer/>


    </div>
  );
}

export default App;
