import {findUserByID, readBodyToJson, findUserByEmail, addUser,findUserByName} from './../utils/reimport.js';

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
const secretJWT = 'dsgytf435hdfas';

export async function login(req,res){
    let body = await readBodyToJson(req);
    let {email, password} = body;

    let user = await findUserByEmail(email);

    if (user==='error' || !user) return res.send('error');
    let {password:userPassword, _id, status} = user;

    let passCheck = await bcrypt.compare(password, userPassword);
    if (!passCheck) return res.send('error');

    let token = jwt.sign({id: _id}, secretJWT);

    let response = {
        token,
        status,
    }

    res.json(response);
}

export async function registration(req,res){
    let body = await readBodyToJson(req);
    let {email,password,name} = body;


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

    await addUser(email,password,name);
    let user = await findUserByEmail(email);

    if (user==='error' || !user) return res.json(responseError);
    let {_id, status} = user;
    let token = jwt.sign({id: _id}, secretJWT);

    let response = {
        type:'ok',
        json:{
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
        return res.send('error');
    }
    let user = await findUserByID(userID);
    if (user==='error' || !user) return res.send('error');

    let {_id, status} = user;
    let token = jwt.sign({id: _id}, secretJWT);

    let response = {
        token,
        status,
    }
    res.json(response);
}

export async function checkToken(req,res,next){
    let tokenReq = req.headers.authorization;
    let userID;
    res.status(404);
    try{
        userID = jwt.decode(tokenReq, secretJWT).id;
    }catch{
        return res.send('error');
    }

    let user = await findUserByID(userID);
    if (user==='error' || !user) return res.send('error');
    let {_id, status} = user;

    if (status!=='editor' && status!=='admin') return res.send('error');

    res.status(200);
    next();
}