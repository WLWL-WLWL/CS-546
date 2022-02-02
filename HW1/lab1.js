const questionOne = function questionOne(arr) {
    // Implement question 1 here

    let result = {};
    if (arr == null || arr.length == 0) {
        return result;
    } else {
        for (let i = 0; i < arr.length; i++) {
            let isPrime = true;
            let num = Math.abs(Math.pow(arr[i], 2) - 7);
            if (num < 2) {
                isPrime = false;
            }
            if (num == 2) {
                isPrime = true;
            }
            if (num % 2 === 0 && num != 2) {
                isPrime = false;
            }
            for (let j = 3; j <= Math.sqrt(num); j = j + 2) {
                if (num % j === 0) {
                    isPrime = false;
                    break;
                }
            }
            result[num] = isPrime;
        }
        return result;
    }

}


const questionTwo = function questionTwo(arr) {
    // Implement question 2 here
    let resSet = new Set();
    for (let i = 0; i < arr.length; i++) {
        if (resSet.has(arr[i]) == false) {
            resSet.add(arr[i]);
        }
    }
    let resArr = Array.from(resSet);
    return resArr;

}




const questionThree = function questionThree(arr) {
    // Implement question 3 here
    let result = {};
    if (arr.length == 0) {
        return result;
    }

    let set = new Set();
    for (let i = 0; i < arr.length; i++) {
        if (set.has(arr[i]) == false) {
            set.add(arr[i]);
        }
    }
    let noDupArr = Array.from(set);
    let map = new Map();
    for (let i of noDupArr) {
        let key = i.split('').sort().join('');
        let valueArr;
        if (map.has(key)) {
            valueArr = map.get(key);
        } else {
            valueArr = new Array();
        }
        valueArr.push(i);
        map.set(key, valueArr);
    }
    for (let k of map.keys()) {
        let length = map.get(k).length;
        if (length == 1) {
            map.delete(k);
        }
    }
    result = Object.fromEntries(map.entries());
    return result;
}



const questionFour = function questionFour(num1, num2, num3) {
    // Implement question 4 here
    let numFac1 = factorials(num1);
    let numFac2 = factorials(num2);
    let numFac3 = factorials(num3);

    let ave = (num1 + num2 + num3) / 3;
    let res = (numFac1 + numFac2 + numFac3) / ave;
    return Math.floor(res);

}

const factorials = (num) => {
    if (num > 0) {
        res = num * factorials(num - 1);
        return res;
    } else {
        return 1;
    }
}




module.exports = {
    firstName: "WEILI",
    lastName: "LIU",
    studentId: "10471020",
    questionOne,
    questionTwo,
    questionThree,
    questionFour
};