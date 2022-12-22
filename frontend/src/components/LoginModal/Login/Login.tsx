import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUp } from '../../../api/auth/loginUp';
import { loginUser, showhidemodal } from '../../../redux/slices/userSlice';
import { setLenghtOnLogin } from '../../../Utils/apiUtils/setLenghOnLogin';

import { Loader } from '../../Loader/Loader';
import { ExitModal } from '../exitmodal/ExitModal';
import { LoginHeader } from '../Header/Header';
import { Input } from '../Input/Intput';

export function Login({changeModal}:{changeModal:()=>void}){
    let dispatch = useDispatch();

    let [email,setemail]=useState('');
    let [password,setpassword]=useState('');


    let [loadend,setloadend]= useState(true);
    let [error,seterror]=useState('');


    async function clickopen(){
        open(email,password)
    }
    async function open(email:string,password:string){
        if (email==='' || password===''){
            seterror('заполните поля');
            return;
        }
        setloadend(false);
        let res = await loginUp(email,password);
        if (res==='error'){
            seterror('ошибка авторизации');
        }else{
            dispatch(loginUser(res));
            dispatch(showhidemodal(false));
            setLenghtOnLogin();
        }
        setloadend(true);
    }

    
    return <div className='login-modal'>
        {loadend?<>
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
            <div className='bottom-line'>
                <span onClick={changeModal}>регистрация</span>
                <span></span>
            </div>
        </>:<Loader/>}
    </div>
}