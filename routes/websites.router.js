const express = require("express");
const router = express.Router();

const websitesController = require('../controllers/websites.controller')

router.get("/list", websitesController.getListUrls);
router.get("/list/:id", websitesController.getUrl);
router.post("/create", websitesController.createUrl);
router.delete("/list/:id", websitesController.deleteUrl);

module.exports = {router};
