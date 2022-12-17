export function DateToString(stump:number):string{
    let date = new Date(stump);

    let year = date.getFullYear();
    let day = date.getDate();
    let month = date.getMonth();

    let montharr = [
        'января',
        'февраля',
        'марта',
        'апреля',
        'мая',
        'июня',
        'июля',
        'августа',
        'сентября',
        'октября',
        'ноября',
        'декабря',
    ]

    return `${day} ${montharr[month]} ${year}г`
}