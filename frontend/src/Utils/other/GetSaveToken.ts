let keytoken = 'jfgk26065hfkew4';


export function GetToken():string{
    let token = localStorage.getItem(keytoken);

    if (token) return token;
    return 'none';
}

export function SaveToken(token:string){
    localStorage.setItem(keytoken,token);
}