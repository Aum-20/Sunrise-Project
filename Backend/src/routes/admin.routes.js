const { Router } = require("express");
const { admin, realEstate, search } = require("../controllers/admin.controllers.js");

const router = Router();

router.route("/").get(admin);
// router.route('/').post(logIn);
router.route("/realEstate").get(realEstate);
router.route("/realEstate/search").get(search);

module.exports = router;
