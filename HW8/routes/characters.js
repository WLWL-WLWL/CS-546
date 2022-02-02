const express = require('express');
const router = express.Router();
const data = require('../data');
const charactersData = data.characters;


// router.get('/', async(req, res) => {
//     try {
//         const characters = await charactersData.getCharacters();
//         res.json(characters);
//         console.log(characters)
//     } catch (e) {
//         res.status(404)
//     }
// });


router.get('/:id', async(req, res) => {
    try {
        const characters = await charactersData.getCharactersById(req.params.id);
        let resArr = characters.data.results;
        //console.log(resArr)
        let key = resArr[0]
            //console.log(typeof key.comics.available)
        if (key.comics.available !== 0) {
            res.render('posts/single', { characters: key, title: key.name });
        } else {
            throw new Error();
        }
    } catch (e) {
        res.status(404).render('posts/error', { message: 'No characters with given Id', status: '404', title: "Error" });
    }
});

module.exports = router;