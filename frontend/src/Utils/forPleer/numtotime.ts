export function numToTime(number:number){
    let num = Math.floor(number);

    let s =''+num%60;

    let num1 = Math.floor(num/60);

    let m =''+num1%60;
    let h =''+Math.floor(num1/60);

    s = s.length===1?'0'+s:s;
    m = (m.length===1 && h!=='0')?'0'+m:m;


    return `${h!=='0'?h+':':''}${m}:${s}`
}