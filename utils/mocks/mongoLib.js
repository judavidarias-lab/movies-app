const sinon = require('sinon');

const { moviesMock, filteredMoviesMock } = require('./movies');

const getAllStub = sinon.stub();
getAllStub.withArgs('movies').resolves(moviesMock);

const tagQuery = { tags: { $in: ['Drama'] } };
getAllStub.withArgs('movies', tagQuery).resolves(filteredMoviesMock('Drama'));

const createStub = sinon.stub().resolves(moviesMock[0].id);

const movieId = moviesMock[0].id;
const getAll = sinon.stub().resolves(moviesMock[0]);


class MongoLibMock {
  getAll(collection, query) {
    return getAllStub(collection, query);
  }
  async getMovie({ movieId }) {
    return moviesMock[0]
  }

  create(collection, data) {
    return createStub(collection, data);
  }
}

module.exports = {
  getAllStub,
  createStub,
  getAll,
  MongoLibMock
};
