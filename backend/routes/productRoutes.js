import express from 'express';
const router = express.Router();
import { protect, admin } from '../middleware/authMiddleware.js'
import { getProducts, getProductByID, decrementProduct, createProduct, updateProduct, deleteProduct, createProductReview, getTopProducts, checkFunc, copyProduct} from '../controllers/productController.js';

router.route('/')
    .get(getProducts)
    .post(protect, admin, (req, res, next) => {
        if (req.query.copy && req.query.productId) {
            copyProduct(req, res, next);
        } else {
            createProduct(req, res, next);
        }
    });
router.get('/top', getTopProducts);
router.route('/:id').get(getProductByID).put(protect, admin, updateProduct).delete(protect, admin, deleteProduct);
router.route('/:id/reviews').post(protect, createProductReview);
router.route('/:productId/decrement').put(decrementProduct);
router.route('/copy/:productId').post(copyProduct);
router.route('/check', checkFunc)
export default router;