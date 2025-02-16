import React, { useEffect, useState } from "react"
import axios from "axios"
import { Modal, Typography, Input, Divider, Form, Table } from "antd"
import "./styleTable.css"
const { Paragraph } = Typography
const { Search } = Input

const CustomerModal = ({row, open, handleClose }) => {
  const [customerInfo, setCustomerInfo] = useState(null)
  const [customerRentHistory, setCustomerRentHistory] = useState(null)

  useEffect(() => {
    if (!row) return; 

    const fetchInfo = async () => {
      const id = row.customer_id
      const res1 = await axios.get(`http://localhost:3001/customers/info/${id}`)
      const res2 = await axios.get(`http://localhost:3001/customers/info/rentHistory/${id}`)
      setCustomerInfo(...res1.data)
      setCustomerRentHistory(res2.data)
    }
    fetchInfo()
  }, [row])

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

  return (
    <Modal title="Customer Info & Rental History" open={open} footer={null} onCancel={handleClose} centered width={900}>
      <Paragraph>First Name: {customerInfo?.first_name}</Paragraph>
      <Paragraph>Last Name: {customerInfo?.last_name}</Paragraph>
      <Paragraph>Email: {customerInfo?.email}</Paragraph>
      <Paragraph>Phone #: {customerInfo?.phone}</Paragraph>
      <Paragraph>Member Since: {customerInfo?.create_date}</Paragraph>
      <Table columns={columns} dataSource={customerRentHistory} className="custom-table" size="small" scroll={{y: 200}}/>
      <Divider />
    </Modal>
  )
  
}

export default CustomerModal
