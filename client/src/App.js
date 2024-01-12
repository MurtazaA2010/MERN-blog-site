const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const saltRounds = 10;
const secret = 'hdskjfj49353kjdfsdjf';

const app = express();


mongoose.connect('mongodb://127.0.0.1:27017/BLOGAPP').then(()=> {
    console.log('Connected to mongo DB');
    app.listen(4000)

}).catch(err => {
    console.log(err);
})



app.use(cors());
app.use(express.json())

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

app.post('/signin', async (req, res)=> {
    const {username, password} = req.body;
    const user = await User.findOne({username});
    const passOk = bcrypt.compareSync(password, user.password);

    if(passOk) {
        jwt.sign({username,id: user._id}, secret).then ((err, token)=> {
            if(err) throw err;
            res.json(token);
        })
    } else {
        res.status(400).json('wrong credential')
    }
});
