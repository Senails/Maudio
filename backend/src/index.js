import express from 'express';
import {apiRouter} from './api/apiRouter.js'

let app = express();

app.get('/',(req,res)=>{
    res.send('123');
})  



app.use('/api/',apiRouter);

app.listen(3000, function() {
	console.log('running');
});


func()
async function func(){
}