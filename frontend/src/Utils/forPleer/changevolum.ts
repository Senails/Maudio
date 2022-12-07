import { setvolume } from "../../redux/slices/pleerSlice";
import { dispatch } from "../../redux/store";
import { sleep } from "../other/sleep";

export async function ChangeVolume(NowVolume:number,NewVolume:number,ms:number) {
    let frames = Math.floor((ms/1000)*60);
    let period = Math.floor(ms/frames);

    let OldVolume = NowVolume;

    let volumedelta = NewVolume-OldVolume;
    let volumepart = volumedelta/frames;

    let volumeNow = OldVolume;

    for(let i=0; i<frames;i++){
        await sleep(period);
        volumeNow=volumeNow+volumepart;
        volumeNow=volumeNow<0?0:volumeNow

        dispatch(setvolume(volumeNow));
    }
    return;
}