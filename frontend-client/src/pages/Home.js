import React, { useState, useEffect } from "react";
import axios from 'axios'
import './../App.css'
import { Flex, Card, Typography } from 'antd'
import {motion} from "framer-motion"
import CModal from './../components/CModal.js'
const { Title, Paragraph } = Typography

const cardVariants = {
  hidden: { opacity: 0, x: -100, filter: "blur(5px)", transform: "translateX(-100%)" }, 
  visible: (i) => ({
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transform: "translateX(0)",
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" }, 
  }),
}

const titleVariants = {
  hidden: { opacity: 0, y: 50, filter: "blur(5px)", transform: "translateX(-100%)" }, 
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transform: "translateX(0)", transition: { duration: 0.8, ease: "easeOut" } } 
};


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
      <Flex justify="center" align="center" style={{height: "100vh"}}> 
        <h1 className="title" style={{color: "#373b41"}}>Welcome to Sakila Portal</h1>
      </Flex>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", margin: "50px", paddingBottom: "500px"}}> 
        <Flex justify="center" style={{ marginBottom: "20px" }}> 
          <motion.div 
            variants={titleVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
          >
            <Title level={1} style={{color: "#373b41"}}>Top 5 Movies</Title>
          </motion.div>
        </Flex>
        <Flex wrap gap="50px" justify="center" style={{ width: "990px"}}> 
          {topFilms.map((item, index) => (
            <motion.div 
              key={item.film_id}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }} 
              custom={index} 
              style={{display: "inline-block"}}
            >
              <Card className="card-hover" cover={<img src="/movie.png" alt="movie icon" />}hoverable bordered={false} size="small" style={{ width: "250px", 
                boxShadow: "0 2px 5px black", textAlign: "center", margin: "10px", padding: "13px", 
                transition: "transform 0.3s ease, box-shadow 0.3s ease"}}
                onClick={() => {showModal(item); setIsFilm(true)}}> 
                <Title level={3} style={{color: "#fbf1dc"}}>{item.title}</Title>
                <Paragraph style={{color: "#fbf1dc"}}>Rented: {item.rented}</Paragraph>
              </Card>
            </motion.div>
          ))}
        </Flex>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", paddingBottom: "400px"}}>
        <Flex justify="center" style={{ marginBottom: "20px" }}> 
          <motion.div 
            variants={titleVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
          >
            <Title level={1} style={{color: "#373b41"}}>Top 5 Actors</Title>
          </motion.div>
        </Flex>
        <Flex wrap gap="50px" justify="center" style={{ width: "990px" }}>
          {topActors.map((item, index) => (
            <motion.div 
              key={item.actor_id}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }} 
              custom={index} 
            >
              <Card className="card-hover" cover={<img src="/drama.png" alt="actor icon" />} hoverable bordered={false} size="small" style={{ width: "250px", 
                boxShadow: "0 2px 5px black", textAlign: "center", margin: "10px", padding: "13px", 
                transition: "transform 0.3s ease, box-shadow 0.3s ease"}}
                onClick={() => {showModal(item); setIsFilm(false)}}>
                <Title level={3} style={{color: "#fbf1dc"}}>{item.first_name} {item.last_name}</Title>
                <Paragraph style={{color: "#fbf1dc"}}>Movies: {item.movies}</Paragraph>
              </Card>
            </motion.div>
          ))}
        </Flex>
      </div>

      <CModal info={data} isFilm={isFilm} open={isModalOpen} handleClose={handleClose}/>  
    </>
  )
}

export default Home
