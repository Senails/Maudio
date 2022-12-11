import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUp } from '../../../api/loginUp';
import { loginUser } from '../../../redux/slices/userSlice';
import { sleep } from '../../../Utils/other/sleep';
import { Loader } from '../../Loader/Loader';
import { ExitModal } from '../exitmodal/ExitModal';
import { LoginHeader } from '../Header/Header';
import { Input } from '../Input/Intput';
import './style.scss';

export function Login({changeModal}:{changeModal:()=>void}){
    let dispatch = useDispatch();
    let navigate = useNavigate();


    let [email,setemail]=useState('');
    let [password,setpassword]=useState('');


    let [loadend,setloadend]= useState(true);
    let [error,seterror]=useState('');


    async function clickopen(){
        open(email,password)
    }
    async function open(login:string,password:string){
        if (login==='' || password===''){
            seterror('заполните поля');
            return;
        }
        setloadend(false);
        let res = await loginUp(login,password);
        setloadend(true);
        if (res==='error'){
            seterror('ошибка авторизации');
        }else{
            dispatch(loginUser(res));
            navigate('/');
        }
    }

    
    return <div className='login-modal'>
        {loadend?<>
            <ExitModal/>
            <LoginHeader text='Войти' error={error}/>
            <form name='login'>
                <Input type='text' placeholder='email' name='email'
                    value={email}
                    onChange={setemail}
                />
                <Input type='password' placeholder='password' name='password'
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