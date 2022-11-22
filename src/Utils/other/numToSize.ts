export function numToSize(size:number):string{
    let i = 0;
    let num = size;

    while (true){
        if (num/1024<1){
            break;
        }else{
            num = num/1024;
            i++;
        }
    }
    let arr = ['B','KB','MB','GB','TB'];

    num=Math.floor(num*100)/100;

    return `${num} ${arr[i]}`;
}