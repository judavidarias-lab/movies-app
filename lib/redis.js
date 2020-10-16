const { config } = require('../config');

var redis = require("redis");


class RedisLib{

    constructor(){
        this.client = redis.createClient(config.portRedis, config.hostRedis);
    }

    connect(){

        if (!RedisLib.connection) {
            RedisLib.connection = new Promise((resolve, reject) => {
              this.client.connect(err => {
                if (err) {
                  reject(err);
                }
      
                console.log('Connected succesfully to Redis');
                resolve();
              });
            });
          }
      
          return RedisLib.connection;
    }

    set(key, value){
        return this.client.connect().set(key, value);
    }

    get(key){
        return this.client.connect().get(key);
    }
}

module.exports = RedisLib;

