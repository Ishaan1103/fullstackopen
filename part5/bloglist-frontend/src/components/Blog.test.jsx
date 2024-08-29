import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'

test('renders content', () => {
  const blog = {
    title: 'content1 title',
    author: 'content1 author',
    url: 'content1 url',
    likes: 0
  }
  const { container } = render(<Blog blog={blog} handleLikeChange={() => {}} handleDelete={() => {}} />)
  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent('content1 title by content1 author')
})

test('does not render URL initially', () => {
  const blog = {
    title: 'content1 title',
    author: 'content1 author',
    url: 'content1 url',
    likes: 0
  }
  const { container } = render(<Blog blog={blog} handleLikeChange={() => {}} handleDelete={() => {}} />)
  const div = container.querySelector('.blog')
  expect(div).not.toHaveTextContent('content1 url')
})

test('shows URL and other details after clicking view', async () => {
  const blog = {
    title: 'content1 title',
    author: 'content1 author',
    url: 'content1 url',
    likes: 0
  }
  render(<Blog blog={blog} handleLikeChange={() => {}} handleDelete={() => {}} />)
  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)
  expect(screen.getByText('content1 url')).toBeInTheDocument()
  expect(screen.getByText('content1 author')).toBeInTheDocument()
})

test('clicking like button twice calls event handler twice', async () => {
  const user = userEvent.setup()
  const blog = {
    title: 'content1 title',
    author: 'content1 author',
    url: 'content1 url',
    likes: 0
  }
  const handleLikeChange = vi.fn()
  render(<Blog blog={blog} handleLikeChange={handleLikeChange} handleDelete={() => {}} />)

  const viewButton = screen.getByText('view')
  await user.click(viewButton)

  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(handleLikeChange.mock.calls).toHaveLength(2)
})
