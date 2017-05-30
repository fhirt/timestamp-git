const natural = 'December 12, 2015';
const unix = 1449878400000;

console.log(new Date(natural));
console.log(Date.parse(natural));
console.log(Date.parse(unix));

