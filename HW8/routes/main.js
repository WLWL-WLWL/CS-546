const express = require('express');
const router = express.Router();

router.get('/', async(req, res) => {
    res.render('posts/index', { title: "Character Finder" });
});

module.exports = router;