//готовит src для кортинок
//что бы избежать мигания пока картинка не загрузилась
export async function GetImageSrc(url:string) {
    return new Promise(async(res,rej)=>{
        try{
            let response = await fetch(url);
            let blob = await response.blob();

            let reader = new FileReader();

            reader.readAsDataURL(blob)

            reader.addEventListener('loadend',()=>{
                res(reader.result);
            })
        }catch{
            res('');
        }
    });
}