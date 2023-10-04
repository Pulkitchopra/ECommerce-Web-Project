import React, {useState, useEffect} from 'react'
import AdminMenu from '../../Components/AdminMenu'
import Template from '../../Components/Template/Template'

import axios from 'axios'
import Form from 'react-bootstrap/Form';

import {useNavigate, useParams} from 'react-router-dom'
const UpdateProduct = () => {
    const [categories, setCategories] = useState([])
    
    const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [quantity, setQuantity] = useState("")

  const [shipping, setShipping] = useState("")
  const [category, setCategory] = useState("")
  const [pic, setPic] = useState("")
  const [id, setId] = useState("")

  const navigate = useNavigate();
  const params = useParams();



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

  const getSingleProduct = async () => {
    try{

      const {data} = await axios.get(`/api/v1/product/get-product/${params.slug}`);
      setName(data.product.name);

      setDescription(data.product.description);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
      setCategory(data.product.category._id);
      setId(data.product._id);
      

    }catch(error){
      console.log(error)
    }
  };
  useEffect(()=> {
    getSingleProduct();
  },[]);


  const handleUpdate = async (e) => {
    e.preventDefault();
    try{
      const productData = new FormData();
      productData.append("name", name)
      productData.append("description", description)
      productData.append("price", price)
      productData.append("quantity", quantity)

      pic && productData.append("pic", pic)
      productData.append("category", category)
      const {data} = await axios.put(`/api/v1/product/update-product/${id}`, productData);
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

  const handleDelete = async () => {
    try{

      let answer = window.prompt('Do you want to delete product?')
      if(!answer) return
      const {data} = await axios.delete(`/api/v1/product/delete-prodct/${id}`)

    }catch(error){
      console.log(error);
    }
  }
  return (
    <Template>

    <div className='container m-3 p-3'>

    <div className='row'>
        <div className='col-md-3'>
        <AdminMenu/>
        </div>

        <div className='col-md-9'>
        <p>Update Product </p> 
        <div className='m-1'>
        
         
            <Form.Select onChange={(value) => {setCategory(value);}}
            
            value = {category}
             >
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
          {pic ? (
           <div>
          
          <img src= {URL.createObjectURL(pic)} 
          alt='product_pic'
           height={"200px"} 
           className='img img-responsive' />
           </div> ) : (

           <div> 
          <img src= {`/api/v1/product/product-pic/${id}`} 
          alt='product_pic'
           height={"200px"} 
           className='img img-responsive' />
           </div> )
           }
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
          <div className='m-3'>
            <Form.Select onChange={(value) => {setShipping(value);}}
            value = {shipping ? "yes" : "no"}   
            >

            <option>Shipped</option>
          <option value = '1'>Yes</option>
          <option value = '0'>No</option>
      
        </Form.Select>
          </div>

          <div className='m-3'>

            <button className='btn btn-primary' onClick={handleUpdate}>Update Product</button>
            <button className='btn btn-secondary m-3' onClick={handleDelete}>Delete Product</button>
          </div>
        </div>
        </div>
        </div>
      
    </div>
    </Template>
  )
}

export default UpdateProduct
