const websiteModel = require('../models/websites.model');

module.exports.getListUrls = function(req, res, next) {
  websiteModel.getUrls()
  .then(result => res.json(result))
  .catch(reason => next(reason));
}

module.exports.createUrl = function(req, res, next) {
  const name = req.body.name;
  const url = req.body.url;

  if (name === undefined) {   
    const err = new Error('Bad Request: undefined name');
    err.status = 400;
    next(err);
    return;
  }

  if (url === undefined) {   
    const err = new Error('Bad Request: undefined URL');
    err.status = 400;
    next(err);
    return;
  }

  websiteModel.createUrl(name, url)
  .then(result => res.json(result))
  .catch(reason => next(reason));
}