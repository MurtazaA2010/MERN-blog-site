const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BlogSchema = new Schema({
    title: {
        type: String,
        required : true
    },
    snippet: {
        type: String,
        required : true,
    },
    content : {
        type: String,
        required: true
    },
    file : {
        type : String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref:'User'
    }
}, {
    timestamps : true
})

const Blog = mongoose.model('Blog', BlogSchema);

module.exports = Blog;
