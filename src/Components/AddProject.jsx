import React, { useEffect, useState } from 'react'
import { Modal, Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addProjectAPI } from '../Services/allAPI';

function AddProject() {
  const [show, setShow] = useState(false);
  const [ProjectDetails,setProjectDetails] = useState({
    title:"",languages:"",overview:"",github:"",website:"",ProjectImage:""
  })

  const [preview,setPreview] = useState("")
  const [token,setToken] =useState("")

  const handleClose = () => {
    setShow(false);
    setProjectDetails({
      title:"",languages:"",overview:"",github:"",website:"",ProjectImage:""
    })
    setPreview("")
  }
  const handleShow = () => setShow(true);
  // console.log(ProjectDetails);
  useEffect(()=>{
    if(ProjectDetails.ProjectImage){
      setPreview(URL.createObjectURL(ProjectDetails.ProjectImage))
    }
  },[ProjectDetails.ProjectImage])


  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setToken(sessionStorage.getItem("token"))
    }else{
      setToken("")
    }
  },[])

  const handleAdd = async (e)=>{
    e.preventDefault()
    const {title,languages,overview,ProjectImage,github,website} = ProjectDetails
    if(!title || !languages || !overview || !ProjectImage || !github || !website){
      toast.info("please fill the form completely!!!")
    }else{
      const reqBody = new FormData()
      reqBody.append("title",title)
      reqBody.append("languages",languages)
      reqBody.append("overview",overview)
      reqBody.append("ProjectImage",ProjectImage)
      reqBody.append("github",github)
      reqBody.append("website",website)

if(token){
        const reqHeader = {
        "Content-Type":"multipart/form-data",
        "Authorization":`Bearer ${token}`
      }
      const result = await addProjectAPI(reqBody,reqHeader)
      if(result.status===200){
        console.log(result.data);
      }else{
        console.log(result);
        console.log(result.response.data);
      }
    }
    }
  }
  return (
    <>
      <Button variant="success" onClick={handleShow}>
        Add Project
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size='lg'
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-lg-6">
              <label>
                <input type="file" style={{display:'none'}}onChange={e=>setProjectDetails({...ProjectDetails,ProjectImage:e.target.files[0]})} />
                <img className='img-fluid' src={preview?preview:"https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/681px-Placeholder_view_vector.svg.png"} alt="Project Picture" />
                </label>
             
            </div>
            <div className="col-lg-6">
              <div className='mb-3'>
                <input type="text" className="form-control" placeholder='Project Title' value={ProjectDetails.title} onChange={e=>setProjectDetails({...ProjectDetails,title:e.target.value})} />
              </div>
              <div className='mb-3'>
                <input type="text" className="form-control" placeholder='Language Used'  value={ProjectDetails.languages} onChange={e=>setProjectDetails({...ProjectDetails,languages:e.target.value})} />
              </div>
              <div className='mb-3'>
                <input type="text" className="form-control" placeholder='Github Link' value={ProjectDetails.github} onChange={e=>setProjectDetails({...ProjectDetails,github:e.target.value})} />
              </div>
              <div className='mb-3'>
                <input type="text" className="form-control" placeholder='Website Link' value={ProjectDetails.website} onChange={e=>setProjectDetails({...ProjectDetails,website:e.target.value})} />
              </div>
              <div className='mb-3'>
                <input type="text" className="form-control" placeholder='Project OverView' value={ProjectDetails.overview} onChange={e=>setProjectDetails({...ProjectDetails,overview:e.target.value})} />
              </div>

            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleAdd} variant="primary">Add</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position='top-right' autoClose={2000} theme='colored' />
    </>
  )
}

export default AddProject