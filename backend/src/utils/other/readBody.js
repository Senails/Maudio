export async function readBodyToJson(request){
    return new Promise((res)=>{
        try{
            let buffers = [];
            request.on('data',async (chunk)=>{
                buffers.push(chunk);
            })
            request.on('end',async ()=>{
                let text =await new Blob(buffers).text();
                let json = JSON.parse(text);
                res(json);
            })
        }catch{
            res('error');
        }
    })
}