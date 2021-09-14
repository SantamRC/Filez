import React, { useState, useRef } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { Form, Row, Col, Button, Container } from 'react-bootstrap';
import './form.css'

const Upload = (props) => {
  let [name,setName]=useState('');
  let [desc,setDesc]=useState('');
  let [file,setFile]=useState(null)


  let API_URL='http://localhost:5000/upload'

  let onChangeName=(e)=>{
    setName(e.target.value)
  }

  let onChangeDesc=(e)=>{
    setDesc(e.target.value)
  }

  let onChangeFile=(e)=>{
    setFile(e.target.files[0])
  }

  let onSubmit=(e)=>{
    let formData=new FormData();
    formData.append('name',name);
    formData.append('desc',desc);
    formData.append('image',file);

    e.preventDefault();
    axios.post('http://localhost:5000/',formData).then(()=>{
      console.log('Form Submitted')
    })
  }
  
  return (
    <React.Fragment>
      <Container fluid='sm'>
      <Form className="search-form" onSubmit={onSubmit} >
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Control
                type="text"
                name="title"
                placeholder="Enter title"
                onChange={onChangeName}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="description">
              <Form.Control
                type="text"
                name="description"
                placeholder="Enter description"
                onChange={onChangeDesc}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
          <Form.File 
            id="custom-file"
            name='image'
            label="Custom file input"
            onChange={onChangeFile}
            custom
          />
          </Col>
        </Row>
        <Row>
          <Col>
            <Button id='btn' variant="primary" type="submit">
            Submit
          </Button>
          </Col>
        </Row>
      </Form>
      </Container>
    </React.Fragment>
  );
};

export default Upload;
