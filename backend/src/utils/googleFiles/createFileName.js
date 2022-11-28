export function createFileName(mimeType){
    let type = mimeType.replace(/.*\//,'');
    let date = Date.now();
    let random = (Math.random()+'').slice(3,8);

    return `file${date}${random}.${type}`;
}