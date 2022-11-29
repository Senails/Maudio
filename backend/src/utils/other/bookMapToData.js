export function bookMapToData(bookcard){
    let {href, name, authtorname, image, description, bookcount} = bookcard;

    let book = {
        href,
        name,
        authtorname,
        description,
        bookcount,
        image,
    }

    return book;
}