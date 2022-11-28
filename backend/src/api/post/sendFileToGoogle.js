import { uploadGoogleFile } from "../../utils/google/google.js";
import {createFileName} from '../../utils/google/createFileName.js';

export async function sendFileToGoogle(req,res){
    let mimeType = req.headers['content-type'];
    if (!mimeType) return res.send('error');

    let name = createFileName(mimeType);
    let FileData = await uploadGoogleFile(name,mimeType,req);
    
    if (FileData!=='error') return res.json(FileData);
    res.send('error');
}