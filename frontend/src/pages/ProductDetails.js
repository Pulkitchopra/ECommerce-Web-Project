import React, { useState, useEffect } from 'react'
import Template from '../Components/Template/Template'
import axios from 'axios'

import { useParams } from 'react-router-dom'
import Card from 'react-bootstrap/Card';

import { useCart } from '../context/cart';

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState([]);

  const [relatedProducts, setRelatedProducts] = useState([]);
  const [cart, setCart] = useCart();


  const getProduct = async () => {
    try {


      const { data } = await axios.get(`/api/v1/product/get-product/${params.slug}`);
      setProduct(data?.product);

      getSimilarProduct(data?.product._id, data?.product.category._id)


    } catch (error) {
      
    }

  }
  useEffect(() => {
    if (params?.slug) {
      getProduct();
    }
  }, [params?.slug]);

  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(`/api/v1/product/related-product/${pid}/${cid}`);
      setRelatedProducts(data?.products);

    } catch (error) {
      
    }

  }
  return (
    <Template>
      <div className='product-section' >

        <div className='product-container' >


          <div className='product-left-container'>
            <div style={{ marginTop: '80px' }}>
              <Card style={{ width: '25rem' }} className='m-3 pb-0 shadow p-3 mb-5 rounded ' >
                <Card.Img variant="top" src={`/api/v1/product/product-pic/${product._id}`} alt={product.name} className='products-image' />
              </Card>
            </div>
          </div>
          <div className='product-right-container'>
            <div className='product-right-card' >


              <h6> {product?.category?.name} </h6>
              <h1> {product.name}</h1>
              <h5> {product.description}</h5>
              <h3> ${product.price}</h3>

              <button className='btn btn-primary w-75' onClick={() => { setCart([...cart, product]); localStorage.setItem('cart', JSON.stringify([...cart, product]) ) } } >Add to Cart</button>
            </div>
          </div>
        </div>
      </div>

      <div className='row m-5'>
        <h3 className='text-center' >Related Products</h3>
        {relatedProducts.length < 1 && <p> No Related Products </p>}
        <div className='d-flex flex-wrap'>


          {relatedProducts?.map((p) => (

            <Card style={{ width: '18rem' }} className='m-3' >
              <Card.Img variant="top" src={`/api/v1/product/product-pic/${p._id}`} alt={p.name}  />
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

export default ProductDetails
