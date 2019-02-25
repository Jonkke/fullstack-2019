import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup, fireEvent } from 'react-testing-library'
import SimpleBlog from './SimpleBlog'

afterEach(cleanup)

test('renders content', () => {
  const blog = {
    title: 'A test title for a test blog!',
    author: 'Dummy Tester',
    url: 'someurl123.com',
    likes: 4
  }

  const component = render(
    <SimpleBlog blog={blog} />
  )

  const div = component.container.querySelector('.nameAuthor')
  expect(div).toHaveTextContent('A test title for a test blog!')
  expect(div).toHaveTextContent('Dummy Tester')

  const likesDiv = component.container.querySelector('.likesDiv')
  expect(likesDiv).toHaveTextContent(`blog has ${blog.likes} likes`)
})

it('clicking button calls event handler once', async () => {
  const blog = {
    title: 'A test title for a test blog!',
    author: 'Dummy Tester',
    url: 'someurl123.com',
    likes: 4
  }
  const mockHandler = jest.fn()
  const { getByText } = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  )

  const button = getByText('like')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})