import { GetToken } from "../Utils/other/GetSaveToken";
import { sleep } from "../Utils/other/sleep";
import { LoginData } from "./loginUp";

export async function authUp():Promise<LoginData|'notoken'>{
    await sleep(300);
    let token = GetToken();
    if (token==='none') return 'notoken';
    
    //тут выполнить запрос
    let obj:LoginData = {
        token:'321',
        status:'admin',
    }
    //

    return obj;
}