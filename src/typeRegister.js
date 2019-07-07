const assert = require('chai').assert;
const deepEql = require('deep-eql');
const color = require("tinycolor2");

const typeRegister = (function(){

    let names = [], 
        composedTypes = [],
        atomicTypes = [], 
        ids  = [],
        eql = (left, right) => deepEql(left, right), 

        newID = function(name){
            ids.push(name);
            return ids.length;
        },

        getID = function(typeName){
            return names
        },

        findName = function(name){
            let idx = names.findIndex(x => x === name);
            if (idx === -1) {return undefined;}
            return getID(name);
        }, 

        findComposedType = function(signature){
            let idx = composedTypes.findIndex(x => eql(signature, x.signature));
            if (idx === -1) {return undefined;}
            return getID(composedTypes[idx].alias);
        }

    return{

        add : function({alias, signature}){
           let id = newID(alias);
           names.push({alias, id});
           if(eql(signature, [])) { atomicTypes.push(alias); }
           else{
              composedTypes.push({alias, signature});
           }
           return id;
        },

        includes : function({alias, signature}){
            let typeID = findName(alias);
            if(typeID){
                assert(eql(signature,names[typeID].signature), "found a type with similar name but different signature");
                return typeID;
            }
            if(eql(signature, [])){//this is an atomic type, check if the name is defined
                return atomicTypes.find(atomicType => eql(alias, atomicType.alias));
            }
            //this is a composed type, check for a signature match
            return findComposedType(signature);
        }
    }
})();

module.exports = {
    typeRegister
}

