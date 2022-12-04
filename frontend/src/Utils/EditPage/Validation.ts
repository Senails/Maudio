type propsType = {
    [key:string]:string,
}

type resultType = {
    [key:string]:boolean,
}

export function ValidationEdit(props:propsType):resultType|'ok'{
    let result:resultType={};
    for (let key in props){
        let regular = /^[а-яА-Я0-9 .,:"';]+$/;
        if (props[key]!=='' && props[key].length<50 && regular.test(props[key])){
            result[key]=true;
        }else{
            result[key]=false;
        }
    }

    if (props['description'] && props['description'].length<=1000){
        result['description']=true;
    }

    let checkOK = true;

    for (let key in result){
        if (result[key]!==true){
            checkOK=false;
            break;
        }
    }

    if (checkOK){
        return 'ok';
    }else{
        return result;
    }
}