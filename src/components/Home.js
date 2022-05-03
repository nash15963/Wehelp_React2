import React from 'react'
import { Link } from "react-router-dom";
import '../cssFile/Home.css'

function Home() {
  return (
    <div className = "home">
    <h1>React練習專案</h1>
    <p>歡迎光臨我的頁面</p>
    <Link to="/list"> <button>click to do...</button></Link>
    </div>
  )
}

export default Home