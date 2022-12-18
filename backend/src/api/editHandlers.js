import {
    addBookToDB,
    removeBookOnDB,
    deleteRemoveList,
    uploadGoogleFile,
    createFileName,
    findBookByHref,
    updateBookToDB,
} from '../utils/reimport.js';

export async function saveBook(req,res){
    let body = req.body;
    let {bookMap, RemoveList} = body;
    await deleteRemoveList(RemoveList);
    let result = await addBookToDB(bookMap);
    
    res.send(result);
}
export async function editBook(req,res){
    let body = req.body;
    let {bookMap,lasthref,RemoveList}=body;

    let result = await updateBookToDB(bookMap,lasthref);
    let remove2 = await deleteRemoveList(RemoveList);

    res.send(result);
}
export async function deleteBook(req,res){
    let json = req.body;
    let {href, RemoveList}=json;
    let remove1 = await removeBookOnDB(href);
    let remove2 = await deleteRemoveList(RemoveList);

    res.send(remove1);
}
export async function cancelEdit(req,res){
    let json = req.body;
    let {RemoveList}=json;
    let remove2 = await deleteRemoveList(RemoveList);

    res.send(remove2);
}
export async function sendFileToGoogle(req,res){
    let mimeType = req.headers['content-type'];
    if (!mimeType) return res.send('error');

    let name = createFileName(mimeType);
    let FileData = await uploadGoogleFile(name,mimeType,req);
    
    if (FileData!=='error') return res.json(FileData);
    res.send('error');
}