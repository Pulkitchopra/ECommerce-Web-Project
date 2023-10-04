import React, { useState, useEffect } from 'react'
import Template from '../../Components/Template/Template'
import UserMenu from '../../Components/UserMenu'

import axios from 'axios'
import { useAuth } from '../../context/auth'

import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import moment from 'moment';
const Orders = () => {
  const [orders, setOrders] = useState([]);


  const [auth, setAuth] = useAuth();


  const getOrders = async () => {
    try {
      const { data } = await axios.get('/api/v1/auth/orders')
      setOrders(data)
    } catch (error) {
      console.log(error)
    }

  }

  useEffect(() => {


    if (auth?.token) {
      getOrders();
    }

  }, [auth?.token]);



  return (

    <Template>
      <div className='container m-3 p-3'>
        <div className='row'>
          <div className='col-md-3'>
            <UserMenu />

          </div>
          <div className='col-md-9'>
            <p>Orders</p>


            {orders?.map((o, i) => {
              return (


                <div>
                  <Table>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Status</th>
                        <th>Buyer</th>
                        <th>Payment</th>
                        <th>Date</th>
                        <th>Quantity</th>
                      </tr>
                    </thead>
                    <tbody>




                      <tr>

                        <td>{i + 1}</td>
                        <td>{o?.status} </td>
                        <td>{o?.buyer?.name} </td>
                        <td>{o?.payment.success ? 'Success' : 'Failed'} </td>
                        <td>{moment(o?.createAt).fromNow()} </td>
                        <td>{o?.products?.length} </td>

                      </tr>
                    </tbody>
                  </Table>
                  <div>



                    {o?.products?.map((p) => (
                      <div className='row'  >
                        <div className='d-flex'>

                          <Card style={{ width: '14rem' }} className='m-3 pb-0 shadow p-3 mb-5 rounded  product-card ' >
                            <Card.Img variant="top" className='product-img' src={`/api/v1/product/product-pic/${p._id}`} alt={p.name} />
                            <Card.Body>
                              <div className='' >
                                <Card.Title>{p.name}</Card.Title>
                                <Card.Text>{p.description}</Card.Text>
                                <Card.Text>${p.price} </Card.Text>

                              </div>
                            </Card.Body>
                          </Card>

                          


                        </div>
                      </div>
                    ))}

                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

    </Template>
  )
}
export default Orders
