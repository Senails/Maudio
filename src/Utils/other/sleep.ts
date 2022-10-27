//тот же setTimeout но без колбек хэла
export async function sleep(ms:number){
    return new Promise((res,rej)=>{
        setTimeout(()=>{
            res('');
        },ms);
    })
}