const axios = require("axios");

const md5 = require('blueimp-md5');
const publickey = '10a54e7090556fa7ba7583e19d0454ce';
const privatekey = 'de957cbf8cd61b914bb666603e92d64ed3f10e76';
const ts = new Date().getTime();
const stringToHash = ts + privatekey + publickey;
const hash = md5(stringToHash);
const baseUrl = 'https://gateway.marvel.com:443/v1/public/characters';
const url = baseUrl + '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;

let exportedMethods = {
    async getCharactersBySearchTerm(searchTerm) {
        const { data } = await axios.get("https://gateway.marvel.com/v1/public/characters?nameStartsWith=" + searchTerm + "&ts=" + ts + "&apikey=" + publickey + "&hash=" + hash);
        //console.log(data)
        if (!data) throw `${searchTerm} is not found!`;
        return data;
    },
};

module.exports = exportedMethods;