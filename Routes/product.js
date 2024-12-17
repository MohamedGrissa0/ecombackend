const express = require('express');
const multer = require('multer');
const Product = require('../Models/Product');
const router = express.Router();

// Set up multer for file uploads
const upload = multer({ dest: 'uploads' });

router.get("/", async (req,res) => {
     try 
     {
        const response = await Product.find({})
       res.status(200).json(response)
     }
     catch(err)
     {
        res.status(500).json(err)
     }
} )


router.delete("/:id", async (req,res) => {
    const id = req.params.id
    try 
    {
       const response = await Product.deleteOne({_id:id})
       const products = await Product.find()
      res.status(200).json(products)
    }
    catch(err)
    {
       res.status(500).json(err)
    }
} )

router.put("/:id", upload.array('images', 4), async (req, res) => {
    const id = req.params.id;
    const updatedProductData = req.body; // The new product data from the request
    const images = req.files ? req.files.map(file => file.path) : []; // Extract file paths for images
     console.log(req.files)
     console.log(req.body)

    try {
        // Find the product by ID
        const product = await Product.findById(id);
        
        // Check if the product exists
        if (!product) {
            return res.status(404).json("No product found");
        }

        // Update the product fields if they exist in the request body
        product.name = updatedProductData.name || product.name;
        product.description = updatedProductData.description || product.description;
        product.price = updatedProductData.price || product.price;
        product.brand = updatedProductData.brand || product.brand;
        product.stockQuantity = updatedProductData.stockQuantity || product.stockQuantity;
        product.category = updatedProductData.category || product.category;
        
        // If new images are uploaded, update the images array
        if (images.length > 0) {
            product.images = images; // Replace with new images
        }

        // Save the updated product
        const updatedProduct = await product.save();
        const products = await Product.find()

        // Respond with the updated product
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



// Create a new product
router.post('/', upload.array('images', 12), async (req, res) => {
    const { name, description, price,oldprice, brand, stockQuantity, category } = req.body;
    const images = req.files.map(file => file.path); // Extract file paths for images

    try {
        const newProduct = new Product({
            name,
            description,
            price,
            oldprice,
            brand,
            stockQuantity,
            category,
            images, // Store image paths in the database
        });

        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
router.get('/:categoryname?', async (req, res) => {
    let products = [];
    try {
        const { categoryname } = req.params;

        // If categoryname exists, find products by category
        if (categoryname) {
            products = await Product.find({ category: categoryname });
        } else {
            // Fetch all products if no categoryname is provided
            products = await Product.find();
        }

        res.status(201).json(products);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/p/:id', async (req, res) => {

    try {
        const { id } = req.params; // Destructure categoryname from req.params
        // If categoryname exists, find products by category
            const products = await Product.findById(id);
        

        res.status(201).json(products);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
router.get('/search/:id', async (req, res) => {
    try {
        const { id } = req.params; // Get the search term from the request params
        
        // Find all products and filter them based on the search term
        const products = await Product.find(); // Fetch all products
        const filteredProducts = products.filter((product) => 
            product.name.toLowerCase().includes(id.toLowerCase()) // Filter by product name
        );

        res.status(200).json(filteredProducts); // Respond with filtered products
    } catch (error) {
        res.status(400).json({ error: error.message }); // Handle errors
    }
});



module.exports = router;
