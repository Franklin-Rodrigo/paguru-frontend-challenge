import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';

import api from '../../services/api';
import './styles.css';
import Header from '../../components/Header';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  const history = useHistory();
  useEffect(() => {
    const getFeed = async () =>{
      const response = await api.get( `users/${window.location.pathname.substring(9)}` );
      console.log(feed);
    setFeed(response.data.posts);
    }

    getFeed();
  }, [feed])


const deletePost = (id:string) => {
    api.delete(`posts/${id}/`)
    .then(()=>history.push('/dashboard'))
    .catch((() => toast("Desculpe, Você não possui autorização para deleter esse post!!")));
  }


    return (
      <div>
        <ToastContainer/>
        <Header/>
      {feed.length > 0
      ?<section id="post-list">
        {feed?.map(post => (
          <article key={post.id}>
            <header>
              <div className="user-info">
                <span>{post.author_name}</span>
                <span className="place">{post.content}</span>
              </div>
              <div>
                <table>
                  <tr>
                    <td>
                    <Link to={`/editpost/${post.id}`}>
                    <button type="submit" >
                       editar
                    </button>
                    </Link>
                    </td>
                    <td>  
                      <form>
                      <button type="submit" onClick={e => {
                          e.preventDefault();
                          deletePost(post.id);
                         }}>
                         X
                      </button>
                      </form>
                    </td>
                  </tr>
                </table>
               
            
              </div>
            </header>

          </article>
        ))}
      </section>

      :<div id="post-list">
        <article>
            <header>
              <div className="user-info">
            <span>O úsuario não possui nenhum post encontrado</span>
              </div>

            </header>

          </article>
      </div> 
            }
      </div>
    );
  
}

export default Feed;
