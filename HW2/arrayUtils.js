function checkArray(array) {
    if (typeof(array) == "undefined") throw "Array is undefined";

    if (array instanceof Array == false) throw "Parameter is not an array";

    if (array.length == 0) throw "Array is empty";

}

function average(array) {
    checkArray(array);
    let sum = 0;
    let count = 0;
    for (let i = 0; i < array.length; i++) {
        checkArray(array[i]);
        for (let j = 0; j < array[i].length; j++) {
            let num = array[i][j];
            if (!(typeof(num) == "number")) {
                throw "The elements of innerarray must be number!!!";
            }
            sum += num;
            count += 1;
        }
    }
    return Math.round(sum / count);
}


function modeSquared(array) {
    checkArray(array);
    let numbers = {};
    for (let i = 0; i < array.length; i++) {
        let num = array[i];
        if (!(typeof(num) == "number")) throw "The elements of innerarray must be number!!!";
        if (!!numbers[num]) {
            numbers[num]++;
        } else {
            numbers[num] = 1;
        }
    }
    let modeNumbers = new Array();
    let max = 0;
    for (let num in numbers) {
        if (max == 0 || numbers[num] > max) {
            modeNumbers = new Array();
            modeNumbers.push(num);
            max = numbers[num];
        } else if (numbers[num] == max) {
            modeNumbers.push(num);
        }
    }
    if (modeNumbers.length == array.length) {
        return 0;
    }
    let sum = 0;
    for (let num in modeNumbers) {
        sum += modeNumbers[num] * modeNumbers[num];
    }
    return sum;
}




function medianElement(array) {
    checkArray(array);
    for (let i = 0; i < array.length; i++) {
        if (!(typeof(array[i]) == "number")) throw "The elements of array must be number!!!";
    }
    let res = {};
    let arrayOrg = [];
    for (let i = 0; i < array.length; i++) {
        arrayOrg[i] = array[i];
    }
    let sortedArray = array.sort((a, b) => a - b);
    if (sortedArray.length % 2 == 0) {
        let value1 = sortedArray.length / 2;
        let value2 = sortedArray.length / 2 - 1;
        let key = (sortedArray[value1] + sortedArray[value2]) / 2;
        let index1 = arrayOrg.indexOf(sortedArray[value1]);
        let index2 = arrayOrg.indexOf(sortedArray[value2]);
        res[key] = Math.max(index1, index2);
        return res;

    } else {
        let value = Math.floor(sortedArray.length / 2);
        res[sortedArray[value]] = arrayOrg.indexOf(sortedArray[value]);
        return res;
    }

}


function checkMerge(array) {
    if (typeof(array) == "undefined") throw "Array is undefined";

    if (array instanceof Array == false) throw "Parameter is not an array";

    if (array.length == 0) throw "Array is empty";

    for (let i = 0; i < array.length; i++) {
        checkNumberOrChar(array[i]);
    }

}

function checkNumberOrChar(value) {
    if (typeof value == "string") {
        if (value.length != 1) {
            throw "Not a char string";
        }
        if (!((value.charCodeAt(0) >= 65 && value.charCodeAt(0) <= 90) || (value.charCodeAt(0) >= 97 && value.charCodeAt(0) <= 122))) {
            throw " Char must be uppercase or lowercase";
        }
    } else if (value == "" || value == null || isNaN(value)) {
        throw "Not a number";
    }
}

function merge(arrayOne, arrayTwo) {
    checkMerge(arrayOne);
    checkMerge(arrayTwo);

    let arr1 = []; // store chars
    let arr2 = []; // store number
    for (let i = 0; i < arrayOne.length; i++) {
        if (isNaN(arrayOne[i])) {
            arr1.push(arrayOne[i]);
        } else {
            arr2.push(arrayOne[i]);
        }
    }
    for (let i = 0; i < arrayTwo.length; i++) {
        if (isNaN(arrayTwo[i])) {
            arr1.push(arrayTwo[i]);
        } else {
            arr2.push(arrayTwo[i]);
        }
    }
    let map = new Map(); //map{a-z,A-Z};
    for (let i = 97; i <= 122; i++) {
        map.set(String.fromCharCode(i), 0);
    }
    for (let i = 65; i <= 90; i++) {
        map.set(String.fromCharCode(i), 0);
    }
    let value = 0;
    for (let i = 0; i < arr1.length; i++) {
        value = map.get(arr1[i]);
        if (map.has(arr1[i])) {
            value++;
        }
        map.set(arr1[i], value);
    }
    let arrStr = []; //sorted char array
    for (let j of map.keys()) {
        let count = map.get(j);
        while (count > 0) {
            arrStr.push(j);
            count = count - 1;
        }
    }

    let arrNum = arr2.sort((a, b) => { // sorted number array
        return a - b;
    })

    let res = arrStr.concat(arrNum); //concatenate two sorted arrays
    return res;

}












module.exports = {
    average,
    modeSquared,
    medianElement,
    merge
};