import React, { useEffect, useState } from "react"
import axios from "axios"
import { Modal, Flex } from "antd"
import { TextField, Box, Button, Divider }from '@mui/material';
import DOMPurify from "dompurify"

const AddCustomer = ({ open, setOpen }) => {
  const [isModalOpen, setIsModalOpen] = useState(open)
  const [postRes, setPostRes] = useState({message:""})
  const [inputData, setInputData] = useState({
    first_name: "",
    last_name: "", 
    email: "", 
    phone: "", 
    address: "",
    district: "",
    postal_code: ""
  })

  useEffect(() => {
    setIsModalOpen(open)
  }, [open])

  const handleOk = async (e) => {
    e.preventDefault()
    if (e.target.checkValidity()){
      console.log(inputData)
      const res = await axios.post('http://localhost:3001/customers/add', inputData)
        .then(response => {
          setPostRes(response.data)
        }).catch(err => {
          console.log("Error Adding Customer")
        })
    } else {
      alert("Form is Not Valid!")
    }
    console.log(postRes)

    setInputData({
      first_name: "",
      last_name: "", 
      email: "", 
      phone: "", 
      address: "",
      district: "",
      postal_code: ""
    })
    setIsModalOpen(false)
    setOpen(false)
  }

  const handleInputChangeText = (e) => {
    let sanitizedValue = 0
    if (e.target.name === 'address' || e.target.name === 'district' || e.target.name === 'email'){
      sanitizedValue = DOMPurify.sanitize(e.target.value)
    } else {
      sanitizedValue = DOMPurify.sanitize(e.target.value).replace(/[^a-zA-Z]/g, '')
    }
    setInputData({
      ...inputData,
      [e.target.name]: sanitizedValue
    })
  }

  const handleInputChangeNumber = (e) => {
    const sanitizedValue = e.target.value.replace(/[^0-9]/g, '');
    setInputData({
      ...inputData,
      [e.target.name]: sanitizedValue
    })
  }

  const handleCancel = () => {
    setInputData({
      first_name: "",
      last_name: "", 
      email: "", 
      phone: "", 
      address: "",
      district: "",
      postal_code: ""
    })
    setIsModalOpen(false)
    setOpen(false)
  }

  return (
    <Modal title="New Customer Info" centered open={isModalOpen} onCancel={handleCancel} footer={null}>

      <Box component="form" onSubmit={handleOk} >
        <Flex gap="10px" vertical>
          <TextField required id="outline-required" label='First Name' name="first_name" value={inputData.first_name} onChange={handleInputChangeText}
           inputProps={{ maxLength: 15, pattern: "[a-zA-z]*"}}/>
          <TextField required id="outline-required" label='Last Name' name="last_name" value={inputData.last_name} onChange={handleInputChangeText}
           inputProps={{ maxLength: 15, pattern: "[a-zA-z]*"}}/>
          <TextField required id="outline-required" label='Email' name="email" value={inputData.email} onChange={handleInputChangeText}
            inputProps={{ maxLength: 25, type: "email"}}/>
          <TextField required id="outline-required" label='Phone Number' name="phone" value={inputData.phone} onChange={handleInputChangeNumber}
           inputProps={{ maxLength: 10, pattern: "[0-9]*"}}/>
          <TextField required id="outline-required" label='Address' name="address" value={inputData.address} onChange={handleInputChangeText}
           inputProps={{ maxLength: 30 }}/>
          <TextField required id="outline-required" label='State' name="district" value={inputData.district} onChange={handleInputChangeText}
           inputProps={{ maxLength: 20 }}/>
          <TextField required id="outline-required" label='Zip Code' name="postal_code" value={inputData.postal_code} onChange={handleInputChangeNumber}
           inputProps={{ maxLength: 5, pattern: "[0-9]*"}}/>
          <Divider />
          <Button variant="contained" color="primary" type="submit">Ok</Button>
        </Flex>
      </Box>
    </Modal>
  )
}

export default AddCustomer
