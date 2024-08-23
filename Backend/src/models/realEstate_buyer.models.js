const mongoose = require("mongoose");
const { Schema } = mongoose;

const buyerSchema = new Schema(
    {
        name: { type: String, required: true },
        whatsappNumber: { type: String, required: true },
        mobileNumber: { type: String },
        email: { type: String, required: true },
        location: {
            state: { type: String, required: true },
            city: { type: String, required: true },
        },
        area: { type: String },
        budget: { type: String },
        propertyType: { type: String, enum:["plot", "agriculture-land", "apartment"] },
    },
    { timestamps: true }
);

const Buyer = mongoose.model("Buyer", buyerSchema);

module.exports = Buyer;
