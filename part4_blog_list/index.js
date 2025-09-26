const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()

const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number,
})

const Blog = mongoose.model(
    'Blog',
    blogSchema,
    process.env.MONGODB_COLLECTION_NAME
)

const mongoUrl = process.env.MONGODB_URI
mongoose.connect(mongoUrl)

app.use(express.json())

app.get('/api/blogs', (response) => {
    Blog.find({}).then((blogs) => {
        response.json(blogs)
    })
})

app.post('/api/blogs', (request, response) => {
    console.log(request.body)
    const blog = new Blog(request.body)

    blog.save().then((result) => {
        response.status(201).json(result)
    })
})

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})