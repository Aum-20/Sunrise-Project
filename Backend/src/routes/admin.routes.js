const { Router } = require("express");
const isAuthenticated = require("../middlewares/auth.middlewares.js");

const {
    admin,
    signIn,
    realEstate,
    search,
    loginUser,
    logout,
    addUser,
    deleteBuyer,
    deleteSeller,
    contactUsData,
    deleteContactUsData,
    searchContactUsData
} = require("../controllers/admin.controllers.js");



const router = Router();

// public middleware
router.route("/signIn").get(signIn);
router.route("/signIn").post(loginUser);
router.route("/logout").post(logout);
router.route("/").get(isAuthenticated, admin);
router.route("/realEstate").get(isAuthenticated,realEstate);
router.route("/realEstate/search").get(isAuthenticated,search);
router.route("/addUser").post(addUser);
router.route("/realEstate/buyer/:id").post(isAuthenticated,deleteBuyer);
router.route("/realEstate/seller/:id").post(isAuthenticated,deleteSeller);

router.route("/contactUs").get(isAuthenticated,contactUsData);
router.route("/contactUs/:id").post(isAuthenticated,deleteContactUsData);
router.route("/contactUs/search").get(isAuthenticated,searchContactUsData);


module.exports = router;
