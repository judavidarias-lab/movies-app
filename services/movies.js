const MongoLib = require('../lib/mongo');

const { config } = require('../config');

var redis = require("async-redis");

var client = redis.createClient(config.portRedis, config.hostRedis);
client.on("connect", function() {
  console.log("You are now connected");
});


class MoviesService {
  constructor() {
    this.collection = 'movies';
    this.mongoDB = new MongoLib();
  }

  async getMovies({ tags }) {
    const k = tags+"";
    const value = await client.get(k);
    if(value){
      return value;
    }else{
      const query = tags && { tags: { $in: tags } };
      const movies = await this.mongoDB.getAll(this.collection, query);
      await client.set(k,  movies );
     // await client.flushall(k);
      return movies || [];
    }
    
  }

  async getMovie({ movieId }) {
    const movie = await this.mongoDB.get(this.collection, movieId);
    return movie || {};
  }

  async createMovie({ movie }) {
    const createMovieId = await this.mongoDB.create(this.collection, movie);
    return createMovieId;
  }

  async updateMovie({ movieId, movie } = {}) {
    const updatedMovieId = await this.mongoDB.update(
      this.collection,
      movieId,
      movie
    );
    return updatedMovieId;
  }

  async deleteMovie({ movieId }) {
    const deletedMovieId = await this.mongoDB.delete(this.collection, movieId);
    return deletedMovieId;
  }
}

module.exports = MoviesService;
