import { test, after, beforeEach, describe } from 'node:test';
import assert from 'node:assert';
import supertest from 'supertest';
import app from '../app.js';
import mongoose from 'mongoose';
import Blog from '../models/blog.js';
import helper from './test_helper.test.js';
import bcrypt from 'bcrypt';
import User from '../models/user.js';

const api = supertest(app);

describe('For verify api and testing server', () => {
    beforeEach(async () => {
        await Blog.deleteMany({});
        for (let blog of helper.initialBlogs) {
            const newBlog = new Blog(blog);
            await newBlog.save();
        }
    });

    test('testing for blog api', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });

    test('testing verifies that the unique identifier', async () => {
        const request = await api.get('/api/blogs');
        const ids = request.body.map(r => r.id);
        const blogs = await helper.BlogsInDb();
        const expectedIds = blogs.map(r => r.id);
        assert.deepStrictEqual(ids, expectedIds);
    });
});

describe('creating a new blog', () => {
    let token;
    let userId;

    beforeEach(async () => {
        await User.deleteMany({});
        userId = await helper.newUser();
        token = await helper.testToken('testuser', 'test123');
    });

    test('a new blog is created', async () => {
        const newBlog = {
            title: 'test String',
            author: 'test String',
            url: 'test String',
            likes: 10,
            userId: userId
        };
        await api
            .post('/api/blogs')
            .send(newBlog)
            .set({ 'Authorization': token })
            .expect(201)
            .expect('Content-Type', /application\/json/);

        const response = await api.get('/api/blogs');
        assert.strictEqual(helper.initialBlogs.length + 1, response.body.length);
    });
});

describe('checking property of added Blog', () => {
    let token;
    let userId;

    beforeEach(async () => {
        await User.deleteMany({});
        userId = await helper.newUser();
        token = await helper.testToken('testuser', 'test123');
    });

    test('like property set to zero', async () => {
        const newBlog = {
            title: 'for checking String',
            author: 'for checking String',
            url: 'http://google.com',
            userId: userId
        };
        const response = await api
            .post('/api/blogs')
            .send(newBlog)
            .set({ 'Authorization': token })
            .expect(201)
            .expect('Content-Type', /application\/json/);

        assert.strictEqual(response.body.likes, 0);
    });

    test('title or url properties are missing', async () => {
        const newBlog = {
            title: 'my name is ishaan',
            author: 'for checking String',
            url: '',
            userId: userId
        };
        await api
            .post('/api/blogs')
            .send(newBlog)
            .set({ 'Authorization': token })
            .expect(400)
            .expect('Content-Type', /application\/json/);
    });
});

describe('deleting a blog', () => {
    let token;
    let userId;

    beforeEach(async () => {
        await User.deleteMany({});
        userId = await helper.newUser();
        token = await helper.testToken('testuser', 'test123');
    });

    test('deleting a single Blog', async () => {
        const newBlog = {
            title: 'my name is ishaan',
            author: 'for checking String',
            url: 'http://www.yahoo.com',
            userId: userId
        };

        const addBlogResponse = await api
            .post('/api/blogs')
            .send(newBlog)
            .set({ 'Authorization': token })
            .expect(201)
            .expect('Content-Type', /application\/json/);

        const blogId = addBlogResponse.body.id;

        await api
            .delete(`/api/blogs/${blogId}`)
            .set({ 'Authorization': token })
            .expect(204);

        const blogsAtEnd = await helper.BlogsInDb();
        const urls = blogsAtEnd.map(blog => blog.url);
        assert(!urls.includes('http://www.yahoo.com'));
    });
});

describe('Updating the information of an individual blog post', () => {
    test('update the number of likes for a blog post', async () => {
        const blogsAtStart = await helper.BlogsInDb();
        const updatedBlog = blogsAtStart[0];
        updatedBlog.likes += 1;
        await api
            .put(`/api/blogs/${updatedBlog.id}`)
            .send(updatedBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/);
        const blogsAtEnd = await helper.BlogsInDb();
        const updated = blogsAtEnd[0];
        assert.strictEqual(updated.likes, updatedBlog.likes);
    });
});

describe('a user is created', () => {
    beforeEach(async () => {
        await User.deleteMany({});
        const passwordHash = await bcrypt.hash('ishaan', 10);
        const user = new User({
            username: 'root',
            password: passwordHash
        });
        await user.save();
    });

    test('creation succeeds with a fresh username', async () => {
        const userAtStart = await helper.usersInDb();
        const newUser = {
            username: 'mluukkai',
            name: 'Matti Luukkainen',
            password: 'salainen'
        };
        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/);
        const userAtEnd = await helper.usersInDb();
        assert.strictEqual(userAtEnd.length, userAtStart.length + 1);
    });

    test('Invalid username created', async () => {
        const userAtStart = await helper.usersInDb();
        const newUser = {
            username: 'ro',
            name: 'ishaan',
            password: '12341212'
        };
        await api
            .post('/api/users')
            .send(newUser)
            .expect(400);
        const userAtEnd = await helper.usersInDb();
        assert.strictEqual(userAtEnd.length, userAtStart.length);
    });

    test('Invalid password', async () => {
        const userAtStart = await helper.usersInDb();
        const newUser = {
            username: 'Ninja',
            name: 'ishaan',
            password: '12'
        };
        await api
            .post('/api/users')
            .send(newUser)
            .expect(400);
        const userAtEnd = await helper.usersInDb();
        assert.strictEqual(userAtEnd.length, userAtStart.length);
    });

    test('Without username', async () => {
        const userAtStart = await helper.usersInDb();
        const newUser = {
            name: 'ishaan123',
            password: '12'
        };
        await api
            .post('/api/users')
            .send(newUser)
            .expect(400);
        const userAtEnd = await helper.usersInDb();
        assert.strictEqual(userAtEnd.length, userAtStart.length);
    });
});

describe('Unauthorized if a token',()=>{
    let token;
    let userId;
    beforeEach(async () => {
        await User.deleteMany({});
        userId = await helper.newUser();
        token = await helper.testToken('testuser', 'test123');
    });
    test('Unauthorized if a token is not provided',async()=>{
        const dbAtStart = await helper.BlogsInDb()
        const newBlog = {
            title: 'my name is ishaan',
            author: 'for checking String',
            url: 'http://www.yahoo.com',
            userId: userId
        };
        await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)
        .expect('Content-Type',/application\/json/)
        const dbAtEnd = await helper.BlogsInDb()
        assert.strictEqual(dbAtEnd.length,dbAtStart.length)
    })
})

after(async () => {
    await mongoose.connection.close();
});
