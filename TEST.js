var arr = [0, 1, 2, 3, 4, 5];
var value = 3;

arr.sort(function(x,y){
    return x === arr[value] ? -1 : y === arr[value] ? 1 : 0;
});

console.log(arr);