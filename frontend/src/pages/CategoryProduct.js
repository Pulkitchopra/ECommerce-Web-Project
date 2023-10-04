import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'
import Template from '../Components/Template/Template'
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom'
const CategoryProduct = () => {
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);


    const params = useParams();
    const navigate = useNavigate();
    const getProductsByCategory = async () => {

        try{
            const {data} = await axios.get(`/api/v1/product/product-category/${params.slug}`);
            setProducts(data?.products)

            setCategory(data?.category)
        }catch(error){
            
        }
    }

    useEffect(() => {

        if(params?.slug){
            getProductsByCategory();
        }

    }, [])
  return (
    <Template>
    <div className='container'>
    <h3 className='text-center m-5'>{category?.name}</h3>
    <div className='d-flex flex-wrap'>

              {products?.map((p) => (

                <Card style={{ width: '18rem' }} className='m-3' >
                  <Link key={p._id} to={`/product/${p.slug}`}>
                    <Card.Img variant="top" src={`/api/v1/product/product-pic/${p._id}`} alt={p.name} />
                  </Link>
                    <Card.Body>
                      <Card.Title>{p.name} </Card.Title>
                      <Card.Text>{p.description}</Card.Text>
                      <Card.Text>${p.price} </Card.Text>
                      
                    </Card.Body>
                </Card>
              ))}

            </div>
    </div>
    </Template>
  )
}

export default CategoryProduct
