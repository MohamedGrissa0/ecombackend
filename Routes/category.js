const express = require('express');
const Category = require('../Models/Category'); // Corrected from `Product` to `Order`
const router = express.Router();
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('image'), async (req, res) => {
    console.log(req.body);
    console.log(req.file.path);
  
    const { categoryName, categoryDescription } = req.body;
    const { path } = req.file; // This is the path to the uploaded file
  
    try {
      const newCategory = new Category({
        Name: categoryName,
        Description: categoryDescription,
        Image: path // Match "Image" field in schema
      });
  
      await newCategory.save();
      res.status(201).json(newCategory);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
router.get('/', async (req, res) => {
    try {
        const Categories = await Category.find()

        res.status(201).json(Categories);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
