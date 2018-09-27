const mongo = require('../db/mongo');

module.exports.getUrls = function() {
  return mongo.selectAll();
}

module.exports.createUrl = function(name, url) {
  const element = [{"name": name, "url": url}];  
  return mongo.insert(element);
}