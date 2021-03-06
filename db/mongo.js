const mongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
const DB_NAME = process.env.DB_NAME || "cicewebsites";
const DB_URL = `mongodb://${process.env.DB_URL || "localhost:27017"}`;

function connect() {
  return mongoClient.connect(DB_URL, { useNewUrlParser: true })
  .then(client => {
    // console.log("Connected successfully to server");
    return client.db(DB_NAME);
  })
  .catch(error => console.log(error.message));
}

module.exports.selectAll = async function() {
  const mongo = await connect();
  const collection = mongo.collection('urls');
  return new Promise((resolve, reject) => {
    collection.find().toArray((err, docs) => {
      if (err) {
        return reject (err);
      }

      if (!docs) {
        let err = new Error('Not Found');
        err.status = 404;
        return reject(err);
      }
      return resolve(docs);
    });
  });
}

module.exports.findById = async function(id) {
  const mongo = await connect();
  const collection = mongo.collection('urls');
  return new Promise((resolve, reject) => {
    collection.find({"_id": ObjectId(id)}).toArray((err, element) => {
      if (err) {
        return reject (err);
      }       
      if (!element || element.length <= 0) {
        let err = new Error('Not Found');
        err.status = 404;
        return reject(err);
      }
      return resolve(element[0]);
    });
  });
}

module.exports.insertOne = async function(element) {
  const mongo = await connect();
  const collection = mongo.collection('urls');
  return new Promise((resolve, reject) => {
    collection.insertOne(element, (err, result) => {      
      if (err) {
        return reject(err);
      }
      return resolve(result)
    });
  });
}

module.exports.deleteById = async function(id) {
  const mongo = await connect();
  const collection = mongo.collection('urls');
  return new Promise((resolve, reject) => {
    collection.remove({"_id": ObjectId(id)}, (err, element) => {
      if (err) {
        return reject (err);
      }       
      return resolve(element);
    });
  });
}
