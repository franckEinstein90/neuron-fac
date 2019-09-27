const expect = require('chai').expect
const equal = require('deep-equal')



const context = (function(){
    let names, generateIndex 
    names = new Map() 

    generateIndex = function(){
        if ( typeof generateIndex.counter == 'undefined' ) {
            generateIndex.counter = 0
        }
        return (++generateIndex.counter)
    }

    return{

        name : function(objectName){ //returns the index of objectName in the name store
            if(names.has(objectName)){
                return names.get(objectName).ID
            }
            else{
                newID = generateIndex() 
                names.set(objectName, {ID:newID})
                return newID
            }
        }
    }
})()

const typeSignatures = (function(){
    let signature, isSameSignature;
    isSameSignature = (sLeft, sRight) => typeSignatures.compare(sLeft, sRight) === typeSignatures.relation.same

    return{
        errors: {
            unknownTypeDescription: "Unable to construct signature from description"
        },

        categories: {
            Atomic: "Atomic Type", 
            Arrow: "Arrow Type", 
            Abstract: "Abstract Type" 
        },  

        relations: {
            same:0,
            different:1
        },

        signature : function({typeDescription}){
            if  ( Array.isArray(typeDescription) && 
                  typeDescription.length === 1  &&
                  Array.isArray(typeDescription[0]) ) {
                    return typeSignatures.signature({typeDescription: typeDescription.flat()})
            }
            return new typeSignatures.TypeSignature({context, typeDescription})
        },

        //constructor for type signatures
        TypeSignature: function({typeDescription}) {
/*            if(typeof typeDescription === 'function'){
                this.isAbstractType = true
                this.description = typeDescription
                return
            }*/

            if(Array.isArray(typeDescription) && typeDescription.length === 1){ //Atomic Type
                expect(Array.isArray(typeDescription[0])).to.eql(false)
                this.category = typeSignatures.categories.Atomic
                this.contextIndex = context.name(typeDescription[0])
                this.typeDescription = typeDescription 
                return 
            }

            if( Array.isArray(typeDescription) && typeDescription.length > 1){    //ArrowType
                    this.category =   typeSignatures.categories.Arrow
                    this.left = typeSignatures.signature({typeDescription: [typeDescription[0]]})
                    this.right = typeSignatures.signature({typeDescription: typeDescription.slice(1)})
                    return
                }
        },

        compare: function(tsLeft, tsRight){
/*            if(typeof tsLeft.description === 'function' && typeof tsRight.description === 'function'){
                let X = Symbol()
                return typeSignatures.compare(
                    signature(tsLeft.description(X)),
                    signature(tsRight.description(X)))
            }*/
            if(tsLeft.category === typeSignatures.categories.Atomic){
                if(tsRight.category !== typeSignatures.categories.Atomic){
                    return typeSignatures.relations.different
                }
                if(tsLeft.contextIndex === tsRight.contextIndex){
                    return typeSignatures.relations.same
                }
                return typeSignatures.relations.different
            }
            if(tsLeft.category === typeSignatures.categories.Arrow){
                if(tsRight.category === typeSignatures.categories.Arrow){
                    if(typeSignatures.compare(tsLeft.left, tsRight.left) === typeSignatures.relations.same){
                        return typeSignatures.compare(tsLeft.right, tsRight.right)
                    } 
                }
            }
         /*   if(Array.isArray(tsLeft.description) && Array.isArray(tsRight.description)){
                if(equal(tsLeft, tsRight)) {
                    return typeSignatures.relation.same
                }
                if(typeSignatures.compare(tsLeft.left, tsRight.left) === typeSignatures.relation.same){
                    return typeSignatures.compare(tsLeft.right, tsRight.right)
                }
            }*/
            return typeSignatures.relations.different
        },

        deduce: function({leftSignature, rightSignature}){
            //returns a signature deduced from the composition of the two argument signature
            if ( tsLeft.isAbstractType ){
                return signature(tsLeft.description(tsRight.description))
            }
            // deduce(A->B, A) returns B
            if ( (leftSignature.category === typeSignatures.categories.Arrow) && 
                     isSameSignature( tsLeft.left, tsRight)) {
                return leftSignature.right
            }
        }
    }
})();

typeSignatures.TypeSignature.prototype ={
    toString: function(){
        if(this.category === typeSignatures.categories.Atomic){
            return this.typeDescription
        }
   }
}

module.exports = {
    typeSignatures
}
