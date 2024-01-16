import { useEffect, useState } from 'react';
import '../blog.css'
import {format, formatISO9075} from 'date-fns'
const Blog = () => {
    const [blogs, setBlogs] = useState([]);
    useEffect(() => {
        fetch('http://localhost:4000/blogs',{
            credentials: 'include',
        }).then(response => {
            response.json().then(blogs => {
                console.log(blogs)
                setBlogs(blogs)
            })
        })
    }, [])
    
    
    return ( 
        <div className="blogs">
            {blogs.length > 0 && blogs.map((blog) => (
                <div className="blog-each">
                <div className="blog-img">
                    <img src={'http://localhost:4000/'+blog.file} alt="Image not available cureently" />
                </div>
                <div className="blog-txt">
                    <div className="blog-title">
                        <h3>{blog.title}</h3>
                    </div>
                    <div className="blog-author">
                        <p>Author : {blog.author.username}</p>
                    </div>
                    <div className="blog-time">
                        <time>{format(new Date(blog.createdAt), 'MMM d, yyyy  h:mm:ss aa')}</time>
                    </div>
                    <div className="blog-details">
                        <p>{blog.snippet}</p>
                    </div>
                </div>
            </div>
            ))}
        </div>
        
     );
}
 
export default Blog;
