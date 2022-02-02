const lab1 = require("./lab1");

console.log(lab1.questionOne([5, 3, 10]));
//returns and outputs: {'18': false, '2': true, '93': false}
console.log(lab1.questionOne([2]));
// returns and outputs: {'3': true}
console.log(lab1.questionOne([]));
// returns and outputs: {}
console.log(lab1.questionOne());
// returns and outputs: {}
console.log(lab1.questionOne([1, 114, 0]));
//returns and outputs: {'6': flase, '12989': false, '7': true}



console.log(lab1.questionTwo([1, 1, 1, 1, 1, 1]));
//returns and outputs: [1]
console.log(lab1.questionTwo([1, '1', 1, '1', 2]));
// returns and outputs: [1, '1', 2]
console.log(lab1.questionTwo([3, 'a', 'b', 3, '1']));
// returns and outputs: [3, 'a', 'b', '1']
console.log(lab1.questionTwo([]));
//returns and outputs: []
console.log(lab1.questionTwo(['2', 'a', 'b', 3, '2']));
//returns and outputs: [ '2', 'a', 'b', 3 ]



console.log(lab1.questionThree(["cat", "act", "foo", "bar"]));
// returns and outputs: { act: ["cat", "act"] }
console.log(lab1.questionThree(["race", "care", "foo", "foo", "foo"]));
// returns and outputs: { acer: ["race", "care"] }
console.log(lab1.questionThree(["foo", "bar", "test", "Patrick", "Hill"]));
// returns and outputs: {}
console.log(lab1.questionThree([]));
// returns and outputs: {}
console.log(lab1.questionThree(["race", "care", "foo", "ofo", "oof"]));
// returns and outputs: { acer: [ 'race', 'care' ], foo: [ 'foo', 'ofo', 'oof' ] }

console.log(lab1.questionThree(["race", "care", "foo", "ofo", "oof", "rcea", 'adc']));
// returns and outputs: { acer: [ 'race', 'care', 'rcea' ], foo: [ 'foo', 'ofo', 'oof' ]  }



console.log(lab1.questionFour(1, 3, 2));
//returns and outputs: 4
console.log(lab1.questionFour(2, 5, 6));
//returns and outputs: 194
console.log(lab1.questionFour(5, 9, 2));
//returns and outputs: 68062
console.log(lab1.questionFour(0, 4, 2));
//returns and outputs: 13
console.log(lab1.questionFour(2, 0, 6));
//returns and outputs: 271