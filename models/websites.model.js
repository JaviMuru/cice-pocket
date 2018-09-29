const mongo = require('../db/mongo');

module.exports.getUrls = function() {
  return mongo.selectAll();
}

module.exports.getUrl = function(id) {
  return mongo.findById(id);
}

module.exports.createUrl = function(name, url) {
  const element = {"name": name, "url": url};  
  return mongo.insertOne(element);
}