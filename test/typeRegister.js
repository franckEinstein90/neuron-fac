"use strict";
const typeRegister = require('../src/types/typeRegister').typeRegister
const typeSignatures = require('../src/types/typeSignatures').typeSignatures
const expect = require('chai').expect 

describe('typeRegister module', function(){
    it('includes an add function', function(){
        expect(typeRegister.add).to.be.a('Function'); 
    })
})

describe('typeRegister.add function', function(){
    it('takes a name and a typeSignature as parameters', function(){
        let BOOL = new typeSignatures.TypeSignature([])
        typeRegister.add({alias:'BOOL', signature:BOOL})
    })
    it('returns the index of the typeSignature in the registrar', function(){
        let NUM = new typeSignatures.TypeSignature([])
        let idx = typeRegister.add({alias:'NUM', signature:NUM})
        expect(idx).to.eql(2)
    })
    it('wont add the same alias twice', function(){
        let NUM = typeSignatures.TypeSignature([])
        expect(typeRegister.add({alias:'NUM', signature:NUM})).to.throw("Alias already defined")
    })
    context('adding an atomic type', function(){
        it('adds the alias as an atomic type if the typeSignature is atomic', function(){

        })
        it('returns the existing index if an alias for that atomic type is already in the register', function(){

        })
    })
    context("non-atomic types", function(){
        it("adds the alias to the existing entry if the typeSignature already exists in the register", function(){

        })
    })
})



