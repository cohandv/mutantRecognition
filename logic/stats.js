const config = require('../config.js')
const redis = require("redis")
const sha256 = require('js-sha256')
var bluebird = require("bluebird")
bluebird.promisifyAll(redis.RedisClient.prototype)

class Stats {

    constructor() {
      this.prefix = 'DNA'
      this.prefixStats = 'Stats'
    }

    connect() {
      try {
          var client = redis.createClient(config.redis)

          client.on("error", function (err) {
              console.log("Error " + err)
          });

          return client
      }
      catch(e) {
        return null
      }
    }

    async getAsync() {
      try {
        var client = this.connect()
        if (!client) return

        var stats = await client.getAsync(this.prefixStats)
        if (stats) {
          stats = JSON.parse(stats)
          stats.ratio = stats.count_mutant_dna / (stats.count_mutant_dna+stats.count_human_dna)
          return stats;
        } else {
          throw 'No stats yet'
        }
      }
      catch(e) {
        throw e
      }
    }

    async setAsync(inputMatrix, isHuman) {
      try {
        var client = this.connect()
        if (!client) return

        var id = this.prefix + sha256(JSON.stringify(inputMatrix))
        var dna = await client.getAsync(id )
        var unique = false
        if (!dna) {
          unique = true
          dna = { }
          dna.id = id
          dna.object = inputMatrix
          await client.setAsync(id, JSON.stringify(dna))
        }

        var stats = await client.getAsync(this.prefixStats)
        if (stats) {
          stats = JSON.parse(stats)
          if (isHuman) stats.count_human_dna ++
          else if (unique) stats.count_mutant_dna++
        } else {
          stats = {
             count_human_dna: 0,
             count_mutant_dna: 0
          }
          if (isHuman) stats.count_human_dna=1
          else stats.count_mutant_dna=1
        }

        await client.setAsync(this.prefixStats, JSON.stringify(stats))

      } catch (e) {
        throw e
      }
    }

}

module.exports = Stats;
