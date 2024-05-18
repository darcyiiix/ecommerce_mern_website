import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    name: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});

const dimensionSchema = new mongoose.Schema({
    diameter: {
        type: Number,
        required: true,
    },
    height: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
});

const productSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    name: {
        type: String,
        required: true,
    },
    image: [{
        type: String,
        required: true,
    }],
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    countInStock: {
        type: Number,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    numReviews: {
        type: Number,
        required: true,
    },
    dimension: [dimensionSchema],
    reviews: [reviewSchema], // Adding the reviews field
    colors: [{
        type: String,
        required: true,
    }],
}, {
    timestamps: true
});

const Product = mongoose.model("Product", productSchema);

export default Product;
