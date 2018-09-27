const mongoClient = require("mongodb").MongoClient;
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
    // const collection = db.collection('documents');
    collection.find().toArray((err, docs) => {
      if (err) {
        return reject (err);
      }

      if (!docs) {
          let err = new Error('Not Found');
          err.status = 404;
          return reject(err);
      }
      
      // console.log("Found the following records");
      return resolve(docs);
      // callback(docs);
    });
    // mongoClient.connect(DB_URL, { useNewUrlParser: true }, function(err, db) {
    //   if (err) {
    //     reject(err);
    //   }
    //   var dbo = db.db(DB_NAME);
    //   dbo.collection("customers").findOne({}, function(err, result) {
    //     if (err) throw err;
    //     console.log(result.name);
    //     db.close();
    //   });
    // });
    // mongo.find({}).toArray(function(err, results) {
    //   if (err) {
    //     return reject(err);
    //   }

    //   if (!results) {
    //     let err = new Error('Not Found');
    //     err.status = 404;
    //     return reject(err);
    //   }

    //   resolve(results, fields);
    // });
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