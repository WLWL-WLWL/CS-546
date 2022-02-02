const mongoCollections = require("../config/mongoCollections");
const restaurants = mongoCollections.restaurants;
let { ObjectId } = require('mongodb');
const restaurantData = require('./restaurants');




async function create(restaurantId, title, reviewer, rating, dateOfReview, review) {
    //field exisit
    if (restaurantId === undefined || title === undefined || reviewer === undefined || rating === undefined || dateOfReview === undefined || review === undefined) throw "Field not exisit";
    // string type
    if (typeof restaurantId !== 'string' || typeof title !== 'string' || typeof reviewer !== 'string' || typeof dateOfReview !== 'string' || typeof reviewer !== 'string') throw "Field must be string";
    //restaurantId is not empty
    if (restaurantId === '' || title === '' || reviewer === '' || dateOfReview === '' || review === '') throw "Field cannot be empty";
    if (restaurantId.trim().length == 0 || title.trim().length == 0 || reviewer.trim().length == 0 || dateOfReview.trim().length == 0 || review.trim().length == 0) throw "Field cannot be empty string";
    //valid Obj Id
    if (!ObjectId.isValid(restaurantId)) throw "Restaurant Id is not valid ObjectId";
    // number 1-5
    if (typeof rating !== 'number') throw "Rating must be a number";
    if (rating < 0 || rating > 5) throw "Number must be between 0 and 5";
    // date string
    if (dateOfReview.length != 10) throw "Wrong date format";
    if (dateOfReview.charAt(2) != '/' || dateOfReview.charAt(5) != '/') throw "Wrong date format";
    let dateArr = dateOfReview.split('/');
    if (isNaN(dateArr[0]) || isNaN(dateArr[1]) || isNaN(dateArr[2])) throw "Not a date sting";
    // current date
    let date = new Date();
    let sep = "/";
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    if (month <= 9) {
        month = "0" + month;
    }
    if (day <= 9) {
        day = "0" + day;
    }
    let currentdate = month + sep + day + sep + year;
    // console.log(currentdate);
    if (dateOfReview !== currentdate) throw " Wrong date";


    const restaurantCollection = await restaurants();
    let parseId = ObjectId(restaurantId);
    //create a review
    let newReview = {
        _id: ObjectId(),
        title: title,
        reviewer: reviewer,
        rating: rating,
        dateOfReview: dateOfReview,
        review: review
    }

    const getRestaurant = await restaurantCollection.updateOne({ _id: parseId }, { $addToSet: { reviews: newReview } });
    if (getRestaurant.modifiedCount === 0) throw 'Could not update restaurant successfully';

    const rest = await restaurantData.get(restaurantId);
    let sum = 0;
    let num = 0;
    for (let i = 0; i < rest.reviews.length; i++) {
        sum = sum + rest.reviews[i].rating;
        num += 1;
    }
    let ave = sum / num;
    //update overallraing 
    const newOverallRating = await restaurantCollection.updateOne({ _id: parseId }, { $set: { overallRating: ave } });
    // if (newOverallRating.modifiedCount === 0) throw 'Could not update overallrating successfully';
    rest.overallRating = ave;
    for (let key of rest.reviews) {
        key._id = key._id.toString();
    }

    return rest;
}




async function getAll(restaurantId) {

    if (!restaurantId) throw "Must provide restaurant Id";
    restaurantData.checkId(restaurantId);
    let parsedId = ObjectId(restaurantId);
    const restaurantCollection = await restaurants();
    const restaurant = await restaurantCollection.findOne({ _id: parsedId });

    if (restaurant === null) {
        throw 'No restaurant with that id';
    }

    for (let key of restaurant.reviews) {
        key._id = key._id.toString();
    }

    let res = restaurant.reviews;

    return res;
}




async function get(reviewId) {

    if (!reviewId) throw "Must provide review Id";
    restaurantData.checkId(reviewId);

    let parsedId = ObjectId(reviewId);
    const restaurantCollection = await restaurants();

    const Resreview = await restaurantCollection.findOne({ reviews: { $elemMatch: { _id: parsedId } } });
    if (Resreview === null) {
        throw 'No restautant contains  that review id';
    }

    for (let key of Resreview.reviews) {
        if (key._id.equals(parsedId)) {
            key._id = reviewId
            return key;
        }
    }
}






async function remove(reviewId) {

    if (!reviewId) throw "Must provide review Id";
    restaurantData.checkId(reviewId);

    let parsedId = ObjectId(reviewId);
    const restaurantCollection = await restaurants();

    const Resreview = await restaurantCollection.findOne({ reviews: { $elemMatch: { _id: parsedId } } });
    if (Resreview === null) {
        throw 'No restautant contains  that review id';
    }

    let newReviews = [];
    for (let key of Resreview.reviews) {
        if (!(key._id.equals(parsedId))) {
            newReviews.push(key);
        }
    };
    //delete review and update
    const updatedRev = await restaurantCollection.updateOne({ _id: Resreview._id }, { $set: { reviews: newReviews } })

    // const updatedRev = await restaurantCollection.updateOne({ _id: Resreview._id }, { $pull: { reviews: { _id: parsedId } } })
    if (updatedRev.modifiedCount === 0) throw 'Could not update successfully';

    let sum = 0;
    let num = 0;
    let ave;
    for (let i = 0; i < newReviews.length; i++) {
        sum = sum + newReviews[i].rating;
        num += 1;
    }
    if (num == 0) {
        ave = 0;
    } else {
        ave = sum / num;
    }
    // update overallrating
    const newOverallRating = await restaurantCollection.updateOne({ _id: Resreview._id }, { $set: { overallRating: ave } });
    // if (newOverallRating.modifiedCount === 0) throw 'Could not update overallrating successfully';
    let res = `successfully deleted!`;

    return res;
}











module.exports = {
    create,
    getAll,
    get,
    remove

}