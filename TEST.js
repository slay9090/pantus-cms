let urlParams = { 'categories': [
    ['111', '222', '333']
        ]

}

//console.log(urlParams.categories)
//let x = [...urlParams.categories.map(cat => cat.id)].toString() ;
//console.log(x)

urlParams['categories'][0].splice(1, 1)

//delete urlParams['categories'][0][1];

console.log(urlParams['categories'][0])