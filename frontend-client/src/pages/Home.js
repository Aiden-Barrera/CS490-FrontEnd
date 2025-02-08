import React, { useState, useEffect } from "react";
import axios from 'axios'
import './../App.css'
import { Flex, Card, Typography, Divider } from 'antd'
const { Title, Paragraph } = Typography


const Home = () => {
  const [topFilms, setTopFilms] = useState([])
  const [topActors, setTopActors] = useState([])
  
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
              transition: "transform 0.3s ease, box-shadow 0.3s ease"}}> 
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
              transition: "transform 0.3s ease, box-shadow 0.3s ease"}}>
              <Title level={3}>{item.first_name} {item.last_name}</Title>
              <Paragraph>Movies: {item.movies}</Paragraph>
            </Card>
          ))}
        </Flex>
      </div>
    </>
  )
}

export default Home
