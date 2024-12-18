const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    Products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        },
    ],
    TotalQuantity: {
        type: Number,
        required: true,
    },
    TotalPrice: {
        type: Number,
        required: true,
    },
    DeliveryPrice: {
        type: Number,
        required: true,
    },
    // Customer Information
    customerName: {
        type: String,
        required: true,
    },
    customerAddress: {
        type: String,
        required: true,
    },
    customerPhone: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
