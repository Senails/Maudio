import express from 'express';
import {saveBook, deleteBook, editBook, cancelEdit, sendFileToGoogle} from './editHandlers.js';
import {getBookData,getBookMap,getBooksData} from './getDataHandlers.js';

export const apiRouter = express.Router();

apiRouter.get('/getbookdata/:href',getBookData);
apiRouter.get('/getbookmap/:href',getBookMap);
apiRouter.get('/getbooks/:search',getBooksData);

apiRouter.post('/sendfile',sendFileToGoogle);
apiRouter.post('/save',saveBook);
apiRouter.post('/delete',deleteBook);
apiRouter.post('/edit',editBook);
apiRouter.post('/cancel',cancelEdit);


apiRouter.post('/login',async (req,res)=>{
});
apiRouter.post('/auth',async (req,res)=>{
});
