import React from "react"
import { Link } from "react-router-dom"
import './../App.css'
import { Layout, Menu } from 'antd'

const { Header } = Layout;

const Navbar = () => (
  <Header>
    <Menu theme="dark" mode="horizontal">
      <Menu.Item key="1">
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/films">Films</Link>
      </Menu.Item>
      <Menu.Item key="3">
        <Link to="/customer">Customer</Link>
      </Menu.Item>
    </Menu>
  </Header>
);


export default Navbar
