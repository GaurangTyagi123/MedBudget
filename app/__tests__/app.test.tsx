/**
 * Tests for the landing page and primary navigation flows.
 */

import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import UserEvent from '@testing-library/user-event'
import UserForm from '../_components/UserForm'
import Navbar from '../_components/Navbar'

const mockPush = jest.fn()

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      prefetch: () => null,
      push: mockPush,
      replace: jest.fn(),
      refresh: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
    }
  },
}))
jest.mock('../_providers/UserProvider', () => ({
  useUserContext: () => {
    return {
      setPatientname: jest.fn(),
      patientName: 'John Doe',
    }
  },
}))

describe('Lander page tests', () => {
  beforeEach(() => {
    mockPush.mockClear()
  })
  test('navbar renders correctly', () => {
    render(<Navbar />)
    const nav = screen.getByRole('navigation')
    expect(nav).toBeInTheDocument()
  })
  test('patient name form renders correctly', () => {
    render(<UserForm />)
    const input = screen.getByPlaceholderText("Enter patient's Name")
    const button = screen.getByRole('button', {
      name: 'Continue',
    })
    expect(button).toBeInTheDocument()
    expect(input).toBeInTheDocument()
  })
  test('user form works correctly', async () => {
    const user = UserEvent.setup()
    render(<UserForm />)
    const input = screen.getByPlaceholderText("Enter patient's Name")
    await user.click(input)
    expect(input).toHaveValue('John Doe')
  })
})
