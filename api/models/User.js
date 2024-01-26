const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username : {
        type: String,
        required: true,
        min:4 ,
        max: 35,
        unique: true,
    },
    password : {
        type: String,
        required: true,
    },
    proImg : {
        type: String,
        required: true,
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
