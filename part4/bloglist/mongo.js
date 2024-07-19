import mongoose, { connect } from "mongoose";

const password = process.argv[2] 

const URL = `mongodb+srv://ishaanrana2635:${password}@cluster0.xa43ybs.mongodb.net/testBlogApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.connect(URL)
console.log(`connected to MongoDB${URL}`);

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

const Blog = new mongoose.model('Blog',blogSchema)

const blog = new Blog({
    title: "String",
    author: "String",
    url: "String",
    likes: 10
})

blog.save()
.then(res=>{
    console.log('Blog saved!',res);
    mongoose.connection.close();
})
.catch(err=>{
    console.log(err)
})