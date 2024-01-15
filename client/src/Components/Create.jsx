import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import '../Create.css'
import { useState } from "react";

const Create = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [Snippet, setSnippet] = useState('');
    const data = new FormData();
    data.set('title' , title);
    data.set('content' , content);
    data.set('Snippet', Snippet)
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

      const createNewPost = (e) => {
        e.preventDefault();

        fetch('http://localhost:4000/new_blog', {
            method:'POST'
        })
      }
    return ( 
        <div className="create">
            <h2>Create a New Blog</h2>
            <form action="" onSubmit={createNewPost}>
                <input type="file"/>
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
                    value={Snippet}
                    onChange={(e)=> setSnippet(e.target.value)}
                />
                <br />
                <ReactQuill 
                modules={modules} 
                formats={formats}
                value={content}
                onChange={(newValue)=> setContent(newValue)}
                />
                <button>Post Your Blog</button>
            </form>
        </div> 
    );
}
 
export default Create;
