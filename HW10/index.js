const users = require("./data/users");
const connection = require('./config/mongoConnection');


async function main() {

    const ba = await users.createUser('Aaaaa', '1111111   111')
        //const ba = await users.checkUser('Aaaaaaaa', '12344aaaaaa')

    console.log(ba)






    //     // //close database connection
    //     // const db = await connection();
    //     // await db.serverConfig.close();
    //     // console.log('Done!');



}
main().catch((error) => {
    console.log(error);
});