import {MongoColl} from '../reimport.js';
import bcrypt from 'bcrypt';

export async function addUser({login,status,password}){
    MongoColl(async (mongo,close)=>{
        let db = mongo.db('AudioBooks');
        let coll = db.collection('users');

        let solt = await bcrypt.genSalt(6);
        let passwordhash = await bcrypt.hash(password, solt);

        let newUser = {
            status,
            login,
            password: passwordhash,
        }

        await coll.insertOne(newUser);
        close();
    })
}