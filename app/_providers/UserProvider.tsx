'use client'

import { UserContextType } from '@/types'
import { createContext, useContext, useState } from 'react'

const UserContext = createContext<UserContextType | null>(null)
function UserProvider({ children }: { children: React.ReactNode }) {
  const [patientName, setPatientname] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [medicineData, setMedicineData] = useState<string>('')
  const [orderData, setOrderData] = useState<Record<string, number>>({})

  return (
    <UserContext.Provider
      value={{
        patientName,
        medicineData,
        orderData,
        email,
        setEmail,
        setPatientname,
        setMedicineData,
        setOrderData,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
function useUserContext() {
  const context = useContext(UserContext)
  if (!context) throw new Error('Invalid use of context')
  return context
}
export default UserProvider
export { useUserContext }
