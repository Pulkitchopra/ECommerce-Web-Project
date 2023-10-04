import React from 'react'
import Template from '../Components/Template/Template';
import { useSearch } from '../context/search';

import Card from 'react-bootstrap/Card';
const SearchProductPage = () => {

    const [values, setValues] = useSearch();
  return (
    <Template>

    <div className='container'>

    <div>
    <p>Search results</p>
    <p>{values?.results.length < 1 ? 'No Products Found' : `Found ${values?.results.length}`}</p>
    
    <div className='d-flex flex-wrap'>

              {values?.results.map((p) => (

                <Card style={{ width: '18rem' }} className='m-3' >
                  
                    <Card.Img variant="top" src={`/api/v1/product/product-pic/${p._id}`} alt={p.name} />
                    <Card.Body>
                      <Card.Title>{p.name} </Card.Title>
                      <Card.Text>{p.description}</Card.Text>
                      <Card.Text>${p.price} </Card.Text>
                    </Card.Body>
                 
                </Card>
              ))}

            </div>
    </div>
      
    </div>
    </Template>
  )
}

export default SearchProductPage
