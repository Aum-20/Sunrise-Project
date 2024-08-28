const asyncHandler = require("../utils/asyncHandler");
const Buyer = require("../models/realEstate_buyer.models.js");
const Seller = require("../models/realEstate_seller.models.js");
const User = require("../models/user.models.js");
const ApiError = require("../utils/ApiError.js");
const ApiResponse = require("../utils/ApiResponse.js");


const admin = (req, res) => {
    res.render("admin.ejs");
};

const signIn = (req, res) => {
    res.render("signIn.ejs");
};

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(400, 'All fields are required');
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(404, 'User not found');
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password);

    if (!isPasswordCorrect) {
        throw new ApiError(401, 'Incorrect user credentials');
    }

    // Set session user
    req.session.user = user;
    // console.log(req.session.user);
    res.redirect('/admin');
});

const logout = (req, res) => {
    // console.log("Inside logout");
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/admin');
        }
        res.redirect('/home'); // Redirect to login after logout
    });
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
    if (query === undefined || query === "") {
        return res.redirect("/admin/realEstate");
    }

    // Regular expressions to match fields that start with the query
    const regex = new RegExp("^" + query, "i");

    const buyers = await Buyer.find({
        $or: [
            { name: regex },
            { "location.state": regex },
            { "location.city": regex },
            { area: regex },
            { budget: regex }, // if budget is numeric, convert to string for regex match
            { propertyType: regex },
            { mobileNumber: regex },
            { whatsappNumber: regex },
            { email: regex },
        ],
    });

    const sellers = await Seller.find({
        $or: [
            { name: regex },
            { "location.state": regex },
            { "location.city": regex },
            { mobileNumber: regex },
            { whatsappNumber: regex },
            { email: regex },
            { comments: regex },
            { propertyType: regex },
            { cost: regex },
            { area: regex },
        ],
    });

    res.render("admin_realEstate.ejs", { buyers, sellers });
});

const addUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
        email,
        password,
    });

    // select is used for removing fields from the response
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    if (!createdUser) {
        throw new ApiError(500, "User not created");
    }

    res.status(201).json(
        new ApiResponse(
            201,
            {
                user: createdUser,
            },
            "User created successfully"
        )
    );
});

const deleteBuyer = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const buyer = await Buyer.findByIdAndDelete(id);

    if(!buyer) {
        throw new ApiError(404, 'Buyer not found');
    }

    res.status(200).redirect('/admin/realEstate');
});

const deleteSeller = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const seller = await Seller.findByIdAndDelete(id);

    if(!seller) {
        throw new ApiError(404, 'Seller not found');
    }

    res.status(200).redirect('/admin/realEstate');
});

module.exports = {
    admin,
    signIn,
    realEstate,
    search,
    loginUser,
    logout,
    addUser,
    deleteBuyer,
    deleteSeller,
};
