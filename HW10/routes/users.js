const express = require('express');
const router = express.Router();
const data = require('../data');
const usersData = data.users;

router.get('/', async(req, res) => {
    if (req.session.user) {
        res.redirect('/private');
    } else {
        res.render('form/login');
    }
});


router.get('/signup', async(req, res) => {
    if (req.session.user) {
        res.redirect('/private');
    } else {
        res.render('form/signup');
    }
})

router.post('/signup', async(req, res) => {
    const { username, password } = req.body;
    if (!username) {
        res.status(400).render('form/signup', { status: 400, errorMessage: "Username must be provided!" });
    }
    if (!password) {
        res.status(400).render('form/signup', { status: 400, errorMessage: "Password must be provided!" });
    }
    try {
        checkUserName = usersData.checkUserName(username);
    } catch (e) {
        res.status(400).render('form/signup', { status: 400, errorMessage: e });
    }

    try {
        checkPassword = usersData.checkPassword(password);
    } catch (e) {
        res.status(400).render('form/signup', { status: 400, errorMessage: e });
    }

    try {
        const createUser = await usersData.createUser(username, password);
        if (createUser === '{userInserted: true}') {
            res.redirect('/');
        } else {
            res.status(500).json({ message: "Internal Server Error" });
        }
    } catch (e) {
        res.status(400).render('form/signup', { status: 400, errorMessage: e });
    }
})




router.post('/login', async(req, res) => {
    const { username, password } = req.body;
    if (!username) {
        res.status(400).render('form/login', { status: 400, errorMessage: "Username must be provided!" });
    }
    if (!password) {
        res.status(400).render('form/login', { status: 400, errorMessage: "Password must be provided!" });
    }

    try {
        checkUserName = usersData.checkUserName(username);
    } catch (e) {
        res.status(400).render('form/login', { status: 400, errorMessage: e });
    }

    try {
        checkPassword = usersData.checkPassword(password);
    } catch (e) {
        res.status(400).render('form/login', { status: 400, errorMessage: e });
    }

    try {
        const checkUser = await usersData.checkUser(username, password);
        if (checkUser === '{authenticated: true}') {
            req.session.user = username;
            res.redirect('/private');
        }
    } catch (e) {
        res.status(400).render('form/login', { status: 400, errorMessage: e });
    }

});

router.get('/logout', async(req, res) => {
    req.session.destroy();
    res.render('form/logout');

});





module.exports = router;