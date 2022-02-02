const mongoCollections = require("../config/mongoCollections");
const restaurants = mongoCollections.restaurants;
let { ObjectId } = require('mongodb');



function checkId(id) {
    if (id === undefined) throw "Id must be provided";
    if (typeof id !== 'string') throw "Id must be string";
    if (id.length == 0 || id.trim().length == 0) throw "Id cannot be empty";
    if (!ObjectId.isValid(id)) throw "Id is not valid ObjectId";
}



async function getRestaurantById(id) {
    if (!id) throw 'You must provide an id to search for';
    const restaurantCollection = await restaurants();
    const restaurant = await restaurantCollection.findOne({ _id: id });
    if (restaurant === null) throw 'No restaurant with that id';
    restaurant._id = restaurant._id.toString();
    return restaurant;
}




async function create(name, location, phoneNumber, website, priceRange, cuisines, serviceOptions) {
    if (name === undefined || location === undefined || phoneNumber === undefined || website === undefined || priceRange === undefined || cuisines === undefined ||
        serviceOptions === undefined) throw "Field not exisit";
    if (typeof name !== 'string' || typeof location !== 'string' || typeof phoneNumber !== 'string' || typeof website !== 'string' || typeof priceRange !== 'string') throw "Field must be string";
    if (name === '' || location === '' || phoneNumber === '' || website === '' || priceRange === '') throw "Field cannot be empty";
    if (name.trim().length == 0 || location.trim().length == 0 || phoneNumber.trim().length == 0 || website.trim().length == 0 || priceRange.trim().length == 0) throw "Filed cannot be empty string";

    if (phoneNumber.length != 12 || phoneNumber.split('-').length != 3) throw "Invalid phone number";
    let arr = phoneNumber.split('-');
    for (let i = 0; i < arr.length; i++) {
        if (i == 0 && arr[i].length != 3) throw "Invalid phone number";
        if (i == 1 && arr[i].length != 3) throw "Invalid phone number";
        if (i == 2 && arr[i].length != 4) throw "Invalid phone number";
    }
    if (website.toLowerCase().startsWith("http://www.") == false || website.toLowerCase().endsWith(".com") == false || website.length < 20) throw "Invalid website format";
    if (priceRange.length < 1 || priceRange.length > 4) throw "Invalid price range";
    for (let i = 0; i < priceRange.length; i++) {
        if (priceRange.charAt(i) != '$') throw "Must be $ in price range";
    }
    if (cuisines instanceof Array == false) throw "Cuisines is not array";
    if (cuisines.length < 1) throw "Empty array";
    for (let i of cuisines) {
        if (typeof i !== 'string') throw "Must be  string in array";
        if (i.length == 0 || i.trim().length == 0) throw "Strings in array cannot be empty";
    }
    // if (typeof overallRating !== 'number') throw "Overall rating must be a number";
    // if (overallRating < 0 || overallRating > 5) throw "Number must be between 0 and 5";
    if (serviceOptions instanceof Object == false) throw "Service option is not object ";
    if (typeof serviceOptions.dineIn !== 'boolean' || typeof serviceOptions.takeOut !== 'boolean' || typeof serviceOptions.delivery !== 'boolean') throw "Options must be boolean";

    const restaurantCollection = await restaurants();
    let newRes = {
        name: name,
        location: location,
        phoneNumber: phoneNumber,
        website: website,
        priceRange: priceRange,
        cuisines: cuisines,
        overallRating: 0,
        serviceOptions: serviceOptions,
        reviews: []
    };

    const insertRes = await restaurantCollection.insertOne(newRes);
    if (insertRes.insertedCount === 0) throw 'Could not add restaurant';
    const newId = insertRes.insertedId;
    const res = await this.getRestaurantById(newId);
    return res;
}



async function getAll() {
    const restaurantCollection = await restaurants();
    const resList = await restaurantCollection.find({}).toArray();

    for (let i of resList) {
        i._id = i._id.toString();
    }
    return resList;
}


