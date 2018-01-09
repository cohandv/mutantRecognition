class Matrix {
    constructor(inputMatrix, validChars) {
      this.original = inputMatrix
      this.traversed = []
      this.diagonal = {
        leading: "",
        anti: ""
      }
      this.valid = false
      this.validChars = validChars.join('')


      //Process the matrix and obtain the traversed matrix and both diagonals
      this.process(inputMatrix)
    }

    process(inputMatrix) {
      var temptTraversedMatrix = new Array(inputMatrix.length)

      for (var i = 0; i < inputMatrix.length; i++) {
          for(var j = 0; j < inputMatrix[i].length; j++) {

              //Validate matrix length
              if (inputMatrix.length != inputMatrix[i].length) {
                this.errorMessage = "Invalid matrix length at row "+j+" and col "+i
                return
              }

              //Validate characters
              if (this.validChars.indexOf(inputMatrix[i][j])==-1) {
                this.errorMessage = "Invalid characters found at row "+j+" and col "+i
                return
              }

              if (!temptTraversedMatrix[j]) temptTraversedMatrix[j]=[]

              if (i!=j) {
                temptTraversedMatrix[j][i]=inputMatrix[i][j]
              } else {
                temptTraversedMatrix[j][i]=inputMatrix[i][j]
                this.diagonal.leading+=inputMatrix[i][j]
                this.diagonal.anti+=inputMatrix[i][inputMatrix.length-j-1]
              }
          }
      }

      for(var i=0;i < temptTraversedMatrix.length; i++) {
        this.traversed.push(temptTraversedMatrix[i].join(''))
      }

      this.valid = true; //After all the processing finished we can conclude the matrix is valid

    }
}

module.exports = Matrix;
