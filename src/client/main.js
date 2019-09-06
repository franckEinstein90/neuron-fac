/*********************************
 * Entry Point 
 *********************************/

"use strict";

const typeSignatures = require('../types/typeSignatures').typeSignatures

AJS.toInit(function($){
    let signature = x => new typeSignatures.TypeSignature(x)
    let pres = []
    let s1 = signature([[0,0],0])
    pres.push(s1.toString())
    let s2 = signature([0,0,0])
    let s3 = signature(X => [X,X,X])
    pres.push(s3.toString())

    AJS.$("#test").html(pres.join('<BR/>'))

});
















