import React, {useState, useEffect} from 'react'
import Template from '../Components/Template/Template'
import useCategory from '../react custom hooks/useCategory'


const Categories = () => {
  
    const categories = useCategory();
   
  return (

    <Template>

    <div className='container'>
    <div className='row'>
    {categories.map((c) => (


   <div className='col-md-6 m-3 ' key={c._id} >
   <button className='btn btn-primary' href = {`/category/${c.slug}`}>{c.name}</button>

   </div>
   ))}

    </div>
    </div>
    </Template>
  )
}

export default Categories
