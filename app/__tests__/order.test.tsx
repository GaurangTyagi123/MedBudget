/**
 * Tests for the order workflow.
 */

import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Main from '../_components/Main'
import Calendar from '../_components/Calendar'
import userEvent from '@testing-library/user-event'
import Modal from '../_components/Modal'

jest.mock('../_providers/UserProvider', () => {
  return {
    useUserContext() {
      return {
        patientName: 'John Doe',
        setPatientName: jest.fn(),
        email: 'johndoe@gmail.com',
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
describe('Order tests', () => {
  test('Renders correctly', () => {
    render(<Main />)
    const heading = screen.getByRole('heading', {
      level: 1,
    })
    const form = screen.getByRole('form')

    expect(heading).toBeInTheDocument()
    expect(form).toBeInTheDocument()
  })
  test('Calendar works correctly', async () => {
    const user = userEvent.setup()
    const days = 5
    const formatDate = jest.fn()
    const setDays = jest.fn()
    let show = false
    const ref = {
      current: {
        requestSubmit: jest.fn(),
      },
    }

    render(
      <Calendar
        days={days}
        formatDate={formatDate}
        ref={ref}
        setDays={setDays}
      />,
    )
    render(
      <Modal showModal={show} setShowModal={jest.fn()}>
        <Modal.Open>
          <Modal.Window
            columns={['col1', 'col2', 'col3']}
            data={[]}
          ></Modal.Window>
        </Modal.Open>
      </Modal>,
    )

    const dateSelector = screen.getByTestId('data-date')
    const button = screen.getByRole('button', {
      name: `calculate for ${days} ${days > 1 ? 'days' : 'day'}`,
    })

    expect(dateSelector).toBeInTheDocument()
    expect(button).toBeInTheDocument()

    expect(screen.queryByRole('modal')).not.toBeInTheDocument()
    await user.click(button)
    show = true
    render(
      <Modal showModal={show} setShowModal={jest.fn()}>
        <Modal.Open>
          <Modal.Window
            columns={['col1', 'col2', 'col3']}
            data={[]}
          ></Modal.Window>
        </Modal.Open>
      </Modal>,
    )
    expect(screen.queryByRole('modal')).toBeInTheDocument()
  })
})
