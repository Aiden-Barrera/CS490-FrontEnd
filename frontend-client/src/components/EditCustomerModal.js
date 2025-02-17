import React, { useEffect, useState } from "react"
import axios from "axios"
import { Modal, Typography, Input, Divider, Form, Button } from "antd"
import "./styleTable.css"
const { Paragraph } = Typography

const EditCustomerModal = ({info, open, setOpen}) => {
  const [form] = Form.useForm()

  useEffect(() => {
    if (info){
      form.setFieldsValue({
        firstname: info?.first_name,
        lastname: info?.last_name,
        email: info?.email,
        phone: info?.phone
      })  
    }
  }, [info, form])

  const handleClose = () => {
    setOpen(false) 
  }
 
  const onFinish = (value) => {
    console.log(value)
  }

  return (
    <Modal title="Edit Customer Info" open={open} footer={null} onCancel={handleClose} centered>
      <Form form={form} layout="vertical" onFinish={onFinish} initialValues={{
        firstname: info?.first_name,
        lastname: info?.last_name,
        email: info?.email,
        phone: info?.phone
      }}>
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
          <Input key={info?.customer_id}/>
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
          <Input key={info?.customer_id} />
        </Form.Item>
        <Form.Item label="Email" name="email" rules={[
          {
            required: true,
            message: "Input Email"
          },
          {
            type: "email",
            message: "Invalid Email Format"
          }
        ]}>
          <Input key={info?.customer_id}/>
        </Form.Item>
        <Form.Item label="Phone Number" name='phone' rules={[
          {
            required: true,
            message: 'Input Phone Number'
          }, 
          {
            pattern: /^[0-9]+$/,
            message: "Letter Aren't Allowed"
          }
        ]}>
          <Input key={info?.customer_id}/>
        </Form.Item>
        <Divider />
        <Form.Item label={null}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>

      </Form>
    </Modal>
  )

}

export default EditCustomerModal
