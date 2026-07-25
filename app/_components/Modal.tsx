import { ModalContextType, ModalWindowProps } from '@/types'
import { createContext, useContext, useEffect } from 'react'
import Reciept from './Reciept'
import { createPortal } from 'react-dom'

const ModalContext = createContext<ModalContextType | null>(null)
function Modal({
  children,
  showModal,
  setShowModal,
}: {
  children: React.ReactNode
  showModal: boolean
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
}) {
  return (
    <ModalContext.Provider
      value={{
        showModal,
        setShowModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}

function ModalOpen({ children }: { children: React.ReactNode }) {
  const { setShowModal } = useContext(ModalContext)!
  useEffect(() => {
    setShowModal(true)
  }, [setShowModal])
  return createPortal(children, document.body)
}

function ModalWindow({
  data,
  columns,
  totalCost,
  days,
  patientName,
}: ModalWindowProps) {
  const { setShowModal, showModal } = useContext(ModalContext)!
  const modal = showModal ? (
    <div
      role="modal"
      className="space-y-5 w-screen h-screen grid place-items-center z-40 rounded-lg fixed inset-0  bg-black/40 outline outline-mb-secondary-500 shadow-2xl shadow-mb-secondary-500 backdrop-blur-sm print:static print:translate-0 print:w-screen print:h-screen"
    >
      <Reciept
        data={data}
        columns={columns}
        totalCost={totalCost}
        days={days}
        setShow={setShowModal}
        patientName={patientName}
      />
    </div>
  ) : null
  return modal
}

Modal.Window = ModalWindow
Modal.Open = ModalOpen
export default Modal
