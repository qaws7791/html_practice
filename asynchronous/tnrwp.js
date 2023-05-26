const counter = (() => {
  let i = 0;
  return () => ++i;
})();

console.log(counter());
console.log(counter());
console.log(counter());
