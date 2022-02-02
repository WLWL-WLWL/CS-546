function checkString(string) {
    if (string === undefined) throw " Parameter does not exit!!!";
    if (!(typeof(string) === 'string')) throw "Parameter is not a string or char!!!!";
    if (string.length === 0) throw " Empty string or char!!!";
    if (string.trim().length == 0) throw "String is just empty spaces";
}


function sortString(string) {
    checkString(string);
    let arrUp = [];
    let arrLow = [];
    let arrSpe = [];
    let arrNum = [];
    let arrSpace = [];
    for (let i = 0; i < string.length; i++) {
        if (string.charCodeAt(i) >= 65 && string.charCodeAt(i) <= 90) { //uppercase
            arrUp.push(string[i]);
            arrUp.sort();
        }
        if (string.charCodeAt(i) >= 97 && string.charCodeAt(i) <= 122) { //lowercase
            arrLow.push(string[i]);
            arrLow.sort();
        }
        if (string.charCodeAt(i) >= 33 && string.charCodeAt(i) <= 47 || string.charCodeAt(i) >= 58 && string.charCodeAt(i) <= 64 ||
            string.charCodeAt(i) >= 123 && string.charCodeAt(i) <= 126) { //special characters
            arrSpe.push(string[i]);
        }
        if (string.charCodeAt(i) >= 48 && string.charCodeAt(i) <= 57) { //numbers
            arrNum.push(string[i]);
            arrNum.sort();
        }
        if (string.charCodeAt(i) == 32) { //space
            arrSpace.push(string[i]);
        }
    }
    let resArr = arrUp.concat(arrLow.concat(arrSpe.concat(arrNum.concat(arrSpace))));
    let res = resArr.join('');
    return res;
}



function replaceChar(string, idx) {
    checkString(string);
    if (idx == "" || idx == null || isNaN(idx)) throw "idx is invalid";
    if (idx <= 0 || idx >= string.length - 2) throw "idx is invalid";

    let arr = string.split('');
    let count = 0;
    for (let i = 0; i < arr.length; i++) {
        if (i == idx) {
            continue;
        }
        if (arr[i] == arr[idx]) {
            count++;
            if (count % 2 == 0) {
                arr[i] = arr[idx + 1];
            } else {
                arr[i] = arr[idx - 1];
            }
        }
    }
    let res = arr.join('');
    return res;
}




function mashUp(string1, string2, char) {
    checkString(string1);
    checkString(string2);
    checkString(char);
    if (char.length != 1) throw "Char Only!!!";

    while (string1.length > string2.length) {
        string2 = string2 + char;
    }
    while ((string1.length < string2.length)) {
        string1 = string1 + char;
    }
    let res = '';
    for (let i = 0; i < string1.length; i++) {
        res += string1.charAt(i) + string2.charAt(i);
    }
    return res;

}

module.exports = {
    sortString,
    replaceChar,
    mashUp
};