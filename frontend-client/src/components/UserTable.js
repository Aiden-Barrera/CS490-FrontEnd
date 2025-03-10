import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Select, Input, Flex } from 'antd'
import AddCButton from "./AddCButton.js";
import CustomerModal from "./CustomerModal.js";
import './styleTable.css'
const { Search } = Input

const UserTable = () => {
  const [userInfo, setUserInfo] = useState([])
  const [selectedFilterOption, setSelectedFilterOption] = useState('customer_id')
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredInfo, setFilteredInfo] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [data, setData] = useState(null)

  const showModal = (row) => {
    setData(row)
    setIsModalOpen(true)
  }

  const handleClose = () => {
    setIsModalOpen(false)
    setData(null)
  }

  const fetchData = () => {
    axios.get('http://localhost:3001/customers/all')
      .then(response => {
        setUserInfo(response.data)
      })
      .catch(err => {
        console.log("Error")
      })
  }

  useEffect(() => {
    fetchData()   
  }, [])

  const columns = [
    {
      title: "Customer ID",
      dataIndex: "customer_id",
      key: "customer_id",
      sorter: (a,b) => a.customer_id - b.customer_id
    },
    {
      title: "First Name",
      dataIndex: "first_name",
      key: "first_name",
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
      key: "last_name"
    }, 
    {
      title: "Email",
      dataIndex: "email",
      key: "email"
  }
  ]

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
    console.log(searchTerm)
  }

  const handleSelectFilter = (value) => {
    setSelectedFilterOption(value)
  }

  const filteredUserInfo = userInfo.filter((item) => {
    if (searchTerm === '') return userInfo;

    return item[selectedFilterOption] 
      ? item[selectedFilterOption].toString().toLowerCase().includes(searchTerm.toLowerCase())
      : false 
  })

  useEffect(() => {
    setFilteredInfo(filteredUserInfo)
  }, [searchTerm, selectedFilterOption, userInfo])

  const handleRowClicked = (row) =>{
    showModal(row)
  }

  return (
    <div style={{ marginTop: "10px" }}>
      <Table columns={columns} dataSource={filteredInfo} className="custom-table" footer={() => (
        <Flex gap="10px"> 
          <Select showSearch placeholder="Select filter choice" optionFilterProp="label" value={selectedFilterOption} onChange={handleSelectFilter} style={{ width: 200 }}
      options={[
              {
                value: "customer_id",
                label: "Customer ID"
              },
              {
                value: "first_name",
                label: "First Name"
              },
              {
                value: "last_name",
                label: "Last Name"
              }
            ]}
          />
          <Search placeholder="Input search text" value={searchTerm} onChange={handleSearch} style={{ width: 200 }} />
          <AddCButton fetch={fetchData}/>
        </Flex>
       )} onRow={(record, rowIndex) => {
          return {
            onClick: () => handleRowClicked(record)  
          } 
       }} 
      />
      <CustomerModal row={data} open={isModalOpen} handleClose={handleClose} fetch={fetchData} />
    </div>
  )
}

export default UserTable
