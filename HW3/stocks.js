const axios = require("axios");
const { getPersonById, getPeople, stringCheck } = require("./people");

async function getStocks() {
    const { data } = await axios.get("https://gist.githubusercontent.com/graffixnyc/8c363d85e61863ac044097c0d199dbcc/raw/7d79752a9342ac97e4953bce23db0388a39642bf/stocks.json");
    return data;
}


async function listShareholders(...args) {
    if (args.length > 0) throw "No parameter should be passed in";

    const stocks = await getStocks();
    let res = [];
    if (stocks && stocks.length > 0) {
        const people = await getPeople();
        for (let stock of stocks) {
            let item = {};
            item['id'] = stock.id;
            item['stock_name'] = stock.stock_name;

            if (stock.shareholders && stock.shareholders.length > 0) {
                let newShareHolders = [];
                for (let s of stock.shareholders) {
                    let p = people.find(element => element.id === s.userId)
                    if (p) {
                        let obj = {
                            first_name: p.first_name,
                            last_name: p.last_name,
                            number_of_shares: s.number_of_shares
                        }
                        newShareHolders.push(obj);
                    }
                }
                item['shareholders'] = newShareHolders;
            } else {
                item['shareholders'] = [];
            }
            res.push(item);
        }
    }
    return res;
}


async function topShareholder(stockName) {
    stringCheck(stockName);

    const stocks = await getStocks();
    const hasStock = stocks.find(stock => stock.stock_name === stockName);
    let res = null;
    if (hasStock) {
        let shareholders = hasStock.shareholders;
        shareholders.sort((a, b) => -1 * (a.number_of_shares - b.number_of_shares));
        let mostStocks = shareholders[0];
        const person = await getPersonById(mostStocks.userId);
        res = `With ${mostStocks.number_of_shares} in ${hasStock.stock_name}, ${person.first_name} ${person.last_name} is the top shareholder.`;
    } else {
        throw "stock name cannot be found";
    }
    return res;
}


async function listStocks(firstName, lastName) {
    stringCheck(firstName);
    stringCheck(lastName);
    const stocks = await getStocks();
    const people = await getPeople();

    let hasPerson = false;
    let p = {};

    for (let obj of people) {
        if (obj.first_name === firstName && obj.last_name === lastName) {
            hasPerson = true;
            p = obj;
        }
    }
    let res = [];
    if (hasPerson) {
        for (let s of stocks) {
            for (let sh of s.shareholders) {
                if (sh.userId === p.id) {
                    let name = {
                        stock_name: s.stock_name,
                        number_of_shares: sh.number_of_shares
                    }
                    res.push(name);
                }
            }
        }
    } else throw "person not exisit"
    if (res.length < 1) throw "No stocks owned"
    return res;
}



async function getStockById(stockId) {
    stringCheck(stockId)

    const stocks = await getStocks();
    const stock = stocks.find(s => s.id === stockId);
    if (!stock) throw "stock not found"

    return stock;
};





module.exports = {
    listShareholders,
    topShareholder,
    listStocks,
    getStockById

};