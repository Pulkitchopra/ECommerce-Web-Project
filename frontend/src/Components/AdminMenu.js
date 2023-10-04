import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup';

const AdminMenu = () => {
  return (
    <div>

<ListGroup defaultActiveKey="#link1">
      <ListGroup.Item action href="/dashboard/admin/create-category" >
        Create Category
      </ListGroup.Item>
      <ListGroup.Item action href="/dashboard/admin/create-product" >
        Create Product
      </ListGroup.Item>
      <ListGroup.Item action href="/dashboard/admin/products" >
        Products
      </ListGroup.Item>
      <ListGroup.Item action href="/dashboard/admin/users" >
        Users
      </ListGroup.Item>

      <ListGroup.Item action href="/dashboard/admin/orders" >
        Orders
      </ListGroup.Item>
    </ListGroup>  
    </div>
  )
}

export default AdminMenu
