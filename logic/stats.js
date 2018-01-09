const config = require('../config.js')
const redis = require("redis")
const sha256 = require('js-sha256');
var bluebird = require("bluebird");
bluebird.promisifyAll(redis.RedisClient.prototype);

class Stats {

    constructor() {
      this.prefix = 'DNA'
      this.prefixStats = 'Stats'
      this.client = redis.createClient(config.redis);
    }

    async getAsync() {
      try {
        var stats = await this.client.getAsync(this.prefixStats)
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
        var id = this.prefix + sha256(JSON.stringify(inputMatrix))
        var dna = await this.client.getAsync(id )
        var unique = false
        if (!dna) {
          unique = true
          dna = { }
          dna.id = id
          dna.object = inputMatrix
          await this.client.setAsync(id, JSON.stringify(dna))
        }

        var stats = await this.client.getAsync(this.prefixStats)
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

        await this.client.setAsync(this.prefixStats, JSON.stringify(stats))

      } catch (e) {
        throw e
      }
    }

}

module.exports = Stats;
