import React, { useState, useEffect } from 'react'
import Template from '../Components/Template/Template'
import { useCart } from '../context/cart';

import { useAuth } from '../context/auth';
import { useNavigate } from 'react-router-dom';

import Card from 'react-bootstrap/Card';
import DropIn from 'braintree-web-drop-in-react'
import axios from 'axios';

const CartPage = () => {

  const [auth, setAuth] = useAuth()
  const [cart, setCart] = useCart()
  const navigate = useNavigate();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);



  const removeCartItem = (pid) => {

    try {

      let myCart = [...cart]

      let index = myCart.findIndex(item => item._id === pid)
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem('cart', JSON.stringify(myCart));


    } catch (error) {
      
    }

  }


  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
      })


    } catch (error) {
      
    }
  }
  const getToken = async () => {

    try {
      const { data } = await axios.get('/api/v1/product/braintree/token');
      setClientToken(data?.clientToken);

    } catch (error) {
      
    }
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);


  const handlePayment = async () => {

    try {


      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post('/api/v1/product/braintree/payment', {
        nonce, cart
      }
      );
      setLoading(false);
      localStorage.removeItem('cart');
      setCart([]);
      navigate('/dashboard/user/orders');

    } catch (error) {
      
      setLoading(false);
    }
  }

  return (
    <Template>
      <div className=' p-5' style={{ backgroundColor: "rgb(216, 216, 216)" }} >
        
        <div className='row '>

          <div>


            <div className='row'>
              <div className='col-md-9'>

                <h3>{`${auth?.token && auth?.user?.name}`} </h3>

                <p>{cart?.length >= 1 ? `${cart.length} Item in the Cart ${auth?.token ? " " : "Login"} ` : "Cart is Empty"} </p>
                <div>

                  {cart?.map((p) => (
                    <div className='cart-page-product'>

                      <div>
                        <Card style={{ width: '8rem' }} className='m-3' >
                          <Card.Img variant="top" src={`/api/v1/product/product-pic/${p._id}`} alt={p.name} />
                        </Card>

                      </div>

                      <div className='m-5'>
                        <h5>{p.name}</h5>
                        <p>{p.description}</p>
                      </div>
                      <div className='m-5 d-flex'>





                        <div className='mx-3'>
                          <h3> ${p.price}</h3>
                        </div>
                        <div>

                          <button className='btn btn-secondary' onClick={() => removeCartItem(p._id)} > Remove  </button>
                        </div>
                      </div>


                    </div>
                  ))}



                </div>

              </div>

              <div className='col-md-3 text-center'>
                <div className='cart-page-payment'>
                  <h3>Cart Payment</h3>
                  <h5 className='m-3 '>Total: {totalPrice()} </h5>
                  {auth?.user?.address ? (
                    <div>

                      <div className='m-3 text-center'>
                        <h6>Address</h6>
                        <h3>{auth?.user?.address}</h3>
                        <div className='m-3 '>
                          <button className='btn btn-primary' onClick={() => navigate('/dashboard/user/profile')} >Update Address</button>
                        </div>
                      </div>

                    </div>
                  ) : (
                    <div className='m-3'>
                      {auth?.token ? (
                        <button className='btn btn-primary' onClick={() => navigate('/dashboard/user/profile')}>Update Address</button>
                      ) : (

                        <button className='btn btn-primary' onClick={() => navigate('/login', { state: '/cart' })}>Login</button>
                      )
                      }
                    </div>

                  )
                  }


                  <div className='m-3'>
                    {
                      !clientToken || !cart?.length ? (" ") : (
                        <div>
                          <DropIn options={{
                            authorization: clientToken,
                            paypal: {
                              flow: 'vault'
                            }

                          }}

                            onInstance={instance => setInstance(instance)}
                          />
                          <button className='btn btn-primary w-75' disabled={loading || !instance || !auth?.user?.address} onClick={handlePayment} >
                            {loading ? 'Processing' : 'Payment'} </button>
                        </div>
                      )
                    }

                  </div>

                </div>


              </div>
            </div>



          </div>
        </div>

      </div>


    </Template>
  )
}

export default CartPage
