export function ValidRegist(name:string,email:string,password:string,repeatpassword:string):string{
    let nameRegular=/^[a-zA-Z0-9а-яА-Я]+$/;

    if (name.length<5 || name.length>15) return 'имя должно иметь от 5 до 15 символов';
    if (!nameRegular.test(name)) return 'недопустимые символы в имени';

    let emailRegular = /^[a-z.0-9]+@[a-z]{2,}\.[a-z]{2,4}$/;
    if (email.length===0) return 'заполните имейл';
    if (email.length>40) return 'больше 40 символов в имейле';
    if (!emailRegular.test(email)) return 'имейл не похож на нормальный';

    if (password!==repeatpassword) return 'пароли не совпадают';
    if (password.length<8) return 'пароль слишком короткий';

    let validpassword = ValidPass(password);
    if (validpassword!=='ok') return validpassword;

    return 'ok'
}

function ValidPass(pass:string):string{
    if (!/[0-9]/.test(pass)) return 'пароль должен содержать цыфры';
    
    let flag1 = false;
    let flag2 = false;
    for (let char of pass){
        if (/[0-9]/.test(char)) continue;
        if (char.toUpperCase()===char){ 
            flag1=true;
        }
        if (char.toLowerCase()===char){ 
            flag2=true;
        }
        if(flag1 && flag2) break;
    }
    if (!flag1) return 'пароль должен содержать заглавные буквы';
    if (!flag2) return 'пароль должен содержать строчные буквы';

    return 'ok'
}