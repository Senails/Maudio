import express from 'express';
import {uploadGoogleFile , removeGoogleFile} from './utils/googleFiles/google.js';
import {createFileName} from './utils/googleFiles/createFileName.js';

let app = express();

app.get('/',(req,res)=>{
    res.send('123');
})  


app.post('/api/sendfile',async (req,res)=>{
    let mimeType = req.headers['content-type'];
    let name = createFileName(mimeType);
    console.log(mimeType, name);

    // let FileData = await uploadGoogleFile('tryrty.mp3',mimeType,req);
    // console.log(FileData);
    res.send('1212');
})




















app.listen(3000, function() {
	console.log('running');
});