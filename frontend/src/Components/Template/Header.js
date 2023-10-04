import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';

import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown'

import { useAuth } from '../../context/auth'
import SearchInput from '../Form/SearchInput';
import useCategory from '../../react custom hooks/useCategory';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';

import { FaCartPlus } from 'react-icons/fa'
import { useCart } from '../../context/cart';

const Header = () => {
  const [auth, setAuth] = useAuth();
  const categories = useCategory();
  const [cart] = useCart();


  const handleLogout = () => {
    setAuth({

      ...auth,
      user: null,
      token: ''
    })

    localStorage.removeItem('auth')
  }
  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>

          <Navbar.Brand href="#">Ecommerce Project</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <SearchInput />
            <Nav
              className="ms-auto my-2 my-lg-0"
              style={{ maxHeight: '100px', marginRight: '16px' }}
              navbarScroll
            >

              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/about">About</Nav.Link>




              <NavDropdown title={`${auth.user ? auth?.user?.name : 'Profile'}`} id="navbarScrollingDropdown">
                {
                  !auth.user ? (
                    <>
                      <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                      <NavDropdown.Item href="/register"> Register </NavDropdown.Item>

                    </>
                  ) : (
                    <>
                      <NavDropdown.Item href="/login" onClick={handleLogout}>Logout</NavDropdown.Item>
                      <NavDropdown.Item href={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`}>Dashboard</NavDropdown.Item>
                    </>
                  )
                }
  
  
              </NavDropdown>
              <NavDropdown title='Categories' id="navbarScrollingDropdown" href='/categories' >
                <NavDropdown.Item href='/categories' >All Categories</NavDropdown.Item>
                {categories?.map((c) => (
                  <NavDropdown.Item href={`/category/${c.slug}`} key={c._id} >{c.name}</NavDropdown.Item>
                ))}
              </NavDropdown>
             
              <Button variant="tertiary" style={{ borderRadius: '60%' }} href='/cart'>
                <Badge bg = 'light'  > 
                  <FaCartPlus style={{ color: 'black', fontSize: '16px' }} />
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary"> {cart?.length}
                  </span>
                </Badge>
              </Button>

            </Nav>
          </Navbar.Collapse>

        </Container>
      </Navbar>
    </div>
  )
}

export default Header
