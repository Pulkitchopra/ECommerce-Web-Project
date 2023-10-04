import React from 'react'
import Template from '../../Components/Template/Template'
import AdminMenu from '../../Components/AdminMenu'

import {useAuth} from '../../context/auth'
const AdminDashboard = () => {

  const [auth] = useAuth();
  
  return (
    <Template>


    <div className='container m-3 p-3'>

    <div className='row'>
          <div className='col-md-3'>

            <AdminMenu/>
          </div>
          <div className='col-md-9'>
          <div className='card w-60 p-3'>


          <p>Admin Name: {auth?.user?.name} </p>
          <p>Admin Email: {auth?.user?.email} </p>
          <p>Admin Phone: {auth?.user?.phone} </p>
          </div>
          </div>
        </div>
    </div>
    </Template>
  )
}

export default AdminDashboard
