const { Router } = require("express");
const isAuthenticated = require("../middlewares/auth.middlewares.js");

const {
    admin,
    signIn,
    realEstate,
    search,
    loginUser,
    logout,
    addUser
} = require("../controllers/admin.controllers.js");



const router = Router();

// public middleware
router.route("/signIn").get(signIn);
router.route("/signIn").post(loginUser);
router.route("/logout").post(logout);

router.route("/").get(isAuthenticated, admin);
router.route("/realEstate").get(isAuthenticated,realEstate);
router.route("/realEstate/search").get(isAuthenticated,search);
router.route("/addUser").post(isAuthenticated,addUser);

module.exports = router;
