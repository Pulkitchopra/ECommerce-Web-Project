import React, { useState, useEffect } from 'react'
import Template from '../Components/Template/Template'
import axios from 'axios'

import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card';

import Form from 'react-bootstrap/Form';
import { Prices } from '../Components/Prices'
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/cart';
import electronics from '../images/electronics.jpg'

import fashion from '../images/fashion.jpg'
import books from '../images/books.jpg'
import categoryElectronics from '../images/category-electronics.jpg'
import useCategory from '../react custom hooks/useCategory';





const Home = (props) => {

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radioFilter, setRadioFilter] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);



  const [cart, setCart] = useCart();

  const navigate = useNavigate();

  const [filters, setFilters] = useState('category-filters');

  const category = useCategory();




  const categoryFilter = () => {
    filters === 'category-filters' ? setFilters('category-filters category') : setFilters('category-filters')
  }


  const images = [
    {

      id: 1,
      title: 'Electronics',
      logo: categoryElectronics
    },
    {

      id: 2,
      title: 'Fashion',
      logo: fashion
    },
    {

      id: 3,
      title: 'Books',
      logo: books
    },

  ]


  const getTotal = async () => {
    try {
      const { data } = await axios.get('/api/v1/product/product-count')
      setTotal(data?.total)

    } catch (error) {
      
    }

  };


  const nextPage = async () => {
    try {
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`)
      setLoading(false)
      setProducts([...products, ...data?.products]);

    } catch (error) {
      setLoading(false)
      
    }
  }
  useEffect(() => {

    if (page === 1) {
      return;
    }

    nextPage();
  }, [page]);
  const handleFilter = (value, id) => {
    let Productsfilter = [...checked]

    if (value) {

      Productsfilter.push(id);
    } else {
      Productsfilter = Productsfilter.filter((c) => c !== id);
    } setChecked(Productsfilter);

  }



  const getAllProducts = async () => {
    try {

      setLoading(true)
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false)
      setProducts(data.products)
    }
    catch (error) {
      setLoading(false)
      
    }
  };
  useEffect(() => {
    if (!checked.length || !radioFilter.length)
      getAllProducts();

  }, [checked.length, radioFilter.length]);

  useEffect(() => {

    if (checked.length || radioFilter.length) filterProduct();
  }, [checked, radioFilter])

  const filterProduct = async () => {
    try {
      const { data } = await axios.post("http://localhost:5000/api/v1/product/product-filters", { checked, radioFilter });
      setProducts(data?.products);
    } catch (error) {
      
    }
  };


  const getAllCategory = async () => {
    try {
      const { data } = await axios.get('/api/v1/category/get-category');
      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);


  return (
    <Template>

      <div>

        <div className='home-container'>



          <div className='left-container' >

            <img src={electronics} />

          </div>
          <div className='right-container' >

            <img src={fashion} />

            <img src={books} />
          </div>
        </div>
        <div>

          <div className='home-categories' >

            {images.map(({ id, title, logo }) => {
              return (

                <div className='category-images' key={id} >
                  <div className='categories' >
                    <img src={logo} />
                  </div>

                  <div className='category-heading' >



                    
                    
                    
                    <h5 className='heading'>{title}</h5>
                  </div>
                </div>

              )

            })}

          </div>

        </div>




        <div className='container'>
          <h3 className='text-center'>All Products</h3>





          
          <div>
            <div>
              <button className='btn btn-primary' onClick={categoryFilter} >Filters</button>
            </div>

            <div className='d-flex'>


              <div className={filters}>

                <h5>Filter Category</h5>


                {categories?.map((c) => (
                  <Form className='m-3'>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                      <Form.Check type='checkbox' label={`${c.name}`} key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)} />
                    </Form.Group>
                  </Form>
                ))}
                <h5>Filter Price</h5>
                <div className='d-flex flex-wrap'>
                  <Form className='m-3' onChange={(e) => setRadioFilter(e.target.value)} >
                    {Prices?.map((p) => (
                      <div key={p._id} >





                        <Form.Group className="mb-3">
                          <Form.Check type='radio' value={p.array} label={`${p.name}`} />
                        </Form.Group>
                      </div>
                    ))}
                  </Form>
                </div>
                <button className='btn btn-primary' onClick={() => window.location.reload()} >Reset Filters </button>
              </div>
            </div>

          </div>

          <div className='d-flex justify-content-center'>


            <div className='product-categories'>


              {products?.map((p) => (

                <Card style={{ width: '18rem' }} className='m-3 pb-0 shadow p-3 mb-5 rounded  product-card ' >
                  <Link key={p._id} to={`/product/${p.slug}`}>
                    <Card.Img variant="top" className='product-img' src={`/api/v1/product/product-pic/${p._id}`} alt={p.name} />
                  </Link>

                  <Card.Body>
                    <div className='' >
                      <Card.Title>{p.name}</Card.Title>
                      <Card.Text>{p.description}</Card.Text>
                      <Card.Text>${p.price} </Card.Text>
                      <button className='btn btn-primary' onClick={() => { setCart([...cart, p]); localStorage.setItem('cart', JSON.stringify([...cart, p])) }}>Add to Cart</button>
                    </div>
                  </Card.Body>
                </Card>
              ))}

            </div>
          </div>




          <div className='d-flex justify-content-center ' >
            {products && products.length < total && (
              <button className='btn btn-primary' onClick={(e) => { e.preventDefault(); setPage(page + 1) }} > {loading ? "Loading" : "Next Page"} </button>
            )}


          </div>

        </div>

      </div>
    </Template>
  )
}

export default Home
