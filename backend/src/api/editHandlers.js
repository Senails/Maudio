import {
    readBodyToJson,
    addBookToDB,
    removeBookOnDB,
    deleteRemoveList,
    uploadGoogleFile,
    createFileName
} from '../utils/reimport.js';

export async function saveBook(req,res){
    let json = await readBodyToJson(req);
    let result = await addBookToDB(json);
    res.send(result);
}

export async function deleteBook(req,res){
    let json = await readBodyToJson(req);
    let {href, RemoveList}=json;
    let remove1 = await removeBookOnDB(href);
    let remove2 = await deleteRemoveList(RemoveList);

    res.send(remove1);
}

export async function editBook(req,res){
    let json = await readBodyToJson(req);
    let {book,lasthref,RemoveList}=json;
    let remove1 = await removeBookOnDB(lasthref);
    let result = await await addBookToDB(book);
    let remove2 = await deleteRemoveList(RemoveList);

    res.send('ok');
}

export async function cancelEdit(req,res){
    let json = await readBodyToJson(req);
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