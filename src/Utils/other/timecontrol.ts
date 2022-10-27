//колбек будет вызываться не чаще указаного ms
export function getTimeControl(ms:number){
    let idTimeout: NodeJS.Timeout|null = null;
    let lastTime = new Date().getTime();

    return function TimeControl(callback:()=>void){
        let now = new Date().getTime();
        let delta = now - lastTime;
        
        if (idTimeout!==null) clearTimeout(idTimeout);

        if (delta>ms){
            lastTime=new Date().getTime();
            callback();
        }else{
            let time = ms - delta;
            
            idTimeout = setTimeout(()=>{
                lastTime=new Date().getTime();
                callback();
            },time);
        }
    }
}