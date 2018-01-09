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

    identifyMutant() {
      this.isValid() //Just in case this was modified outside

      //concat all objects of the Matrix
      var serializedMatrix = this.matrix.original.join('-') + "-"
                           + this.matrix.traversed.join('-')+"-"
                           + this.matrix.diagonal.leading+"-"
                           + this.matrix.diagonal.anti

      var matches = serializedMatrix.match(this.mutantChainRegex)
      return matches.length
    }

}

module.exports = DNA;
