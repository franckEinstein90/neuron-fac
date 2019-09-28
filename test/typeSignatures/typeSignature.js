/**********************************************
 * unit tests for the typeSignature module
 * ****************************************** */

 "use strict";

const typeSignatures = require('../../src/types/typeSignatures').typeSignatures;
const expect = require('chai').expect; 



describe("typeSignature module implementation", function(){
    context("TypeSignature object", function(){
        it("is constructed through the typeSignatures.signature function", function(){
           let ts = typeSignatures.signature({typeDescription:["NUM"]}) 
           expect(ts).to.be.an('object')
           expect(ts).to.be.an.instanceof(typeSignatures.TypeSignature)
        })

        it('includes a function compare', function(){
            expect(typeSignatures.compare).to.be.a('function')
        })

        it('includes a function deduce', function(){
            expect(typeSignatures.deduce).to.be.a('function')
        })
    })
  /*  it("Includes a constructor for an object called 'TypeSignature'", function(){
        expect(typeSignatures.TypeSignature).to.be.a('function')
        let ts = new typeSignatures.TypeSignature(["NUM"]);
        expect(ts).to.be.an('object')
        expect(ts).to.be.an.instanceOf(typeSignatures.TypeSignature)
    })
*/
})


describe('typeSignatures.TypeSignature object', function(){
    let signature = x => new typeSignatures.TypeSignature(x)
    context('Description parameter', function(){
        it('the description can be an array, e.g. [A,B,B] or [A,[B,B]]', function(){
            let ts = typeSignatures.signature({typeDescription:['fdsa']})
            console.log(ts.contextIndex)
            let ts2 = typeSignatures.signature({typeDescription:['fdsa']})
            console.log(ts2.contextIndex)
            expect(ts).to.be.an.instanceOf(typeSignatures.TypeSignature)
            
        })
        it('the description can be a function, e.g. X => [X,X,X]', function(){
            let boolSignature = typeSignatures.signature({typeDescription:X => [X,X,X]})
            expect(boolSignature).to.be.an.instanceOf(typeSignatures.TypeSignature)
        })
    })
})

describe('typeSignatures.TypeSignature.prototype.toString', function(){

})

describe("Atomic signatures", function(){
    context('When the constuction description is an array containing one element:', function(){
        it("an atomic type signature is created", function(){
            let ts = typeSignatures.signature({typeDescription: ['Behavior']})
            expect(ts).to.be.an.instanceof(typeSignatures.TypeSignature)
            expect(ts.category).to.equal(typeSignatures.categories.Atomic)
        })
    })
    it("has a unique contextID", function(){
        let ts1 = typeSignatures.signature({typeDescription: ['L']})
        let ts2 = typeSignatures.signature({typeDescription: ["L"]})
        expect(ts2.contextIndex).to.equal(ts1.contextIndex)
    }) 
    it("has a unique contextID", function(){
        let ts1 = typeSignatures.signature({typeDescription: ['M']})
        let ts2 = typeSignatures.signature({typeDescription: ["L"]})
        expect(ts1.contextIndex).to.not.equal(ts2.contextIndex)
    })
    it("has a unique contextID", function(){
        let ts1 = typeSignatures.signature({typeDescription: ['M', 'L']})
        let ts2 = typeSignatures.signature({typeDescription: ["L"]})
        expect(ts1.right.contextIndex).to.equal(ts2.contextIndex)
    })
})

describe("Arrow signatures", function(){
     context('When the constuction description is an array with more than one element:', function(){
        it("an arrow type signature is created", function(){
            let ts = typeSignatures.signature({typeDescription: ['1','1']})
            expect(ts).to.be.an.instanceof(typeSignatures.TypeSignature)
            expect(ts.category).to.equal(typeSignatures.categories.Arrow)
        })
    })
    context("interpretation", function(){
        describe("it evaluates to the right", function(){
            it("so [[0,0],0] is not the same as [0,0,0]", function(){
                let tsLeft = typeSignatures.signature({
                    typeDescription:[['0','0'],'0']
                })
                let tsRight = typeSignatures.signature({
                    typeDescription:['0',['0','0']]
                })
                expect(tsLeft.category).to.equal(typeSignatures.categories.Arrow)
                expect(typeSignatures.compare(tsLeft,tsRight)).to.not.eql(typeSignatures.relations.same)
            })
        })
    })
})

/*    context('When the description is an array:', function(){
        it("1 element means atomic type, or a reference to a type stored in some other context", function(){
            let ts = new typeSignatures.TypeSignature([1])
            expect(ts).to.not.have.property('isArrowType')
        })
     
        })
    })
    context('Abstract types are described using a function', function(){
        it('for example TTX.X->(X->X)->X is described by X => [X,[[X,X],X]]', function(){
            let intSignature = new typeSignatures.TypeSignature(X => [X,[[X,X],X]])
            expect(intSignature).to.have.property('isAbstractType')
        })
        it('or TTXY.x->(Y->X)->X is described by (X,Y)=>[X, [Y,X], X]', function(){
            let ts = new typeSignatures.TypeSignature((X,Y)=>[X,[Y, X],X])
            expect(ts.isAbstractType).to.eql(true)

        })
    })*/


