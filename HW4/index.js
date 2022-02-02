const restaurants = require("./data/restaurants");
const connection = require('./config/mongoConnection');


async function main() {

    // 1. Create a restaurant of your choice.
    const safrronLounge = await restaurants.create("The Saffron Lounge", "New York City, New York",
        "123-456-7890", "http://www.saffronlounge.com", "$$$$", ["Cuban", "Italian"], 3, {
            dineIn: true,
            takeOut: true,
            delivery: false
        });



    // 2. Log the newly created restaurant. (Just that restaurant, not all restaurants)
    console.log(safrronLounge);

    // 3. Create another restaurant of your choice.
    const KungfuTea = await restaurants.create("The KungFu Tea", "New Jersy, Hoboken",
        "111-222-3333", "http://www.kungfutea.com", "$", ["Milk Tea", "Green Tea"], 2, {
            dineIn: true,
            takeOut: true,
            delivery: true
        });

    // 4. Query all restaurants, and log them all
    console.log(await restaurants.getAll());


    // 5. Create the 3rd restaurant of your choice.
    const Chicken = await restaurants.create("The Chicken", "New Jersy, Hoboken",
        "222-333-4444", "http://www.chicken.com", "$$", ["Chicken", "Beef"], 4, {
            dineIn: true,
            takeOut: true,
            delivery: true
        });


    // 6. Log the newly created 3rd restaurant. (Just that restaurant, not all restaurants) 
    console.log(Chicken);

    // 7. Rename the first restaurant website
    const renameFirst = await restaurants.rename(safrronLounge['_id'], 'http://www.ccccccc.com');

    // 8. Log the first restaurant with the updated website.
    console.log(renameFirst);


    // 9. Remove the second restaurant you created. 
    console.log(await restaurants.remove(KungfuTea['_id']));


    // 10. Query all restaurants, and log them all
    console.log(await restaurants.getAll());

    // 11. Try to create a restaurant with bad input parameters to make sure it throws errors.
    try {
        const safrronLounge = await restaurants.create("The Saffron Lounge", "New York City, New York",
            "123-456-7890", "http://www.ss.com", "$$$$", ["Cuban", "Italian"], 3, {
                dineIn: true,
                takeOut: true,
                delivery: false
            });
        console.log(safrronLounge);
    } catch (e) {
        console.log(e);
    }


    // 12. Try to remove a restaurant that does not exist to make sure it throws errors.
    try {
        console.log(await restaurants.remove('0156555FBf4929c7798a7d47'));
    } catch (e) {
        console.log(e);
    }


    // 13. Try to rename a restaurant that does not exist to make sure it throws errors.

    try {
        console.log(await restaurants.rename('0156555FBf4929c7798a7d47', 'http://www.dddddd.com'));
    } catch (e) {
        console.log(e);
    }

    // 14. Try to rename a restaurant passing in invalid data for the parameter to make sure it throws errors. 

    try {
        console.log(await restaurants.rename('6156555fbf4929c7798a7d47', 'http://www.dd.com'));
    } catch (e) {
        console.log(e);
    }


    // 15. Try getting a restaurant by ID that does not exist to make sure it throws errors.
    try {
        console.log(await restaurants.get('0156926aFBF365e744f9c448'));
    } catch (e) {
        console.log(e);
    }

    //close database connection
    const db = await connection();
    await db.serverConfig.close();
    console.log('Done!');



}
main().catch((error) => {
    console.log(error);
});