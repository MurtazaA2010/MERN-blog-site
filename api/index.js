const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

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
    const user = new User ({
        username, 
        password:bcrypt.hashSync(password, saltRounds)
    });
    user.save().then((result)=> {
        console.log(result);
    }).catch(err => {
        res.status(404)
    });
})
