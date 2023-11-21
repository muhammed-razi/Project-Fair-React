import React from 'react'
import { Navbar,Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'


function Header({insideDashboard}) {
  return (
    <Navbar style={{backgroundColor:'#90ee90'}} className="position-fixed top-0 w-100">
    <Container>
      <Navbar.Brand >
    <Link to={'/'} style={{textDecoration:'none',color:'white'}}  className='fw-bolder fs-4'><i class="fa-brands fa-stack-overflow fa-bounce"></i> Project Fair</Link>
      </Navbar.Brand>
     {insideDashboard && <div className='btn btn-links-auto text-info fw-bolder fs-5'>Logout
      <i class="fa-solid fa-arrow-right-from-bracket fa-beat-fade ms-2 "></i>
      </div>}
    </Container>
  </Navbar>
  )
}

export default Header