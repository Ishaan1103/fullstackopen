import { useState } from 'react'
const BlogForm = ({ createBlog }) => {
  const[title,setTitle]=useState('')
  const[author,setAuthor]=useState('')
  const[url,setUrl]=useState('')
  const handleAddBlog=(e) => {
    e.preventDefault()
    createBlog({
      title:title,
      url:url,
      author:author
    })
    setTitle('')
    setUrl('')
    setAuthor('')
  }
  return (
    <div>
      <h2>create new Blog</h2>
      <form onSubmit={handleAddBlog}>
        <div>
          <label htmlFor="title">Title:</label>
          <input id='title' type="text" value={title} onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          <label htmlFor="author">Author:</label>
          <input id='author' type="text" value={author} onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          <label htmlFor="url">URL:</label>
          <input type="text" id='url' value={url} onChange={({ target }) => setUrl(target.value)} />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}
export default BlogForm