/*******************************************
 * types.js
 *
 * ****************************************/
const assert = require('chai').assert;
const typeRegister = require('./typeRegister').typeRegister;

const types = (function(){

    let eql = function(left, right){
 //           return deepEql(left, right);
 //           
        },       
        verify = function(typeSignature){
             // 1 - verifies that this is a well-formed typeSignature
            //      a - is array
            //      b - every element of the array is either:
            //          . empty
            //          . a type id
            //          . a type name
            assert.isArray(typeSignature);
        } ,
        check = function(typeName, typeSignature) { 
            verify(typeSignature); 
            // 2 - checks if exists in register
            //     2a - if it doesn't  add it to the register
            //     2b - if it does get the id 
            if (typeRegister.includes({alias: typeName, signature:typeSignature})){
                return typeRegister[typeSignature].id;
            }
            let id = typeRegister.add({alias:typeName, signature:typeSignature});
            return id;
        };

    return{
        /***********************************************************************
         * A type is :
         *      - a set of elements with a unique id
         *      - associated with a unique signature, either: 
         *              .an array of size 0 for atomic types
         *              .or an array of size greater than 0 for composed types
         *
         * types are also associated with aliases
         ***********************************************************************/
         Type : function ({typeName, typeSignature}){
            if (typeSignature === undefined) {
                 typeSignature = [];
                }
            try{
                this.elements = [];
                this.id = check(typeName, typeSignature);
                this.type = function(){
                    //with no argument, returns this type
                    //with argument A, returns the result of applying
                    //this type to A (eg, this= X->X->X, returns A->A->A)
                }
            }
            catch(e){

            }
        }
    }
})();

types.Type.prototype = {
      addElement: function({name, value}){
            this.elements.push({
                type: this.type,
                name, 
                value
            });
            Object.defineProperty(this, name, {
                        value:value,
                        writeable:false
                    });
      }
}




module.exports = {
    types 
}

