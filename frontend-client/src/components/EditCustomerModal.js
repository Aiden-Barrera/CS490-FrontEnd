import React, { useEffect, useState } from "react"
import axios from "axios"
import { Modal, Typography, Input, Divider, Form } from "antd"
import "./styleTable.css"
const { Paragraph } = Typography

const EditCustomerModal = ({info, open, setOpen}) => {
  const [editInfo, setEditInfo] = useState(null)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
 
  const handleClose = () => {
    setOpen(false)
  }
  const handleFNameChange = (e) => {
    setFirstName(e.target.value)
    console.log(firstName)
  }

  const handleLNameChange = (e) => {
    setLastName(e.target.value)
  }

  return (
    <Modal title="Edit Customer Info" open={open} footer={null} onCancel={handleClose} centered>
      <Form layout="vertical">
        <Form.Item label="First Name" name='firstname' rules={[
          {
            required: true,
            message: 'Input First Name'
          },
          {
            pattern: /^[a-zA-Z]+$/, 
            message: "Numbers Aren't Allowed"
          }
        ]}> 
          <Input defaultValue={info?.first_name} onChange={handleFNameChange} />
        </Form.Item>
        <Form.Item label="Last Name" name='lastname' rules={[
          {
            required: true,
            message: 'Input Last Name'
          }, 
          {
            pattern: /^[a-zA-Z]+$/,
            message: "Numbers Aren't Allowed"
          }
        ]}>
          <Input defaultValue={info?.last_name} onChange={handleLNameChange} />
        </Form.Item>

      </Form>
    </Modal>
  )

}

export default EditCustomerModal
