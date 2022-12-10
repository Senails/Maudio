let storagekey = 'gfuy46gfgh5h';

export function getvolume():number{
    let num = localStorage.getItem(storagekey);
    if (num){
        return +num;
    }
    return 0.5;
}

export function savevolume(num:number){
    localStorage.setItem(storagekey,num+'');
}