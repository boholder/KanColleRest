let a = 1;
let b = JSON.stringify(undefined);
a = JSON.parse(b);
console.log(a)