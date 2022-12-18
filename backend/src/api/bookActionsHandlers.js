export async function setLike(req,res){
    let {token, bookid, like} = req.body;

}

export async function setReiting(req,res){
    let {token, bookid, reiting} = req.body;

}

export async function setUserProgress(req,res){
    let {token, bookid, progressData} = req.body;

}

export async function addComment(req,res){
    let {token, bookid, commentData} = req.body;

}

export async function removeComment(req,res){
    let {token, bookid, commentData} = req.body;

}