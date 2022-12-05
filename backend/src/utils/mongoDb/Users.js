import { ObjectId } from 'mongodb';
import {MongoColl,nameDB} from './MongoDB.js';
import bcrypt from 'bcrypt';



export async function findUserByEmail(email){
    return new Promise((res,rej)=>{
        MongoColl(async (mongo)=>{
            try{
                let db = mongo.db(nameDB);
                let coll = db.collection('users');

                let user = await coll.findOne({email:email})

                res(user);
            }catch(e){
                console.log(e.message)
                res('error');
            }
        })
    })
}
export async function findUserByName(name){
    return new Promise((res,rej)=>{
        MongoColl(async (mongo)=>{
            try{
                let db = mongo.db(nameDB);
                let coll = db.collection('users');

                let user = await coll.findOne({name:name})
                res(user);
            }catch(e){
                console.log(e.message)
                res('error');
            }
        })
    })
}
export async function findUserByID(ID){
    return new Promise((res,rej)=>{
        MongoColl(async (mongo)=>{
            try{
                let db = mongo.db(nameDB);
                let coll = db.collection('users');

                let user = await coll.findOne({ _id: ObjectId(ID) })
                res(user);
            }catch{
                res('error');
            }
        })
    })
}
export async function addUser(email,password,name){
    return new Promise((res)=>{
        MongoColl(async (mongo,close)=>{
            let db = mongo.db('AudioBooks');
            let coll = db.collection('users');
    
            let solt = await bcrypt.genSalt(6);
            let passwordhash = await bcrypt.hash(password, solt);
    
            let newUser = {
                name,
                email,
                password: passwordhash,
                status:'user',
            }
    
            await coll.insertOne(newUser);
            res('end');
        })
    })
}