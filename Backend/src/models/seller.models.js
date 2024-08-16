const mongoose = require("mongoose"); // Import mongoose
const { Schema } = mongoose; // Extract Schema from mongoose

const addressSchema = {
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    pincode: { type: String, required: true },
};

const sellerSchema = new Schema(
    {
        name: { type: String, required: true },
        whatappNumber: { type: String, required: true },
        mobileNumber: { type: String },
        email: { type: String, required: true },
        location: { addressSchema},
        area: { type: String, required: true },
        cost: { type: String, required: true },
        // images: { type: String },
        propertyType: { type: String, required: true },
    },
    { timestamps: true }
); // create a schema

const Seller = mongoose.model("Seller", sellerSchema); // Create Seller model

module.exports = Seller; // Export Seller model
