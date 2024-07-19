import Blog from "../models/blog.js";
import User from "../models/user.js";
import supertest from "supertest";
import app from "../app.js";

const api = supertest(app);

const initialBlogs = [
    {
        title: 'String',
        author: 'String',
        url: 'String',
        likes: 10
    }
];

const usersInDb = async () => {
    const users = await User.find({});
    return users.map(u => u.toJSON());
};

const BlogsInDb = async () => {
    const blogs = await Blog.find({});
    return blogs.map(blog => blog.toJSON());
};

const newUser = async () => {
    const newUser = {
        username: 'testuser',
        name: 'testname',
        password: 'test123'
    };
    const response = await api.post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/);
    return response.body.id;
};

const testToken = async (name, pass) => {
    const response = await api.post('/api/login')
        .send({ username: name, password: pass })
        .expect(202)
        .expect('Content-Type', /application\/json/);
    return `Bearer ${response.body.token}`;
};

export default { BlogsInDb, initialBlogs, usersInDb, testToken, newUser };
