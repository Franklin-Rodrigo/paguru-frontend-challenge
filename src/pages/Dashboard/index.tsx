import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';

import api from '../../services/api';
import './styles.css';

interface Post{
  author_name : string;
  updated_at : string;
  id : string;
  content : string;
  created_at : string;
}
interface FeedProps {
  userId:string;
}

const Feed:React.FC<FeedProps> = ()=> {
  
  const [feed, setFeed] = useState<Post[]>([])
  
  useEffect(() => {
    const getFeed = async () =>{
      const response = await api.get( `posts/` );
 
    setFeed(response.data.results);
    }
    getFeed();
  }, [feed])


    return (
      <div>
      <Header />
      {feed.length >= 0
      ?<section id="post-list">
        {feed?.map(post => (
          <article key={post.id}>
            <header>
              <div className="user-info">
                <span>{post.author_name}</span>
                <span className="place">{post.content}</span>
              </div>
            </header>

          </article>
        ))}
      </section>
      :<div id="post-list">
      <article>
          <header>
            <div className="user-info">
          <span>Nenhum post encontrado</span>
            </div>

          </header>

        </article>
    </div> 
          }
      </div>
    );
  
}

export default Feed;
