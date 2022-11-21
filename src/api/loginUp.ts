import { sleep } from "../Utils/other/sleep";

export type LoginData = {
    token:string,
    status:'user'|'editor'|'admin';
}

export async function loginUp(login:string,password:string):Promise<LoginData|'error'>{
    await sleep(300);

    //тут выполнить запрос
    let obj:LoginData = {
        token:'321',
        status:'admin',
    }
    //

    return obj;
}