import React, { useState, useEffect } from "react"
import axios from "axios";
import { Table, Select, Input, Flex } from 'antd'
const { Search } = Input

const FilmTable = () => {
  const [filmInfo, setFilmInfo] = useState([])
  const [selectedFilterOption, setSelectedFilterOption] = useState('title')
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredInfo, setFilteredInfo] = useState('')


  useEffect(() => {
    axios.get('http://localhost:3001/movies/all')
      .then(response => { setFilmInfo(response.data) })
      .catch(error => { console.log('Error Retrieving all Movies') })
  }, [])
  
  const columns = [
    {
      title: "Film ID",
      dataIndex: "film_id",
      key: "film_id"
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title"
    }, 
    {
      title: "First Name",
      dataIndex: "first_name",
      key: "first_name"
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
      key: "last_name"
    }, 
    {
      title: "Genre",
      dataIndex: "name",
      key: "name"
    }
  ]

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
    console.log(searchTerm)
  }

  const handleSelectFilter = (value) => {
    setSelectedFilterOption(value)
  }

  const filteredUserInfo = filmInfo.filter((item) => {
    if (searchTerm === '') return filmInfo;

    const fullName = `${item.first_name} ${item.last_name}`.toLowerCase(); 

    return selectedFilterOption === "full_name"
      ? fullName.includes(searchTerm.toLowerCase()) 
      : item[selectedFilterOption] 
        ? item[selectedFilterOption].toString().toLowerCase().includes(searchTerm.toLowerCase())
        : false;
  })

  useEffect(() => {
    setFilteredInfo(filteredUserInfo)
  }, [searchTerm, selectedFilterOption, filmInfo])

  const handleRowClick = (record) => {
    console.log(`Row Clicked: ${record.title}`)
  }

  return (
    <div style={{ marginTop: "10px"}}> 
      <Table columns={columns} dataSource={filteredInfo} footer={() => (
         <Flex gap="10px"> 
            <Select showSearch placeholder="Select filter choice" optionFilterProp="label" value={selectedFilterOption} onChange={handleSelectFilter} style={{ width: 200 }}
        options={[
                {
                  value: "title",
                  label: "Title"
                },
                {
                  value: "full_name",
                  label: "Actor's Name"
                },
                {
                  value: "name",
                  label: "Genre"
                }
              ]}
            />
            <Search placeholder="Input search text" value={searchTerm} onChange={handleSearch} style={{ width: 200 }} />
          </Flex>
        )} onRow={(record, rowIndex) => {
            return {
              onClick: () => handleRowClick(record)
            }
        }}
      />
    
    </div>
  )
}

export default FilmTable
