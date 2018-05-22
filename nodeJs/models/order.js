const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const orderSchema = new Schema({
    userId: String,
    products: [Object],
    tax: Number,
    subtotal: Number,
    total: Number
},
    {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at"
        }
});

module.exports = mongoose.model("Order", orderSchema);
