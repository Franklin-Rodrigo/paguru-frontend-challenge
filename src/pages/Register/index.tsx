import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from '../../assets/logo.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "./styles.css";
import { useAuth } from "../../contexts/auth";

const Register: React.FC = () => {
  const { register } = useAuth();
  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleRegister = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event?.preventDefault();
    await register({ username, password, email })
    .catch((() => toast("Desculpe, já existe um usúario com esse nome. Tente novamente!!")));
  };

  return (
    <>
    <ToastContainer/>
      <form id="new-user" onSubmit={handleRegister}>
      <p id="logo">
           <img src={logo} alt="Paguru" />
        </p>
        <p>
          <h2>Registre-se</h2>
        </p>
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />

        <input
          type="email"
          name="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        <button type="submit">register</button>
        <p id="login">
          ja possui uma conta com a gente? então{" "}
          <Link to="/login">faça seu login</Link>
        </p>
      </form>
    </>
  );
};

export default Register;
