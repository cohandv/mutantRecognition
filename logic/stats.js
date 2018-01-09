const config = require('../config.js')
const entities = require('../entities')
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
          return new entities.Stats(stats.mutant,stats.human);
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
          if (isHuman) stats.human ++
          else if (unique) stats.mutant++
        } else {
          stats = {
             human: 0,
             mutant: 0
          }
          if (isHuman) stats.human=1
          else stats.mutant=1
        }

        await this.client.setAsync(this.prefixStats, JSON.stringify(stats))

      } catch (e) {
        throw e
      }
    }

}

module.exports = Stats;
