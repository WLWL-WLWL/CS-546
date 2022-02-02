const arrayUtils = require("./arrayUtils");
const stringUtils = require("./stringUtils");
const objUtils = require("./objUtils");


//Average Tests
try {
    //Should Pass
    const averageOne = arrayUtils.average([
        [1, 3],
        [2, 3],
        [3, 3]
    ]);
    console.log("average passed successfully");
} catch (e) {
    console.error("average failed test case");
}

try {
    //Should Fail
    const averageTwo = arrayUtils.average("banana");
    console.log("average did not error");
} catch (e) {
    console.log("average failed successfully");

}


//ModeSquared Tests
try {
    //Should Pass
    const modeSquaredOne = arrayUtils.modeSquared([2, 2, 3, 3]); //return 13
    console.log("modeSquered passed successfully");
} catch (e) {
    console.log("modeSquered failed test case");
}

try {
    //Should Fail
    const modeSquaredTwo = arrayUtils.modeSquared(["guitar", 1, 3, "apple"]);
    console.log("modeSquered did not error");
} catch (e) {
    console.log("modeSquered failed successfully");
}


///MedianElement Tests
try {
    // Should Pass
    const medianElementOne = arrayUtils.medianElement([6, 5, 7]); // Returns: {'6': 0}
    console.log("medianElement passed successfully");
} catch (e) {
    console.error("medianElement failed test case");
}

try {
    // Should Fail
    const medianElementTwo = arrayUtils.medianElement(); // Array is undefined
    console.log("medianElement did not error");
} catch (e) {
    console.error("medianElement failed successfully");

}


// Merge  Tests
try {
    //Should Pass
    const mergeOne = arrayUtils.merge([1, 2, 3], [3, 1, 2]); // Returns: [1,1,2,2,3,3]
    console.log("merge passed successfully");
} catch (e) {
    console.error("merge failed test case");
}

try {
    //Should Fail
    const mergeTwo = arrayUtils.merge([1, 2, 3], ['ab', 'ts']); //Not a char string
    console.log("merge did not error");
} catch (e) {
    console.error("merge failed successfully");
}



/************* StringUtil*******************************************************************************************/
/*****************************************************************************************************************/

// SortString Tests
try {
    //Should Pass
    const sortStringOne = stringUtils.sortString('321 FOO BAR!@#cds'); // "ABFOORcds!@#123  ""   
    console.log("sortString passed successfully");
} catch (e) {
    console.error("sortString failed test case");
}

try {
    //Should Fail
    const sortStringTwo = stringUtils.sortString(); // Parameter does not exit!!!
    console.log("sortString did not error");
} catch (e) {
    console.error("sortString failed successfully");
}


//ReplaceChar Tests
try {
    //Should Pass
    const replaceCharOne = stringUtils.replaceChar("Daddy", 2); //Returns: "Daday"
    console.log("replaceChar passed successfully");
} catch (e) {
    console.log("replaceChar failed test case");
}

try {
    //Should Fail
    const replaceCharTwo = stringUtils.replaceChar("foobar", 0); // idx is invalid
    console.log("replaceChar did not error");
} catch (e) {
    console.log("replaceChar failed successfully");
}


//MashUp Tests
try {
    //Should Pass
    const mashUpOne = stringUtils.mashUp("Patrick", "Hill", "$"); //Returns "PHaitlrli$c$k$"
    console.log("mashUp passed successfully");
} catch (e) {
    console.log("mashUp failed test case");
}

try {
    //Should Fail
    const mashUpTwo = stringUtils.mashUp(); // Parameter does not exit!!!
    console.log("mashUp did not error");
} catch (e) {
    console.log("mashUp failed successfully");
}






/************* ObjUtil*************************************************************************/
/***********************************************************************************************/


//ComputeObj Tests
try {
    //Should Pass
    const computeObjectsOne = objUtils.computeObjects([{ x: 2, y: 3 }, { a: 70, x: 4, z: 5 }, { x: 0, y: 9, q: 10 }], x => x * 2); //{ x: 12, y: 6, a: 140, z: 10, q:20 }
    console.log("computeObjects passed successfully");
} catch (e) {
    console.log("computeObjects failed test case");
}


try {
    //Should Faile
    const computeObjectsTwo = objUtils.computeObjects([{ x: 2, y: null }], x => x * 2); //Value must be a number
    console.log("computeObjects did not error");
} catch (e) {
    console.error("computeObjects failed successfully");
}


//CommonKeys Tests

try {
    //Should pass
    const first = { a: 2, b: 4 };
    const second = { a: 5, b: 4 };
    const commonKeysOne = objUtils.commonKeys(first, second); // {b: 4}
    console.log("commonKeys passed successfully");
} catch (e) {
    console.error("commonKeys failed test case");
}

try {
    //Should Fail
    const first = undefined;
    const second = { a: 5, b: 4 };
    const commonKeysTwo = objUtils.commonKeys(first, second); // Not an Object
    console.log("commonKeys did not error");
} catch (e) {
    console.error("commonKeys failed successfully");
}


//FlipObj Tests
try {
    // Should Pass   
    const flipObjectOne = objUtils.flipObject({ a: 3, b: 7, c: 5 }); // { '3': 'a', '5': 'c', '7': 'b' }
    console.log("flipObject passed successfully");
} catch (e) {
    console.log("flipObject failed test case");
}

try {
    //Should Fail
    const flipObjectTwo = objUtils.flipObject("");
    console.log("flipObject did not error");
} catch (e) {
    console.error("flipObject failed successfully");
}