var chai = require('chai')
var expect = chai.expect
var DNA = require('../../logic/dna.js')

describe('Test the dna properties', function() {
  it('Analize is valid', function() {
    var dna = new DNA(["TA","GA"])
    try {
      dna.isValid()
      expect(true).to.equal(true)
    } catch(e) {
      expect(false).to.equal(true)
    }
  })

  it('Analize is mutant', function() {
    var dna = new DNA(["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"])
    expect(dna.identifyMutant(1)).to.equal(true)
  })

})
