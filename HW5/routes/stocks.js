const express = require("express");
const router = express.Router();
const data = require("../data");
const stocksData = data.stocks;

router.get('/', async(req, res) => {
    try {
        const getStocks = await stocksData.getStocks();
        res.json(getStocks);
    } catch (e) {
        console.log(e);
        res.status(500).send();
    }

})

router.get('/:id', async(req, res) => {
    try {
        const stocks = await stocksData.getStockById(req.params.id);
        res.json(stocks);
    } catch (e) {
        console.log(e);
        res.status(404).json({ message: 'Stocks not found' });
    }
});

module.exports = router;