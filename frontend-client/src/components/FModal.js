import React, { useEffect, useState } from "react"
import axios from "axios"
import { Modal, Typography, Input, Divider, Form } from "antd"
import "./styleTable.css"
const { Paragraph } = Typography
const { Search } = Input

const FModal = ({row, open, handleClose }) => {
  const [selectedInfo, setSelectedInfo] = useState(null)
  const [noCopies, setNoCopies] = useState(null)
  const [rentToCustomer, setRentToCustomer] = useState('')
  const [inputWarning, setInputWarning] = useState(false)
  const [validCustomer, setValidCustomer] = useState(false)
  const [zeroCopies, setZeroCopies] = useState(false)

  useEffect(() => {
    if (!row) return; 

    const fetchInfo = async () => {
      const id = row.film_id
      const res1 = await axios.get(`http://localhost:3001/movieDescription/${id}`)
      const res2 = await axios.get(`http://localhost:3001/movies/copies/${id}`)           
      setSelectedInfo(...res1.data)
      setNoCopies(...res2.data)
    }
    fetchInfo()
  }, [row, validCustomer])

  useEffect(() => {
    if (!open){
      setRentToCustomer('')
      setZeroCopies(false)
      setInputWarning(false)
      setValidCustomer(false)
    }
  }, [open, setRentToCustomer])

  const handleSearch = (e) => {
    setRentToCustomer(e.target.value)
    setInputWarning(false)
    setZeroCopies(false)
    setValidCustomer(false)
    console.log(rentToCustomer)
  }

  const handleCustomerID = async () => {
    if (typeof noCopies === 'undefined') {
      setInputWarning(true)
      setZeroCopies(true)
      return
    }
    if (rentToCustomer === '') {
      setValidCustomer(false)
      return;
    }

    const res = await axios.get(`http://localhost:3001/customers/validate/${rentToCustomer}`)
    if (Array.isArray(res.data) && res.data.length === 0){
      setInputWarning(true)
    } else {
      await axios.get(`http://localhost:3001/customers/rent/${selectedInfo?.film_id}/${rentToCustomer}`)
      setValidCustomer(true)
    }
    setRentToCustomer('')
  }

  return (
    <Modal title={selectedInfo?.title} open={open} footer={null} onCancel={handleClose} centered>
      <Paragraph>Description: {selectedInfo?.description}</Paragraph>
      <Paragraph>Release Year: {selectedInfo?.release_year}</Paragraph>
      <Paragraph>Rating: {selectedInfo?.rating}</Paragraph>
      <Paragraph>Genre: {selectedInfo?.name}</Paragraph>
      <Paragraph>Special Features: {selectedInfo?.special_features}</Paragraph>
      <Paragraph># of Copies: {typeof noCopies?.copies === 'undefined' ? 0 : noCopies?.copies}</Paragraph>
      <Divider />
      <Form layout="vertical"> 
        <Form.Item label="Rent Movie" validateStatus={inputWarning ? "error" : validCustomer ? "success" : ""} hasFeedback help={inputWarning ? zeroCopies ? "No Copies to Rent" : "Invalid Customer ID" : validCustomer ? 
          <span style={{color:"green"}}>Movie Rented</span> : ""}>
          <Search className="custom-search" placeholder="Enter Customer ID" value={rentToCustomer} onChange={handleSearch} onSearch={handleCustomerID} enterButton/>
        </Form.Item>
      </Form>
    </Modal>
  )
  
}

export default FModal
