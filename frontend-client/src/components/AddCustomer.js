import React, { useEffect, useState } from "react"
import axios from "axios"
import { Modal, Input } from "antd"

const AddCustomer = ({ open, setOpen }) => {
  const [isModalOpen, setIsModalOpen] = useState(open)

  useEffect(() => {
    setIsModalOpen(open)
  }, [open])

  const handleOk = () => {
    setIsModalOpen(false)
    setOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
    setOpen(false)
  }

  return (
    <Modal title="New Customer Info" centered open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
       <Input placeholder="First Name" /> 
    </Modal>
  )
}

export default AddCustomer
