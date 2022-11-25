export function createID():string{
    let num1 = Date.now();
    let num2 = Math.floor(Math.random()*1000);
    return num1+''+num2;
}