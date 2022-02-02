const axios = require("axios");


async function getStocks() {
    const { data } = await axios.get("https://gist.githubusercontent.com/graffixnyc/8c363d85e61863ac044097c0d199dbcc/raw/7d79752a9342ac97e4953bce23db0388a39642bf/stocks.json");
    return data;
}


function stringCheck(string) {
    if (string === undefined) throw " Not exisit";
    if (!(typeof(string) === 'string')) throw "Not a string";
    if (string.length == 0 || string.trim().length == 0) throw "String is empty";
}


async function getStockById(stockId) {
    stringCheck(stockId)
    const stocks = await getStocks();
    const stock = stocks.find(s => s.id === stockId);
    if (!stock) throw "stock not found"

    return stock;
};

module.exports = {
    getStocks,
    getStockById
};