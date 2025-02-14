import React from "react"
import { Link } from "react-router-dom"
import './../App.css'
import { Layout, Menu, Typography } from 'antd'
import { HomeOutlined } from "@ant-design/icons"
const {Title} = Typography

const { Header } = Layout;

const Navbar = () => (
    <Header style={{ display: "flex", alignItems: 'center'}}>
      <div> 
        <Title style={{color: "#fbf1dc", margin: "0 20px"}}>Sakila Portal</Title>
      </div>
    
      <Menu theme="dark" mode="horizontal" style={{ marginLeft: "auto", minWidth: "250px" }}>
        <Menu.Item key="1">
          <Link to="/" style={{color:"#fbf1dc"}}>Home</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/films" style={{color:"#fbf1dc"}}>Films</Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/customer" style={{color:"#fbf1dc"}}>Customer</Link>
        </Menu.Item>
      </Menu>
    </Header>
);


export default Navbar
