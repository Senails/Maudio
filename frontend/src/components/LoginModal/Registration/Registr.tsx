import { useState } from "react";
import { registration } from "../../../api/auth/registration";
import { loginUser, showhidemodal } from "../../../redux/slices/userSlice";
import { useAppDispatch } from "../../../redux/store";
import { ValidRegist } from "../../../Utils/apiUtils/ValidRegist";
import { Loader } from "../../Loader/Loader";
import { ExitModal } from "../exitmodal/ExitModal";
import { LoginHeader } from "../Header/Header";
import { Input } from "../Input/Intput";

export function Registration({changeModal}:{changeModal:()=>void}){
    let dispatch = useAppDispatch();

    
    let [name,setname]=useState('');
    let [email,setemail]=useState('');
    let [password,setpassword]=useState('');
    let [repeatpassword,setrepeatpassword]=useState('');


    let [error,seterror]=useState('');


    let [loadend,setloadend]= useState(true);
    async function clickopen(){
        setloadend(false);
        let check = ValidRegist(name,email,password,repeatpassword);
        if (check!=='ok'){
            seterror(check);
            setloadend(true);
            return;
        }
        let res = await registration(name,email,password);
        if (res.type==='error'){
            seterror(res.message!);
            setloadend(true);
            return;
        }

        seterror('');
        dispatch(loginUser(res.json!));
        dispatch(showhidemodal(false));
        setloadend(true);
    }

    return <div className='login-modal'>
        {loadend?<>
            <ExitModal/>
            <LoginHeader text='Регистрация' error={error}/>
            <form name='register'>
                <Input type='text' placeholder='никнейм' name='name'
                        value={name}
                        onChange={setname}
                />
                <Input type='text' placeholder='имейл' name='email'
                    value={email}
                    onChange={setemail}
                />
                <Input type='password' placeholder='пароль' name='password'
                    value={password}
                    onChange={setpassword}
                />
                <Input type='password' placeholder='повторите пароль' name='repeatpassword'
                                value={repeatpassword}
                    onChange={setrepeatpassword}
                />
            </form>
            <button onClick={clickopen}>зарегистрироваться</button>
            <div className='bottom-line'>
                <span onClick={changeModal}>войти</span>
                <span></span>
            </div>
        </>:<Loader/>}
</div>
}