const config = require('../config.js')
const Matrix = require('./Matrix.js');

class DNA {

    isValid() {
      if (!this.matrix.valid) {
        throw this.matrix.errorMessage;
      }
    }

    constructor(inputMatrix) {
      this.matrix = new Matrix(inputMatrix, config.nitrogenBases || process.env.nitrogenBases)
      this.mutantChainRegex = config.mutantChainRegex || process.env.mutantChainRegex
      this.minMutantChainChanges = config.minMutantChainChanges || process.env.minMutantChainChanges

      this.isValid()
    }

    identifyMutant(minChainMatches) {
      this.isValid() //Just in case this was modified outside

      //concat all objects of the Matrix
      var serializedMatrix = this.matrix.original.join('-') + "-"
                           + this.matrix.traversed.join('-')+"-"
                           + this.matrix.diagonal.leading+"-"
                           + this.matrix.diagonal.anti

      var matches = serializedMatrix.match(this.mutantChainRegex)
      var isMutant = matches.length >= minChainMatches
      console.log(isMutant)

      if (config.persist) {
        console.log('Persisting information')
        const Stats = require('./stats.js');
        var stats = new Stats()
        var summary = stats.setAsync(this.matrix.original, !isMutant)
     }

    }

}

module.exports = DNA;
