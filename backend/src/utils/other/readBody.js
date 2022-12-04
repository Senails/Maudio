export async function readBodyToJson(request){
    return new Promise((res)=>{
        try{
            let chunks = '';
            request.on('data',async (chunk)=>{
                chunks+=chunk;
            })
            request.on('end',async ()=>{
                let text = chunks;
                let json = JSON.parse(text);
                res(json);
            })
        }catch{
            res('error');
        }
    })
}