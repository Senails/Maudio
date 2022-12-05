let abortController:AbortController|null=null;

export function saveController(controller:AbortController|null){
    abortController=controller;
}

export function abortUpload(){
    if (abortController){
        abortController.abort()
    }
}