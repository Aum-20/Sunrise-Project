const asyncHandler = require("../utils/asyncHandler.js");
const ApiResponse = require("../utils/ApiResponse.js");
const ApiError = require("../utils/ApiError.js");
const Buyer = require("../models/buyer.models.js");
const Seller = require("../models/seller.models.js");

const buyAndSell = (req,res) =>{
    res.render("buyandsell.ejs");
}

const buy = (req,res) =>{
    res.render("buy.ejs");
}

const sell = (req,res) =>{
    res.render("sell.ejs");
}

const addBuyer = async (req, res) => {
    // get buyer details
    // validate buyer details
    // add detils to database
    // return response

    const {
        name,
        whatsappNumber,
        mobileNumber,
        email,
        state,
        city,
        area,
        budget,
        propertyType,
    } = req.body;

    if (
        [name, whatappNumber, email, state, city, area].some(
            (field) => field === undefined || field === null || field === ""
        )
    ) {
        throw new ApiError(400, "All fields are required");
    }
    if (mobileNumber === undefined || mobileNumber === null) {
        mobileNumber = whatappNumber;
    }
    const location = {
        state: state,
        city: city,
    };
    try{
        const buyer = await Buyer.create({
            name,
            whatsappNumber,
            mobileNumber,
            email,
            location,
            area,
            budget,
            propertyType,
        });
    }catch(err){
        console.log(err);
        res.redirect("/api/v1/buyandsell");
    }
    
    console.log("Buyer added successfully");
    res.redirect('/api/v1/buyandsell');
};

const addSeller = asyncHandler(async (req, res) => {
    // get seller details
    // validate seller details
    // add seller to db
    // return response
    console.log("Inside add seller function");
    const {
        name,
        whatappNumber,
        mobileNumber,
        email,
        address,
        city,
        state,
        country,
        pincode,
        area,
        cost,
        propertyType,
    } = req.body;

    if (
        [
            name,
            whatappNumber,
            email,
            address,
            city,
            state,
            country,
            pincode,
            area,
        ].some((field) => field === undefined || field === null || field === "")
    ) {
        throw new ApiError(400, "All fields are required");
    }
    if (mobileNumber === undefined || mobileNumber === null) {
        mobileNumber = whatappNumber;
    }
    const location = {
        state: state,
        city: city,
        country: country,
        pincode: pincode,
    };
    const seller = await Seller.create(
        name,
        whatappNumber,
        mobileNumber,
        email,
        location,
        area,
        cost,
        propertyType
    );

    res.status(201).json(
        new ApiResponse(201, { seller: seller }, "Seller added sucessfully")
    );
});

module.exports = { buyAndSell, buy,sell ,addBuyer, addSeller };
