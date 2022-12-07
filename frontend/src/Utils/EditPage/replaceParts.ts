export function replaceParts(arr:any[],num:number,neednum:number){
    let array = arr;
    let part = arr[neednum];
    arr[neednum]=arr[num];
    arr[num]=part;
    return array;
}