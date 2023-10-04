import React, {useState, useEffect} from 'react'
import AdminMenu from '../../Components/AdminMenu'
import Template from '../../Components/Template/Template'

import axios from 'axios'
import Form from 'react-bootstrap/Form';

import {useNavigate} from 'react-router-dom'
const CreateProduct = () => {
  const [categories, setCategories] = useState([])

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [quantity, setQuantity] = useState("")

  const [shipping, setShipping] = useState("")
  const [category, setCategory] = useState("")
  const [pic, setPic] = useState("")

  const navigate = useNavigate();



  const getAllCategory = async () => {
    try{
      const {data} = await axios.get('/api/v1/category/get-category');
      
      if(data?.success){
        setCategories(data?.category);
      }
    }catch(error){
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);


  const handleCreate = async (e) => {
    e.preventDefault();
    try{
      const productData = new FormData();
      productData.append("name", name)
      productData.append("description", description)
      productData.append("price", price)
      productData.append("quantity", quantity)
      productData.append("pic", pic)
      productData.append("category", category)
      const {data} = await axios.post('/api/v1/product/create-product', productData);
      if(data?.success){
        console.log(data?.message);
      } 
      else {
        
        console.log("Product Created");
        navigate("/dashboard/admin/products");
      }
    }catch(error){
      console.log(error);
    }
  };
  return (
    <Template>
    <div className='container m-3 p-3'>
    <div className='row'>
        <div className='col-md-3'>
        <AdminMenu/>
        </div>

        <div className='col-md-9'>
        <p>Create Product</p> 
        <div className='m-1'>
        
         
            <Form.Select onChange={(value) => {setCategory(value);}}>
            <option>Select a Category</option>
            {categories?.map((c) => (    
          <option  key={c._id} value = {c._id}>{c.name}</option>
       ))}
        </Form.Select>
          <div className='m-3'>
          <label className='btn btn-primary'>
          {pic ? pic.name : "Upload Picture"}
            <input type='file' name= 'pic' accept='image/*' onChange={(e) => setPic(e.target.files[0])} hidden />
          </label>
          </div>
          <div className='m-3'>
          {pic && ( <div>
          
          <img src= {URL.createObjectURL(pic)} 
          alt='product_pic'
           height={"200px"} 
           className='img img-responsive' />
           </div> )}
          </div>


          <div className='m-3'>
          <input type='text' value={name} placeholder='Enter Name' onChange={(e) => setName(e.target.value)} className='form-control' />
          </div>
          <div className='m-3'>
          <input type='text'  value={description} placeholder='Enter Description' onChange={(e) => setDescription(e.target.value)} className='form-control' />
          </div>
          <div className='m-3'>
          <input type='number' value={price} placeholder='Enter Price' onChange={(e) => setPrice(e.target.value)} className='form-control' />
          </div>
          <div className='m-3'>
          <input type='number' value={quantity} placeholder='Enter Quantity' onChange={(e) => setQuantity(e.target.value)} className='form-control' />
          </div>
          {/* <div className='m-3'>
            <Form.Select onChange={(value) => {setShipping(value);}}>
            <option>Shipped</option>
          <option value = '1'>Yes</option>
          <option value = '0'>No</option>
      
        </Form.Select>
          </div> */}

          <div className='m-3'>

            <button className='btn btn-primary' onClick={handleCreate}>Create Product</button>
          </div>
        </div>
        </div>
        </div>
    </div>
    </Template>
  )
}

export default CreateProduct
