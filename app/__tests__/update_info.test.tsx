/**
 * Tests for updating patient information.
 */

import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import UpdateForm from '../_components/UpdateForm'
import { useUserContext } from '../_providers/UserProvider'

jest.mock('../_providers/UserProvider', () => ({
  useUserContext: jest.fn(),
}))
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      replace: jest.fn(),
    }
  },
}))
describe('Update form tests', () => {
  test('Form renders correctly', () => {
    ; (useUserContext as jest.Mock).mockReturnValue({
      medicineData: JSON.stringify([
        {
          medicineName: 'Crocin',
          medicinePrice: 20,
          quantityPerPack: 10,
          quantityPerDose: 1,
        },
      ]),
    })
    render(<UpdateForm />)
    const form = screen.queryByRole('form')
    expect(form).toBeInTheDocument()
  })
  test('Link renders correctly', () => {
    ; (useUserContext as jest.Mock).mockReturnValue({
      medicineData: '',
    })
    render(<UpdateForm />)
    const link = screen.queryByTestId('back_link')
    expect(link).toBeInTheDocument()
  })
})
