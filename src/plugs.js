/*******************************************
 * plugs.js
 *
 * a "plug" is a typed tree node. It is connected to a connector
 * ****************************************/

const types = require('./types.js').types;

const plugs = (function(){

       return{
            Plug: function( plugType ){
                this.type = plugType;
            }
        }
})();

plugs.Plug.prototype = {
    apply: function(){

//       get the arguments, figure out what they are
//       if the next argument is a type, and the type
//       of this plug is abstract, then
//       return a function in which the abstraction is replaced
//       by 
       //if(isAbstract(this.type)){return types.combine(

     
    }
}

module.exports = {
    plugs 
}

