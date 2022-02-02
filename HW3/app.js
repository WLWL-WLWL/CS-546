const people = require("./people");
const stocks = require("./stocks");


async function main() {

    //getPersonById
    try {
        //console.log(await people.getPersonById("20035a09-3820-4f49-bb8f-d947cebee537"));
        console.log(await people.getPersonById("a5b4b2f4-64c7-4044-b471-e205207bd982"));
    } catch (e) {
        console.log(e);
    }

    try {
        console.log(await people.getPersonById("0B3e1ecb-0ab2-446b-a410-ca43206b9530"));
        //console.log(await people.getPersonById("7989fa5e-5617-43f7-a931-46036f9dbcff"));
        //console.log(await people.getPersonById());
        //console.log(await people.getPersonById(7));
        //console.log(await people.getPersonById(""));
        //console.log(await people.getPersonById("    "));
    } catch (e) {
        console.log(e);
    }


    //sameStreet
    try {
        console.dir(await people.sameStreet('sutherland', 'point'), { depth: null });
        // console.log(await people.sameStreet('Sutherland', 'Point'));
    } catch (e) {
        console.log(e);
    }

    try {
        console.log(await people.sameStreet("Crownhardt", "Park"));
        //console.log(await people.sameStreet(7));
        //console.log(await people.sameStreet(""));
        //console.log(await people.sameStreet("    "));
    } catch (e) {
        console.log(e);
    }



    //manipulateSsn
    try {
        console.log(await people.manipulateSsn());
    } catch (e) {
        console.log(e);
    }

    try {
        console.log(await people.manipulateSsn(7));
        //console.log(await people.manipulateSsn(""));
        //console.log(await people.manipulateSsn("    "));
    } catch (e) {
        console.log(e);
    }

    //sameBirthday
    try {
        console.log(await people.sameBirthday('02', 2));
    } catch (e) {
        console.log(e);
    }

    try {
        console.log(await people.sameBirthday(8, 32));
        //console.log(await people.sameBirthday(7));
        //console.log(await people.sameBirthday(""));
        //console.log(await people.sameBirthday("    "));
    } catch (e) {
        console.log(e);
    }







    // listShareholders()
    try {
        console.dir(await stocks.listShareholders(), { depth: null });
    } catch (e) {
        console.log(e);
    }

    try {
        console.log(await stocks.listShareholders('7283e5d6-7481-41cb-83b3-5a4a2da34717'));
        //console.log(await stocks.listShareholders('Nuveen Preferred and Income 2022 Term Fund'));
    } catch (e) {
        console.log(e);
    }




    //topShareholder
    try {
        //console.log(await stocks.topShareholder('Aeglea BioTherapeutics, Inc.'));
        console.log(await stocks.topShareholder('Nuveen Floating Rate Income Fund'));
    } catch (e) {
        console.log(e);
    }
    try {
        console.log(await stocks.topShareholder(43));
        //console.log(await stocks.topShareholder());
        //console.log(await stocks.topShareholder('Foobar Inc'));
        //console.log(await stocks.topShareholder(""));
        //console.log(await stocks.topShareholder("   "));

    } catch (e) {
        console.log(e);
    }



    //listStocks
    try {
        console.log(await stocks.listStocks("Grenville", "Pawelke"));
    } catch (e) {
        console.log(e);
    }

    try {
        console.log(await stocks.listStocks('Patrick', "Hill"));
        //console.log(await stocks.listStocks());
        //console.log(await stocks.listStocks('foo'));
        //console.log(await stocks.listStocks('', ''));
        //console.log(await stocks.listStocks('    ', "    "));
        //console.log(await stocks.listStocks(1, 2));
    } catch (e) {
        console.log(e);
    }



    //getStockById
    try {
        console.log(await stocks.getStockById("f652f797-7ca0-4382-befb-2ab8be914ff0"));
        //console.log(await stocks.getStockById('929686a2-dd3a-42c7-a88d-b170e2590252'));
    } catch (e) {
        console.log(e);
    }


    try {
        console.log(await stocks.getStockById(-1));
        // console.log(await stocks.getStockById(1001));
        //console.log(await stocks.getStockById());
        //console.log(await stocks.getStockById('  '));
        //console.log(await stocks.getStockById('7989fa5e-5617-43f7-a931-46036f9dbcf'));
        //console.log(await stocks.getStockById('F652f797-7ca0-4382-befb-2ab8be914ff0'));
    } catch (e) {
        console.log(e);
    }




}



main();