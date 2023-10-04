import userModel from '../models/userModel.js'
import {comparePassword, hashPassword } from "../userauth/authProject.js";
import JWT from 'jsonwebtoken';

import orderModel from '../models/orderModel.js';


export const registerController = async (req, res) => {
    try{
        const {name, email, password, phone, address, question} = req.body;
        if(!name){
            return res.send({message: 'Name is wrong'})

        }
        if(!email){
            return res.send({message: 'Email is wrong'})
        }
        if(!password){
            return res.send({message: 'Password is wrong'})
        }
        if(!phone){
            return res.send({message: 'Phone is wrong'})
        }
        if(!address){
            return res.send({message: 'Address is wrong'})
        }
        if(!question){
            return res.send({message: 'Question is wrong'})
        }
        const existingUser = await userModel.findOne({email});

        if(existingUser){
            return res.status(400).send({
                success: false,
                message: 'Already User Login'
            })
        }
        const hashP = await hashPassword(password);
        const user = await new userModel ({name, email, phone, address, password: hashP, question}).save()
        res.status(200).send({
            success: true,
            message: "User Register",
            user
        })
    }

    catch(error){
        console.log(error);

        res.status(500).send ({
            success: false,
            message: "Error",
            error

        })
    }

};


export const loginController = async (req, res)=> {
    try{
        const {email, password} = req.body
        if(!email || !password){
            return res.status(400).send({
                success: false,
                message:' Invalid email'
            })
        }
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(400).send({
                success: false,
                message: 'The Email is not registered'
            })
        }
        const match = await comparePassword (password, user.password)
        if(!match){
            return res.status(400).send({
                success: false,
                message: 'Invalid Password',
                
            })
        }
        const token = await JWT.sign({_id: user._id}, process.env.JWT_S );
        res.status(200).send({
            success: true,
            message: 'LogIn',
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role
            },
            token,
        });
    }catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in Login',
            error

        })
    }
};

export const testController = async (req, res) => {
    
    
    try{
        res.send('protect route');
    }catch(error){
        console.log(error);
        res.send({error});
    }

}

export const forgotPasswordController = async (req, res) => {


    try{
        const {email, question, newPassword} = req.body

        if(!email){
            res.status(400).send({ message: 'Email is required' })
        }
        if(!question){
            res.status(400).send({ message: 'Question is required' })
        }
        if(!newPassword){
            res.status(400).send({ message: 'NewPassword is required' })
        }

        const user = await userModel.findOne({email, question})

        if(!user){
            return res.status(404).send({
                success: false,
                message: 'Wrong Email'
            })
        }

        const hashed = await hashPassword(newPassword)
        await userModel.findByIdAndUpdate(user._id, {password: hashed});
        res.status(200).send({
            success: true,
            message: 'Reset your Password'
        });
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Something went wrong',
            error
        })
    }
}


export const updateProfileController = async (req, res) => {
    try{
        const {name, email, password, address, phone} = req.body
        const user = await userModel.findById(req.user._id)   ;
        
        if(password && password.length < 6 ){
            return res.json({error: 'Password' });
        }
        const hashP = password ? await hashPassword(password) : undefined;
        const updatedUser = await userModel.findByIdAndUpdate(
            req.user._id,

            {
                name: name || user.name,

                password: hashP || user.password,
                phone: phone || user.phone,

                address: address || user.address
            },
            {new: true}
        );
        res.status(200).send({
            success: true,
            message: "Updated",
            updatedUser
        });

    }catch(error){
        console.log(error)
        res.status(500).send({
           success: false,
           message: 'Error in updating',
           error

        })
    }
}


export const getOrdersController = async (req,res) => {
    try{

        const orders = await orderModel.find({ buyer: req.user._id }).populate

        ('products', '-pic').populate('buyer', 'name');

        res.json(orders);
    }catch(error){

        console.log(error);
        
        res.status(500).send({
            success: false,
            message: 'Error in Orders',
            error
        })
    }

}



export const getAllOrdersController = async (req, res) => {

    try{
        const orders = await orderModel.find({}).populate
        ('products','-pic').populate('buyer', 'name').sort({createdAt: '-1'});
        res.json(orders);


    }catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Orders',
            error
        })
    }
}

export const orderStatusController = async (req, res) => {

    try{



        const {orderId} = req.params;
        const {status} = req.body;
        const orders = await orderModel.findByIdAndUpdate(orderId, {status}, {new: true});
        res.json(orders);

        
    }catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in Orders',
            error
        })
    }
    
}