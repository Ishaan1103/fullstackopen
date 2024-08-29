import { Router } from "express"
const router = Router();
import Blog from "../models/blog.js"
import User from "../models/user.js"

router.post('/reset',async(req,res)=>{
  await User.deleteMany({})
  await Blog.deleteMany({})
  res.status(204).end()
})

export default router