const asyncHandler = require("../utils/asyncHandler.js");
const ContactUs = require("../models/contactUs.models.js");

const getContactUs = (req, res) => {
    res.render("contact.ejs");
};

const contactUs = asyncHandler(async (req, res) => {
    const { name, email, phoneNo, state, msg } = req.body;

    if (!name || !email || !phoneNo || !state || !msg) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // store data to database
    const contact = await ContactUs.create({
        name,
        email,
        phoneNo,
        state,
        msg,
    });

    res.render("thankyou.ejs");
});

module.exports = { getContactUs, contactUs };
