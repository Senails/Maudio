import { UserSelectVolume } from "../../../../redux/slices/pleerSlice";
import { RootState, useAppDispatch, useAppSelector } from "../../../../redux/store";

export function WheelRect({children}:{children:any}){
    let userVolume = useAppSelector((state:RootState)=>state.pleer.userVolume);
    let dispatch = useAppDispatch();

    function weelhandler(event: React.WheelEvent){
        if (event.ctrlKey) return;
        if (event.deltaY>=0){
            requestAnimationFrame(()=>{
                let Newvolume = userVolume-0.05;
                Newvolume=Math.round(Newvolume*100)/100;
                Newvolume= Newvolume<=0?0:Newvolume;
                dispatch(UserSelectVolume(Newvolume));
            })
        }else{
            requestAnimationFrame(()=>{
                let Newvolume = userVolume+0.05;
                Newvolume=Math.round(Newvolume*100)/100;
                Newvolume= Newvolume>=1?1:Newvolume;
                dispatch(UserSelectVolume(Newvolume));
            })
        }
    }

    return <div onWheel={weelhandler} className='wheel-rect'>
        {children}
        <div></div>
    </div>;
}