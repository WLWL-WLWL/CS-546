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




module.exports = {
    getPeople,
    getPersonById,
};