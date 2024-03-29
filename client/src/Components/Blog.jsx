import { useEffect, useState } from 'react';
import '../CSS/blog.css'
import {format, formatISO9075} from 'date-fns';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const Blog = () => {
    const [blogs, setBlogs] = useState([]);
    useEffect(() => {
        fetch('http://localhost:4000/blogs',{
            credentials: 'include',
        }).then(response => {
            if (!response.ok) {
                console.error('Failed to fetch blogs:', response.statusText);
                return;
            }
            response.json().then(blogs => {
                console.log(blogs);
                setBlogs(blogs);
            }).catch(error => {
                console.error('Error parsing response:', error);
            });
        }).catch(error => {
            console.error('Fetch error:', error);
        });
    }, []);
    
    
    return ( 
        <div className="blogs">
            {blogs.length > 0 && blogs.map((blog) => (
                <div className="blog-each">
                        <div className="blog-img">
                            <Link to={`/blogs/${blog._id}`}>
                                <img src={'http://localhost:4000/'+blog.file} alt="Image not available cureently" />
                            </Link>
                        </div>
                        <div className="blog-txt">
                            <div className="blog-title">
                                    <h3 className='title'>{blog.title}</h3>
                            </div>
                            <div className="blog-author">
                                    <p>by @{blog.author.username}</p>
                            </div>
                            <div className="blog-time">
                                
                                    <time>On {format(new Date(blog.createdAt), 'MMM d, yyyy')}</time>
                            </div>
                            <div className="blog-details">
                                    <p>{blog.snippet}</p>
                            </div>
                            <div className="button">
                                <button> <Link to={`/blogs/${blog._id}`}>Read More</Link></button>
                            </div>
                        </div>
                </div>
            ))}
        </div>
        
     );
}
 
export default Blog;
