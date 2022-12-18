import { BookMapFetch} from "../../types/api";
import { EditState } from "../../types/editSlice";
import { ApiMapToEditMap } from "../../Utils/apiUtils/apiUtils";
import { adress } from "../apiAdress";


export async function getDataForEdit(bookname:string):Promise<EditState|'error'> {
    if (bookname==='newbook'){
        let result:EditState ={
            href:'newbook',
            collName:'',
            authtorName:'',
            description:'',
            bookImage:{url:'',googleid:'',status:'loadend'},
            collections: [],
            removeOnCancel:[],
            removeOnSave:[],
            loading:false,
            showColl:-1,
            showBook:-1,
            dpopElement:-1,
            dpopType:'',
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

