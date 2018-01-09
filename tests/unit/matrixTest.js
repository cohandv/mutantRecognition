var chai = require('chai')
var expect = chai.expect
var Matrix = require('../../logic/matrix.js')

describe('Test the matrix properties', function() {
  it('Analize traversed matrix', function() {
    var matrix = new Matrix(["TA","GA"],['A','C','T','G'])
    expect(matrix.original[0][1]).to.equal(matrix.traversed[1][0])
  })

  it('Analize leading diagonal', function() {
    var matrix = new Matrix(["TAC","GAT","GGG"],['A','C','T','G'])
    expect(matrix.diagonal.leading).to.equal("TAG")
  })

  it('Analize anti diagonal', function() {
    var matrix = new Matrix(["TAC","GAT","GGG"],['A','C','T','G'])
    expect(matrix.diagonal.anti).to.equal("CAG")
  })

  it('Analize invalid chars', function() {
    var matrix = new Matrix(["TAC","GAT","GGG"],['A'])
    expect(matrix.valid).to.equal(false)
    expect(matrix.errorMessage).to.equal('Invalid characters found at row 0 and col 0')
  })

  it('Analize NxN', function() {
    var matrix = new Matrix(["TAC","GT","GGG"],['A','C','T','G'])
    expect(matrix.valid).to.equal(false)
    expect(matrix.errorMessage).to.equal('Invalid matrix length at row 0 and col 1')
  })

})
