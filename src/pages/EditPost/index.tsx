import React, { useState } from "react";
import api from '../../services/api';
import "./styles.css";
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register: React.FC = () => {
    const [content, setContent] = useState("");
    const history = useHistory();

  const handleNewPost = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event?.preventDefault();
    await api.put(`/posts/${window.location.pathname.substring(10)}/`,{content})
    .then(()=>history.push('/dashboard'))
    .catch((() => toast("Desculpe, Você não tem permição para editar esse post!")));
  };

  return (
    <>
     <ToastContainer/>
    <Header/>
      <form id="new-user" onSubmit={handleNewPost}>
          <label>
              Edite seu post
        </label>
        <textarea value={content} 
              onChange={(e) => setContent(e.target.value)} />
           <button type="submit">Editar post</button>
      </form>
    </>
  );
};

export default Register;
