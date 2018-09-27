module.exports.notFound = function (req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  res.status(err.status);
  res.json({ status: err.status, message: err.message });
};

module.exports.default = function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.json({"status": err.status, "message": err.message});
};
