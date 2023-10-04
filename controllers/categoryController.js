import slugify from "slugify"
import categoryModel from "../models/categoryModel.js"
export const createCategoryController = async (req, res) => {

    try{
        const {name} = req.body

        if(!name){
            return res.status(400).send({mesasge: 'Name is required'})
        }
        const existingCategory = await categoryModel.findOne({name})
        if(existingCategory){
            
            return res.status(200).send({
                success: true,
                message: 'Category Already Exists'
            })
        }

        const category = await new categoryModel({name, slug: slugify(name)}).save();

        res.status(200).send({
            success: true,
            message: 'New Category Created',
            category
        })
   
    }catch(error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: 'Error in Category'
        })
    }
};


export const updateCategoryController = async (req, res) =>{

    try{
        const {name} = req.body
        const {id} = req.params
        const category = await categoryModel.findByIdAndUpdate(id, {name, slug: slugify(name)}, {new:true})
        res.status(200).send({
            success: true,
            message: 'Category updated successfully',
            category
        })

    }catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: 'Error in updating'
        })
    }
};

export const categoryController = async (req, res) => {
    try{
        const category = await categoryModel.find({});
        res.status(200).send({

            success: true,
            message: 'Category list',
            category
});
    }catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'Error in categories'
        });
    }

};

export const singleCreateController = async (req, res) => {

    try{
        const category = await categoryModel.findOne({slug: req.params.slug})
        res.status(200).send({
            success: true,
            message: 'Get Single Category',
            category
        })

    }catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: 'Error in catgory'
        })
    }

};
export const deleteCategoryController = async (req, res) => {

    try{

        const {id}= req.params
        await categoryModel.findByIdAndDelete(id)
        res.status(200).send({
            success: true,
            message: 'Category is Deleted',
        })

    }catch(error){
        console.log(error)
        res.status(500).send({
            sucess: false,
            error,
            message: 'Error in Deleting'
        })
    }
}
