import express from 'express';
import cors from 'cors';
import path from 'path';
import {apiRouter} from './api/apiRouter.js';
import __dirname from './__dirname.js';

let app = express();
let filepath = path.join(__dirname,'../../frontend/build/');

app.use(cors());
app.use(express.static(filepath));
app.use('/api/',apiRouter);

app.get('*',(req,res)=>{
    res.contentType('text/html');
    res.status(200);
    res.sendFile(filepath+'index.html');
}) 

/////
let PORT = process.env.PORT||3001;
app.listen(PORT, function() {
	console.log('running');
});