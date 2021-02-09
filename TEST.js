

let price = '₽ 1,234,849,434.15'

console.log(parseFloat(price.replace(/₽ /g,'').replace(/,/g,'')))

const p = 'The quick brown fox jumps over the lazy dog. If the dog reacted, was it really lazy?';

console.log(p.replace(/dog/g, 'hello!'))
