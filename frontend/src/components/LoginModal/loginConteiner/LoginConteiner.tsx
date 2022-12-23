import { useState } from "react";
import { sleep } from "../../../Utils/other/sleep";
import { getTimeControl } from "../../../Utils/other/timecontrol";
import { Login } from "../Login/Login"
import { Registration } from "../Registration/Registr"

let timeControll = getTimeControl(500);

export function LoginConteiner(){
    let [move,setmove]=useState(false);
    let [activemodal,setactivemodal]=useState(true);

    async function changeModal(){
        timeControll(async()=>{
            setmove(true);
            await sleep(500);
            setactivemodal(!activemodal);
            setmove(false);
        })
    }

    let modal1=<Registration changeModal={changeModal}/>
    let modal2=<Login changeModal={changeModal}/>

    return <div className='conteiner'>
    <div className={`double-block ${move?'move':''} ${!activemodal?'active':''}`}>
        <div className='screen'>
            {modal1};
        </div>
        <div className='screen'>
            {modal2};
        </div>
    </div>
</div>
}