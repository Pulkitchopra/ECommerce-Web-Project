import express from 'express'
import {isAdmin, SignIn} from '../middlewares/authMiddleWare.js'
import formidable from 'express-formidable'

import {createProductController, getProductController, getSingleProductController, productListController, productPicController, deleteProductController, productFiltersController, updateProductController, productSearchController, productCountController, relatedProductController, productCategoryController, brainTreeTokenController, brainTreePaymentController } from '../controllers/productController.js'
const router = express.Router()

router.post('/create-product', SignIn, isAdmin, formidable(), createProductController);
router.put('/update-product/:pid', SignIn, isAdmin, formidable(), updateProductController );
router.get('/get-product', getProductController);



router.get("/get-product/:slug", getSingleProductController);
router.get("/product-pic/:pid", productPicController );
router.delete('/product/:pid',deleteProductController);

router.post('/product-filters', productFiltersController );
router.get('/product-count', productCountController);
router.get('/product-list/:page', productListController);

router.get('/product-search/:keyword', productSearchController);
router.get('/related-product/:pid/:cid', relatedProductController);
router.get('/product-category/:slug', productCategoryController);



router.get('/braintree/token', brainTreeTokenController);

router.post('/braintree/payment', SignIn, brainTreePaymentController);
export default router

