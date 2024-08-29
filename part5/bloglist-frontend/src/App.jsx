import { useState, useEffect,useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification.jsx'
import BlogForm from './components/BlogForm.jsx'
import Togglable from './components/Togglable.jsx'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username,setUserName] = useState('')
  const [password,setPassword] = useState('')
  const [user,setUser] = useState(null)
  const [notification,setNotification] = useState(null)
  const blogFormref = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  },[])

  const handleLogin = async(e) => {
    e.preventDefault()
    try{

      const user = await loginService.login( { username, password })
      window.localStorage.setItem('loggedBlogappUser',JSON.stringify(user))
      setUser(user)
      blogService.setToken(user.token)
      setUserName('')
      setPassword('')
    }
    catch(exception){
      setNotification({
        text:'Invalid username or password',
        type: 'error'
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const loginForm = () => {
    return(
      <div>
        <h2>log in to application</h2>
        {notification && <Notification message={notification}/>}
        <form onSubmit={handleLogin}>
          <div>
          Username: <input type="text" value={username} onChange={({ target }) => setUserName(target.value)}/>
          </div>
          <div>
          Password: <input type="password" value={password} onChange={({ target }) => setPassword(target.value)}/>
          </div>
          <button type='submit'>login</button>
        </form>
      </div>
    )
  }

  const handleLogOut = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    window.localStorage.clear()
    setUser(null)
  }

  const blogForm = () => {
    return(
      <Togglable buttonLabel='new Blog' ref={blogFormref}>
        <BlogForm createBlog={handleAddBlog}/>
      </Togglable>
    )}

  const handleAddBlog = async (newBlog) => {
    try{
      blogFormref.current.handleVisible()
      const addedBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(addedBlog))
      setNotification({
        text:`a new blog ${newBlog.title} added by ${user.username}`,
        type: 'notification'
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
    catch(exception){
      setNotification({
        text: exception.response.data.error,
        type: 'error'
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const toggleLike = async(id) => {
    const blog = blogs.find(blog => blog.id === id)
    const updatedBlog = { ...blog, likes:blog.likes + 1,user:blog.user.id }
    const response = await blogService.update(id,updatedBlog)
    setBlogs(blogs.map(blog => blog.id !== id ? blog : response ))
  }

  const compareFun=(a,b) => {
    return b.likes - a.likes
  }

  const sortedBlogs = blogs.sort(compareFun)
  const handleDelete = async(id) => {
    const blog = blogs.find(blog => blog.id === id)
    if (window.confirm(`Remove Blog ${blog.title} by ${blog.author}`)) {
      try{
        await blogService.remove(id)
        setBlogs(blogs.filter(blog => blog.id !== id))
        setNotification({
          text:'removed blog',
          type:'notification'
        })
        setTimeout(() => {
          setNotification(null)
        },5000)

      }
      catch(exception){
        setNotification({
          text:exception.response.data.error,
          type:'error'
        })
        setTimeout(() => {
          setNotification(null)
        },5000)
      }
    }
  }

  return (
    <div>
      {user === null ?
        loginForm():
        <div>
          <p>
            {user.username} Logged-in
            <button onClick={handleLogOut}>LogOut</button>
          </p>
          {notification && <Notification message={notification}/>}
          {blogForm()}
          {sortedBlogs.map(blog =>
            <Blog key={blog.id} blog={blog} handleDelete={() => handleDelete(blog.id)} handleLikeChange={() => toggleLike(blog.id)}/>
          )}
        </div>
      }
    </div>
  )
}

export default App