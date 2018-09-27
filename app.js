const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const websitesRouter = require("./routes/websites.router");
const PORT = process.env.PORT || 3001;
const errorsController = require('./controllers/errors.controller');

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// Seteo el router de websites
app.use("/website", websitesRouter.router);

// catch 404
app.use(errorsController.notFound);

// error handler
app.use(errorsController.default);

app.listen(PORT);

module.exports = app;
