/**
 * Tests for the patient information flow.
 */

import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import InfoForm from '../_components/InfoForm'

const mockReplace = jest.fn()

jest.mock('next/navigation', () => ({
  useRouter: () => {
    return {
      replace: mockReplace,
    }
  },
}))
jest.mock('../_utils/calculationFns', () => ({
  createHash: jest.fn(),
}))
jest.mock('../_providers/UserProvider', () => ({
  useUserContext: () => {
    return {
      patientName: 'John Doe',
      setPatientName: jest.fn(),
      setMedicineData: jest.fn(),
    }
  },
}))
describe('Info page tests', () => {
  beforeEach(() => {
    mockReplace.mockClear()
  })
  test('renders correctly', () => {
    render(<InfoForm />)
    const heading = screen.getByRole('heading', {
      level: 1,
    })
    const form = screen.getByRole('form')
    const button = screen.getByRole('button', {
      name: 'Add',
    })

    expect(heading).toBeInTheDocument()
    expect(form).toBeInTheDocument()
    expect(button).toBeInTheDocument()
  })
  test('redirects correctly', async () => {
    const user = userEvent.setup()
    render(<InfoForm />)
    const button = screen.getByRole('button', {
      name: 'Add',
    })
    const medicineName = screen.getByTestId('medicineName')
    await user.type(medicineName, 'Gord')
    expect(medicineName).toHaveValue('Gord')
    await user.click(button)
    expect(mockReplace).toHaveBeenCalledWith('/order')
  })
  test('New Rows are added correctly', async () => {
    const user = userEvent.setup()
    render(<InfoForm />)

    const plusButton = screen.getByRole('button', {
      name: '+',
    })
    const minusButton = screen.getByRole('button', {
      name: '-',
    })
    expect(plusButton).toBeInTheDocument()
    expect(minusButton).toBeInTheDocument()

    await user.click(plusButton)
    expect(screen.getAllByTestId('additional_fields')).toHaveLength(1)

    await user.click(minusButton)
    expect(screen.queryAllByTestId('additional_fields')).toHaveLength(0)
  })
})
