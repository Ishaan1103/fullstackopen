import { Router } from "express"; 
import bcrypt from 'bcrypt'
import User from "../models/user.js";
const userRouter = Router()


userRouter.post('/', async (req, res) => {
    const { username, name, password } = req.body;

    if (!username || username.length < 3) {
        return res.status(400).json({ error: 'Invalid Username Created' });
    }

    if (!password || password.length < 3) {
        return res.status(400).json({ error: 'Invalid Password Created' });
    }

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const user = new User({
        username,
        name,
        passwordHash
    });

    const savedUser = await user.save();
    res.status(201).json(savedUser);
});

userRouter.get('/',async(req,res)=>{
    const users = await User.find({}).populate('blogs',{ title: 1, author: 1, url: 1 })
    res.json(users)
})
export default userRouter