import { Router } from "express";
import Blog from "../models/blog.js";
import 'express-async-errors'
import middlewares from "../utils/middlewares.js";
const blogRouter = Router()

blogRouter.get('/',async(req,res)=>{
        const blog = await Blog.find({}).populate('user',{ username: 1, name: 1 })
        res.json(blog)
})
blogRouter.post('/',middlewares.userExtractor,async(req,res)=>{
    const body = req.body
    const user = req.user
    const newBlog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes === undefined ? 0 : body.likes,
        user:user.id
    }
    const blog = new Blog(newBlog)
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    res.setHeader('Content-Type', 'application/json');
    res.status(201).json(savedBlog)
})
blogRouter.delete('/:id',middlewares.userExtractor,async(req,res)=>{
    const user = req.user
    const blog = await Blog.findById(req.params.id)
    if(blog.user.toString() !== user.id.toString()){
        return res.status(401).json({error:'invalid user cannot delete it'})
    }
    await Blog.findByIdAndDelete(req.params.id)
    res.status(204).end()
})
blogRouter.put('/:id',async(req,res)=>{
    const body = req.body
    const updatedNote = await Blog.findByIdAndUpdate(req.params.id,body,{new:true})
    res.setHeader('Content-Type', 'application/json');
    res.json(updatedNote)
})
export default blogRouter