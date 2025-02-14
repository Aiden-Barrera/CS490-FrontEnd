import React, { useEffect, useState } from "react"
import axios from "axios"
import { Modal, Typography, Input, Divider } from "antd"
const { Paragraph } = Typography
const { Search } = Input

const FModal = ({row, open, handleClose }) => {
  const [selectedInfo, setSelectedInfo] = useState(null)
  const [noCopies, setNoCopies] = useState(null)
  const [rentToCustomer, setRentToCustomer] = useState('')
  const [inputWarning, setInputWarning] = useState('')

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
    setInputWarning('')
  }, [row])

  const handleSearch = (e) => {
    setRentToCustomer(e.target.value)
    setInputWarning('')
    console.log(rentToCustomer)
  }

  const handleCustomerID = async () => {
    if (typeof noCopies === 'undefined') {
      setInputWarning('error')
      return
    }

    const res = await axios.get(`http://localhost:3001/customers/validate/${rentToCustomer}`)
    if (Array.isArray(res.data) && res.data.length === 0){
      setInputWarning('error')
    } else {
      console.log("Valid Customer ID") 
    }
    console.log(`Searched: ${rentToCustomer}`)
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
      <Search status={inputWarning} placeholder="Enter Customer ID" value={rentToCustomer} onChange={handleSearch} onSearch={handleCustomerID}/>
    </Modal>
  )
  
}

export default FModal
