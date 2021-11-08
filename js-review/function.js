// function
// 1
// const getCalculations = () => {
//   return {
//     sum: a + b,
//     diff: Math.abs(a - b),
//     product: a * b,
//   };
// };

// const {sum, diff, product} = getCalculations(1, 3)
// console.log(sum, diff, product)

// 2
// const getCalculations = () => {
//   return [a + b, Math.abs(a - b), a * b];
// };

// const [sum, diff, product] = getCalculations(1, 3);
// console.log(sum, diff, product);

//3
const doSomething = ({name, age}) => {
    console.log(name, age)
};

doSomething({ name: "frank", age: "20" });
doSomething({ name: "evelyn", age: "10" });
