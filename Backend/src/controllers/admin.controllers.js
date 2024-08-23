const asyncHandler = require("../utils/asyncHandler");
const Buyer = require("../models/realEstate_buyer.models.js");
const Seller = require("../models/realEstate_seller.models.js");

const admin = (req, res) => {
    res.send("Admin Page");
};
const realEstate = asyncHandler(async (req, res) => {
    // res.send("buy and sell page");

    // we have to send all buyer detials
    // we have to send all seller details

    const buyers = await Buyer.find();
    const sellers = await Seller.find();

    res.render("admin_realEstate.ejs", { buyers, sellers });
});

const search = asyncHandler(async (req, res) => {
    // res.send("search page");
    const query = req.query.key;
    // console.log(query); 
    if(query === undefined || query === "") {
        return res.redirect("/api/v1/admin/realEstate");
    }

    // Regular expressions to match fields that start with the query
    const regex = new RegExp('^' + query, 'i');

    const buyers = await Buyer.find({
        $or: [
            { name: regex },
            { 'location.state': regex },
            { 'location.city': regex },
            {area: regex},
            { budget: regex }, // if budget is numeric, convert to string for regex match
            { propertyType: regex },
            { mobileNumber: regex },
            { whatsappNumber: regex },
            { email: regex }
        ]
    });

    const sellers = await Seller.find({
        $or: [
            { name: regex },
            { 'location.state': regex },
            { 'location.city': regex },
            { mobileNumber: regex },
            { whatsappNumber: regex },
            { email: regex },
            { comments: regex },
            { propertyType: regex },
            { cost: regex }, 
            { area: regex }  
        ]
    });

    res.render("admin_realEstate.ejs", { buyers, sellers });
});
module.exports = { admin, realEstate , search};
