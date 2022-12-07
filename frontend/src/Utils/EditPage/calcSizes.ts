import { EditBook } from "../../types/editSlice";

export function getheight(books:EditBook[],showBook:number){
    let sum = 45;
    books.forEach((elem,index)=>{
        if (index===showBook){
            let num1 = elem.bookparts.length;
            let num2 = 45+(num1>=9?10:num1+1)*45;
            sum+=num2;
        }else{
            sum+=45;
        }
    })
    return sum+'px';
}