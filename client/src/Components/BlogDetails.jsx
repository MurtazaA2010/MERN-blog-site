import { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const BlogDetails = () => {
    const {id} = useParams();
    const [blogInfo, setBlogInfo] = useState(null);
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


    {if (!blogInfo) return ''}
    return ( 
        
        <div className="blog-details">
            <div className="title">
                <h1>{blogInfo.title}</h1>
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