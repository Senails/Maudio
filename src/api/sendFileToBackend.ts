import { getSrcFromFile } from "../Utils/other/getSrc";
import { sleep } from "../Utils/other/sleep";

type ResponseType = {
    url:string,
    googleid:string,
}

export async function sendFileToBackend(file:File):Promise<ResponseType|'error'> {
    await sleep(Math.floor(Math.random()*3000));
    //отправить на бекенд и загрузить на гугл диск
    try{
        let src = await getSrcFromFile(file);
        return{
            url:src,
            googleid:''
        }
    }catch{
        return 'error';
    }
    //
}