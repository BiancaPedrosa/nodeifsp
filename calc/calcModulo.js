var somaFunc = require ("./soma.js");
var subtracaoFunc = require("./sub.js").default;
var multiplicacaoFunc = require ("./mult.js");
var divisaoFunc = require ("./div.js");     
console.log(somaFunc(1, 2)); // 3
console.log(subtracaoFunc(1, 2)); // -1    
console.log(multiplicacaoFunc(1, 2)); // 2
console.log(divisaoFunc(1, 2)); // 0.5        
