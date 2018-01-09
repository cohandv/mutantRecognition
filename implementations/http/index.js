'use strict';

const config = require('../../config.js')
const Mutant = require('./mutant.js')

class Http {

    constructor() {

      const express = require('express')
      this.server = express()

      const bodyParser = require('body-parser');
      this.server.use(bodyParser.urlencoded({ extended: false }));
      this.server.use(bodyParser.json())

      //Register Routes
      new Mutant(this.server)
    }

    start() {
      var port = config.port || process.env.port
      this.server.listen(port, () => console.log('Example app listening on port '+port))
    }

}

module.exports = Http;
