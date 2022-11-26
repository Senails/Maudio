import { EditState } from "../../types/editSlice";
import { sleep } from "../../Utils/other/sleep";

type editData = {

}

export async function  getDataForEdit():Promise<EditState|'error'> {
    await sleep(242);

    let result:EditState ={
        href:'',
        collName:'Name Collection',
        authtorName:'Name authtor',
        description:'description of collection',
        bookImage:{url:'http://localhost:3000/static/media/img1.a13b7f9a6e77a8409bdb.jpg',googleid:'',status:'loadend'},
        collections: [],
        removeOnCancel:[],
        removeOnSave:[],
    }

    return result;

    // return 'error';
}   