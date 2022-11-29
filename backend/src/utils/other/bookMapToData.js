export function bookMapToData(bookcard){
    let {href, name, authtorName, bookimage, description, bookscount} = bookcard;

    let book = {
        href,
        name,
        authtor:authtorName,
        description,
        bookscount,
        bookimage,
    }

    return book;
}