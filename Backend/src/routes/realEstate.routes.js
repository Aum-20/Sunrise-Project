const { Router } = require("express");
const {realEstate,buy,sell, addBuyer, addSeller} = require("../controllers/realEstate.controllers");

const router = Router();

router.route("/").get(realEstate);
router.route("/buy").get(buy);
router.route("/sell").get(sell);
router.route("/buy").post(addBuyer);
router.route("/sell").post(addSeller);


module.exports = router;
