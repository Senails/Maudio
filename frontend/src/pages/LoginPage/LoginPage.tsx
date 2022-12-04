import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUp } from '../../api/loginUp';
import { Loader } from '../../components/Loader/Loader';
import { loginUser } from '../../redux/slices/userSlice';
import { useAppDispatch } from '../../redux/store';
import './style.scss';

export function LoginPage(){
    let dispatch = useAppDispatch();
    let navigate = useNavigate();

    let [login,setlogin]=useState('');
    let [password,setpassword]=useState('');
    let [error,seterror]=useState('');
    let [loadend,setloadend]= useState(true);

    useEffect(()=>{
        document.addEventListener('keydown',keydown);
        return ()=>{
            document.removeEventListener('keydown',keydown);
        }
        async function keydown(event:KeyboardEvent){
            if (event.key!=='Enter') return;
            open(login,password);
        }
    },[login, password]);

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

    return <div className='loginpage'>
        {loadend?<>
            <span>Войдите что бы добавлять и редактировать</span>
            <div className='loginpage-modal'>
                <form>
                    <p>login <span>{error}</span></p>
                    <input type="text" value={login} onChange={(event)=>setlogin(event.target.value)}/>
                    <p>password</p>
                    <input type="password" value={password} onChange={(event)=>setpassword(event.target.value)}/>
                </form>
                <div className='button' onClick={()=>{open(login,password)}}>войти</div>
            </div>
            <span onClick={()=>navigate('/')}>или на главную</span>
        </>
        :<Loader/>}
    </div>
}