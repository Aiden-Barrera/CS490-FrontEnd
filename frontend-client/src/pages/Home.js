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
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", margin: "50px"}}> 
        <Flex justify="center" style={{ marginBottom: "20px" }}> 
          <Title level={1} style={{color: "#373b41"}}>Top 5 Movies</Title>
        </Flex>
        <Flex wrap gap="50px" justify="center" style={{ width: "990px"}}> 
          {topFilms.map((item) => (
            <Card className="card-hover" cover={<img src="/movie.png" alt="movie icon" />}hoverable bordered={false} size="small" style={{ width: "250px", 
              boxShadow: "0 2px 5px black", textAlign: "center", margin: "10px", padding: "13px", 
              transition: "transform 0.3s ease, box-shadow 0.3s ease"}}
              onClick={() => {showModal(item); setIsFilm(true)}}> 
              <Title level={3} style={{color: "#fbf1dc"}}>{item.title}</Title>
              <Paragraph style={{color: "#fbf1dc"}}>Rented: {item.rented}</Paragraph>
            </Card>
          ))}
        </Flex>
      </div>
      <Divider />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", margin: "50px"}}>
        <Flex justify="center" style={{ marginBottom: "20px" }}> 
          <Title level={1} style={{color: "#373b41"}}>Top 5 Actors</Title>
        </Flex>
        <Flex wrap gap="50px" justify="center" style={{ width: "990px" }}>
          {topActors.map((item) => (
            <Card className="card-hover" cover={<img src="/drama.png" alt="actor icon" />} hoverable bordered={false} size="small" style={{ width: "250px", 
              boxShadow: "0 2px 5px black", textAlign: "center", margin: "10px", padding: "13px", 
              transition: "transform 0.3s ease, box-shadow 0.3s ease"}}
              onClick={() => {showModal(item); setIsFilm(false)}}>
              <Title level={3} style={{color: "#fbf1dc"}}>{item.first_name} {item.last_name}</Title>
              <Paragraph style={{color: "#fbf1dc"}}>Movies: {item.movies}</Paragraph>
            </Card>
          ))}
        </Flex>
      </div>

      <CModal info={data} isFilm={isFilm} open={isModalOpen} handleClose={handleClose}/>  
    </>
  )
}

export default Home
