const mongoose = require("mongoose"); // Import mongoose
const { Schema } = mongoose; // Extract Schema from mongoose


const sellerSchema = new Schema(
    {
        name: { type: String, required: true },
        whatsappNumber: { type: String, required: true },
        mobileNumber: { type: String },
        email: { type: String, required: true },
        location: {
            address: { type: String, required: true },
            city: { type: String, required: true },
            state: { type: String, required: true },
            pincode: { type: String, required: true },
        },
        area: { type: String, required: true },
        cost: { type: String, required: true },
        propertyType: {
            type: String,
            enum: ["plot", "agriculture-land", "apartment"],
        },
    },
    { timestamps: true }
); // create a schema

const Seller = mongoose.model("Seller", sellerSchema); // Create Seller model

module.exports = Seller; // Export Seller model
