const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const bcrypt = require('bcrypt');
const saltRounds = 16;



function checkUserName(str) {

    if (str.length == 0 || str.trim().length == 0) throw "Username cannot be empty!";
    let strArr = str.toLowerCase().split('');
    for (let i = 0; i < strArr.length; i++) {
        if (strArr[i] === ' ') throw "Username cannot contian space!"
    }
    let newStr = strArr.join('');
    for (let i = 0; i < newStr.length; i++) {
        if (!((newStr.charCodeAt(i) >= 97 && newStr.charCodeAt(i) <= 122) || (newStr.charAt(i) >= 0 && newStr.charAt(i) <= 9))) throw "Username must be alphanumeric characters!";
    }
    if (newStr.length < 4) throw "Username must be at least 4 characters long!";

}

function checkPassword(str) {
    if (str.length == 0 || str.trim().length == 0) throw "Password cannot be empty!";
    let strArr = str.split('');
    for (let i = 0; i < strArr.length; i++) {
        if (strArr[i] === ' ') throw "Password cannot contian space!"
    }
    let newStr = strArr.join('');
    if (newStr.length < 6) throw "Passsword must be at least 6 characters long!";
}


async function createUser(username, password) {
    checkUserName(username);
    checkPassword(password);

    lowerUserName = username.toLowerCase();

    const plainTextPassword = password;
    const hash = await bcrypt.hash(plainTextPassword, saltRounds);

    const usersCollection = await users();

    const findUserName = await usersCollection.findOne({ username: lowerUserName });
    if (findUserName !== null) throw "Username already exist!";

    let user = {
        username: lowerUserName,
        password: hash
    };

    const insertUser = await usersCollection.insertOne(user);
    if (insertUser.insertedCount === 0) throw "Could not add user";

    let res = `{userInserted: true}`;
    return res
}




async function checkUser(username, password) {
    checkUserName(username);
    checkPassword(password);
    lowerUserName = username.toLowerCase();
    // 1.Query the db for the username supplied, if it is not found, throw an error stating "Either the username or password is invalid".
    const usersCollection = await users();
    const findUserName = await usersCollection.findOne({ username: lowerUserName });
    if (findUserName === null) throw "Either the username or password is invalid";

    // 2. If the username supplied is found in the DB, you will then use bcrypt to compare the hashed password in the database with the password input parameter.
    let compareToMatch = false;
    if (findUserName !== null) {
        hashedPassword = findUserName.password;
        compareToMatch = await bcrypt.compare(password, hashedPassword);
    }
    // 3. If the passwords match your function will return {authenticated: true}
    // 4. If the passwords do not match, you will throw an error stating "Either the username or password is invalid"
    if (compareToMatch) {
        return `{authenticated: true}`;
    } else {
        throw "Either the username or password is invalid";
    }







}





module.exports = {
    checkUserName,
    checkPassword,
    createUser,
    checkUser
};