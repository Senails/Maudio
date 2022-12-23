import {
    findUserByID,
    findUserByEmail,
    addUser,
    findUserByName,

    registerGoogleUser,
    findGoogleUser,
} from './../utils/reimport.js';


import jwt from 'jsonwebtoken';
export const secretJWT = 'dsgytf435hdfas';
import bcrypt from 'bcrypt';


export async function login(req,res){
    let {email, password} = req.body;
    let user = await findUserByEmail(email);

    if (user==='error' || !user) return res.json('error');
    let {password:userPassword, _id, status, name:userName} = user;

    let passCheck = await bcrypt.compare(password, userPassword);
    if (!passCheck) return res.json('error');

    let token = jwt.sign({id: _id}, secretJWT);

    let response = {
        userName,
        token,
        status,
    }

    res.json(response);
}
export async function registration(req,res){
    let body = req.body;
    let {email,password,name} = body;


    await addUser(email,password,name);
    let user = await findUserByEmail(email);


    let {_id, status , name:userName} = user;
    let token = jwt.sign({id: _id}, secretJWT);


    let response = {
        type:'ok',
        json:{
            userName,
            token,
            status,
        }
    }
    res.json(response);
}
export async function auth(req,res){
    let tokenReq = req.headers.authorization;
    let userID;

    try{
        userID = jwt.decode(tokenReq, secretJWT).id;
    }catch{
        return res.json('error');
    }
    let user = await findUserByID(userID);
    if (user==='error' || !user) return res.json('error');

    let {_id, status,name:userName} = user;
    let token = jwt.sign({id: _id}, secretJWT);

    let response = {
        userName,
        token,
        status,
    }
    res.json(response);
}


export async function googleAuth(req,res){
    let tokenReq = req.headers.authorization;
    let userData;

    try{
        userData = jwt.decode(tokenReq);
    }catch{
        return res.json('error');
    }

    let {email, name} = userData;
    let user = await findGoogleUser(email);
    if (user==='error') return res.json('error');

    try{
        if (!user) {
            await registerGoogleUser(email,name);
            user = await findGoogleUser(email);
            if (user==='error' || !user) return res.json('error');
        }
    }catch{
        return res.json('error');
    }
    let {_id, status, name: userName} = user;
    let token = jwt.sign({id: _id}, secretJWT);

    let response = {
        token,
        userName,
        status,
    }
    res.json(response);
}

//utils
export async function checkToken(req,res,next){
    let tokenReq = req.headers.authorization;
    let userID;
    res.status(404);
    try{
        userID = jwt.decode(tokenReq, secretJWT).id;
    }catch{
        return res.json('error');
    }

    let user = await findUserByID(userID);
    if (user==='error' || !user) return res.json('error');
    let {_id, status} = user;

    if (status!=='editor' && status!=='admin') return res.json('error');

    res.status(200);
    next();
}
export async function checkRegistrData(req,res,next){
    let body = req.body;
    let {email,name} = body;
    
    let user1 = findUserByEmail(email);
    let user2 = findUserByName(name);
    let responseError = {
        type:'error',
        message:'ошибка при регистрации',
    } 
    try{
        let [check1,check2] = await Promise.all([user1,user2]);
        if (check1==='error'|| check2==='error') throw new Error();
        if (check2){
            responseError.message = 'имя занято';
            res.json(responseError);
            return;
        }
        if (check1){
            responseError.message = 'имейл уже зарегестрирован';
            res.json(responseError);
            return;
        }
    }catch{
        res.json(responseError);
        return;
    }

    next();
}