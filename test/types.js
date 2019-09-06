"use strict";

const types = require('../src/types/types').types;
const expect = require('chai').expect; 

describe("TypeSignature Object", function(){

})

describe('types.compareTypeSignature', function(){
    it('compares two type signatures, return true if equivalent', function(){
        let A = types.add({typeName: "A"})
        let testsOK = [{l:[A,A], r:[A,A]}];
        let testsNotOK = [{l:[A], r:[A,A]}];

        testsOK.forEach(
            equation => expect(types.compareTypeSignature(equation.l, equation.r)).to.be.true
        )
        testsNotOK.forEach(
            equation => expect(types.compareTypeSignature(equation.l, equation.r)).to.be.false
        )
    })
})

describe('Plug', function(){
    it('is an object', function(){
    })
    it('is an element of one or several Types', function(){

    })
})

describe("types.Type Object", function(){
    it('is created using the types.add function', function(){
        let BOOL = types.add({typeName:"BOOL", typeSignature:X => [X,X,X]})
        expect(BOOL).to.be.an('object');
        expect(BOOL).to.be.an.instanceof(types.Type)

        //can't create an object as below
        //throws "sorry, types.Type objects can only 
        //be created through the 'types.add' function"
        let ACTION = new types.Type({typeName:"NUM"})
    })

   it('is a set of TypedObjects', function (){
        let BOOL = new types.add({typeName:"BOOL", typeSignature:[,,,]});
        expect(1).to.equal(1);
    })

    it('is created using a type signature', function (){
        let BOOL = types.add({typeName:"BOOL", typeSignature:[,,,]});
        expect(BOOL).to.be.an('object');
        expect(BOOL).to.be.an.instanceOf(types.Type);
        expect(BOOL).to.not.be.an.instanceOf(types.ArrowType); 
    })

    it('has a type property, which is a function', function (){
        let BOOL = types.add({typeName:"BOOL", typeSignature:[,,,]});
        expect(BOOL).to.haveOwnProperty('type');
    })

    it('will not create a new type with the same typeName', function(){


    })
})

describe("type.Type.uuid", function(){
   it('has a unique ID, formatted in the uuid v4 format', function(){
        let COLOR = types.add({typeName:"COLOR"})

    })
}) 
 
describe("types.Type.type( arguments )", function(){

    it ("is a function", function(){
        let NAT = types.add({typeName:"NAT"})
        expect(NAT.type).to.be.a('function')
    })

    it("returns 'this' when no argument is passed", function(){
        let NAT = types.add({typeName:"NAT", typeSignature:[,[,]]})
        expect(NAT.type).to.be.a('function')
        expect(NAT.type()).to.eql(NAT)
 
    })
})

describe("Type::addElement", function(){
    it('adds new elements to the type object', function (){
        let BOOL = types.add({typeName:"BOOL", typeSignature:[,,,]});
        BOOL.addElement({name: "btrue", evalFunc: x=>y=>x});
        expect(BOOL).to.haveOwnPropertyDescriptor('btrue');
    })

    it('augments the new elements with a type property', function(){
        let BOOL = types.add({typeName:"BOOL", typeSignature:[,,,]});
        BOOL.addElement({name: "btrue", evalFunc: x=>y=>x});
        expect(BOOL.btrue).to.haveOwnPropertyDescriptor('type');
        expect(BOOL.btrue.type()).to.eql(BOOL)
 
    })
    it('the type prperty is a function', function(){
        let COLOR = types.add({typeName:"COLOR"});
        COLOR.addElement({name: "red", value:1});
        expect(COLOR.red).to.haveOwnPropertyDescriptor('type');
        expect(COLOR.red.type).to.be.a('function'); 
 
    })
    it('the type function returns the type of the object when called with no args', function(){
        let COLOR = types.add({typeName:"COLOR"});
        COLOR.addElement({name: "red", value:1});
        expect(COLOR.red).to.haveOwnPropertyDescriptor('type');
        expect(COLOR.red.type()).to.eql(COLOR); 
 
    })
    it( "the type function returns a type resolution " + 
        "when called with the appropriate arg", function(){

        let COLOR = types.add({typeName:"COLOR"});
        let COLORTRANSFORM = types.add({typeName:"COLORTRANS", typeSignature:[COLOR, COLOR]});

        expect(COLORTRANSFORM.type(COLOR)).to.eql(COLOR); 

        
        COLORTRANSFORM.addElement({name: "greyFade", value:1});
       // expect(COLORTRANSFORM.greyFade.type(COLOR)).to.eql(COLOR); 


 
    })




    it('can be created with an evaluation function', function (){
        let BOOL = types.add({typeName:"BOOL", typeSignature:[,,,]});
        BOOL.addElement({name: "btrue", evalFunc: x=>y=>x});
        expect(BOOL.btrue.evalFunc).to.be.an.instanceof(Function);
    })
    /************************************
     * An abstract type is a union of types
     *  
     * It is characterized by a function that takes a type as argument
     * and returns a type. That type is a subset of the abstract type. 
     * eg: BOOL == TTX.X->X->X is an abstract type
     *      (a) Suppose A is a type
     *      (b) then A->A->A is subset of BOOL  
     **********************************/
    it('can also be given a non-computed value', function (){
        let ALPHA = types.add({typeName:"ALPHA"});
        ALPHA.addElement({name: "a", value: "a"});
        ALPHA.addElement({name: "b", value: 1});
        ALPHA.addElement({name: "c", value: "c"});
        let els = [ALPHA.a, ALPHA.b, ALPHA.c]; 

        els.forEach(el =>{
            expect(el).to.haveOwnProperty('value');
        })

        expect(ALPHA.a.value).to.be.a('string');
        expect(ALPHA.b.value).to.be.a('number');
    })



})

describe("types.ArrowType", function(){
    it('can be created by passing a leftType and a rightType property to the add function (left -> right)', function(){
        let NUM = types.add({typeName:"NUM"})
        let UNARY = types.add({leftType:NUM, rightType:NUM})
        expect(UNARY).to.be.an('object')
        expect(UNARY).to.be.an.instanceof(types.ArrowType);
        expect(UNARY).to.be.an.instanceof(types.Type);
    })
it('can be created by creating a types.Type object with an arrow type signature', function(){
        let NUM = types.add({typeName:"NUM"})
        let UNARY = types.add({typeName: "UNARY", typeSignature:[NUM, NUM]}); 
        let ABS = types.add({typeName: "ABS", typeSignature:[,,]})
        let arrowTypesOK = [UNARY];
        let arrowTypesNotOK = [NUM, ABS];

         arrowTypesOK.forEach(t => { 
            expect(t).to.be.an('object')
            expect(t).to.be.an.instanceof(types.ArrowType);
            expect(t).to.be.an.instanceof(types.Type);
        }); 
        arrowTypesNotOK.forEach(t => { 
            expect(t).to.be.an('object')
            expect(t).to.not.be.an.instanceof(types.ArrowType);
            expect(t).to.be.an.instanceof(types.Type);
        }); 
    })
    it('is an ArrowType object, which is a Type object', function(){
        let NUM = types.add({typeName:"NUM"})
        let UNARY = types.add({leftType:NUM, rightType:NUM})
        expect(UNARY).to.be.an('object')
        expect(UNARY).to.be.an.instanceof(types.ArrowType);
        expect(UNARY).to.be.an.instanceof(types.Type);
    })
})

describe("types.AbstractType", function(){
    it('is a kind of type with the last element of the type signature blnk', function(){

    })
})
describe("TypeElement Object", function(){

})