describe('typeSignatures.compare(tsLeft, tsRight)', function(){
    context('it decides if two typeSignatures are the same', function(){
        it('so A is the same as A', function(){
            let ts1 = typeSignatures.signature({typeDescription:["A"]})
            let ts2 = typeSignatures.signature({typeDescription:["A"]})

            expect(typeSignatures.compare(ts1,ts2)).to.eql(typeSignatures.relations.same)
        }) 
        it('but B is not the same as A', function(){
            let ts1 = typeSignatures.signature({typeDescription:["B"]})
            let ts2 = typeSignatures.signature({typeDescription:["A"]})
            expect(typeSignatures.compare(ts1,ts2)).to.eql(typeSignatures.relations.different)
        })
        it("['A','B'] is the same as ['A','B']", function(){
            let BOOL1 = typeSignatures.signature({typeDescription:['aba','aba']}) 
            let BOOL2 = typeSignatures.signature({typeDescription: ['aba', 'aba']})
            expect(typeSignatures.compare(BOOL1, BOOL2)).to.eql(typeSignatures.relations.same)
        })
        it("['A','B'] is not the same as ['A','C']", function(){
            let BOOL1 = typeSignatures.signature({typeDescription:['A','B']}) 
            let BOOL2 = typeSignatures.signature({typeDescription: ['A', 'C']})
            expect(typeSignatures.compare(BOOL1, BOOL2)).to.eql(typeSignatures.relations.different)
        })
         it('[A,B,C] is the same as [A, [B,C]]', function(){
            let s1 = typeSignatures.signature({typeDescription:['A',['B','C']]})
            let s2 = typeSignatures.signature({typeDescription:['A', ['B','C']] })
            expect(typeSignatures.compare(s1, s2)).to.eql(typeSignatures.relations.same)
        })
        it('but [[A,B],C] is different from [A, [B,C]]', function(){
            let s1 = typeSignatures.signature({typeDescription:[['A','B'],'C']})
            let s2 = typeSignatures.signature({typeDescription:['A', 'B','C']})
            expect(typeSignatures.compare(s1, s2)).to.eql(typeSignatures.relations.different)
        })
     })
})/*
        it("['A','B'] is the same as ['A','B']", function(){
            let BOOL1 = signature(['aba','aba']) 
            let BOOL2 = signature(['aba', 'aba'])
            expect(typeSignatures.compare(BOOL1, BOOL2)).to.eql(typeSignatures.relation.same)
        })
        it('X => [X,X,X] is the same as Y => [Y, [Y,Y]]', function(){
            let BOOL1 = signature(X => [X, X, X]) 
            let BOOL2 = signature(Y => [Y, [Y, Y]])
            expect(typeSignatures.compare(BOOL1, BOOL2)).to.eql(typeSignatures.relation.same)
        })
        it('X => [X,X,X] is not the same as Y => [[Y, Y],Y]', function(){
            let BOOL1 = signature(X => [X, X, X]) 
            let BOOL2 = signature(Y => [[Y, Y], Y])
            expect(typeSignatures.compare(BOOL1, BOOL2)).to.not.eql(typeSignatures.relation.same)
  
  
    it('ABSTRACT 2...', function(){
        let INT1 = signature(X => [X, [X,X], X]) 
        let INT2 = signature(X => [X, [[X, X], X]])
        expect(typeSignatures.compare(INT1, INT2)).to.eql(typeSignatures.relation.same)

    })


})
*/
describe('typeSignatures.deduce(ts1, ts2)', function(){
 /*       let same = (A,B) => expect(typeSignatures.compare(A,B)).to.eql(typeSignatures.relation.same)
        let signature = des => new typeSignatures.TypeSignature(des)
        
        it("takes two signatures as arguments", function(){

        }) */
        it('combines [A,B] [A] to [B]', function(){

            let ts1 = typeSignatures.signature({typeDescription:['A', 'B']})
            console.log(ts1.toString())
            let ts2 = typeSignatures.signature({typeDescription:['A']})
            console.log(ts2.toString())
            let ts3 = typeSignatures.signature({typeDescription:['A', 'Z']})
            let ts4 = typeSignatures.signature({typeDescription:['Z']})
            expect(ts4).to.be.defined
            let ts5 = typeSignatures.signature({typeDescription:['B']})

            [ts1, ts2, ts3, ts4, ts5].forEach(x => expect(x).to.be.defined); 

            let tsRes = typeSignatures.deduce(ts1, ts2); 
            expect(tsRes).to.be.an.instanceOf(typeSignatures.TypeSignature); 
            expect(typeSignatures.compare(tsRes, ts3)).to.eql(typeSignatures.relations.same)
        })
/*        it('combines X=>[X,X,X] [A] to [A,A,A]', function(){
            let A, B; 
            A = {}
            B = {}
            let ts1 = new typeSignatures.TypeSignature(X => [X,X,X]); 
            let ts2 = new typeSignatures.TypeSignature([A]); 
            let tsRes = typeSignatures.combine(ts1, ts2); 
            expect(tsRes).to.be.an.instanceOf(typeSignatures.TypeSignature);
            same(tsRes, new typeSignatures.TypeSignature([A,A,A])) 
        })*/
})

