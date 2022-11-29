import express from 'express';
import {apiRouter} from './api/apiRouter.js';
import cors from 'cors';

let app = express();
app.use(cors());

app.get('/',(req,res)=>{
    res.send('123');
})  
app.use('/api/',apiRouter);




app.listen(3001, function() {
	console.log('running');
});