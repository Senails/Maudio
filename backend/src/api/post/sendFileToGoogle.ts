import { uploadGoogleFile } from "../../utils/googleFiles/google";
import {createFileName} from '../../utils/googleFiles/createFileName';
import { Request , Response} from 'express';

export async function sendFileToGoogle(req:Request,res:Response){
    let mimeType = req.headers['content-type'];
    if (!mimeType) return res.send('error');

    let name = createFileName(mimeType);
    let FileData = await uploadGoogleFile(name,mimeType,req);
    
    if (FileData!=='error') return res.json(FileData);
    res.send('error');
}