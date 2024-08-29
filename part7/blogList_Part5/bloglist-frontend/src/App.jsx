import { useState, useEffect,useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification.jsx'
import BlogForm from './components/BlogForm.jsx'
import Togglable from './components/Togglable.jsx'
import { addNotification,clearNotifications } from './redux/notificationSlice.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { addBlog, setBlogs, addlike, removeBlog } from './redux/blogReducer.jsx'
import {setUser,clearUser} from './redux/userReducer' 
import { Routes, Route, Link,useParams } from 'react-router-dom'
import { getUser } from './redux/allusersReducer.jsx'

const App = () => {
  // const [blogs, setBlogs] = useState([])
  const [username,setUserName] = useState('')
  const [password,setPassword] = useState('')
  const [comment,setComment] = useState('')
  // const [user,setUser] = useState(null)
  // const [notification,setNotification] = useState(null)
  const blogFormref = useRef()

  const notification = useSelector((state) => state.notification)
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.loginUser)
  const getAllUsers = useSelector((state) => state.userList)
  
  const dispatch = useDispatch()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      dispatch(setBlogs(blogs))
    )
  },[])
  useEffect(()=>{
    loginService.allUsers()
    .then(res => {
      return dispatch(getUser(res))
    }
  )
  },[])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  },[])

  const handleLogin = async(e) => {
    e.preventDefault()
    try{

      const user = await loginService.login( { username, password })
      
      window.localStorage.setItem('loggedBlogappUser',JSON.stringify(user))
      dispatch(setUser(user))
      blogService.setToken(user.token)
      setUserName('')
      setPassword('')
    }
    catch(exception){
      dispatch(addNotification({
        text:'Invalid username or password',
        type: 'error'
      }))
      setTimeout(() => {
        dispatch(clearNotifications())
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
    dispatch(clearUser())
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
      dispatch(addBlog(addedBlog))
      dispatch(addNotification({
        text:`a new blog ${newBlog.title} added by ${user.username}`,
        type: 'notification'
      }))
      setTimeout(() => {
        dispatch(clearNotifications())
      }, 5000)
    }
    catch(exception){
      
      dispatch(addNotification({
        text: exception.response.data.error,
        type: 'error'
      }))
      setTimeout(() => {
        dispatch(clearNotifications())
      }, 5000)
    }
  }

  const toggleLike = async(id) => {
    const blog = blogs.find(blog => blog.id === id)
    const updatedBlog = { ...blog, likes:blog.likes + 1, user:blog.user.id }
    const response = await blogService.update(id,updatedBlog)
    dispatch(addlike(response))
  }

  const compareFun=(a,b) => {
    return b.likes - a.likes
  }

  const sortedBlogs =  [...blogs].sort(compareFun);
  const handleDelete = async(id) => {
    const blog = blogs.find(blog => blog.id === id)
    if (window.confirm(`Remove Blog ${blog.title} by ${blog.author}`)) {
      try{
        await blogService.remove(id)
        dispatch(removeBlog(blog))
        dispatch(addNotification({
          text:'removed blog',
          type:'notification'
        }))
        setTimeout(() => {
          dispatch(clearNotifications())
        },5000)

      }
      catch(exception){
        dispatch(addNotification({
          text:exception.response.data.error,
          type:'error'
        }))
        setTimeout(() => {
          dispatch(clearNotifications())
        },5000)
      }
    }
  }

  const UserRoute = () => {
    if(!getAllUsers[0]){
      return null
    }
    return (
      <div>
        <div style={{ fontSize: 25 }}>
          <strong>User</strong>
        </div>
        <div>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Blog Created</th>
              </tr>
            </thead>
            <tbody>
              {getAllUsers[0] &&
                getAllUsers[0].map((u) => (
                  <tr key={u.id}>
                    <td><Link to={`/user/${u.id}`}>{u.name}</Link></td>
                    <td>{u.blogs.length}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const MainRouter = ()=>{
    return(
      <div>
        {blogForm()}
          {sortedBlogs.map(blog =>
            <Link key={blog.id} to={`/blogs/${blog.id}`}><Blog key={blog.id} blog={blog} handleDelete={() => handleDelete(blog.id)} handleLikeChange={() => toggleLike(blog.id)}/></Link>
          )}
      </div>
    )
  }
  
  const BlogRouter = () => {
    return(
      <div>
        blog
      </div>
    )
  }

    const SingleUserRoute = ()=>{
      const id = useParams().id
      
      if(!getAllUsers){
        return null
      }
      const findUser = getAllUsers[0].find(us => us.id === id)
      return(
        <div>
          <h2>{findUser.username}</h2>
          <div>
            <h3>added Blog</h3>
              {findUser.blogs.map((blog)=>{
                return(
                  <ul key={blog.id}>
                    <li>{blog.title}</li>
                  </ul>
                )
              })}
          </div>
        </div>
      )
    }

  
  const SingleBlogRouter = () => {
    const id = useParams().id
    const [getComments,setGetComments] = useState([])
    useEffect(() => {
      blogService.getComment(id)
          .then(res => setGetComments(res))
          .catch(err => console.error(err));
  }, [id])
    const findedBlog = blogs.find(b => b.id === id)
    if(!findedBlog){
      return null
    }
    const handleSubmit = async (e) => {
      e.preventDefault();
      const commentText = e.target.comment.value;
  
      try {
          const newComment = { comments: commentText, blog: id }
          const addedComment = await blogService.addComment(id, newComment)
          
          setGetComments(getComments.concat(addedComment));
          e.target.comment.value = '';
      } catch (err) {
          console.error(err);
      }
  };
    return(
      <div>
        <h1>{findedBlog.title}</h1>
        <p><Link to={findedBlog.url}>{findedBlog.url}</Link></p>
        <p>{findedBlog.likes} Likes<button onClick={()=>toggleLike(findedBlog.id)}>like</button></p>
        <p>added by {findedBlog.author}</p>
        <p style={{ paddingLeft: 10 }}><button style={{ cursor: 'pointer', borderRadius: 5, borderColor: 'transparent', backgroundColor: 'blue', color: 'black' }} onClick={()=>handleDelete(findedBlog.id)}>remove</button></p>
        <div>
          <h3>comment</h3>
          <form onSubmit={handleSubmit}>
            <input type='text' name='comment'/>
            <button>submit</button>
          </form>
          {getComments && getComments.map((comment) => {
            return(
              <ul key={comment.id}>
                <li>{comment.comments}</li>
              </ul>
            )
          })}
        </div>
      </div>
    )
  }
  return (
    <div>
      {user === null ?
        loginForm():
        <div>
          <p>
            <Link to={`/`} style={{paddingRight:10}}>blogs</Link>
            <Link to={`/user`} style={{paddingRight:10}}>users</Link>
            {user.username} Logged-in
            <button onClick={handleLogOut}>LogOut</button>
          </p>
          {notification && <Notification message={notification}/>}
          <Routes>
          
          <Route path='/user' element={<UserRoute />}/>
          <Route path='/user/:id' element={<SingleUserRoute />}/>
          <Route path='/blogs' element={<BlogRouter />}/>
          <Route path='/blogs/:id' element={<SingleBlogRouter />}/>
          <Route path='/' element={<MainRouter />}/>
          </Routes>
        </div>
      }
    </div>
  )
}

export default App