import {google} from 'googleapis';
import { Request } from 'express';

const CLIENT_ID = '1057357561839-dkluu6cbr8312848dklbec7469hgce1c.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URL = 'https://developers.google.com/oauthplayground/';
const REFRESH_TOCKEN = '1//04SULOYM_E_vOCgYIARAAGAQSNwF-L9IrbpZgb3OBQuXwTLuOZHEroUfQ2BH6MxMT58N_cLpODkMcjUHcB774JsSGNGfM6dAOj_I';

const oauth2Client = new google.auth.OAuth2({
    clientId:CLIENT_ID,
    redirectUri:REDIRECT_URL,
    clientSecret: CLIENT_SECRET,
});

oauth2Client.setCredentials({refresh_token:REFRESH_TOCKEN});

const drive = google.drive({
    version:'v3',
    auth: oauth2Client,
});


export async function uploadGoogleFile(name:string,mimeType:string,readStream:Request){
    return new Promise(async (res,rej)=>{
        try{
            const response = await drive.files.create({
                requestBody:{
                    name,
                    mimeType,
                },
                media:{
                    mimeType,
                    body: readStream
                }
            })

            let GoogleID = response.data.id;
            if (!GoogleID) return res('error');
            let url = await getPublickURL(GoogleID);
            let result = {
                URL:url,
                googleID:GoogleID,
            }
            res(result)
        }catch{
            res('error');
        }
    })
}
export async function removeGoogleFile(googleID:string):Promise<'ok'|'error'>{
    return new Promise(async (res,rej)=>{
        try{
            const response = await drive.files.delete({
                fileId: googleID,
            });
            (response.status===204)?res('ok'):res('error');
        }catch(e){
            let message: string = (e as Error).message;
            if (message.includes('File not found')){
                res('ok');
            }else{
                res('error');
            }
        }
    })
}
async function getPublickURL(googleID:string):Promise<string>{
    await drive.permissions.create({
        fileId:googleID,
        requestBody:{
            role:'reader',
            type:'anyone',
        }
    })

    let res = await drive.files.get({
        fileId:googleID,
        fields: 'webContentLink',
    })

    let url = res.data.webContentLink;

    if (url) return url;
    return 'error';
}
//