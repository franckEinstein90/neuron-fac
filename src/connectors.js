/*******************************************
 * connectors.js
 *
 * a "connector" is a typed tree node. 
 * It has two children, which can be 
 * connectors, plugs, or types. 
 * ****************************************/

const types = require('./types.js').types;
const plugs = require('./plugs.js').plugs;

const connectors  = (function(){

       return{
            Connector : function({left, right}){
                this.left = left;
                this.right = right;
                this.type = types.getType({left, right});
            }
        }
})();

connectors.Connector.prototype = {
    

}

module.exports = {
   connectors 
}

