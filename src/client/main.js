/*********************************
 * Entry Point 
 *********************************/

/*
BOO.addObjects(
    {"true", x=>y=>x},
    {"false", x=>y=>y});

let prog = _T(`true[INT] 4 5`);*/
const types = require('../types').types;
const connectors = require('../connectors').connectors;

AJS.toInit(function($){
    /* **************************************
     * typeSignature:
     * an empty array is an atomic type
     * **************************************/
    let BOOL = new types.Type({typeName:"BOOL", typeSignature:[,,,]});
    BOOL.addElement({name: "btrue", value: x=>y=>x});
    BOOL.addElement({name: "bfalse", value: x=>y=>y});

    let gtAB = function(){
            let $a = AJS.$("#A").val(), 
                $b = AJS.$("#B").val();
            if($a > $b) {return BOOL.btrue}
            return BOOL.bfalse;
    };

    BOOL.addElement({name:"gtAB", value:gtAB});

    let ACTION = new types.Type({typeName:"ACTION"});
    ACTION.addElement({name:"writeA",  value:()=>AJS.$("#result").val("A")});
    ACTION.addElement({name:"writeB",  value:()=>AJS.$("#result").val("B")});

    let prog1  = new connectors.Connector({left:BOOL.gtAB, right:ACTION});
    let prog2 = new connectors.Connector({left:prog1, right:ACTION.writeA});
    let prog3 = new connectors.Connector({left:prog2, right:ACTION.writeB});
/*    AJS.$("#exec").click(programManager.run(prog3));*/
 

});
















