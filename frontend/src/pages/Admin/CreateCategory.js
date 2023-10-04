import React, {useState, useEffect}  from 'react'
import AdminMenu from '../../Components/AdminMenu'
import Template from '../../Components/Template/Template'

import axios from 'axios'
import Table from 'react-bootstrap/Table';

import CategoryForm from '../../Components/Form/CategoryForm';
import Modal from 'react-bootstrap/Modal';

const CreateCategory = () => {
  

  const [name, setName] = useState("")
  const [visible, setVisible] = useState(false);
  const [showForm, setShowForm] = useState(null);

  const [updatedName, setUpdatedName] = useState("");
  const handleClose = () => setVisible(false);
  
  const handleSubmit = async (e) =>{
    e.preventDefault()

    try{
      const {data} = await axios.post("/api/v1/category/create-category", {name});
      if(data?.success) {

        console.log(`${name} is created`);
        getAllCategory();
      } else{
        console.log(data.message);
      }


    }catch(error){
      console.log(error)
    }

  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    try{

      const {data} = await axios.put(`/api/v1/category/update-category/${showForm._id}`, {name: updatedName})
      if(data.success){
        console.log(data.message)
        setShowForm(null)
        setUpdatedName("")
        setVisible(false)
        getAllCategory();
      }
    }catch(error){
      console.log(error);
    }
  }
  const handleDelete = async (pId) => {

    try{
      const {data} = await axios.delete(`/api/v1/category/delete-category/${pId}`);
      if(data.success) {
        console.log('category is deleted')
        getAllCategory();
      } else{
        console.log(data.message)
      }

    }catch(error){
      console.log(error)
    }

  }

  const [categories, setCategories] = useState([]);
  const getAllCategory = async () => {
    try{
      const {data} = await axios.get('/api/v1/category/get-category');
      
      if(data.success){
        setCategories(data.category);
      }
    }catch(error){
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);
  return (

    <Template>
    <div className='container m-3 p-3'>
    <div className='row'>
    <div className='col-md-3'>
    <AdminMenu/>
    </div>
    <div className='col-md-9'>
    <p>Create Category</p>
    <div>
    <CategoryForm handleSubmit = {handleSubmit} value = {name} setValue = {setName} />
    </div> 
    <div className='m-1'>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {categories?.map((c) => {   
          return(
            <>
        <tr>

            <td key={c._id}>{c.name}</td>
            <td><button className='btn btn-primary' onClick={() => { setVisible(true); setUpdatedName(c.name); setShowForm(c)}}>Edit</button></td>
            <td><button className='btn btn-secondary' onClick={() => handleDelete(c._id) }>Delete</button></td>
        </tr>
            </>
          )
        })}
      </tbody>
    </Table>
    </div>
    <div>

      <Modal show = {visible} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        
          <CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate} />
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    </div>
    </div>
    </div>
      
    </div>
    </Template>
  )
}

export default CreateCategory
