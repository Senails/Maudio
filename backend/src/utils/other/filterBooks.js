export function filterBooksBySearch(arraybooks,searchUser){
    let search = searchUser.toLowerCase();

    let array1 = arraybooks.filter((seria)=>{
        if (seria.name.toLowerCase().includes(search)) return true;
        return false;
    })

    let array2 = arraybooks.filter((seria)=>{
        if (seria.authtorName.toLowerCase().includes(search)) return true;
        return false;
    })

    let resArray = array1 ;
    for(let book of array2){
        if (resArray.includes(book)) continue;
        resArray.push(book);
    }

    return resArray;
}