async function get(id) {
    checkId(id);

    let parsedId = ObjectId(id);
    const restaurantCollection = await restaurants();
    const restaurant = await restaurantCollection.findOne({ _id: parsedId });

    if (restaurant === null) {
        throw 'No restaurant with that id';
    }
    restaurant._id = restaurant._id.toString();
    return restaurant;
}


async function remove(id) {
    checkId(id);

    let parseId = ObjectId(id);
    const restaurantCollection = await restaurants();
    const restaurant = await this.getRestaurantById(parseId);
    const deletRes = await restaurantCollection.deleteOne({ _id: parseId })

    if (deletRes.deletedCount === 0) throw `Could not delete restaurant with id of ${id}`;
    let res = `{userInserted: true}`;

    return res;

}



async function update(id, name, location, phoneNumber, website, priceRange, cuisines, serviceOptions) {
    checkId(id);
    if (name === undefined || location === undefined || phoneNumber === undefined || website === undefined || priceRange === undefined || cuisines === undefined ||
        serviceOptions === undefined) throw "Field not exisit";
    if (typeof name !== 'string' || typeof location !== 'string' || typeof phoneNumber !== 'string' || typeof website !== 'string' || typeof priceRange !== 'string') throw "Field must be string";
    if (name === '' || location === '' || phoneNumber === '' || website === '' || priceRange === '') throw "Field cannot be empty";
    if (name.trim().length == 0 || location.trim().length == 0 || phoneNumber.trim().length == 0 || website.trim().length == 0 || priceRange.trim().length == 0) throw "Filed cannot be empty string";

    if (phoneNumber.length != 12 || phoneNumber.split('-').length != 3) throw "Invalid phone number";
    let arr = phoneNumber.split('-');
    for (let i = 0; i < arr.length; i++) {
        if (i == 0 && arr[i].length != 3) throw "Invalid phone number";
        if (i == 1 && arr[i].length != 3) throw "Invalid phone number";
        if (i == 2 && arr[i].length != 4) throw "Invalid phone number";
    }
    if (website.toLowerCase().startsWith("http://www.") == false || website.toLowerCase().endsWith(".com") == false || website.length < 20) throw "Invalid website format";
    if (priceRange.length < 1 || priceRange.length > 4) throw "Invalid price range";
    for (let i = 0; i < priceRange.length; i++) {
        if (priceRange.charAt(i) != '$') throw "Must be $ in price range";
    }
    if (cuisines instanceof Array == false) throw "Cuisines is not array";
    if (cuisines.length < 1) throw "Empty array";
    for (let i of cuisines) {
        if (typeof i !== 'string') throw "Must be  string in array";
        if (i.length == 0 || i.trim().length == 0) throw "Strings in array cannot be empty";
    }
    if (serviceOptions instanceof Object == false) throw "Service option is not object ";
    if (serviceOptions.dineIn === undefined || serviceOptions.takeOut === undefined || serviceOptions.delivery === undefined) throw "Options must be provided";
    if (typeof serviceOptions.dineIn !== 'boolean' || typeof serviceOptions.takeOut !== 'boolean' || typeof serviceOptions.delivery !== 'boolean') throw "Options must be boolean";



    const restaurantCollection = await restaurants();
    let parseId = ObjectId(id);

    const resById = await this.get(id);
    let newRes = {
        name: name,
        location: location,
        phoneNumber: phoneNumber,
        website: website,
        priceRange: priceRange,
        cuisines: cuisines,
        overallRating: resById.overallRating,
        serviceOptions: serviceOptions,
        reviews: resById.reviews

    };

    const updatedRes = await restaurantCollection.updateOne({ _id: parseId }, { $set: newRes });
    if (updatedRes.modifiedCount === 0) throw 'Could not update restaurant successfully';

    const res = await this.get(id);
    return res;

}







module.exports = {
    getRestaurantById,
    create,
    getAll,
    get,
    remove,
    update,
    checkId,


};