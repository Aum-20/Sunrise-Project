const asyncHandler = require("../utils/asyncHandler.js");
const ApiResponse = require("../utils/ApiResponse.js");
const ApiError = require("../utils/ApiError.js");
const Buyer = require("../models/realEstate_buyer.models.js");
const Seller = require("../models/realEstate_seller.models.js");

const realEstate = (req, res) => {
    res.render("realEstate.ejs");
};

const buy = (req, res) => {
    res.render("buy.ejs");
};

const sell = (req, res) => {
    res.render("sell.ejs");
};

const addBuyer = asyncHandler(async (req, res, next) => {
    // Get buyer details from request body
    const { name, whatsappNumber, mobileNumber, email, state, city, area, budget, propertyType } = req.body;

    // Validate required fields
    if ([name, whatsappNumber, email, state, city, area].some(field => !field)) {
        return next(new ApiError(400, "All required fields must be provided"));
    }

    // Default mobileNumber to whatsappNumber if not provided
    const finalMobileNumber = mobileNumber || whatsappNumber;

    // Create location object
    const location = { state, city };

    // Create the buyer in the database
    const buyer = await Buyer.create({
        name,
        whatsappNumber: whatsappNumber,
        mobileNumber: finalMobileNumber,
        email,
        location,
        area: area,
        budget: budget,
        propertyType,
    });

    // console.log("Buyer added successfully");

    // Send a JSON response or redirect, depending on your API design
    // res.status(201).send("Thank you.. \n Our team will reach out to you!!!");
    res.render("thankyou.ejs");
});

const addSeller = asyncHandler(async (req, res) => {
    // Get seller details from request body
    // console.log("Inside add seller function");
    // console.log(req.body);
    
    const {
        name,
        whatsappNumber,
        mobileNumber,
        email,
        address,
        city,
        state,
        pincode,
        area,
        cost,
        propertyType
    } = req.body;
    
    // Validate required fields
    if (
        [
            name,
            whatsappNumber,
            email,
            address,
            city,
            state,
            pincode,
            area,
            cost,
        ].some((field) => field === undefined || field === null || field === "")
    ) {
        throw new ApiError(400, "All fields are required");
    }
    
    // If mobileNumber is not provided, default to whatsappNumber
    const finalMobileNumber = mobileNumber || whatsappNumber;
    
    // Create location object
    const location = {
        address,
        city,
        state,
        pincode: pincode,
    };
    
    // Create a new seller object
    const seller = await Seller.create({
        name,
        whatsappNumber,
        mobileNumber:finalMobileNumber,
        email,
        location,
        area,
        cost,
        propertyType,
    });

    // Send response
    // console.log("Seller added successfully");
    // res.status(201).send("Thank you.. \n Our team will reach out to you!!!");
    res.render("thankyou.ejs");
});


module.exports = { realEstate, buy, sell, addBuyer, addSeller };
