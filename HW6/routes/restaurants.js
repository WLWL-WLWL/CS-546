const express = require('express');
const router = express.Router();
const data = require('../data');
const restaurantsData = data.restaurants;

router.get('/', async(req, res) => {
    try {
        const getRestaurant = await restaurantsData.getAll();
        let arr = [];
        for (let key of getRestaurant) {
            let obj = {};
            obj._id = key._id.toString();
            obj.name = key.name;
            arr.push(obj);
        }
        res.json(arr);
    } catch (e) {
        console.log({ error: e });
        res.status(500).send();
    }

})

router.get('/:id', async(req, res) => {
    try {
        const restaurant = await restaurantsData.get(req.params.id);
        res.json(restaurant);
    } catch (e) {
        res.status(404).json({ message: 'Restaurant not found' });
    }
});



router.post('/', async(req, res) => {
    const postRes = req.body;
    if (!postRes.name) {
        res.status(400).json({ error: 'You must provide restaurant name' });
    }
    if (!postRes.location) {
        res.status(400).json({ error: 'You must provide restaurant location' });
    }
    if (!postRes.phoneNumber) {
        res.status(400).json({ error: 'You must provide restaurant phoneNumber' });
    }
    if (!postRes.website) {
        res.status(400).json({ error: 'You must provide restaurant website' });
    }
    if (!postRes.priceRange) {
        res.status(400).json({ error: 'You must provide restaurant priceRange' });
    }
    if (!postRes.cuisines) {
        res.status(400).json({ error: 'You must provide restaurant cuisines' });
    }
    if (!postRes.serviceOptions) {
        res.status(400).json({ error: 'You must provide restaurant serviceOptions' });
    }

    if (typeof postRes.name !== 'string' || typeof postRes.location !== 'string' || typeof postRes.phoneNumber !== 'string' || typeof postRes.website !== 'string' || typeof postRes.priceRange !== 'string') {
        res.status(400).json({ error: 'Field must be string' });
    }

    if (postRes.name === '' || postRes.location === '' || postRes.phoneNumber === '' || postRes.website === '' || postRes.priceRange === '') {
        res.status(400).json({ error: 'Field cannot be empty' });
    }
    if (postRes.name.trim().length == 0 || postRes.location.trim().length == 0 || postRes.phoneNumber.trim().length == 0 || postRes.website.trim().length == 0 || postRes.priceRange.trim().length == 0) {
        res.status(400).json({ error: 'Filed cannot be empty string' });
    }

    if (postRes.phoneNumber.length != 12 || postRes.phoneNumber.split('-').length != 3) {
        res.status(400).json({ error: 'Invalid phone number' });
    }
    let arr = postRes.phoneNumber.split('-');
    for (let i = 0; i < arr.length; i++) {
        if (i == 0 && arr[i].length != 3) { res.status(400).json({ error: 'Invalid phone number' }); }
        if (i == 1 && arr[i].length != 3) { res.status(400).json({ error: 'Invalid phone number' }); }
        if (i == 2 && arr[i].length != 4) { res.status(400).json({ error: 'Invalid phone number' }); }
    }
    if (postRes.website.toLowerCase().startsWith("http://www.") == false || postRes.website.toLowerCase().endsWith(".com") == false || postRes.website.length < 20) {
        res.status(400).json({ error: 'Invalid website format' });
    }
    if (postRes.priceRange.length < 1 || postRes.priceRange.length > 4) {
        res.status(400).json({ error: 'Invalid price range' });
    }
    for (let i = 0; i < postRes.priceRange.length; i++) {
        if (postRes.priceRange.charAt(i) != '$') {
            res.status(400).json({ error: 'Must be $ in price range' });
        }
    }
    if (postRes.cuisines instanceof Array == false) {
        res.status(400).json({ error: 'Cuisines is not arraye' });
    }
    if (postRes.cuisines.length < 1) {
        res.status(400).json({ error: 'Empty cuisines array' });
    }
    for (let i of postRes.cuisines) {
        if (typeof i !== 'string') {
            res.status(400).json({ error: 'Must be  string in cuisines array' });
        }

        if (i.length == 0 || i.trim().length == 0) {
            res.status(400).json({ error: 'Strings in cuisines array cannot be empty' });
        }

    }
    if (postRes.serviceOptions instanceof Object == false) {
        res.status(400).json({ error: 'Service option is not object' });
    }
    if (postRes.serviceOptions.dineIn === undefined || postRes.serviceOptions.takeOut === undefined || postRes.serviceOptions.delivery === undefined) {
        res.status(400).json({ error: 'Service option is undefined' });
    }
    if (typeof postRes.serviceOptions.dineIn !== 'boolean' || typeof postRes.serviceOptions.takeOut !== 'boolean' || typeof postRes.serviceOptions.delivery !== 'boolean') {
        res.status(400).json({ error: 'Options must be boolean' });
    }


    try {
        const { name, location, phoneNumber, website, priceRange, cuisines, serviceOptions } = postRes;
        const restaurant = await restaurantsData.create(name, location, phoneNumber, website, priceRange, cuisines, serviceOptions);
        res.json(restaurant);
    } catch (e) {
        res.status(400).json({ error: e });
    }
});






