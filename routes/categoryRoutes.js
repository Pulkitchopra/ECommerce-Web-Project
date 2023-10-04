import express from 'express'
import {isAdmin, SignIn} from './../middlewares/authMiddleWare.js'
import { createCategoryController, updateCategoryController, singleCreateController, categoryController, deleteCategoryController } from '../controllers/categoryController.js'


const router = express.Router()

router.post('/create-category', SignIn, isAdmin, createCategoryController);
router.put('/update-category/:id', SignIn, isAdmin, updateCategoryController);
router.get('/get-category', categoryController );

router.get('/single-category/:slug', singleCreateController );

router.delete('/delete-category/:id', SignIn, isAdmin, deleteCategoryController);

export default router