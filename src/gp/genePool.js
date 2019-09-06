/********************************************
 * Defines + implements module genes
 * - Includes constructors for objects: 
 *      - Allele
 *      - genePool
 * 
 * references mostlyu blockpopulation.ml in ocaml legacy code 
 */

"use strict"; 
const uuidv4 = require('uuid/v4')



const genes = (function(){
    let _genePoolProto = {
        genes:[],
        get size(){
            return this.genes.length
        }
    }

    return {
        Allele: function(){

        }, 
        GenePool: function(){
        },

        newPool:function({types, maxSize}){
            let genePool = new genes.GenePool()
            genePool.maxSize = maxSize || 10000
            return Object.assign(genePool, _genePoolProto)
        }
    }
})()
