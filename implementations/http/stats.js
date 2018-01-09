'use strict';

var wrap = require('express-async-wrap')

class Stats {

    constructor(server) {
       server.get('/stats',
            wrap(async (req, res, next) => {

            //load configuration
            const config = require('../../config.js')

            //Get current stats
            const Stats = require('../../logic/stats.js');
            var stats = new Stats()
            var summary = await stats.getAsync()

            if (summary) {
              res.status(200).send(summary)
            } else {
              res.status(404).send('No summary have been set yet')
            }

          }))
    }

}

module.exports = Stats
