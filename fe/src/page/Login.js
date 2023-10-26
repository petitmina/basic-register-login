import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";

function Login({ user, setUser}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post("/user/login", { email, password });
      if (response.status === 200) {
        setUser(response.data.user);
        //토큰 생성
        sessionStorage.setItem('token', response.data.token);
        api.defaults.headers["authorization"] = "Bearer " + response.data.token;
        
        setError('');
        navigate('/');
      }
      throw new Error(response.message);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
        {error & <div>{error}</div>}
      <form onSubmit={handleLogin}>
        <label>이메일: </label>
        <input
          type="email"
          placeholder="이메일을 입력하세요"
          onChange={(event) => setEmail(event.target.value)}
        />
        <label>패스워드: </label>
        <input
          type="password"
          placeholder="비밀번호를 입력하세요 "
          onChange={(event) => setPassword(event.target.value)}
        />
        <button variant="danger" type="submit">
          로그인하기
        </button>
        <div>
          아직 계정이 없으세요?<Link to="/register">회원가입 하기</Link>{" "}
        </div>
      </form>
    </div>
  );
}

export default Login;
