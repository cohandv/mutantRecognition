'use strict';

class Console {

    execute() {
      console.log('Running it as a CLI')

      //load configuration
      const config = require('../../config.js')

      //load request
      const params = require('../../params.js')
      var inputMatrix = params.inputMatrix

      //Process the DNA
      const DNA = require('../../logic/dna.js');
      var dna = new DNA(inputMatrix)
      var minMutantChainChanges = config.minMutantChainChanges || process.env.nitrogenBases.minMutantChainChanges
      var isMutant = dna.identifyMutant(minMutantChainChanges)

      console.log('Params:')
      console.log(dna)
      console.log('------------------------')
      console.log('------------------------')
      console.log('Results')

      if (isMutant) {
        console.log('IT\'S MUTANT!!! Let\'s hire him')
      } else {
        console.log('It\s not a mutant')
      }
    }

}

module.exports = Console;
