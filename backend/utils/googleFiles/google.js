import {google} from 'googleapis';

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

export async function uploadGoogleFile(name,mimeType,readStream){
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

export async function removeGoogleFile(googleID){
    return new Promise(async (res,rej)=>{
        try{
            const response = await drive.files.delete({
                fileId: googleID,
            });
            (response.status===204)?res('ok'):res('error');
        }catch(error){
            if (error.message.includes('File not found')){
                res('ok');
            }else{
                res('error');
            }
        }
    })
}

async function getPublickURL(googleID){
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
    return res.data.webContentLink;
}
//