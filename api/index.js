const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const User = require('./models/User')

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/BLOGAPP').then(()=> {
    console.log('Connected to mongo DB')
    app.listen(3001);
}).catch(err => {
    console.log(err);
})



app.use(cors());
app.use(express.json())

app.post('/request', (req, res)=> {
    const {username, password} = req.body;
    const user = new User ({username, password});
    user.save().then((result)=> {
        console.log(result);
    }).catch(err => {
        res.status(404).res.json('failed')
    });
})
