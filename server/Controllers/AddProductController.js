const models = require("../Models/Models");

module.exports.CreateProduct = async (req, res) => {
    try {
        console.log(req.body.category[0]);
        const product = {
            name: req.body.productName || '',
            description: req.body.description || '',
            price: req.body.price || 0,
            category: req.body.category || '',
            images: [], // This will be populated below
            stock: req.body.stock || 0,
            uploadedBy: req.body.uploadedBy, // Populate this with actual uploader's info
            createdAt: new Date(),
            updatedAt: new Date(),
            rating:''
        };

        if (req.file) {
            // console.log(req.file.filename);
            product.images.push(req.file.filename); // Store the path of the uploaded image
        }
        var len = await ( models.Product.find({}));

        product.rating = product.rating==''?5:product.rating;
        var Prd = new models.Product(product);
        Prd.productId="p"+(len.length+1);
        
        console.log(Prd);
        Prd.save();

        res.status(201).json({ message: "Product created successfully", product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while creating the product." });
    }
};
