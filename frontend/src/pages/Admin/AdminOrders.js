import React, {useState, useEffect} from 'react'
import Template from '../../Components/Template/Template';
import AdminMenu from '../../Components/AdminMenu';

import axios from 'axios';
import { useAuth } from '../../context/auth'

import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import moment from 'moment';
import Form from 'react-bootstrap/Form';



const AdminOrders = () => {


  const [orderStatus, setOrderStatus] = useState(['Not Processed', 'Processing', 'Shipped', 'Cancelled', 'Delivered']);
  const [changeOrderStatus, setChangeOrderStatus] = useState("");


  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const getAllOrders = async () => {
    try {


      const { data } = await axios.get('/api/v1/auth/all-orders')
      setOrders(data)
    } catch (error) {
      
    }

  }
  useEffect(() => {


    if (auth?.token) {
      getAllOrders();
    }

  }, [auth?.token]);

  const handleOrderChange = async (orderId, value) => {
    try{
      
      const { data } = await axios.put(`/api/v1/auth/order-status/${orderId}`, {
        status: value

      }
       );
       getAllOrders();

    }catch(error){
      
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
      <h3 className='text-center'>All Orders</h3>

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


                      <td>{i + 1} </td>

                      <td>
                     <Form>
                      <Form.Select onChange={(value) => handleOrderChange(o._id, value) } defaultValue={o?.orderStatus} >


                      {orderStatus?.map((s, i) => (
                        <option key={i} value={s}> {s} </option>
                      ))}
                      </Form.Select>
                     </Form>
                      </td>
                      <td>{o?.buyer?.name} </td>
                      <td>{o?.payment.success ? 'Success' : 'Failed'} </td>
                      <td>{moment(o?.createAt).fromNow()} </td>
                      <td>{o?.products?.length} </td>

                    </tr>
                    </tbody>
                  </Table>
                  <div>



                    {o?.products?.map((p) => (

                      <div className='row'>
                        <div className='d-flex'>
                          <Card style={{ width: '14rem' }} className='m-3 product-card' >
                            <Card.Img variant="top" src={`/api/v1/product/product-pic/${p._id}`} alt={p.name} />
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

export default AdminOrders
