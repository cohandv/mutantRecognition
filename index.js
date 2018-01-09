const config = require('./config.js')
var entities = require('./entities')
const DNA = require('./logic/dna.js');

//This allows you to test it locally
if (process.env.CMD) {
  console.log('Running it as a CLI')
  const params = require('./params.js')
  var inputMatrix = params.inputMatrix
}

//Process the DNA
var dna = new DNA(inputMatrix)
var changes = dna.identifyMutant()

//Show the output when running locally
if (process.env.CMD) {
  console.log('Params:')
  console.log(dna)
  console.log('------------------------')
  console.log('------------------------')
  console.log('Results')

  var minChanges = config.minMutantChainChanges || process.env.nitrogenBases.minMutantChainChanges
  if (changes >= minChanges) {
    console.log('IT\'S MUTANT!!! Let\'s hire him')
  } else {
    console.log('It\s not a mutant')
  }
}
