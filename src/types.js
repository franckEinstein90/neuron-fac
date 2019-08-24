"use strict";
/*******************************************
 * k
 * types.js
 *
 * ****************************************/
const assert = require('chai').assert;
const equal = require('deep-equal'); 
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
        TypeSignature : function(typeSignatureDefinition){
            /***********************************
             * - An Atomic type is a name for a set of elements
             * - A TypeAbstraction is a function that takes a type
             *   and returns a type
             * - 
             */

        },
        typeResolve : function({leftType, rightType}){

        },
        compareTypeSignature: function(left, right){
            if(equal(left, right)){
                return true;
            }
            return false; 
        },
        isArrowTypeSignature(typeSignature){
            return typeSignature.length === 2 && 
                    typeSignature[0] !== undefined &&
                    typeSignature[1] !== undefined; 
        },
        add: function(options){
            //Adds a new type to the universe
            if (options.typeSignature !== undefined){
                if (options.leftType !== undefined && options.rightType !== undefined){
                    //do nothing, handled later
                }
                else{
                    if(types.isArrowTypeSignature(options.typeSignature)){
                        options.leftType = options.typeSignature[0];
                        options.rightType = options.typeSignature[1];
                        return new types.ArrowType(options);
                    }
                }
            }

            if (options.leftType !== undefined && options.rightType !== undefined){
                if(options.typeSignature === undefined){
                    return new types.ArrowType(options);
                }

                if(types.compareTypeSignature(options.typeSignature, [options.leftType, options.rightType])){
                    return new types.ArrowType(options);
                }
                throw "incompatible type description";
            }

            if(typeof options.typeName !== undefined){
               return new types.Type(options);
            }
        },
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
                this.uuid = 1; //check(typeName, typeSignature);
                this.typeSignature = typeSignature; 
                this.type = function(){
                    if(arguments.length === 0){
                        return this; 
                    }
                    return typeResolve(this, argument[0]); 
                    //with no argument, returns this type
                    //with argument A, returns the result of applying
                    //this type to A (eg, this= X->X->X, returns A->A->A)
                }
            }
            catch(e){
                throw(e);
            }
        },

        ArrowType: function( {typeName, leftType, rightType} ){
            types.Type.call(
                this, 
                {typeName, typeSignature:[leftType, rightType]} )
        }
    }
})();

types.Type.prototype = {
      addElement: function({name, evalFunc, value}){
            this.elements.push({
                type: this.type,
                name 
            });
            let typeFunc = this.type;

            if(value !== undefined){
                Object.defineProperty(this, name, {
                    value:{
                        type:typeFunc, 
                        value:value
                    }
                })
            }
            else{
                Object.defineProperty(this, name, {
                        value:{
                            type: typeFunc, 
                            evalFunc:evalFunc
                        },
                        writeable:false
                    });
            }
      }, 
      isElement: function(typedObject, context){
        //returns true if typedObject is an element of this type, false otherwise
        //1. yes if typedObject belongs to the elements array of this type
        //2. yes if this type (T) is abstract and there is a type A in context
        //   such that T(A) is the type of typedObject
      }
}


types.ArrowType.prototype = Object.create(types.Type.prototype);
types.ArrowType.constructor = types.Type; 

module.exports = {
    types 
}

