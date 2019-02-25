import React from 'react'
import 'jest-dom/extend-expect'
import { render, waitForElement } from 'react-testing-library'
import App from './App'

describe('<App />', () => {
  it('renders only login form and not any notes if not logged in', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)
    const loginh2 = component.container.querySelector('.loginHeader')
    expect(loginh2).toBeTruthy()
    expect(loginh2).toHaveTextContent('Log in to application')
    const blogContainer = component.container.querySelector('.blog-container')
    expect(blogContainer).toBeFalsy()
  })
})