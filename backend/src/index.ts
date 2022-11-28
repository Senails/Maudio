import express, {Express} from 'express';
import { sendFileToGoogle } from './api/post/sendFileToGoogle';

let app: Express = express();

app.get('/',(req,res)=>{
    res.send('123');
})  



app.get('/api/get/books',async (req,res)=>{})
app.get('/api/getbookdata/:href',async (req,res)=>{})
app.get('/api/getbookmap/:href',async (req,res)=>{})
app.get('/api/geteditdata/:href',async (req,res)=>{})

app.post('/api/sendfile',sendFileToGoogle);
app.post('/api/save',async (req,res)=>{})
app.post('/api/delete',async (req,res)=>{})
app.post('/api/edit',async (req,res)=>{})
app.post('/api/cancel',async (req,res)=>{})

app.post('/api/auth',async (req,res)=>{})
app.post('/api/login',async (req,res)=>{})

//112232423443

app.listen(3000, function() {
	console.log('running');
});