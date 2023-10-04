import productModel from '../models/productModel.js';
import fs from 'fs';
import slugify from 'slugify';

import categoryModel from '../models/categoryModel.js';
import braintree from 'braintree';

import orderModel from '../models/orderModel.js';
import dotenv from 'dotenv'

dotenv.config();
 var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: process.env.BRAINTREE_MERCHANT_ID,
    publicKey: process.env.BRAINTREE_PUBLIC_KEY ,

    privateKey: process.env.BRAINTREE_PRIVATE_KEY

});

export const createProductController = async (req, res) => {  
    try{
        const{name, slug, description, price, category, quantity, shipping} = req.fields
        const {pic} = req.files
        switch(true){
            case !name:
                return res.status(500).send({error: 'Name is Required'})
            case !description:
                return res.status(500).send({error: 'Description is Required'})
            case !price:
                return res.status(500).send({error: 'Price is Required'})
            case !category:
                return res.status(500).send({error: 'Category is Required'})
            case !quantity:
                return res.status(500).send({error: 'Quantity is Required'})
            case pic && pic.size > 1000000:
                return res.status(500).send({error: 'Pic is Required'})
        }
        const products = new productModel({...req.fields, slug: slugify (name) })
        if(pic){
            products.pic.data = fs.readFileSync(pic.path);
            products.pic.contentType = pic.type;
        }



        await products.save();
        res.status(200).send({
            success: true,
            message: 'Product Created Successfully',
            products
        });

    }catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in product',
            error
        })
    }

};


export const getProductController =  async (req, res) => {

    try{
        const products = await productModel.find({})
        .select("-pic").limit(16).sort({ createdAt: -1 }).populate('category');
        res.status(200).send({
            success: true,
            messsage: 'All Products',
            count: products.length,
            products
        })

    }catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in products',
            error
        })
    }

};


export const getSingleProductController = async (req, res) => {


    try{
        const product = await productModel.findOne({slug: req.params.slug})
        .select("-pic").populate('category');
        res.status(200).send({
            success: true,
            message: 'Single Product',
            product
        })
    } catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message: 'Error in Products',
            error
        })
    }
};
export const productPicController = async (req, res) => {
    try{
        const product = await productModel.findById(req.params.pid).select("pic");
        if(product.pic.data){
            res.set("Content-type", product.pic.contentType);
            return res.status(200).send(product.pic.data);
        }

    }catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in products',
            error
        })
    }
};


export const deleteProductController = async (req, res) => {

    try{

        await productModel.findByIdAndDelete(req.params.pid).select("-pic");
        res.status(200).send({
            success: true,
            message: 'Product is deleted'
        });

    }catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in products',
            error
        })
    }
};


export const updateProductController = async (req, res) => {

    try{
        const {name, slug, description, price, category, quantity, shipping} = req.fields;
        const {pic} = req.files


        switch(true){
            case !name:
                return res.status(500).send({error: 'Name is required'})
            case !description:
                return res.status(500).send({error: 'Description is required'})
            case !price:
                return res.status(500).send({error: 'Price is required'})
            case !category:
                return res.status(500).send({error: 'Category is required'})
            case !quantity:
                return res.status(500).send({error: 'Quantity is required'})
            case pic && pic.size > 1000000:
                return res.status(500).send({error: 'Name is required'})
        }



        const products = await productModel.findByIdAndUpdate(req.params.pid,
            {...req.fields, slug:slugify(name)}, {new: true}
            )
        if(pic){
            products.pic.data = fs.readFileSync(pic.path);
            products.pic.contentType = pic.type;
        }
        await products.save();
        res.status(200).send({
            success: true,
            message: 'Product is Updated',
            products
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in products',
            error
        })
    }

};
export const productFiltersController = async (req,res) => {
    try{
        const {checked, radioFilter} = req.body
        let args = {}
        if(checked.length > 0) {
            args.category = checked
        }
        if(radioFilter.length) {
            args.price = {$gte: radioFilter[0], $lte: radioFilter[1] }
        }
        const products = await productModel.find(args)
        res.status(200).send({
            success: true,
            products
        })

    }catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in Products',
            error
        })
    }

};

export const productCountController = async (req, res) => {


    try{

        const total = await productModel.find({}).estimatedDocumentCount()
        res.status(200).send({
            success: true,
            total
        })

    }catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in Products',
            error
            
        })
    }
};

export const productListController = async (req, res) => {
    try{

        const perPage = 3
        const page = req.params.page ? req.params.page : 1
        const products = await productModel.find({}).select("-pic")
        .skip((page - 1)* perPage).limit(perPage).sort({createdAt: -1});
        res.status(200).send({
            success: true,
            products,
        });

    }catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in Products',
            error
        })
    }
};


export const productSearchController = async (req, res) => {
    try{
        const {keyword} = req.params;
        const results = await productModel.find({
            $or: [
                {name: {$regex: keyword, $options: "i" }},
                {description: {$regex: keyword, $options: "i" }}
            ]
        }).select("-pic");
        res.json(results);

    }catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in Products',
            error
        })
    }
};

export const relatedProductController = async (req, res) => {
    try{

        const {pid, cid} = req.params
        const products = await productModel.find({
            category: cid,
            _id:{$ne:pid} 

        }).select("-pic").limit(3).populate("category")
        res.status(200).send({
            success: true,
            products
        })
    }
    catch(error){
        console.log(error)
            res.status(500).send({
                success: false,
                message: 'Error in Products',
                error
            })
        }
};


export const productCategoryController = async (req, res) =>{
    try{
        const category = await categoryModel.findOne({slug: req.params.slug});
        const products = await productModel.find({category}).populate('category');
        res.status(200).send({
            success: true,
            category,
            products,
        })

    }catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in Products",
            error
        })
    }

}


export const brainTreeTokenController = async (req, res) => {

    
    try{
        gateway.clientToken.generate({}, function(err, response) {
            

            if(err){
                res.status(500).send(err)
            } else {
                res.send(response)
            }
        } )

    }catch(error){
        console.log(error)
        
    }

}

export const brainTreePaymentController = async (req, res) => {
    try{

        const {cart, nonce} = req.body
        let total = 0;
        cart.map((i) => {
            total += i.price;
        }
        );
        

        let newTransactions = gateway.transaction.sale({
            amount: total,
            paymentMethodNonce: nonce,
            options: {
                submitForSettlement: true
            }
        },
        


        function(error, result) {
            if(result){

                const order = new orderModel({
                    products: cart,
                    payment: result,
                    buyer: req.user._id
                }).save()
                res.json({ok: true}) 
                
            }
            else{

                res.status(500).send(error)
            }
        }
        )
    }catch(error){
        console.log(error);
    }

};