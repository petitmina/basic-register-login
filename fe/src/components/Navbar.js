import React from 'react'
import { Link } from 'react-router-dom'

function Navbar({ user }) {
  return (
    <div>
      <nav>
        <Link to='/'>Home</Link>

        {user ? (
          <>
            <Link to='/mypage'>마이페이지</Link>
            <Link to='/logout'>로그아웃</Link>
          </>
        ) : (
          <>
            <Link to='/login'>로그인</Link>
            <Link to='/register'>회원가입</Link>
          </>
        )}
      </nav>
    </div>
  )
}

export default Navbar
