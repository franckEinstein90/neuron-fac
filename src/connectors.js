/*******************************************
 * connectors.js
 *
 * a "connector" is a typed tree node. 
 * It has two children, which can be 
 * connectors, plugs, or types. 
 * ****************************************/

const types = require('./types.js').types;

const connectors = (function(){

    return{
        Connector : function({left, right}){
            this.leftNode = left,
            this.rightNode = right,
            this.type = left.type(right)
            }
        }
})();

connectors.Connector.prototype = {
    

}

module.exports = {
   connectors 
}

