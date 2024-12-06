const express = require('express');
const Order = require('../Models/Order'); // Corrected from `Product` to `Order`
const router = express.Router();


router.post('/', async (req, res) => {
    const { Products, TotalPrice, TotalQuantity, DeliveryPrice, customerName, customerAddress, customerPhone } = req.body;

    try {
        const newOrder = new Order({
            Products,
            TotalPrice,
            TotalQuantity,
            DeliveryPrice,
            customerName, // Field name matches
            customerAddress, // Field name matches
            customerPhone, // Field name matches
        });

        await newOrder.save();
        res.status(201).json(newOrder); // Send back the created order
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


module.exports = router;


