const equal = require('deep-equal'); 

const typeSignatures = (function(){

    return{
        TypeSignature: function(typeDescription){
            if(Array.isArray(typeDescription)){
               this.description = typeDescription;  
            }
        }
    }
})();


module.exports = {
    typeSignatures
}