import React, { useEffect, useState } from "react"
import axios from "axios"
import { Modal, Typography, Input, Divider, Form, Button, Flex } from "antd"
import "./styleTable.css"
const { Paragraph } = Typography

const EditCustomerModal = ({info, open, setOpen, fetch}) => {
  const [form] = Form.useForm()

  useEffect(() => {
    if (info){
      form.setFieldsValue({
        firstname: info?.first_name,
        lastname: info?.last_name,
        email: info?.email,
        phone: info?.phone,
        address: info?.address,
        district: info?.district, 
        postalcode: info?.postal_code 
      })  
    }
  }, [info, form])

  const handleClose = () => {
    setOpen(false) 
  }
 
  const onFinish = async (value) => {
  const combinedValue = {
      ...value,
      addressId: info?.address_id,
      customerId: info?.customer_id
    }
    await axios.post('http://localhost:3001/customers/info/edit', combinedValue)
    fetch()
    setOpen(false)
  }

  return (
    <Modal title="Edit Customer Info" open={open} footer={null} onCancel={handleClose} centered>
      <Form form={form} layout="vertical" onFinish={onFinish} initialValues={{
        firstname: info?.first_name,
        lastname: info?.last_name,
        email: info?.email,
        phone: info?.phone,
        address: info?.address,
        district: info?.district, 
        postalcode: info?.postal_code 
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
         <Form.Item label="Address" name='address' rules={[
          {
            required: true,
            message: 'Input Address'
          }, 
          {
            pattern: /^[a-zA-Z0-9 ]*$/,
            message: "Special Characters Aren't Allowed"
          }
        ]}>
          <Input key={info?.customer_id}/>
        </Form.Item>
        <Form.Item label="District" name='district' rules={[
          {
            required: true,
            message: 'Input District'
          }, 
          {
            pattern: /^[a-zA-Z ]*$/,
            message: "Numbers Aren't Allowed"
          }
        ]}>
          <Input key={info?.customer_id}/>
        </Form.Item>
        <Form.Item label="Postal Code" name='postalcode' rules={[
          {
            required: true,
            message: 'Input Postal Code'
          }, 
          {
            pattern: /^[0-9]*$/,
            message: "Letters Aren't Allowed"
          }
        ]}>
          <Input key={info?.customer_id}/>
        </Form.Item>
        <Divider />
        <Form.Item label={null}>
          <Flex vertical>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          </Flex>
        </Form.Item>

      </Form>
    </Modal>
  )

}

export default EditCustomerModal
