import {MongoClient, ServerApiVersion} from 'mongodb';

const mongologin = 'Senails67895';
const mongopassword = '7PSs46zeXYi2mdQe';
const uri = `mongodb+srv://${mongologin}:${mongopassword}@cluster0.emeen9d.mongodb.net`;
const mongoclient = new MongoClient(uri, {serverApi: ServerApiVersion.v1 });
export const nameDB = 'AudioBooks';

async function getMongo(){
    return new Promise((res,rej)=>{
        mongoclient.connect(async (error,mongo)=>{
            res(mongo);
        });
    })
}

let mongo = await getMongo();

export async function MongoColl(callback) {
    callback(mongo);
}
