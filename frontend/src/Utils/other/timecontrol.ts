//колбек будет вызываться не чаще указаного [ms]
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
//планирование нового запуска отменяет предыдущий
export function getTimeControl2(ms:number){
    let idTimeout: NodeJS.Timeout|undefined = undefined;
    let lastTime = new Date().getTime();

    return function TimeControl(callback:()=>void){
        let now = new Date().getTime();
        let delta = now - lastTime;
        
        clearTimeout(idTimeout);
        if (delta>ms){
            lastTime=new Date().getTime();
            callback();
        }else{
            lastTime = new Date().getTime();
            idTimeout = setTimeout(()=>{
                lastTime=new Date().getTime();
                callback();
            },ms);
        }
    }
}
//не боллее [count] срабатываний в [period]
export function getTimeControl3(count:number,period:number=10000){
    let arr:number[] = [];
    let timoutID:NodeJS.Timeout;

    return function TimeControl(callback:()=>void){
        if (timoutID) clearTimeout(timoutID);
        if (arr.length<=count){
            callback();
            arr.push(Date.now());
            return;
        }

        let now = Date.now();
        let minut = period;
        arr=arr.filter((elem)=>(elem+minut)>now);
        if (arr.length<count){
            callback();
            arr.push(Date.now());
            return;
        }

        let min = Math.min(...arr);
        let delta = now - min;
        let wait = minut-delta;

        timoutID = setTimeout(()=>{
            callback();
        },wait)
    }
}