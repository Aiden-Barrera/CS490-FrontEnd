import React, { useState, useEffect } from "react";
import axios from 'axios'
import './../App.css'
import { Flex, Card, Typography, Divider } from 'antd'
import CModal from './../components/CModal.js'
const { Title, Paragraph } = Typography


const Home = () => {
  const [topFilms, setTopFilms] = useState([])
  const [topActors, setTopActors] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isFilm, setIsFilm] = useState(false)
  const [data, setData] = useState(null)

  const showModal = (item) => {
    setData(item)
    setIsModalOpen(true)
  }

  const handleClose = () => {
    setIsModalOpen(false)
    setData(null)
  }
  
  useEffect(() => {
    axios.get('http://localhost:3001/movies/top5Movies')
      .then(response => {
        setTopFilms(response.data)
      })
      .catch(err => {
        console.log("Error")
      })
  }, [])

  useEffect(() => {
    axios.get('http://localhost:3001/movies/top5Actors')
      .then(response => {
        setTopActors(response.data)
      })
  .catch(err => {
        console.log("Error")
      })
  }, [])

  return (
    <>
      <div style={{ margin: "50px", height: "350px" }}> 
        <Flex justify="center" style={{ marginBottom: "20px" }}> 
          <Title level={1}>Top 5 Movies</Title>
        </Flex>
        <Flex wrap gap="large" justify="center"> 
          {topFilms.map((item) => (
            <Card className="card-hover" hoverable bordered={false} size="small" style={{ width: "220px", boxShadow: "0 2px 5px black", textAlign: "center", margin: "10px",
              transition: "transform 0.3s ease, box-shadow 0.3s ease"}}
              onClick={() => {showModal(item); setIsFilm(true)}}> 
              <Title level={3}>{item.title}</Title>
              <Paragraph>Rented: {item.rented}</Paragraph>
            </Card>
          ))}
        </Flex>
      </div>
      <Divider />
      <div style={{ margin: "50px"}}>
        <Flex justify="center" style={{ marginBottom: "20px" }}> 
          <Title level={1}>Top 5 Actors</Title>
        </Flex>
        <Flex wrap gap="large" justify="center">
          {topActors.map((item) => (
            <Card className="card-hover" hoverable bordered={false} size="small" style={{ width: "220px", boxShadow: "0 2px 5px black", textAlign: "center", margin: "10px", 
              transition: "transform 0.3s ease, box-shadow 0.3s ease"}}
              onClick={() => {showModal(item); setIsFilm(false)}}>
              <Title level={3}>{item.first_name} {item.last_name}</Title>
              <Paragraph>Movies: {item.movies}</Paragraph>
            </Card>
          ))}
        </Flex>
      </div>

      <CModal info={data} isFilm={isFilm} open={isModalOpen} handleClose={handleClose}/>  
    </>
  )
}

export default Home
