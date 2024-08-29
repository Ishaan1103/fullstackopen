import mongoose, { mongo } from "mongoose";

const blogSchema = new mongoose.Schema({
    title: {
        type:String,
        required:true
    },
    author: String,
    url: {
        type:String,
        required:true
    },
    likes: Number,
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Comment'
    }]
})
blogSchema.set('toJSON',{
    transform:(document,returnedobject)=>{
        returnedobject.id = returnedobject._id.toString()
        delete returnedobject._id
        delete returnedobject.__v
    }
})
export default new mongoose.model('Blog',blogSchema)