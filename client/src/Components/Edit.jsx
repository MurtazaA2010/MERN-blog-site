import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
const Edit = () => {
    const {id} = useParams();
    const history = useHistory();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [snippet, setSnippet] = useState('');
    const [files, setFiles] = useState('');
    const [redirect , setRedirect] = useState(false);
    const [img, setImg] = useState('');
    
    const modules = {
        toolbar: [
          [{ 'header': [1, 2, false] }],
          ['bold', 'italic', 'underline','strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
          ['link', 'image'],
          ['clean']
        ],
      }
    
      const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image',
        'font'
      ]
    
    if(redirect) {
        history.push('/')
      }

      useEffect(() => {
        fetch(`http://localhost:4000/blogs/${id}`)
            .then(response => response.json())
            .then(blogInfo => {
                setTitle(blogInfo.title);
                setContent(blogInfo.content);
                setSnippet(blogInfo.snippet);
                setImg(blogInfo.file);
            })
            .catch(error => console.error('Error fetching blog:', error));
    }, [id]);
    
    const updateBlog = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.set('title' , title);
        data.set('content' , content);
        data.set('snippet', snippet);
        data.set('file', img?.[0]);
        data.set('id', id)

        try {
            const response = await fetch(`http://localhost:4000/blogs/${id}`, {
                method: 'PUT',
                body: data,
                credentials: 'include',
            });

            if (response.ok) {
                setRedirect(true);
            } else {
                alert('Something went wrong. Please try again later.');
            }
        } catch (error) {
            console.error('Error updating blog:', error);
            alert('Something went wrong. Please try again later.');
        }
    }

    if(redirect) {
        history.push('/');
    }
    return ( 
        <div className="create">
            <h2>Update Your Blog</h2>
            <form action="" onSubmit={updateBlog} enctype="multipart/form-data">
                <input 
                    type="file"
                    onChange={(e) => setImg(e.target.files)}
                />
                <br />
                <input 
                    type="text" 
                    placeholder="title" 
                    className="input"
                    value={title}
                    onChange={(e)=> setTitle(e.target.value)}
                />
                <br />
                <input 
                    type="text" 
                    placeholder="snippet" 
                    className="input"
                    value={snippet}
                    onChange={(e)=> setSnippet(e.target.value)}
                />
                <br />
                <ReactQuill 
                modules={modules} 
                formats={formats}
                value={content}
                onChange={(newValue)=> setContent(newValue)}
                />
                <button>Update Your Blog</button>
            </form>
        </div> 
    );
}
 
export default Edit;
