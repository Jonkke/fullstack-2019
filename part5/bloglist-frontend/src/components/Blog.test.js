import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup, fireEvent } from 'react-testing-library'
import Blog from './Blog'

afterEach(cleanup)

it('renders only blog title if it\'s not expanded', () => {
  const blog = {
    title: 'A test title for a test blog!',
    author: 'Dummy Tester',
    url: 'someurl123.com',
    likes: 4
  }

  const component = render(
    <Blog blog={blog} updateBlogs={() => console.log('updated')}/>
  )

  const nonExpanded = component.container.querySelector('.nonexpanded')
  expect(nonExpanded).toHaveTextContent(blog.title)
  expect(nonExpanded).not.toHaveTextContent(blog.url)

  const title = component.container.querySelector('.title')
  fireEvent.click(title)
  expect(nonExpanded).toHaveTextContent(blog.title)
  expect(nonExpanded).toHaveTextContent(blog.url)
})