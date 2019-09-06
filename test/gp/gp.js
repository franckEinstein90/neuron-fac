"use strict";

const genes = require('../../src/gp/gp').genes;
const ecosystem = require('../../src/gp/gp').ecosystem;
const expect = require('chai').expect; 


describe("genes", function(){
   it("has a size", function(){
        let context = []
        let genePool = genes.newPool({context})
        expect(genePool).to.have.property('size')
        expect(genePool.size).to.equal(0)
    })
   it("1", function(){
        let context = []
        let genePool = genes.newPool({context})
        expect(genePool).to.be.an('object')
        expect(genePool).to.be.an.instanceOf(genes.GenePool)
    })
})

describe("ecosystem object", function(){

    it("is an object", function(){
        let eco = ecosystem.new() 
        expect(eco).to.be.an('object')
        expect(eco).to.be.an.instanceOf(ecosystem.Ecosystem)
    })

    it("has a generationIndex property, initialized at 0", function(){
        let eco = ecosystem.new() 
        expect(eco).to.have.property('generationIndex')
        expect(eco.generationIndex).to.equal(0)
    })

    it("has buildFirstGeneration Method", function(){
        let eco = ecosystem.new()
        expect(eco).to.have.property('buildFirstGeneration')
        expect(eco.buildFirstGeneration).to.be.a('function')
        eco.buildFirstGeneration()
        expect(eco.generationIndex).to.equal(1)
        let eco2 = ecosystem.new()
        expect(eco2.generationIndex).to.equal(0)
    })

    it("includes a gene pool", function(){
        let eco = ecosystem.new(); 
        expect(eco).to.have.property('genePool'); 
    })

    it("includes an array of species", function(){
        let eco = ecosystem.new();
        expect(eco).to.have.property('species')
        expect(eco.species).to.be.an('array')
    })
})
