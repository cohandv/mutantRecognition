'use strict';

class Mutant {

    constructor(server) {
       server.post('/mutant',
          (req, res) => {

            //load configuration
            const config = require('../../config.js')

            //Process the DNA
            const DNA = require('../../logic/dna.js');
            var dna = new DNA(req.body.dna)
            var changes = dna.identifyMutant()

            var minChanges = config.minMutantChainChanges || process.env.nitrogenBases.minMutantChainChanges
            if (changes >= minChanges) {
              res.status(200).send('IT\'S MUTANT!!et\'s hire him')
            } else {
              res.status(403).send('It\s not a mutant')
            }

          })
    }

}

module.exports = Mutant
