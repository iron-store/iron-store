const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const orderSchema = new Schema({
    userId: String,
    userName: String,
    userEmail: String,
    products: [],
    tax: Number,
    subtotal: Number,
    taxAmount: Number,  
    total: Number
},
    {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
});

module.exports = mongoose.model("Order", orderSchema);
