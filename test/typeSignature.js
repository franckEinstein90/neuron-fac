/**********************************************
 * unit tests for the typeSignature module
 * ****************************************** */

 "use strict";

const typeSignatures = require('../src/types/typeSignatures').typeSignatures;
const expect = require('chai').expect; 



describe("typeSignature module implementation", function(){
    it("Includes a constructor for an object called 'TypeSignature'", function(){
        expect(typeSignatures.TypeSignature).to.be.a('function')
        let ts = new typeSignatures.TypeSignature(["NUM"]);
        expect(ts).to.be.an('object')
        expect(ts).to.be.an.instanceOf(typeSignatures.TypeSignature)
    })
    it('includes a function compare', function(){
        expect(typeSignatures.compare).to.be.a('function')
    })
    it('includes a function combine', function(){
        expect(typeSignatures.combine).to.be.a('function')
    })
})

describe('typeSignatures.TypeSignature object', function(){
    let signature = x => new typeSignatures.TypeSignature(x)
    context('It takes a description as its only construction parameter.', function(){
        it('the description can be an array, e.g. [A,B,B] or [A,[B,B]]', function(){
            let ts = new typeSignatures.TypeSignature(['fdsa'])
            expect(ts).to.be.an.instanceOf(typeSignatures.TypeSignature)
        })
        it('the description can be a function, e.g. X => [X,X,X]', function(){
            let boolSignature = new typeSignatures.TypeSignature(X => [X,X,X])
            expect(boolSignature).to.be.an.instanceOf(typeSignatures.TypeSignature)
        })
    })
    context('When the description is an array:', function(){
        it("1 element means atomic type, or a reference to a type stored in some other context", function(){
            let ts = new typeSignatures.TypeSignature([1])
            expect(ts).to.not.have.property('isArrowType')
        })
         it("2 or more elements means an arrow type, so [A,B] means A->B", function(){
            let tsLeft = new typeSignatures.TypeSignature([1,3])
            expect(tsLeft).to.have.property('isArrowType')
            let tsRight = new typeSignatures.TypeSignature([1])
            expect(tsRight).to.not.have.property('isArrowType')
        })
        describe("it evaluates to the right", function(){
            it("so [[0,0],0] is not the same as [0,0,0]", function(){
                let tsLeft = signature([[0,0],0])
                let tsRight = signature([0,[0,0]])
                expect(tsLeft).to.have.property('isArrowType')
                expect(tsLeft.isArrowType).to.eql(true)
                expect(typeSignatures.compare(tsLeft,tsRight)).to.not.eql(typeSignatures.relation.same)
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
    })
})

describe('typeSignatures.compare(tsLeft, tsRight)', function(){

    let signature = function(des){return new typeSignatures.TypeSignature(des)}
    context('it decides if two typeSignatures are the same', function(){
        it('so [1] is the same as [1]', function(){
            let ts1 = signature([1])
            let ts2 = signature([1])
            expect(typeSignatures.compare(ts1,ts2)).to.eql(typeSignatures.relation.same)
        })
        it("['A','B'] is the same as ['A','B']", function(){
            let BOOL1 = signature(['aba','aba']) 
            let BOOL2 = signature(['aba', 'aba'])
            expect(typeSignatures.compare(BOOL1, BOOL2)).to.eql(typeSignatures.relation.same)
        })
        it('[A,B,C] is the same as [A, [B,C]]', function(){
            let s1 = signature(['aba','aba','aba']) 
            let s2 = signature(['aba', ['aba','aba']])
            expect(typeSignatures.compare(s1, s2)).to.eql(typeSignatures.relation.same)
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
        })
 })
  
  
    it('ABSTRACT 2...', function(){
        let INT1 = signature(X => [X, [X,X], X]) 
        let INT2 = signature(X => [X, [[X, X], X]])
        expect(typeSignatures.compare(INT1, INT2)).to.eql(typeSignatures.relation.same)

    })


})

describe('typeSignatures::typeSignature.combine(ts1, ts2)', function(){
        let same = (A,B) => expect(typeSignatures.compare(A,B)).to.eql(typeSignatures.relation.same)
        let signature = des => new typeSignatures.TypeSignature(des)
        
        it("takes two signatures as arguments", function(){

        }) 
        it('combines [A,B] [A] to [B]', function(){
            let A, B; 
            A = {}
            B = {}
            let ts1 = signature([A, B])
            let ts2 = signature([A])
            let ts3 = signature([B])

            let tsRes = typeSignatures.combine(ts1, ts2); 
            expect(tsRes).to.be.an.instanceOf(typeSignatures.TypeSignature); 
            expect(tsRes).to.eql(ts3)
            same(tsRes, ts3)
        })
        it('combines X=>[X,X,X] [A] to [A,A,A]', function(){
            let A, B; 
            A = {}
            B = {}
            let ts1 = new typeSignatures.TypeSignature(X => [X,X,X]); 
            let ts2 = new typeSignatures.TypeSignature([A]); 
            let tsRes = typeSignatures.combine(ts1, ts2); 
            expect(tsRes).to.be.an.instanceOf(typeSignatures.TypeSignature);
            same(tsRes, new typeSignatures.TypeSignature([A,A,A])) 
        })
})
