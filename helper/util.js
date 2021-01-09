module.exports.convertDateTime = (str) => {
    var date = new Date(str),
        mnth = ("0" + (date.getMonth() + 1)).slice(-2),
        day = ("0" + date.getDate()).slice(-2);
    return [day, mnth, date.getFullYear()].join("-");
}

module.exports.KiemTraChuoi = (str1, str2) => {
    let flag = true;
    for(let i = 0; i < str1.length; i++){
        for(let j = 0; j < str2.length; j++){
            if(str1[i] == str2[j]){
                flag = false;
                break;
            }
        }
    }
    return flag;
}

module.exports.XoaDau = (str) => {
    return str.normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D");
}