import express from 'express';
import {saveBook, deleteBook, editBook, cancelEdit, sendFileToGoogle} from './editHandlers.js';
import {getBookData,getBookMap,getBooksData} from './getDataHandlers.js';
import { login, auth, checkToken, registration } from './authHandlers.js';

export const apiRouter = express.Router();

apiRouter.get('/getbookdata/:href',getBookData);
apiRouter.get('/getbookmap/:href',getBookMap);
apiRouter.get('/getbooks/:search',getBooksData);
apiRouter.get('/getbooks',getBooksData);

apiRouter.post('/sendfile',checkToken, sendFileToGoogle);
apiRouter.post('/save',checkToken, saveBook);
apiRouter.post('/delete',checkToken, deleteBook);
apiRouter.post('/edit',checkToken, editBook);
apiRouter.post('/cancel',checkToken, cancelEdit);

apiRouter.post('/login',login);
apiRouter.post('/auth',auth);
apiRouter.post('/register',registration);
