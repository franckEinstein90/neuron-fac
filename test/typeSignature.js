/**********************************************
 * unit tests for the typeSignature module
 * ****************************************** */

 "use strict";

const typeSignatures = require('../src/types/typeSignatures').typeSignatures;
const expect = require('chai').expect; 

describe("TypeSignature Object", function(){
    it("is created using the TypeSignature constructor", function(){
        let ts = new typeSignatures.TypeSignature([]);
//        expect(ts).to.be.an.instanceOf('object');
        expect(ts).to.be.an('object')
    })
})
