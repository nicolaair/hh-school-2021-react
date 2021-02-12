import { render, screen } from '@testing-library/react'
import App from '../features/App'

test('renders generate button', () => {
  render(<App />)

  const linkElement = screen.getByText(/generate/i)
  
  expect(linkElement).toBeInTheDocument()
})
