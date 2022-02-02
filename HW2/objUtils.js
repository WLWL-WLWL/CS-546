function checkArray(array) {
    if (array === undefined) {
        throw "Array is undefined";
    }
    if (array instanceof Array == false) {
        throw "Not an array";
    }
    if (array.length == 0) {
        throw "Array can not be empty";
    }
    for (let i = 0; i < array.length; i++) {
        if (!(array[i] instanceof Object)) throw "Not an Object"
        if (Object.entries(array[i]).length == 0) throw "Object can not be empty"

        for (let obj in array[i]) {
            if (typeof(array[i][obj]) !== 'number') throw "Value must be a number"
        }

    }
}


function checkObject(object) {
    return object instanceof Object;
}

function checkFunction(func) {
    if (typeof(func) !== 'function') throw "Not a function"
}


function computeObjects(array, func) {
    checkArray(array);
    checkFunction(func);

    let map = new Map();
    for (let i = 0; i < array.length; i++) {
        let valueArr;
        let obj = array[i];
        for (let j in obj) {
            if (map.has(j)) {
                valueArr = map.get(j);
            } else {
                valueArr = new Array();
            }
            valueArr.push(obj[j]);
            map.set(j, valueArr);
        }
    }
    let vArr;
    for (let key of map.keys()) {
        vArr = map.get(key);
        let sum = 0;
        for (let j = 0; j < vArr.length; j++) {
            sum = sum + func(vArr[j]);
        }
        map.set(key, sum);
    }
    let res = Object.fromEntries(map.entries());
    return res;
}


function commonKeys(obj1, obj2) {
    if (!(obj1 instanceof Object) || !(obj2 instanceof Object)) throw "Not an Object"
    let res = {};
    for (let key in obj1) {
        if (key in obj2) {
            if (!(obj1[key] instanceof Object) && !(obj2[key] instanceof Object)) {
                if (obj1[key] == obj2[key]) {
                    res[key] = obj1[key];
                }
            }
            if (obj1[key] instanceof Object && obj2[key] instanceof Object) {
                let k1 = obj1[key];
                let k2 = obj2[key];
                for (let j in k1) {
                    if (j in k2 && k1[j] == k2[j]) {
                        res[key] = obj1[key];
                    }
                }
            }
        }
    }
    return res;
}


function flipObject(object) {
    if (!(checkObject(object))) throw " Not an object"
    let result = {};
    for (let key in object) {
        if (object[key] instanceof Array) {
            if (object[key].length == 0) throw " Array can not be empty"
            for (let i = 0; i < object[key].length; i++) {
                result[object[key][i]] = key;
            }
        } else if (checkObject(object[key])) {
            if (Object.entries(object[key]).length < 1) throw " Object must has at least one key/value"
            result[key] = flipObject(object[key]);
        } else {
            result[object[key]] = key;
        }
    }
    return result;
}





module.exports = {
    computeObjects,
    commonKeys,
    flipObject
};