import React from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/api";

function Logout({ setUser }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // 서버 측 로그아웃 - 서버에서 세션 또는 토큰을 무효화하는 요청을 보냅니다.
      // 예: await api.post("/user/logout");
      // 클라이언트 측 로그아웃
      setUser(null);
      sessionStorage.removeItem('token');
      api.defaults.headers["authorization"] = "";

      // 로그아웃 후 리디렉션
      navigate('/login');
    } catch (error) {
      console.error("로그아웃 중 오류가 발생했습니다: ", error);
    }
  };

  return (
    <div>
      <h1>로그아웃</h1>
      <button onClick={handleLogout}>로그아웃</button>
      <Link to="/home">홈으로 돌아가기</Link>
    </div>
  );
}

export default Logout;
