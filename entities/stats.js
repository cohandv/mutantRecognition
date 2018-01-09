 class Stats {

     constructor(mutant, human) {
       this.count_mutant_dna = mutant
       this.count_human_dna = human
       this.ratio = human/mutant
     }

 }

 module.exports = Stats;
