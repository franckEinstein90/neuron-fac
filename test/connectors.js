"use strict";

const connectors = require('../src/connectors').connectors;
const types = require('../src/types').types;
const expect = require('chai').expect;


describe("...", function(){
    it("...", function(){
        let BOOL = types.add({typeName:"BOOL", typeSignature:[,,,]});
        expect(BOOL).to.be.an.instanceOf(types.Type);

        let ACTION = types.add({typeName:"ACTION"});
        expect(ACTION).to.be.an.instanceOf(types.Type);

        BOOL.addElement({name: "btrue", value: x=>y=>x});

        let connector1 = new connectors.Connector({left:BOOL.btrue, right:ACTION});
        expect(connector1).to.haveOwnProperty('type'); 
        expect(connector1.type).to.be.a('function');
        expect(connector1.type().typeSignature).to.eql([ACTION, [ACTION, ACTION]])
    })
})
/*
    let connector1 = BOOL.btrue(ACTION);

foo = function(){
    console.log('ye');
}
    connector1(Action.moveForward).run();



    - connector1 is of thype connector
    - connector1 has type sginature ==== [ACTION, ACTION, ACTION]



    connector1.run
*/   