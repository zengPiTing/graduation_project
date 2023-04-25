export default function dateHandler(value) {
    let date = new Date(value);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let dates = date.getDate();
    return `${year}年${month}月${dates}日`
}