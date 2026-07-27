/**
 * Shared type declarations used across the MedBudget app.
 */
import { type FieldValues } from 'react-hook-form'

type User = {
  id: number
  patientName: string
  email: string
  lastOrdered: Date
}
type TableProps = {
  data: Array<Record<string, string | number>>
  columns: Array<string>
  ref?: RefObject<HTMLFormElement | null>
  days?: number
  totalCost?: number
  setTotal?: React.Dispatch<
    React.SetStateAction<
      Array<{
        Name: string
        needed: number
        Price: number
      }>
    >
  >
  setShow?: React.Dispatch<React.SetStateAction<boolean>>
  patientName?: string
}
type CalendarProps = {
  days: number
  setDays: React.Dispatch<React.SetStateAction<number>>
  formatDate: (date: string) => string
  ref?: RefObject<HTMLFormElement | null>
}
type ModalWindowProps = TableProps

type UserContextType = {
  patientName: string
  medicineData: string
  email: string
  orderData: Record<string, number>
  setPatientname: React.Dispatch<React.SetStateAction<string>>
  setMedicineData: React.Dispatch<React.SetStateAction<string>>
  setOrderData: React.Dispatch<React.SetStateAction<Record<string, number>>>
  setEmail: React.Dispatch<React.SetStateAction<string>>
}
type ModalContextType = {
  showModal: boolean
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}
