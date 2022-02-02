const express = require('express');
const router = express.Router();

router.get('/', async(req, res) => {
    if (req.session.user) {
        res.render('form/private', { username: req.session.user });
    } else {
        res.render('form/login');
    }
});

module.exports = router;