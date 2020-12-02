import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import camera from '../../assets/camera.svg';
import './styles.css';
import { useAuth } from '../../contexts/auth';

const Header:React.FC = ()=> {
  const { signOut } = useAuth();

  function handleSignOut() {
    signOut();
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light" id="main-header">
     <Link to="/">
          <img src={logo} alt="Paguru" />
        </Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
    
    </ul>
    <Link to="/newpost">
          <img src={camera} alt="Send post" />
        </Link>
      <Link to="/listusers">
          <button type="submit">
          Lista de usuarios
          </button>
       </Link>
     <button onClick={handleSignOut}>Sair</button>
  </div>
</nav>

  );
}

export default Header;