const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieparser = require('cookie-parser');

const saltRounds = 10;
const secret = 'hdskjfj49353kjdfsdjf';
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/BLOGAPP').then(()=> {
    console.log('Connected to mongo DB');
    app.listen(4000)
}).catch(err => {
    console.log(err);
})

app.use(cors(
    {
        credentials: true,
        origin: 'http://localhost:3000'
    }
));
app.use(express.json());
app.use(cookieparser());

app.post('/signup', (req, res)=> {
    const {username, password} = req.body;
    const user = new User ({
        username, 
        password:bcrypt.hashSync(password, saltRounds)
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
                res.cookie('token', token);
                res.json('ok');
            }
        });
    } else {
        res.status(400).json('Wrong credentials');
    }
});


app.get('/profile', (req,res)=> {
    const {token}= req.cookies;
    jwt.verify(token, secret, {}, (err, info)=> {
        if (err) throw err;
        res.json(info);
})});

app.post('/logout', (req, res)=> {
    res.cookie('token', '').json('ok')
})
