import { useState } from "react";
import { sleep } from "../../../Utils/other/sleep";
import { Loader } from "../../Loader/Loader";
import { ExitModal } from "../exitmodal/ExitModal";
import { LoginHeader } from "../Header/Header";
import { Input } from "../Input/Intput";

export function Registration({changeModal}:{changeModal:()=>void}){
    let [email,setemail]=useState('');
    let [password,setpassword]=useState('');
    let [repeatpassword,setrepeatpassword]=useState('');

    let [loadend,setloadend]= useState(true);
    async function clickopen(){
        setloadend(false);
        await sleep(2000);
        setloadend(true);
    }

    return <div className='login-modal'>
        {loadend?<>
            <ExitModal/>
            <LoginHeader text='Регистрация' error=''/>
            <form name='register'>
                <Input type='text' placeholder='email' name='email'
                    value={email}
                    onChange={setemail}
                />
                <Input type='password' placeholder='password' name='password'
                    value={password}
                    onChange={setpassword}
                />
                <Input type='password' placeholder='repeat password' name='repeatpassword'
                                value={repeatpassword}
                    onChange={setrepeatpassword}
                />
            </form>
            <button onClick={clickopen}>регистрация</button>
            <div className='bottom-line'>
                <span onClick={changeModal}>войти</span>
                <span></span>
            </div>  
        </>:<Loader/>}
</div>
}