const mongoose = require("mongoose"); // Import mongoose
const { Schema } = mongoose; // Extract Schema from mongoose


const contactUsSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phoneNo: { type: String, required: true },
        state: { type: String, required: true },
        msg: { type: String, required: true }
    },
    { timestamps: true }
); // create a schema

const ContactUs = mongoose.model("ContactUs", contactUsSchema); // Create ContactUs model

module.exports = ContactUs; // Export ContactUs model