import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

// @desc Fetch all products
// @route GET /api/products
// @access Public

const getProducts = asyncHandler(async (req, res) => {
    
    const keyword = req.query.keyword ? {name: {$regex: req.query.keyword, $options: 'i'} } : {};
    const products = await Product.find({...keyword});
    res.json({products});
});

const getAllProducts = asyncHandler(async (req, res) => {
    
    const products = await Product.find({});
    res.json(products);
});

// @desc Decrement product quantity 
// @route PUT /api/products/:productId/decrement
// @access Public


const decrementProduct = async (req, res) => {
    const productId = req.params.productId;
    const { qty } = req.body;
  
    try {
      // Find the product by its ID
      const product = await Product.findById(productId);
  
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      // Decrement the product quantity
      product.countInStock -= qty;
  
      // Save the updated product
      await product.save();
  
      res.json({ message: 'Product quantity decremented successfully', product });
    } catch (error) {
      console.error('Error decrementing product quantity:', error);
      res.status(500).json({ message: 'Internal server error' });
    }

}

const checkFunc = async (req, res) => {
    res.send(console.log('hello'));
}



// @desc Fetch a product
// @route GET /api/products/:id
// @access Public

const getProductByID = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if(product){
       return res.json(product);
    } else{
        res.status(404);
        throw new Error('Resource not found');
    }
});

// @desc Create a product
// @route POST /api/products
// @access Private/Admin

const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        name: 'Sample name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'Sample brand',
        category: 'Sample category',
        countInStock: 0,
        rating: 0,
        numReviews: 0,
        description: 'Sample description'
    })

    const sampleProduct = product.save();
    res.status(201).json(sampleProduct);
});

// @desc Copy a product
// @route POST /api/products
// @access Private/Admin


const copyProduct = asyncHandler(async (req, res) => {
    const productId = req.query.productId;

    // Find the existing product
    const existingProduct = await Product.findById(productId);

    if (!existingProduct) {
        res.status(404);
        throw new Error('Product not found');
    }

    // Create a new product based on the existing product
    const copiedProduct = new Product({
        name: existingProduct.name,
        price: existingProduct.price,
        user: req.user._id, // assuming the current user is creating the copied product
        image: existingProduct.image,
        brand: existingProduct.brand,
        category: existingProduct.category,
        countInStock: existingProduct.countInStock,
        rating: existingProduct.rating,
        numReviews: existingProduct.numReviews,
        description: existingProduct.description,
        dimension: existingProduct.dimension,
        colors: existingProduct.colors,
    });

    const savedCopiedProduct = await copiedProduct.save();

    res.status(201).json(savedCopiedProduct);
});

// @desc Update a product
// @route PUT /api/product/:id/edit
// @access Private/Admin

const updateProduct = asyncHandler (async (req, res) => {
    const { name, price, description, image, brand, category, countInStock, dimension } = req.body;

    const product = await Product.findById(req.params.id);

    if(product){ 
        product.name = name;
        product.price = price;
        product.description = description;
        product.image = image;
        product.brand = brand;
        product.category = category;
        product.countInStock = countInStock;
        product.dimension = dimension;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else {
        res.status(404);
        throw new Error('Resource not found');
    }
});

// @desc Delete a product
// @route DELETE /api/product/:id/delete
// @access Private/Admin

const deleteProduct = asyncHandler (async (req, res) => {
    
    const product = await Product.findById(req.params.id)

    if(product){ 
        await Product.deleteOne({_id: product._id})
        res.status(200).json({message: 'Product deleted'});
    } else {
        res.status(404);
    }
});

// @desc Review a product
// @route DELETE /api/product/:id/delete
// @access Private/Admin

const createProductReview = asyncHandler (async (req, res) => {

    const {rating, comment} = req.body;
    
    const product = await Product.findById(req.params.id)

    if(product){ 
        const alreadyReviewed = product.reviews.find((review) => review.user.toString() === req.user._id.toString());

        if(alreadyReviewed){
            res.status(400);
            throw new Error('Product Already Reviewed');
        }
     

    const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
    }

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating = product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length;

    await product.save();
    res.status(200).json({message: 'Review added'});
    
    } else{
        res.status(404);
        throw new Error('Resource not found');
    }
});

// @desc Get top rated products
// @route GET /api/products/top
// @access Public

const getTopProducts = asyncHandler(async (req, res) => {
    const product = await Product.find({}).sort({rating: -1}).limit(3);
    res.status(200).json(product);

});


export { getProducts, getAllProducts, decrementProduct, copyProduct, checkFunc, getProductByID, createProduct, updateProduct, deleteProduct, createProductReview, getTopProducts };