const models = require("../Models/Models");

module.exports.CreateProduct = async (req, res) => {
    try {

        const product = {
            productId: req.body.Product.productId || '', // If productId is coming from frontend, assign it
            name: req.body.Product.name || '',
            description: req.body.Product.description || '',
            price: req.body.Product.price || 0,
            category: req.body.Product.category || '',
            images: [], // This will be populated below
            stock: req.body.Product.stock || 0,
            uploadedBy: '', // Populate this with actual uploader's info
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        if (req.file) {
            product.images.push(req.file.path); // Store the path of the uploaded image
        }

        console.log(product);

        res.status(201).json({ message: "Product created successfully", product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while creating the product." });
    }
};
