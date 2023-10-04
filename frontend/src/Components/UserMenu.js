import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup';
const UserMenu = () => {

  return (
    <div>
    
    <ListGroup defaultActiveKey="#link1">
      <ListGroup.Item action href="/dashboard/user/profile" >
       Profile
      </ListGroup.Item>
      <ListGroup.Item action href="/dashboard/user/orders" >
        Orders
      </ListGroup.Item>
    </ListGroup>
    </div>
  )
}
export default UserMenu
