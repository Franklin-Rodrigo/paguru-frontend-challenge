import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from '../../assets/logo.png';
import "./styles.css";
import { useAuth } from "../../contexts/auth";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login: React.FC = () => {
  const { signIn } = useAuth();
  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");
  

  const handleSignIn = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event?.preventDefault();
    await signIn({ username, password })
    .catch((() => toast("Desculpe, Login ou Password incorretos. Tente novamente!!")));
  };

  return (
    <>
      <form id="Login" onSubmit={handleSignIn}>
         <p id="logo">
           <img src={logo} alt="Paguru" />
        </p>
        <ToastContainer/>
        <p><h2>Login</h2></p>
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button type="submit">sign in</button>

        <p id="register">
          Ainda não possui uma conta com a gente? então{" "}
          <Link to="/register">registre-se</Link>
        </p>
      </form>
    </>
  );
};

export default Login;
