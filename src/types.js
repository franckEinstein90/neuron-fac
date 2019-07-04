/*******************************************
 * types.js
 *
 * ****************************************/
const types = (function(){

//       let typeRegistrar = new map();

       return{
            Type: function(typeName, signature){
                this.typeName = typeName;
            }, 
            
            getType: function({left, right}){
                //get the type obtained by combining left and right
                //if the type exist, return that name/typeid
                //otherwise, create and register a new type
                //and return its id
                
            }
        }
})();

types.Type.prototype = {
      addObjets: function(objectName, objectValue){
        this[objectName] = objectValue; 
      }
}

module.exports = {
    types 
}

