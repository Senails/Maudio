import express from 'express';
import compression from 'compression';
import cors from 'cors';
import path from 'path';

import {apiRouter} from './api/apiRouter.js';
import __dirname from './__dirname.js';

let app = express();
let filepath = path.join(__dirname,'../../frontend/build/');

app.use(cors());
app.use('/api/',apiRouter);


app.use(compression({ filter: shouldCompress }))
function shouldCompress (req, res) {
  if (req.headers['x-no-compression']) {
    // don't compress responses with this request header
    return false
  }

  // fallback to standard filter function
  return compression.filter(req, res)
}
app.use(express.static(filepath));
app.get('*',(req,res)=>{
    res.contentType('text/html');
    res.status(200);
    res.sendFile(filepath+'index.html');
}) 

/////
let PORT = process.env.PORT||3001;
app.listen(PORT, function() {
	console.log('running');
    setInterval(()=>{
        console.log('I wrking, dont close me');
    },1000*60*10)
});