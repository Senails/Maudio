import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
// import ReactDOMServer from 'react-dom/server.node';
import {apiRouter} from './api/apiRouter.js';
import {uploadGoogleFile} from './utils/reimport.js';
// import App from './../build/static/js/main.4caef1c3.js';
import __dirname from './__dirname.js';

let app = express();
let filepath = path.join(__dirname,'../');
// let indexHTML = fs.readFileSync(filepath, {encoding: 'utf8',});
// let appHTML = ReactDOMServer.renderToString(App());
// indexHTML = indexHTML.replace('<div id="app"></div>', `<div id="app">${appHTML}</div>`);

// console.log(App)


app.use(cors());
app.use(express.static(filepath));
app.use('/api/',apiRouter);

app.get('*',(req,res)=>{
    res.contentType('text/html');
    res.status(200);
    res.sendFile(filepath+'index.html');
}) 


let PORT = process.env.PORT||3001;
app.listen(PORT, function() {
	console.log('running');
});



func()

async function func(){
    let pat = filepath+'package.json';
    let res = await uploadGoogleFile('package.json','application/json',fs.createReadStream(filepath+'package.json'))
    console.log(res);
}