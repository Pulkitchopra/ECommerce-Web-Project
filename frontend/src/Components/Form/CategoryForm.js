import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const CategoryForm = ({handleSubmit, value, setValue }) => {
  return (

    <div>
       <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control type="text" placeholder="Create New Category" value={value} onChange={(e) => setValue(e.target.value)} />
      </Form.Group>

     
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </div>
  )
}

export default CategoryForm
