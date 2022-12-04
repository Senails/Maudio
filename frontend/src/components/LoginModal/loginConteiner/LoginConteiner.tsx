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

    let modal1=<Login changeModal={changeModal}/>
    let modal2=<Registration changeModal={changeModal}/>

    return <div className='conteiner'>
    <div className={`double-block ${move?'move':''}`}>
        <div className='screen'>
            {activemodal?modal2:modal1};
        </div>
        <div className='screen'>
            {activemodal?modal1:modal2};
        </div>
    </div>
</div>
}