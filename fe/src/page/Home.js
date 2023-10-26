import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div>
        <div><Link to="/register">회원가입</Link></div>
        <div><Link to="/login">로그인</Link></div>
    </div>
  )
}

export default Home
