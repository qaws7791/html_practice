var obj = {
  first: 1,
  second: 2,
  third: 3,
};
Object.defineProperty(obj, "first", {
  enumerable: false,
  writable: false,
  value: 99,
});

console.log(obj);
// obj.first = 3;
console.log(obj);
for (const item in obj) {
  console.log(item);
}
