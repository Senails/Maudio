type propsType = {
    [key:string]:string,
}

type resultType = {
    [key:string]:boolean,
}

export function ValidationEdit(props:propsType):resultType|'ok'{
    let result:resultType={};
    for (let key in props){
        if (props[key]!=='' && props[key].length<50){
            result[key]=true;
        }else{
            result[key]=false;
        }
    }

    if (props['description'] && props['description'].length<3000){
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