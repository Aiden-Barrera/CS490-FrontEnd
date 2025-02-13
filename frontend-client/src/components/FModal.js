import React, { useEffect, useState } from "react"
import axios from "axios"
import { Modal, Typography } from "antd"
const { Paragraph } = Typography

const FModal = ({row, open, handleClose }) => {
  const [selectedInfo, setSelectedInfo] = useState(null)

  useEffect(() => {
    if (!row) return 

    const fetchInfo = async () => {
      const id = row.film_id
      const res1 = await axios.get(`http://localhost:3001/movieDescription/${id}`)
      const res2 = await axios.get(`http://localhost:3001/movies/copies/${id}`)

      const combinedRes = {...res1, ...res2}

      setSelectedInfo(combinedRes)
    }
    fetchInfo()
    console.log(`Selected Row Info: ${selectedInfo?.title}`)
  }, [row])
  
}

export default FModal
