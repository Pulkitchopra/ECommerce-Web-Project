import express from "express";
import { registerController, loginController, testController, forgotPasswordController, updateProfileController, getOrdersController, getAllOrdersController, orderStatusController } from "../controllers/authController.js";
import { SignIn, isAdmin  } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post('/register', registerController);

router.post('/login', loginController);
router.post('/forgot-password', forgotPasswordController);
router.get('/test', SignIn, isAdmin, testController);
router.get("/user-auth", SignIn, (req, res) => {
    res.status(200).send({ok: true});

});
router.get("/admin-auth", SignIn, isAdmin, (req, res) => {
    res.status(200).send({ok: true});

});




router.put('/profile', SignIn, updateProfileController);
router.get('/orders', SignIn, getOrdersController);
router.get('/all-orders', SignIn, isAdmin, getAllOrdersController);


router.put('/order-status/:orderId', SignIn, isAdmin, orderStatusController);


export default router