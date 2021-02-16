

var str = "2021-01-20";
const month = /-(.+)-(.+)/.exec(str)[1];

const day = /-(.+)-(.+)/.exec(str)[2];

console.log(month, day)
