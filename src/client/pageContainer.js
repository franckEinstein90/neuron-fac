const types = require('../types.js').types;

const pageContainer = (function(){
    return{
      on : function(){
        uiProgSpecs.on();
        uiGP.on();
        uiProgEvaluate.on();
      }
    }
})();


      	let randomPopulation = new ProgPopulation({
    size: 200, 
    type: "BOO->BOO->BOO"});

LOOP

evaluator.eval({
    population: randomPopulation, 
    testCases: testCases, 
    maxExecTime: maxExecTime, 
    progSize: progSize});

process(evaluator.solutions);  

if(continueEvolution){
    LOOP AGAIN
    }
    
END LOOP


      
