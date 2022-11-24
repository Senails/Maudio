//готовит src для кортинок
//что бы избежать мигания пока картинка не загрузилась
export async function getSrcFromURL(url:string) {
    return new Promise(async(res,rej)=>{
        try{
            let response = await fetch(url);
            let blob = await response.blob();
            
            let src = URL.createObjectURL(blob);
            res(src);  
        }catch{
            res('');
        }
    });
}

export async function getSrcFromFile(file:File):Promise<string> {
    return new Promise((res,rej)=>{
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.addEventListener('loadend',()=>{
            let rez =<string> reader.result;
            res(rez);
        })
    })
}