/*********************************
 * Entry Point 
 *********************************/

const types = require('../types.js').types;
const plugs = require('../plugs.js').plugs;
const connectors = require('../connectors.js').connectors;
/*
BOO.addObjects(
    {"true", x=>y=>x},
    {"false", x=>y=>y});

let prog = _T(`true[INT] 4 5`);*/


AJS.toInit(function($){

    let BOOL = {
            bTrue : x=>y=>x,
            bFalse : x=>y=>y,
            gtAB : ()=>(parseInt(AJS.$("#A").val()) > parseInt(AJS.$("#B").val()))?BOOL.bTrue:BOOL.bFalse
        };

    let ACTION = {
        writeA : ()=>AJS.$("#result").val("A"),
        writeB : ()=>AJS.$("#result").val("B")
    }

    let execTree = function(){

            let prog  = BOOL.gtAB()(ACTION.writeA)(ACTION.writeB);
            prog();
            
    }; 
    AJS.$("#exec").click(execTree);
       
    /*let BOO = new types.Type("BOO", "X->X->X"), 
        plug1 = new plugs.Plug(BOO),
        connect1 = new connectors.Connector({left:plug1, right:BOO}); */
});
















