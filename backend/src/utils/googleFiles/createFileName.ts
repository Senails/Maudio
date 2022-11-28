export function createFileName(mimeType:string):string{
    let type = mimeType.replace(/.*\//,'');
    let date = Date.now();
    let random = (Math.random()+'').slice(3,8);

    return `file${date}${random}.${type}`;
}