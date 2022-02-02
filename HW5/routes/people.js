const express = require('express');
const router = express.Router();
const data = require('../data');
const peopeleData = data.people;

router.get('/', async(req, res) => {
    try {
        const getPeople = await peopeleData.getPeople();
        res.json(getPeople);
    } catch (e) {
        console.log(e);
        res.status(500).send();
    }

})

router.get('/:id', async(req, res) => {
    try {
        const people = await peopeleData.getPersonById(req.params.id);
        res.json(people);
    } catch (e) {
        console.log(e);
        res.status(404).json({ message: 'People not found' });
    }
});

module.exports = router;