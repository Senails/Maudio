import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUp } from '../../../api/auth/loginUp';
import { loginUser, setErrorMessage, setLoading, showhidemodal } from '../../../redux/slices/userSlice';
import { useAppSelector } from '../../../redux/store';
import { setLenghtOnLogin } from '../../../Utils/apiUtils/setLenghOnLogin';
import { sleep } from '../../../Utils/other/sleep';

import { Loader } from '../../Loader/Loader';
import { ExitModal } from '../exitmodal/ExitModal';
import { GoogleButton } from '../googleButton/GoogleButton';
import { LoginHeader } from '../Header/Header';
import { Input } from '../Input/Intput';

export function Login({changeModal}:{changeModal:()=>void}){
    let dispatch = useDispatch();
    let error = useAppSelector((state)=>state.user.errorMessage);
    let loading = useAppSelector((state)=>state.user.loading);

    let [email,setemail]=useState('');
    let [password,setpassword]=useState('');


    async function clickopen(){
        open(email,password)
    }
    async function open(email:string,password:string){
        if (email==='' || password===''){
            dispatch(setErrorMessage('заполните поля'));
            return;
        }
        dispatch(setLoading(true));
        let res = await loginUp(email,password);
        if (res==='error'){
            dispatch(setErrorMessage('ошибка авторизации'));
        }else{
            dispatch(loginUser(res));
            dispatch(showhidemodal(false));
            dispatch(setErrorMessage(''));
            setLenghtOnLogin();
            await sleep(300);
        }
        dispatch(setLoading(false));
    }


    function changemodal(){
        changeModal();
        dispatch(setErrorMessage(''));
    }
    
    return <div className='login-modal'>
        {!loading?<>
            <ExitModal/>
            <LoginHeader text='Войти' error={error}/>
            <form name='login'>
                <Input type='text' placeholder='имейл' name='email'
                    value={email}
                    onChange={setemail}
                />
                <Input type='password' placeholder='пароль' name='password'
                    value={password}
                    onChange={setpassword}
                />
            </form>
            <button onClick={clickopen}>войти</button>
            <span>или</span>
            <GoogleButton/>
            <div className='bottom-line'>
                <span onClick={changemodal}>регистрация</span>
                <span></span>
            </div>
        </>:<Loader/>}
    </div>
}