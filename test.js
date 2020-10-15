
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://movies_mongo_db:KSpGzvQKUdQk1uC1@cluster0.hkri7.mongodb.net/platzi_movies_db?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("platzi_movies_db").collection("movies");
  // perform actions on the collection object
  client.close();
});