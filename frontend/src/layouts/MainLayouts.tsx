import AudioPl from "../components/Audiopleer/AudioPl";
import { Fon } from "../components/fon/Fon";



export function MainLayouts({children}:{children:any}){
    return <>
        <Fon/>
            {children}
        <AudioPl/>
    </>
}