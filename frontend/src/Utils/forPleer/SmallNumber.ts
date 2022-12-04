let num = 0;

export function SmallNumber(){
    if (num===0) {
        num=1;
        return 0.0001
    }else{
        num=0;
        return 0;
    }
}