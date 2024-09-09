const { Router } = require("express");
const { home, aboutUs, contactUs } = require("../controllers/home.controllers.js");


const router = Router();

// routes declartion
router.route("/").get(home);
router.route("/home").get(home);
router.route("/aboutus").get(aboutUs);
router.route("/contactus").get(contactUs);



module.exports = router; // Export router 