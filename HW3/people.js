const axios = require('axios');

async function getPeople() {
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json');
    return data // this will be the array of people objects
}

function stringCheck(string) {
    if (string === undefined) throw " Not exisit";
    if (!(typeof(string) === 'string')) throw "Not a string";
    if (string.length == 0 || string.trim().length == 0) throw "String is empty";
}

function stringToArray(string) {
    let res = [];
    if (string && typeof string === 'string') {
        for (let i = 0; i < string.length; i++) {
            res.push(string[i]);
        }
    }
    return res;
};


function trimLeftZero(string) {
    if (string && typeof string === 'string') {
        let position = 0;
        for (let i = 0; i < string.length; i++) {
            if (string[i] !== '0') {
                position = i;
                break;
            }
        }
        if (position < string.length) {
            return string.substring(position, string.length);
        }
    }
    return null;
}


function checkNum(num) {
    if (num === undefined) throw " Not exisit";
    if (isNaN(num)) throw "Not a number";
    if (typeof(num) === 'string' && (num.length == 0 || num.trim().length == 0)) throw "Cannot be empty"
}




async function getPersonById(id) {
    stringCheck(id);

    const people = await getPeople();
    let res = null;
    if (people && people.length > 0) {
        res = people.find(p => p.id === id);
    }
    if (!res) throw "Person not found!";
    return res;
}


async function sameStreet(streetName, streetSuffix) {
    stringCheck(streetName);
    stringCheck(streetSuffix);

    const people = await getPeople();
    let res = [];
    for (let obj of people) {
        let ahn = obj.address.home.street_name;
        let ahs = obj.address.home.street_suffix;
        let awn = obj.address.work.street_name;
        let aws = obj.address.work.street_suffix;
        if ((ahn.toUpperCase() == streetName.toUpperCase() && ahs.toUpperCase() == streetSuffix.toUpperCase()) ||
            (awn.toUpperCase() == streetName.toUpperCase() && aws.toUpperCase() == streetSuffix.toUpperCase())
        ) {
            res.push(obj);
        }
    }
    if (res.length > 1) {
        return res;
    } else throw "No more than 2 people"
}



async function manipulateSsn(...args) {
    if (args.length > 0) throw "No parameter should be passed in";
    const people = await getPeople();
    let newPerson = people.map(p => {
        let ssn = p.ssn;
        ssn = ssn.replace(/-/g, '');
        ssn = stringToArray(ssn).sort().join('');
        ssn = trimLeftZero(ssn);
        p.ssn = parseInt(ssn);
        return p;
    });
    let min = newPerson[0];
    let max = newPerson[0];
    let sum = 0;
    for (let i = 0; i < newPerson.length; ++i) {
        let currentP = newPerson[i];
        if (min.ssn > currentP.ssn) {
            min = currentP;
        }
        if (max < currentP.ssn) {
            max = currentP;
        }
        sum += currentP.ssn;
    }
    let ave = sum / newPerson.length;
    let res = {
        highest: {
            firstName: max.first_name,
            lastName: max.last_name
        },
        lowest: {
            firstName: min.first_name,
            lastName: min.last_name
        },
        average: ave
    };
    return res;
}



async function sameBirthday(month, day) {
    checkNum(month);
    checkNum(day);
    try {
        month = parseInt(month);
    } catch {
        throw "Invalid month number";
    }
    try {
        day = parseInt(day);
    } catch {
        throw "Invalid day number";
    }
    if (month > 12 || month < 01) throw " Invalid month";
    if ((month == 4 || month == 6 || month == 9 || month == 11) && day > 30) throw "Invalid day"
    if ((month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) && day > 31) throw "Invalid day"
    if ((month == 02) && (day > 28)) throw "Invalid day"

    const people = await getPeople();
    let person = [];
    for (let obj of people) {
        let str = obj["date_of_birth"].split('/');
        let m = parseInt(str[0]);
        let d = parseInt(str[1]);
        if (month == m && day == d) {
            person.push(obj);
        }
    }
    if (!person) throw "No people with that birthday ";
    let res = [];
    for (let obj of person) {
        res.push([obj.first_name, obj.last_name].join(' '));
    }
    return res;
}







module.exports = {
    getPeople,
    stringCheck,
    getPersonById,
    sameStreet,
    manipulateSsn,
    sameBirthday

};