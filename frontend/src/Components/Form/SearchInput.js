import React from 'react'
import { useSearch } from '../../context/search'
import axios from 'axios'

import {useNavigate} from 'react-router-dom'
import Button from 'react-bootstrap/Button';

import Form from 'react-bootstrap/Form';

const SearchInput = () => {
    const [values, setValues] = useSearch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
          
            const {data} = await axios.get(`/api/v1/product/product-search/${values.keyword}`);
            setValues({...values, results: data});

            navigate("/search-product-page");
        }catch(error){

            console.log(error);
        }
    }
  return (

    <div>


    
    
    
  
    <Form className="d-flex search-box-page " onSubmit={handleSubmit}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2 mx-2 "
              aria-label="Search"
             value={values.keyword}
             onChange={(e) => setValues({...values, keyword: e.target.value})}
            />
            <Button variant="outline-success">Search</Button>
          </Form>
    </div>
  )
}

export default SearchInput
