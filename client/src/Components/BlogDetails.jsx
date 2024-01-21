import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom/cjs/react-router-dom.min";
import '../CSS/details.css';
import {format} from'date-fns';
import { UserContext } from "../UserContext";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const BlogDetails = () => {
    const history = useHistory();
    const {id} = useParams();
    const [blogInfo, setBlogInfo] = useState(null);
    const [redirect, setRedirect] = useState(false);
    const {userInfo} = useContext(UserContext);

    useEffect(() => {
        fetch(`http://localhost:4000/blogs/${id}`)
            .then((response) => {
                response.json()
                    .then(blogInfo => {
                        setBlogInfo(blogInfo);
                        console.log(blogInfo);
                    })
            })
    }, [id]);

    const handleDelete = async () => {
        try {
            const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1');
    
            const response = await fetch(`http://localhost:4000/blogs/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`, // Include the JWT token
                    'Content-Type': 'application/json',
                },
            });
    
            if (response.ok) {
                setRedirect(true);
            } else {
                console.error('Failed to delete the blog:', response.status);
            }
        } catch (error) {
            console.error('Error during delete request:', error);
        }
    };
    

    if (!blogInfo) return '';
    if(redirect) {
        history.push('/')
    }
    return (  
        <div className="blog-details">
            <div className="title">
                <h1>{blogInfo.title}</h1>
            </div>
            <div className="date">
                <time>First Published On {format(new Date(blogInfo.createdAt), 'MMM d, yyyy  h:mm:ss aa')}</time>
                <br />
                <time>Last Updated On {format(new Date(blogInfo.updatedAt), 'MMM d, yyyy h:mm aa')}</time>
            </div>
            <div className="edit">
                {userInfo.id === blogInfo.author._id && (
                    <div className="buttons">
                        <button><Link to={`/edit/${blogInfo._id}`}>Edit This Blog</Link></button>
                        <button onClick={handleDelete}>Delete This Blog</button>
                    </div>
                )} 
            </div>
            <div className="author">
                <p>by @{blogInfo.author.username}</p>
            </div>
            <div className="image">
                <img src={`http://localhost:4000/${blogInfo.file}`} alt="" />
            </div>
            <div className="content">
                <div dangerouslySetInnerHTML={{__html:blogInfo.content}}></div>
            </div>
        </div> 
    );
}
 
export default BlogDetails;
