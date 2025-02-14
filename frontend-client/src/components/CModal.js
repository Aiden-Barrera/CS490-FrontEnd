import React, { useState, useEffect } from "react";
import { Modal, Typography } from "antd";
import '../App.css'; 
import axios from "axios";
const { Title, Paragraph } = Typography

const CModal = ({ info, isFilm, open, handleClose }) => {
  const [selectedInfo, setSelectedInfo] = useState(null)
  
  useEffect(() => {
    if (!info) return

    const fetchInfo = async () => {
      try {
        isFilm 
          ? await axios.get(`http://localhost:3001/movieDescription/${info.film_id}`).then(response => {setSelectedInfo(response.data)})
          : await axios.get(`http://localhost:3001/actorDescription/${info.actor_id}`).then(response => {setSelectedInfo(response.data)})

      } catch (err) {
        console.log("Error")
      }
    }

    fetchInfo()
  }, [info])
  
  return (
    <Modal title={isFilm ? `${selectedInfo?.[0]?.title}`: `${info?.first_name} ${info?.last_name}'s Top Films`} open={open} footer={null} onCancel={handleClose} centered 
      className="style-modal"> 
      <Paragraph>{isFilm ? `Description: ${selectedInfo?.[0]?.description}` : `${selectedInfo?.[0]?.title}: ${selectedInfo?.[0]?.rental_count} Rented`}</Paragraph>
      <Paragraph>{isFilm ? `Released: ${selectedInfo?.[0]?.release_year}` : `${selectedInfo?.[1]?.title}: ${selectedInfo?.[1]?.rental_count} Rented`}</Paragraph>
      <Paragraph>{isFilm ? `Genre: ${selectedInfo?.[0]?.name}` : `${selectedInfo?.[2]?.title}: ${selectedInfo?.[2]?.rental_count} Rented`}</Paragraph>
      <Paragraph>{isFilm ? `Rated: ${selectedInfo?.[0]?.rating}` : `${selectedInfo?.[3]?.title}: ${selectedInfo?.[3]?.rental_count} Rented`}</Paragraph>
      <Paragraph>{isFilm ? `Rented: ${info?.rented}` : `${selectedInfo?.[4]?.title}: ${selectedInfo?.[4]?.rental_count} Rented`}</Paragraph>
    </Modal>
  )

}

export default CModal
