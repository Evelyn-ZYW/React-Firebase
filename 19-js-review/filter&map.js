const ninjas = [
  {
    name: "evelyn",
    belt: "black",
  },
  {
    name: "frank",
    belt: "orange",
  },
  {
    name: "kelvin",
    belt: "purple",
  },
  {
    name: "melody",
    belt: "red",
  },
];

// filer and map is non-desctructive methods - they dont alter the original array, they return a new array based on the original

// filter
const blackBelt = ninjas.filter((ninja) => {
  // return false;
  // return true;
  return ninja.belt == "black";
});
console.log(ninjas, blackBelt);

// map
const names = ninjas.map(ninja => {
  return ninja.name
})

console.log(names)