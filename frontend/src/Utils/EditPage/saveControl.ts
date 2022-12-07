let saved = false;

export function resetSaveControl(){
    saved = false;
}

export function okSaveControl(){
    saved = true;
}

export function checkSaveControl(){
    return saved;
}
