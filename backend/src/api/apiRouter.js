import express from 'express';
import { saveBook, deleteBook, editBook, cancelEdit, sendFileToGoogle} from './editHandlers.js';
import { getBookData,getBookMap,getBooksDataPost} from './getDataHandlers.js';
import { login, auth, checkToken, registration, checkRegistrData, googleAuth } from './authHandlers.js';
import { setLike, setReiting, setUserProgress, addComment, removeComment } from './bookActionsHandlers.js';
import { getJsonBody } from './../utils/reimport.js';

export const apiRouter = express.Router();

// get data
apiRouter.get('/getbookdata/:href',getBookData);
apiRouter.get('/getbookmap/:href',getBookMap);
apiRouter.post('/getbooks',getJsonBody,getBooksDataPost);

// edit
apiRouter.post('/sendfile',checkToken, sendFileToGoogle);
apiRouter.post('/save',getJsonBody, checkToken, saveBook);
apiRouter.post('/delete',getJsonBody, checkToken, deleteBook);
apiRouter.post('/edit',getJsonBody, checkToken, editBook);
apiRouter.post('/cancel',getJsonBody, checkToken, cancelEdit);

// user 
apiRouter.post('/register',getJsonBody,checkRegistrData,registration);
apiRouter.post('/login',getJsonBody,login);
apiRouter.post('/auth',auth);
apiRouter.post('/googleAuth',googleAuth);


// book actions
apiRouter.post('/setLike',getJsonBody, setLike);
apiRouter.post('/setReiting',getJsonBody, setReiting);
apiRouter.post('/setAddComment',getJsonBody, addComment);
apiRouter.post('/setRemoveComment',getJsonBody, removeComment);
apiRouter.post('/setUserProgress',getJsonBody, setUserProgress);

//testing