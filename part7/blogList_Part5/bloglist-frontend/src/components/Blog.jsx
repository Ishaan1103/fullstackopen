import { useState } from 'react'

const Blog = ({ blog, handleLikeChange, handleDelete }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [view, setView] = useState(false)
  const hideWhenVisible = { display: view ? 'none' : '' }
  const showWhenVisible = { display: view ? '' : 'none' }

  const toggleView = () => {
    setView(!view)
  }

  return (
    <div style={blogStyle} className='toShow'>
      <div style={hideWhenVisible} className='blog'>
        {blog.title} by {blog.author}
      </div>
      <div style={showWhenVisible}>
        <p style={{ paddingLeft: 10 }}>{blog.title} <button onClick={toggleView}>hide</button></p>
        <p style={{ paddingLeft: 10 }}>{blog.url}</p>
        <p style={{ paddingLeft: 10 }}>likes {blog.likes} <button onClick={handleLikeChange} className='likeButton'>like</button></p>
        <p style={{ paddingLeft: 10 }}>{blog.author}</p>
        <p style={{ paddingLeft: 10 }}><button style={{ cursor: 'pointer', borderRadius: 5, borderColor: 'transparent', backgroundColor: 'blue', color: 'black' }} onClick={handleDelete}>remove</button></p>
      </div>
    </div>
  )
}

export default Blog
