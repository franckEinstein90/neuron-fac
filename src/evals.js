var wrap = a => `{${a}}`;

let defineFunction = function(funcName, funcBody){
	return `let ${funcName} =  function(x){${funcBody('x')}};`	
}
let len = defineFunction("len", x => `return ${x}.length; `)
let doubleStr = defineFunction("doubleStr", x => `return ${x} + ${x}; `)
console.log(doubleStr)
let test2 = new Function("a", wrap(len + doubleStr + " return len(doubleStr(a))"))

console.log(test2('fdsa'))

let plus = defineFunction("plus", x => `return left => ${x} + left`)
console.log(plus)


let BINOP = {}
BINOP.Signature = ["NUM", ["NUM", "NUM"]]

let UOP = {}
UOP.Signature = ["NUM", "NUM"]



BINOP.addElement = function(elName, elDef){
    let functionBody = defineFunction(elName, elDef)
    Object.defineProperty(BINOP, elName, {value:functionBody})    
}

BINOP.addElement('plus', x => `return left => ${x} + left`)
BINOP.addElement('mod', x => `return left => ${x} % left`)
BINOP.minus = defineFunction("minus", x => `return left => ${x} - left`)
BINOP.mult = defineFunction("mult", x => `return left => ${x} * left`)

let test3Prog = {}
test3Prog.genotype = (a,b) => `plus(${a})(minus(mod(4)(1))(${b}))`

let plusEval = new Function("a", 'b', 
    wrap(BINOP.plus + BINOP.minus + BINOP.mod + ` return ${test3Prog.genotype('a','b')}`))

console.log(plusEval(1,4))
