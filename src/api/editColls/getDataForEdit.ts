import { EditState } from "../../types/editSlice";

type editData = {

}

export async function getDataForEdit(bookname:string):Promise<EditState|'error'> {
    if (bookname==='newbook'){
        let result:EditState ={
            href:'newbook',
            collName:'Name Collection',
            authtorName:'Name authtor',
            description:'description of collection',
            bookImage:{url:'',googleid:'',status:'loadend'},
            bookcount:0,
            collections: [],
            removeOnCancel:[],
            removeOnSave:[],
        }
        return result;
    }
    return "error";
}   