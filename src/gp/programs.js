/****************************************************** 
 * A program's genotype is the set of genes that it carries, 
 * and the blueprint by which they are combined (its species). 
 * 
 * The program's blueprint is a proof (a la Curry-Howard)
 * 
 * done is to compose genotype in executable code, then 
 * run that code run in an execution context (a world).
 * 
 * Then, by observation, you can see how it behaves, and if it solves 
 * the problem we wan t it to solve, or if not, how close 
 * it comes to solving them, and its execution needs to be 
 ******************************************************/

 const programs = (function(){
    let _observer; 

    return{
        onReady({observer}){
            _observer = observer
        },

        /**** Genotypes:
         * Genotypes are assemblies of computors, sensors,  and actuators
         * 
         */
        Genotype: function({species, genes}){
            this.genome = species(genes)
        },

        /***   Phenotypes:  
        * 
        * Phenotypes are not objects. They are the observd 
        * characteristics of a prgram when  executed in 
        * a given environement, a "world." 
        * 
        * You can't "obtain" a program's phenotype 
        * because that's just a name for the infinity of things that happen when 
        * a program is executed into an environment. 
        * 
        * What you can do, is interpret the genotype into a program
        * executable into a world, and:
        * - observe its behavior while its running
        * - grade the quality of its output once its 
        *   execution has terminated
        * 
    * keeping in mind that whatevery metric you obtain this
    * is only valid for that particular world. k
    * 
    * So a "phenotype" resolves to a metric on the characteristics you care about 
    * in that world. 
    * */
       Phenotype: async function({genotype, world}){
             return await _observer(world.run(genotype)); 
        }
     }
 })()

