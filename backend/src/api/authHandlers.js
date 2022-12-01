import {findUserByID, readBodyToJson, findUserByLogin} from './../utils/reimport.js';

import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
const secretJWT = 'dsgytf435hdfas';

export async function login(req,res){
    let body = await readBodyToJson(req);
    let {login, password} = body;

    let user = await findUserByLogin(login);
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