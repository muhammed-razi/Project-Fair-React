import React, { useState } from 'react'
import { Button,Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { loginAPI, registerAPI } from '../Services/allAPI'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Auth({register}) {
    const navigate = useNavigate()
    const [userData,setUserData] = useState({
        username:"",email:"",password:""
    })
    const isRegisterForm = register?true:false
    const handleRegister = async (e) =>{
        e.preventDefault()
        const {username,email,password} = userData
        if(!username || !email || !password){
            toast.info("Please fill the form completely!!!")
        }else{
            const result = await registerAPI(userData)
            console.log(result);
            if(result.status===200){
                toast.success(`${result.data.username} has registerd successfully!!!`)
                setUserData({
                    username:"",email:"",password:""
                })
                navigate('/login')
            }else{
                toast.error(result.response.data)
                console.log(result);
            }
        }
    }

    const handleLogin = async (e)=>{
        e.preventDefault()
        const {email,password} = userData
        if( !email || !password){
            toast.info("Please fill the form completely!!!")
        }else{
            const result = await loginAPI(userData)
            console.log(result);
            if(result.status===200){
                // toast.success(`${result.data.username} has registerd successfully!!!`)
                sessionStorage.setItem("existingUser",JSON.stringify(result.data.existingUser))
                sessionStorage.setItem("token",result.data.token)
                setUserData({
                    email:"",password:""
                })
                navigate('/')
            }else{
                toast.error(result.response.data)
                console.log(result);
            }
        }
    }
  return (
    <div style={{width:'100%',height:'100vh'}} className='d-flex justify-content-center align-items-center'>
        <div className='w-75 container'>
            <Link to={'/'} style={{textDecoration:'none',color:'blue'}}><i class="fa-solid fa-arrow-left me-1"></i>Back to Home</Link>
            <div className="card shadow p-5 bg-success">
                <div className="row align-items-center">
                    <div className="col-lg-6">
                        <img src="http://www.tropiqana.com/fundsmanager/app-assets/img/gallery/login.png" className='rounded-start w-100' alt="auth pic" />
                    </div>
                    <div className="col-lg-6">
                         <div className="d-flex  align-items-center flex-column">
                         <h1 className='fw-bolder text-light mt-2'>  <i class="fa-brands fa-stack-overflow fa-bounce"></i> Project Fair </h1>
                         <h5 className='fw-bolder  mt-2 pb-3 text-light'>  
                            {
                                isRegisterForm? 'Sign Up to your Account' : 'Sign In to your Account'
                            }
                             </h5>
                             <Form className="text-light w-100">
                            { isRegisterForm&& <Form.Group className="mb-3" controlId="formBasicUsername">
                                <Form.Control type="text" placeholder="Username" value={userData.username} onChange={e=>setUserData({...userData,username:e.target.value})} />
                            </Form.Group>}
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control type="email" placeholder="Enter your Email ID" value={userData.email} onChange={e=>setUserData({...userData,email:e.target.value})} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicpassword">
                                <Form.Control type="password" placeholder="Enter password"  value={userData.password} onChange={e=>setUserData({...userData,password:e.target.value})} />
                            </Form.Group>
                            {
                                isRegisterForm ? 
                                <div >
                                    <Button onClick={handleRegister} >Register</Button>
                                    <p className="btn btn-light  mb-1">Already have an account? Click here to <Link  to={'/login'} className='btn-link text-warning  ' > Login Here </Link> </p>
                                </div>:
                                <div >
                                <Button onClick={handleLogin} className="btn btn-light mb-2">Login</Button>
                                <p className='mt-3 text-light '>New User? Click here to <Link to={'/register'} className='btn-link text-warning'> Register </Link> </p>
                            </div>
                               
                            }
                             </Form>

                         </div>
                    </div>
                </div>
            </div>
        </div>
        <ToastContainer position='top-right' autoClose={2000} theme='colored' />
    </div>
  )
}

export default Auth