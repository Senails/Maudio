import AudioPl from "../components/Audiopleer/AudioPl";
import { Fon } from "../components/fon/Fon";
import { LoginModal } from "../components/LoginModal/LoginLodal";
import { MiniPleer } from "../components/miniPleer/MiniPleer";



export function MainLayouts({children}:{children:any}){
    return <>
        <Fon/>
            {children}
        <AudioPl/>
        <MiniPleer/>
        <LoginModal/>
    </>
}