import { useState } from "react";
import { registration } from "../../../api/auth/registration";
import { loginUser, setErrorMessage, setLoading, showhidemodal } from "../../../redux/slices/userSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { ValidRegist } from "../../../Utils/apiUtils/ValidRegist";
import { sleep } from "../../../Utils/other/sleep";
import { Loader } from "../../Loader/Loader";
import { ExitModal } from "../exitmodal/ExitModal";
import { LoginHeader } from "../Header/Header";
import { Input } from "../Input/Intput";

export function Registration({changeModal}:{changeModal:()=>void}){
    let dispatch = useAppDispatch();
    let error = useAppSelector((state)=>state.user.errorMessage);
    let loading = useAppSelector((state)=>state.user.loading);


    let [name,setname]=useState('');
    let [email,setemail]=useState('');
    let [password,setpassword]=useState('');
    let [repeatpassword,setrepeatpassword]=useState('');


    async function clickopen(){
        dispatch(setLoading(true));
        let check = ValidRegist(name,email,password,repeatpassword);
        if (check!=='ok'){
            dispatch(setErrorMessage(check));
            dispatch(setLoading(false));
            return;
        }
        let res = await registration(name,email,password);
        if (res.type==='error'){
            dispatch(setErrorMessage(res.message!));
            dispatch(setLoading(false));
            return;
        }

        dispatch(loginUser(res.json!));
        dispatch(showhidemodal(false));
        dispatch(setErrorMessage(''));
        await sleep(300);
        dispatch(setLoading(false));
    }

    function changemodal(){
        changeModal();
        dispatch(setErrorMessage(''));
    }

    return <div className='login-modal'>
        {!loading?<>
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
                <span onClick={changemodal}>войти</span>
                <span></span>
            </div>
        </>:<Loader/>}
</div>
}