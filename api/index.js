const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const User = require('./models/User');
const Blog = require('./models/Blog')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieparser = require('cookie-parser');
const multer = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/' });
const fs = require('fs');

const saltRounds = 10;
const secret = 'hdskjfj49353kjdfsdjf';
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/BLOGAPP').then(()=> {
    console.log('Connected to mongo DB');
    app.listen(4000)
}).catch(err => {
    console.log(err);
})

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));

app.use(express.json());
app.use(cookieparser());
app.use(express.urlencoded({extended : true}))
app.use('/uploads', express.static(__dirname + '/uploads'))

app.post('/signup', uploadMiddleware.single('proImg'),(req, res)=> {
    const { originalname, path } = req.file; // Change from req.proImg to req.file
    const part = originalname.split(".");
    const ext = part[part.length - 1];
    const newPath = path + '.' + ext;

    fs.renameSync(path, newPath);

    const {username, password} = req.body;
    const user = new User ({
        username, 
        password:bcrypt.hashSync(password, saltRounds),
        proImg : newPath,
    });
    user.save()
    .then((result) => {
        console.log(result);
        res.status(200).json({ message: 'Registration successful' });
    })
    .catch((err) => {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    });
});

app.post('/signin', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
        // User not found
        res.status(400).json('User not found');
        return;
    }
    const passOk = bcrypt.compareSync(password, user.password);
    if (passOk) {
        jwt.sign({ username, id: user._id }, secret, (err, token) => {
            if (err) {
                console.error(err);
                res.status(500).json({ message: 'Internal Server Error' });
            } else {
                res.cookie('token', token).json({
                    id: user._id,
                    username,
                })               
            }
        });
    } else {
        res.status(400).json('Wrong credentials');
    }
});


app.post('/logout', (req, res)=> {
    res.cookie('token', '').json('ok')
})

app.get('/blogs', async (req, res) => {
    try {
        const blogs = await Blog.find()
            .populate('author', 'username')
            .sort({createdAt : -1})
            .limit(20);
            res.json(blogs);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});
app.get('/profile', (req, res) => {
    const { token } = req.cookies;

    if (!token) {
        // Token not provided
        res.status(401).json({ message: 'JWT must be provided' });
        return;
    }

    jwt.verify(token, secret, {}, (err, info) => {
        if (err) {
            // Invalid token
            res.status(401).json({ message: 'Invalid JWT' });
        } else {
            res.json(info);
        }
    });
});


app.post('/new_blog', uploadMiddleware.single('file'), async (req, res) => {
    const {originalname, path} = req.file;
    const part = originalname.split(".");
    const ext = part[part.length -1];
    const newPath = path+'.'+ext;
    fs.renameSync(path, newPath);

    // Check if token exists
    const { token } = req.cookies;
    if (!token) {
        res.status(401).json({ message: 'JWT must be provided' });
        return;
    }

    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) {
            res.status(401).json({ message: 'Invalid JWT' });
            return;
        }

        const { title, snippet, content } = req.body;

        const blog = new Blog({
            title,
            snippet,
            content,
            file: newPath,
            author: info.id,
        });

        try {
            // Save the blog and wait for the promise to resolve
            const savedBlog = await blog.save();
            res.json(savedBlog);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    });
});

app.get('/blogs/:id', async (req, res) => {
    const { id } = req.params;
    const Details = await Blog.findById(id).populate('author', ["username"]);

    if (!Details) {
        return res.status(404).json({ error: 'Blog not found' });
    }
    res.json(Details);
});

app.put('/blogs/:id', uploadMiddleware.single('file'), async (req, res) => {
    const { id } = req.params;
    const newPath = req.file ? req.file.path : null;

    const { token } = req.cookies;
    res.send(token)
    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) {
            res.status(401).json({ message: 'Invalid JWT' });
            return;
        }

        try {
            const { title, content, snippet } = req.body;
            const blog = await Blog.findById(id);

            if (!blog) {
                res.status(404).json({ message: 'Blog not found' });
                return;
            }

            // const isAuthor = blog.author.toString() === info.id;

            const isAuthor = JSON.stringify(blog.author) === JSON.stringify(info.id)

            if (!isAuthor) {
                res.status(403).json({ message: 'You are not the author' });
                return;
            }

            blog.title = title;
            blog.content = content;
            blog.snippet = snippet;

            if (newPath) {
                blog.file = newPath;
            }

            const updatedBlog = await blog.save();
            res.json(updatedBlog);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    });
});

app.delete('/blogs/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const blog = await Blog.findById(id);
        // await /;

        const { token } = req.cookies;  
        console.log(token)

        jwt.verify(token, secret, {}, async (err, info) => {
            if (err) {
                return res.status(401).json({ message: 'Invalid JWT' });
            }

            const isAuthor = JSON.stringify(blog.author) === JSON.stringify(info.id);


            if (!isAuthor) {
                return res.status(403).json({ message: 'You are not the author' });
            }

            // Remove the associated file (if it exists)
            if (blog.file) {
                fs.unlinkSync(blog.file);
            }

            await Blog.findByIdAndDelete(id);
            return res.json({ message: 'Blog deleted successfully' });
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
