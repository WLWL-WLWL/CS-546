const express = require('express');
const router = express.Router();
const data = require('../data');
const searchData = data.search;

router.post('/', async(req, res) => {
    const reqData = req.body;
    //console.log(reqData)
    if (!reqData.searchTerm || reqData.searchTerm.trim() == "") {
        res.status(400).render('posts/error', { message: 'Input can not be empty', title: "Error", status: 400 });
    }

    try {
        var charactersData = await searchData.getCharactersBySearchTerm(reqData.searchTerm);
        let resArr = charactersData.data.results
        if (resArr.length > 20) {
            resArr = resArr.slice(0, 20);
        }
        res.render('posts/search', { characters: resArr, searchTerm: reqData.searchTerm, title: "Characters Found" });
    } catch (e) {
        res.status(500).send();
    }
});

module.exports = router;