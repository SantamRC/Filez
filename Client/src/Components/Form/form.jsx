import React,{useState} from 'react';
//import './App.css';
import axios from 'axios';
import { Form, Row, Col, Button } from 'react-bootstrap';

function Upload(){
    const [file,setFile]=useState({file:null})

    let onSubmit=async (e)=>{
        e.preventDefault()
        console.log('Submitted')
        const formData = new FormData();
        formData.append('file',file);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        axios.post('http://localhost:5000/upload',formData,config).then((req,res)=>{
            console.log(req)
        })
    }

    let onChange=(e)=>{
        setFile({file:e.target.files[0]})
        //console.log(e.target.files[0].name)
    }
  
      return (
        <div>
            <Form>
            <Form.File 
                id="custom-file"
                label="Custom file input"
                custom
                size='sm'
            />
            </Form>
        </div>
      )
}

export default Upload;
