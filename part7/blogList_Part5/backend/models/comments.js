import mongoose from "mongoose"

const commentSchema = new mongoose.Schema({
    comments:{
        type:String
    },
    blog:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Blog'
    }
})

commentSchema.set('toJSON',{
    transform:(document,returnedobject)=>{
        returnedobject.id = returnedobject._id.toString()
        delete returnedobject._id
        delete returnedobject.__v 
    }
})
export default new mongoose.model("Comment",commentSchema) 