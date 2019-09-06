const expect = require('chai').expect
const equal = require('deep-equal')

//const context = require('./typeContext').typeContext 

const context = (function(){
    let frameStore, extendFrame;

    frameStore = [
        {idx:0, typeRegisterRef: typeRegister.newRegister()}
    ]
    extendFrame = function(ancestorIdx){
        let newFrame = {
            idx: frameStore.length + 1,
            ancestor: ancestorIdx, 
            typeRegisterRef: typeRegister.extend(frameStore[ancestorIdx].typeRegisterRef)
            }
        frameStore.push(newFrame)
        return frameStore.length
    }

    return{
        newFrame: function(ancestorIdx){
            //creates a new frame, stores it in the
            //frameStore and returns its id
            return extendFrame(ancestorIdx)
        }

    }
})()

const typeSignatures = (function(){
    let signature, isSameSignature;

    signature = x => new typeSignatures.TypeSignature(x)
    isSameSignature = (sLeft, sRight) => typeSignatures.compare(sLeft, sRight) === typeSignatures.relation.same
    return{

        //constructor for type signatures
        TypeSignature: function({
            typeDescription, 
            frameRef, //a reference to a context
            alias
        }){

            if(typeof typeDescription === 'function'){
                this.isAbstractType = true
                this.description = typeDescription
                return
            }

            if(Array.isArray(typeDescription)){
                if(typeDescription.length === 1) {
                    if(Array.isArray(typeDescription[0])){
                        this.description = typeDescription[0]
                    }
                    else {
                        this.description = typeDescription
                    } 
                }
                if(typeDescription.length > 1){ 
                        this.description = typeDescription 
                } 
                if(this.description.length > 1){    //ArrowType
                    this.isArrowType = true
                    this.left = signature([this.description[0]])
                    this.right = signature(this.description.slice(1))
                }
            }
        },

        relation:{
            same:0,
            different:1
        },
        compare: function(tsLeft, tsRight){
            expect(tsLeft, "...").to.exist
            expect(tsRight, "right is undefined").to.exist
            if(typeof tsLeft.description === 'function' && typeof tsRight.description === 'function'){
                let X = Symbol()
                return typeSignatures.compare(
                    signature(tsLeft.description(X)),
                    signature(tsRight.description(X)))
            }
            if(Array.isArray(tsLeft.description) && Array.isArray(tsRight.description)){
                if(equal(tsLeft, tsRight)) {
                    return typeSignatures.relation.same
                }
                if(typeSignatures.compare(tsLeft.left, tsRight.left) === typeSignatures.relation.same){
                    return typeSignatures.compare(tsLeft.right, tsRight.right)
                }
            }
            return typeSignatures.relation.different
        },

        combine: function(tsLeft, tsRight){
            if ( tsLeft.isAbstractType ){
                return signature(tsLeft.description(tsRight.description))
            }
            if ( tsLeft.isArrowType && isSameSignature(tsLeft.left, tsRight) ){
                return tsLeft.right
            }
        }
    }
})();

typeSignatures.TypeSignature.prototype ={
    toString: function(){
        if(this.isArrowType){
            return  `(${this.left.toString()}->${this.right.toString()})`
        }
        if(this.isAbstractType){
            let strRep = this.description.toString().split('=>')
            return `TT${strRep[0].trim()}.${strRep[1].trim()}`
        }
        return this.description
    }
}

module.exports = {
    typeSignatures
}
