import { BookMapFetch, FetchBook, Fetchbookpart, FetchCollection } from "../../types/api";
import { EditBook, Editbookpart, EditCollection, EditImage, EditState } from "../../types/editSlice";
import { ApiMapToEditMap } from "../../Utils/apiUtils/apiUtils";
import { adress } from "../apiAdress";

type editData = {

}

export async function getDataForEdit(bookname:string):Promise<EditState|'error'> {
    if (bookname==='newbook'){
        let result:EditState ={
            href:'newbook',
            collName:'Название серии книг',
            authtorName:'Имя автора',
            description:'описание для серии книг',
            bookImage:{url:'',googleid:'',status:'loadend'},
            collections: [],
            removeOnCancel:[],
            removeOnSave:[],
            loading:false,
        }
        return result;
    }

    try{
        let apiadress=adress+`/api/getbookmap/${bookname}`;
        let res = await fetch(apiadress);
        let json:BookMapFetch = await res.json();
        let editState: EditState = ApiMapToEditMap(json);
        return editState;
    }catch{
        return 'error';
    }
}   

