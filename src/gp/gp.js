"use strict"; 
const uuidv4 = require('uuid/v4')


const genotypes = (function(){
    return{
        genoStatus: {
            Dead: 0, 
            Alive: 1
        }
    }
})()

const species = (function(){

})();



/***********************************
 * A population is composed of: 
 *  - A species id
 *  - A map: keys: genotype value:genostatu
 */ 
const population = (function(){
    let _populationProto, populationInfo; 

    populationInfo = function({speciesId, ancestorID}){

    }

    _populationProto = {
        _programs: [ ], 
        _specie: undefined 
    }

    return{
        Population: function(){
            this.uuid = uuidv4(); 
        }, 
        newPopulation: function(){
            return new population.Population();
        }
    }
})(); 

const ecosystem = (function(){

    let _ecosystemProto = {

/*            get generationIndex(){
                return this._generationIndex
            },

            buildFirstGeneration: function(){
               this._generationIndex = 1;
            }, 

            next:function(){
                this._generationIndex += 1; 
            }*/
    }

    return{
        Ecosystem: function(){
            let _generationIndex = 0
            this.genePool = new genes.GenePool()
            this.species = []
        }, 
        new: function(){
            let eco = new ecosystem.Ecosystem()
            Object.createProperty(eco, 'generationIndex', 
                { 
                    function() { return _generationIndex } 
                });
            return Object.assign(eco, _ecosystemProto)
        }
    }
})()


module.exports = {
   genes, 
   ecosystem 
}