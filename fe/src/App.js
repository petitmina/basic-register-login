import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './page/Login';
import Register from './page/Register';
import Home from './page/Home';
import Logout from './page/Logout';
import Navbar from './components/Navbar';
import { useEffect, useState } from 'react';
import api from './utils/api';

function App() {
  const [user, setUser] = useState(null);

  const getUser = async()=> { //토큰을 통해 유저정보를 가져온다
    try{
      const storedToken = sessionStorage.getItem('token');
      if(storedToken) {
        const response = await api.get('/user/me');
        console.log('rrrr', response);
        setUser(response.data.user);
      }
    } catch(error){
      setUser(null);
    }
  };

  useEffect(() =>{
    getUser();
  }, [])

  return (
    <div className="App">
      <Navbar user={user}/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login user={user} setUser={setUser}/>}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/logout' element={<Logout setUser={setUser}/>}/>
      </Routes>
    </div>
  );
}

export default App;
