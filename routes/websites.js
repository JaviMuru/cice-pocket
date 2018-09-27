const express = require("express");
const router = express.Router();

const websitesController = require('../controllers/websites.controller')
let dbClient = null;

router.get("/list", websitesController.getListUrls);

router.post("/create", websitesController.createUrl);

module.exports = {router};
