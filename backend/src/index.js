import express from 'express';
import { sendFileToGoogle } from './api/post/sendFileToGoogle.js';
import { readBodyToJson } from './utils/reimport.js';
import __dirname from './__dirname.js';
import path from 'path';
import fs from 'fs';

let app = express();

app.get('/',(req,res)=>{
    res.send('123');
})  


app.get('/api/getbooks',async (req,res)=>{})
app.get('/api/getbookdata/:href',async (req,res)=>{})
app.get('/api/getbookmap/:href',async (req,res)=>{})
app.get('/api/geteditdata/:href',async (req,res)=>{})

app.post('/api/sendfile',sendFileToGoogle);
app.post('/api/save',async (req,res)=>{
    let text = await readBodyToJson(req);
    console.log(text);

    res.send('1234');
})
app.post('/api/delete',async (req,res)=>{})
app.post('/api/edit',async (req,res)=>{})
app.post('/api/cancel',async (req,res)=>{})

app.post('/api/auth',async (req,res)=>{})
app.post('/api/login',async (req,res)=>{})

//112232423443

app.listen(3000, function() {
	console.log('running');
});

let book = {
    href:'MaxMax',
    name:'mixin',
    surn:'pixin'
}

// addBookToDB(book);


func()
async function func(){
}

