import React, { useState } from "react";
import api from '../../services/api';
import "./styles.css";
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header';

const Register: React.FC = () => {
    const [content, setContent] = useState("");
    const history = useHistory();

  const handleNewPost = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event?.preventDefault();
    await api.post(`/posts/`,{content});
    history.push('/dashboard');
  };

  return (
    <>
    <Header/>
      <form id="new-user" onSubmit={handleNewPost}>
          <label>
              Faça seu post
        </label>
        <textarea value={content} 
              onChange={(e) => setContent(e.target.value)} />
           <button type="submit">registrar post</button>
      </form>
    </>
  );
};

export default Register;
