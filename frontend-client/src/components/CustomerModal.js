import React, { useEffect, useState } from "react"
import axios from "axios"
import { Modal, Typography, Input, Divider, Form, Table, Button, Flex } from "antd"
import "./styleTable.css"
import EditCustomerModal from "./EditCustomerModal.js"
const { Paragraph } = Typography
const { Search } = Input

const CustomerModal = ({row, open, handleClose, fetch }) => {
  const [customerInfo, setCustomerInfo] = useState(null)
  const [customerRentHistory, setCustomerRentHistory] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [inputWarning, setInputWarning] = useState(false)
  const [validRentID, setValidRentID] = useState(false)
  const [returnFilm, setReturnFilm] = useState(null)
  const [noRentals, setNoRentals] = useState(false)

  const fetchInfo = async () => {
    const id = row.customer_id
    const res1 = await axios.get(`http://localhost:3001/customers/info/${id}`)
    const res2 = await axios.get(`http://localhost:3001/customers/info/rentHistory/${id}`)
    setCustomerInfo(...res1.data)
    setCustomerRentHistory(res2.data)
  }

  useEffect(() => {
    if (!row) return; 

    fetchInfo()
    setInputWarning(false)
    setValidRentID(false)
  }, [row, validRentID])

  useEffect(() => {
    if (!open){
      setReturnFilm('')
      setNoRentals(false)
      setInputWarning(false)
    }
  }, [open, returnFilm])

  const columns = [
    {
      title: "Rental ID",
      dataIndex: "rental_id",
      key: "rental_id"
    },
    {
      title: 'Film Title',
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: 'Rental Date',
      dataIndex: 'rental_date',
      key: 'rental_date'
    },
    {
      title: 'Return Date',
      dataIndex: 'return_date',
      key: 'return_date'
    }
  ]

  const handleButton = () => {
    setIsModalOpen(true)
  } 

  const handleSearch = (e) => {
    setReturnFilm(e.target.value)
    setInputWarning(false)
    console.log(returnFilm)
  }

  const handleReturn = async () => {
    if (customerRentHistory.length === 0){
      console.log("No Movies to return")
      setInputWarning(true)
      setNoRentals(true)
      return
    }

    if (returnFilm === '') {
      setInputWarning(true)
      return
    }

    const res = await axios.get(`http://localhost:3001/movies/rental/validate/${returnFilm}`)
    if (Array.isArray(res.data) && res.data.length === 0){ 
      setInputWarning(true)
    } else {
      const returned = await axios.post(`http://localhost:3001/customers/return`, {rental_id: returnFilm} )
      console.log(returned)
      setValidRentID(true)
    }

  }

  const handleDeleteButton = () => {
    Modal.confirm({
      title: "Confirm Deletion",
      content: "Are you sure you want to delete? Actions Can't be Undone",
      okText: "Yes, delete",
      okType: "danger",
      okButtonProps: { type: "primary"},
      cancelText: "Cancel",
      cancelButtonProps: { type: "default"},
      onOk: async () => {
        const deleteInfo = {customerId: customerInfo?.customer_id, addressId: customerInfo?.address_id}

        await axios.post(`http://localhost:3001/customers/info/delete`, deleteInfo)
        fetch()
        handleClose()
      }
    })
  } 

  return (
    <>
      <Modal title="Customer Info & Rental History" open={open} footer={null} onCancel={handleClose} centered width={900}>
        <Paragraph>First Name: {customerInfo?.first_name}</Paragraph>
        <Paragraph>Last Name: {customerInfo?.last_name}</Paragraph>
        <Paragraph>Email: {customerInfo?.email}</Paragraph>
        <Paragraph>Phone #: {customerInfo?.phone}</Paragraph>
        <Paragraph>Address: {customerInfo?.address}</Paragraph>
        <Paragraph>District: {customerInfo?.district}</Paragraph>
        <Paragraph>Postal Code: {customerInfo?.postal_code}</Paragraph>
        <Paragraph>Member Since: {customerInfo?.create_date}</Paragraph>
        <Table columns={columns} dataSource={customerRentHistory} className="custom-table" size="small" scroll={{y: 200}}/>
        <Divider />
        <Form layout="vertical"> 
          <Form.Item label="Return Movie" validateStatus={inputWarning ? "error" : validRentID ? "success" : ""} hasFeedback help={inputWarning ? noRentals ? "No Rentals to Return" :
            "Invalid Rental ID" : validRentID ? <span style={{color:"green"}}>Movie Returned</span> : ""}>
            <Flex gap="10px" align='center' vertical={false}>
              <Search className="custom-search" placeholder="Enter rental ID" value={returnFilm} onChange={handleSearch} onSearch={handleReturn} enterButton/>
              <Button type="primary" onClick={handleButton} className="custom-button" style={{backgroundColor: "#33595e", borderColor: "#33595e"}}>Edit Info</Button>
              <Button color="danger" variant="solid" onClick={handleDeleteButton}>Delete Customer</Button>
            </Flex>
          </Form.Item>
        </Form>
      </Modal>
      <EditCustomerModal info={customerInfo} open={isModalOpen} setOpen={setIsModalOpen} fetch={fetchInfo} />
    </>
  )
  
}

export default CustomerModal
