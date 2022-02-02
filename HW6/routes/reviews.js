const express = require('express');
const router = express.Router();
const data = require('../data');
const restaurantsData = data.restaurants;
const reviewData = data.reviews;

router.get('/:id', async(req, res) => {
    try {
        const getReview = await reviewData.getAll(req.params.id);
        if (getReview.length == 0) {
            res.status(404).json({ message: 'Restaurant has no reviews' });
        } else {
            res.status(200).json(getReview);
        }
    } catch (e) {
        res.status(404).json({ message: 'No restaurant with that id' });
    }


})

router.post('/:id', async(req, res) => {
    const postReview = req.body;
    const resId = req.params.id;
    if (!postReview) {
        res.status(400).json({ message: 'Must provide fields of review' })
    }
    if (!postReview.title) {
        res.status(400).json({ message: 'Must provide title' })
    }
    if (!postReview.reviewer) {
        res.status(400).json({ message: 'Must provide reviewer' })
    }
    if (!postReview.rating) {
        res.status(400).json({ message: 'Must provide rating' })
    }
    if (!postReview.dateOfReview) {
        res.status(400).json({ message: 'Must provide dateOfReview' })
    }
    if (!postReview.review) {
        res.status(400).json({ message: 'Must provide review' })
    }
    try {
        const res = await restaurantsData.get(req.params.id);
    } catch (e) {
        res.status(400).json({ message: 'No restaurant with that id' });
    }
    try {
        const { title, reviewer, rating, dateOfReview, review } = postReview;
        const newRev = await reviewData.create(resId, title, reviewer, rating, dateOfReview, review)
        res.status(200).json(newRev);

    } catch (e) {
        res.status(400).json({ message: e });
    }

});



router.get('/review/:id', async(req, res) => {
    if (!req.params.id) {
        res.status(404).json({ message: 'Must provide review id' })
    }
    try {
        const getReviewByReviewId = await reviewData.get(req.params.id);
        res.status(200).json(getReviewByReviewId);
    } catch (e) {
        res.status(404).json({ message: 'No review with that id' });
    }
})


router.delete('/review/:id', async(req, res) => {
    if (!req.params.id) {
        res.status(404).json({ message: 'Must provide review id' })
    }

    try {
        const getReviewByReviewId = await reviewData.get(req.params.id);
    } catch (e) {
        res.status(404).json({ message: e });
    }

    try {
        const removeReview = await reviewData.remove(req.params.id);
        res.status(200).json({ "reviewId": req.params.id, "deleted": true });
    } catch (e) {
        res.status(404).json({ message: e });
    }
})















module.exports = router;