router.put('/:id', async(req, res) => {

    const updatedData = req.body;
    if (!updatedData) {
        res.status(400).json({ error: 'You must provide data of restaurant' });
        return;
    }

    if (!updatedData.name) {
        res.status(400).json({ error: 'You must provide restaurant name' });
    }
    if (!updatedData.location) {
        res.status(400).json({ error: 'You must provide restaurant location' });
    }
    if (!updatedData.phoneNumber) {
        res.status(400).json({ error: 'You must provide restaurant phoneNumber' });
    }
    if (!updatedData.website) {
        res.status(400).json({ error: 'You must provide restaurant website' });
    }
    if (!updatedData.priceRange) {
        res.status(400).json({ error: 'You must provide restaurant priceRange' });
    }
    if (!updatedData.cuisines) {
        res.status(400).json({ error: 'You must provide restaurant cuisines' });
    }
    if (!updatedData.serviceOptions) {
        res.status(400).json({ error: 'You must provide restaurant serviceOptions' });
    }
    if (typeof updatedData.name !== 'string' || typeof updatedData.location !== 'string' || typeof updatedData.phoneNumber !== 'string' || typeof updatedData.website !== 'string' || typeof updatedData.priceRange !== 'string') {
        res.status(400).json({ error: 'Field must be string' });
    }

    if (updatedData.name === '' || updatedData.location === '' || updatedData.phoneNumber === '' || updatedData.website === '' || updatedData.priceRange === '') {
        res.status(400).json({ error: 'Field cannot be empty' });
    }
    if (updatedData.name.trim().length == 0 || updatedData.location.trim().length == 0 || updatedData.phoneNumber.trim().length == 0 || updatedData.website.trim().length == 0 || updatedData.priceRange.trim().length == 0) {
        res.status(400).json({ error: 'Filed cannot be empty string' });
    }

    if (updatedData.phoneNumber.length != 12 || updatedData.phoneNumber.split('-').length != 3) {
        res.status(400).json({ error: 'Invalid phone number' });
    }
    let arr = updatedData.phoneNumber.split('-');
    for (let i = 0; i < arr.length; i++) {
        if (i == 0 && arr[i].length != 3) { res.status(400).json({ error: 'Invalid phone number' }); }
        if (i == 1 && arr[i].length != 3) { res.status(400).json({ error: 'Invalid phone number' }); }
        if (i == 2 && arr[i].length != 4) { res.status(400).json({ error: 'Invalid phone number' }); }
    }
    if (updatedData.website.toLowerCase().startsWith("http://www.") == false || updatedData.website.toLowerCase().endsWith(".com") == false || updatedData.website.length < 20) {
        res.status(400).json({ error: 'Invalid website format' });
    }
    if (updatedData.priceRange.length < 1 || updatedData.priceRange.length > 4) {
        res.status(400).json({ error: 'Invalid price range' });
    }
    for (let i = 0; i < updatedData.priceRange.length; i++) {
        if (updatedData.priceRange.charAt(i) != '$') {
            res.status(400).json({ error: 'Must be $ in price range' });
        }
    }
    if (updatedData.cuisines instanceof Array == false) {
        res.status(400).json({ error: 'Cuisines is not arraye' });
    }
    if (updatedData.cuisines.length < 1) {
        res.status(400).json({ error: 'Empty cuisines array' });
    }
    for (let i of updatedData.cuisines) {
        if (typeof i !== 'string') {
            res.status(400).json({ error: 'Must be  string in cuisines array' });
        }

        if (i.length == 0 || i.trim().length == 0) {
            res.status(400).json({ error: 'Strings in cuisines array cannot be empty' });
        }

    }
    if (updatedData.serviceOptions instanceof Object == false) {
        res.status(400).json({ error: 'Service option is not object' });
    }
    if (updatedData.serviceOptions.dineIn === undefined || updatedData.serviceOptions.takeOut === undefined || updatedData.serviceOptions.delivery === undefined) {
        res.status(400).json({ error: 'Service option is undefined' });
    }
    if (typeof updatedData.serviceOptions.dineIn !== 'boolean' || typeof updatedData.serviceOptions.takeOut !== 'boolean' || typeof updatedData.serviceOptions.delivery !== 'boolean') {
        res.status(400).json({ error: 'Options must be boolean' });
    }

    try {
        await restaurantsData.get(req.params.id);
    } catch (e) {
        res.status(404).json({ error: e });
        return;
    }

    try {
        const { name, location, phoneNumber, website, priceRange, cuisines, serviceOptions } = updatedData;
        const updatedRes = await restaurantsData.update(req.params.id, name, location, phoneNumber, website, priceRange, cuisines, serviceOptions);
        res.json(updatedRes);
    } catch (e) {
        res.status(400).json({ error: e });
    }
});


router.delete('/:id', async(req, res) => {
    if (!req.params.id) {
        res.status(404).json({ error: 'Id must be specified' });
        return;
    }

    try {
        await restaurantsData.get(req.params.id);
    } catch (e) {
        res.status(404).json({ error: 'No reataurant with this Id' });
        return;
    }

    try {
        await restaurantsData.remove(req.params.id);
        res.status(200).json({ "restaurantId": req.params.id, "deleted": true });
    } catch (e) {
        res.sendStatus(404);
    }

});


module.exports = router;