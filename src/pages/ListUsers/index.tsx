import React, { useEffect, useState } from 'react';
import {  Link } from 'react-router-dom';
import Header from '../../components/Header';
import api from '../../services/api';
import './styles.css';

interface List{
  username : string;
  id : string;
  email : string;
}
interface FeedProps {
  userId:string;
}
const Feed:React.FC<FeedProps> = ()=> {
  
  const [feed, setFeed] = useState<List[]>([])
  
  useEffect(() => {
    const getFeed = async () =>{
      const response = await api.get( `users/` );
    setFeed(response.data.results);
    }

    getFeed();
  }, [feed])

  
    return (
      <div>
      <Header/>
      {feed.length > 0
      ?<section id="post-list">
        {feed?.map(post => (
          <article key={post.id}>
            <header>
              <div className="user-info">
                <span>{post.username}</span>
                <span className="place">{post.email}</span>
              </div>
              <Link to={`/details/${post.id}`}>
              <button type="submit" >
                Detalhes
              </button>
              </Link>
            </header>

          </article>
        ))}
      </section>
      :<div id="post-list">
      <article>
          <header>
            <div className="user-info">
          <span>Nenhum úsuario encontrado</span>
            </div>

          </header>

        </article>
    </div> 
          }
      </div>
    );
  
}

export default Feed;
