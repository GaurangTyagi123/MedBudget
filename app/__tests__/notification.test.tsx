import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import NotificationForm from '../_components/NotificationForm'
import userEvent from '@testing-library/user-event'

jest.mock('../_providers/UserProvider', () => {
  return {
    useUserContext() {
      return {
        patientName: 'Kavita Tyagi',
        setPatientName: jest.fn(),
        email: 'gaurangtyagi7@gmail.com',
        setEmail: jest.fn(),
        medicineData: {
          medicineName: 'crocin',
          medicineCost: 20,
          quantityLeft: 1,
        },
        setMedicineData: jest.fn(),
      }
    },
  }
})
jest.mock('../_utils/calculationFns', () => {
  return {
    createHash: jest.fn(),
  }
})
describe('Email form  tests', () => {
  test('Renders correctly', () => {
    render(<NotificationForm />)
    const form = screen.getByRole('form')
    const heading = screen.getByRole('heading', {
      level: 1,
    })
    const emailField = screen.getByTestId('email_container')

    expect(form).toBeInTheDocument()
    expect(heading).toBeInTheDocument()
    expect(emailField).toBeInTheDocument()
  })
  test('Sets email correctly', async () => {
    const user = userEvent.setup()
    render(<NotificationForm />)
    const button = screen.getByRole('button', {
      name: 'Verify',
    })
    await user.click(button)
    expect(screen.getByPlaceholderText('Enter your email')).toHaveValue(
      'gaurangtyagi7@gmail.com',
    )
  })
})
