let urlParams = { 'categories': [
    {id:'111', name: 'test1'},
        {id:'112', name: 'test1'},
        {id:'113', name: 'test1'},
    ]
}

//console.log(urlParams.categories)
let x = [...urlParams.categories.map(cat => cat.id)].toString() ;
console.log(x)