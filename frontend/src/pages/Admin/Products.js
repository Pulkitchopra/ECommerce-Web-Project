import React, {useState, useEffect}  from 'react'
import AdminMenu from '../../Components/AdminMenu'
import Template from '../../Components/Template/Template'

import axios from 'axios'
import Card from 'react-bootstrap/Card';

import {Link} from 'react-router-dom'
const Products = () => {
    const [products, setProducts] = useState([]);
  const getAllProducts = async () => {
    try{
      
      const {data} = await axios(`/api/v1/product/get-product`);
      setProducts(data.products);
    }
    catch(error){
      
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);
  return (


    <Template>

    

    
    <div className='container m-3 p-3'>
    <div className='row'>
    <div className='col-md-3'>
    <AdminMenu/>
    </div>
    <div className='col-md-9'>
    <h3 className='text-center'>All Products List </h3>
    <div className='d-flex'>

    {products?.map((p) => (
      
       <Card style={{ width: '18rem' }}>
      <Link key={p._id} to={`/dashboard/admin/update-product/${p.slug}`}>
      <Card.Img variant="top" src={`/api/v1/product/product-pic/${p._id}`} alt= {p.name} />
      <Card.Body>
        <Card.Title>{p.name} </Card.Title>
        
        
        <Card.Text>{p.description}</Card.Text>
        <Card.Text>{p.price}</Card.Text>
      </Card.Body>
      </Link>
    </Card>
      
    ))}
  

    </div>

    </div>


      
    </div>
    </div>
    </Template>
  )
}

export default Products
