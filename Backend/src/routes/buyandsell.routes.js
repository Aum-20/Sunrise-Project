const { Router } = require("express");
const {buyAndSell,buy,sell, addBuyer, addSeller} = require("../controllers/buyandsell.controllers");

const router = Router();

router.route("/").get(buyAndSell);
router.route("/buy").get(buy);
router.route("/sell").get(sell);
router.route("/buy").post(addBuyer);
router.route("/sell").post(addSeller);


module.exports = router;
