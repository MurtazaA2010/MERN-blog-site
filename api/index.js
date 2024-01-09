const express = require('express');
const cors = require('cors');


const app = express();

app.listen(3001);

app.use(cors());
app.use(express.json())

app.post('/request', (req, res)=> {
    const {username, pass} = req.body;
    res.json({requstData: {username, pass}})

})
