import {MongoClient, ServerApiVersion} from 'mongodb';

const mongologin = 'Senails67895';
const mongopassword = '7PSs46zeXYi2mdQe';
const uri = `mongodb+srv://${mongologin}:${mongopassword}@cluster0.emeen9d.mongodb.net`;
const mongoclient = new MongoClient(uri, {serverApi: ServerApiVersion.v1 });

let i = 0;

export async function MongoColl(callback) {
    mongoclient.connect(async (error,mongo)=>{
        if (error) throw new Error('ошибка подключения к БД');
        callback(mongo,close);
        function close(){
            mongo.close();
        }
    });
}