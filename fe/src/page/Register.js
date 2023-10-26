import React, { useState } from 'react'
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');
    //에러가 생길때마다 에러를 보여주기 위해
    const [error, setError] = useState('');
    const navigate = useNavigate();


    const handleSubmit = async (event) => {
        event.preventDefault();
        //백엔드 부르기전에 패스워드와 컴펌드패스워드의 값이 일치하는지 확인
        try{
           if(password !== confirmedPassword){
            throw new Error('패스워드가 일치하지 않습니다')
        } 
        const response = await api.post('/user', JSON.stringify({ name, password, email }));
        console.log('rrrr', response)
        if(response.status === 200) {
            console.log('회원가입 성공, 로그인 페이지로 이동');
            navigate('/login');
        } else {
            throw new Error(response.data.error);
        }
        } catch(error){
            setError(error.message);
        }
    }

  return (
    <div>
        {error && <div>{error}</div>}
      <form onSubmit={handleSubmit}>
        <h1>회원가입</h1>
        <label>이름: </label>
        <input 
            value={name}
            type='string'
            placeholder='이름을 입력하세요'
            onChange={(event) => setName(event.target.value)}
        />
        <label>이메일: </label>
        <input  
            value={email}
            type='email'
            placeholder='이메일을 입력하세요'
            onChange={(event) => setEmail(event.target.value)}
        />
        <label>password: </label>
        <input 
            value={password}
            type='password'
            placeholder='비밀번호를 입력하세요'
            onChange={(event) => setPassword(event.target.value)}
        />
        <label>confirmed password: </label>
        <input 
            value={confirmedPassword}
            type='password'
            placeholder='비밀번호를 한번 더 입력하세요'
            onChange={(event) => setConfirmedPassword(event.target.value)}
        />
        <button type='submit'>회원가입</button>
      </form>
    </div>
  )
}

export default Register
