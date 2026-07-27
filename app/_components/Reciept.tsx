/**
 * Receipt view for displaying the order summary.
 */

import { TableProps } from '@/types'
import { createHash, formatCurrency } from '../_utils/calculationFns'
import { storeOrderDetails } from '../_lib/actions'
import toast from 'react-hot-toast'
import { useUserContext } from '../_providers/UserProvider'

function Reciept({
  data,
  columns,
  patientName,
  days = 0,
  setShow,
  totalCost = 1,
}: TableProps) {
  const { email } = useUserContext()
  async function receiptHandler() {
    if (patientName) {
      try {
        if (email) {
          console.log(email)
          await storeOrderDetails(days, email, patientName)
        }
        const hash = await createHash(patientName)
        localStorage.setItem(`order-${hash}`, JSON.stringify(data))
        toast.success('Order details stored!')
      } catch (error: unknown) {
        toast.error(
          (error instanceof Error && error.message) || 'There was an error',
        )
      }
    }
  }
  return (
    <>
      <div className="relative space-y-5 md:h-[60%] md:w-[70%]  w-full h-full rounded-lg bg-stone-100/80 outline outline-mb-secondary-500 shadow-3xl shadow-mb-secondary-500 print:static print:translate-0 print:w-screen print:h-screen overflow-auto">
        <button
          className="h-12 w-12 text-2xl position absolute right-0  cursor-pointer"
          onClick={() => setShow?.(false)}
        >
          x
        </button>
        <h1 className="my-10 text-center md:text-5xl text-2xl uppercase tracking-widest font-extralight ">
          Your Order
        </h1>
        <div className="min-w-full h-fit grid grid-cols-3 place-items-center mt-5 ">
          {columns.map((column: string, index: number) => {
            return (
              <span className="font-bold text-center" key={index}>
                {column}
              </span>
            )
          })}
        </div>
        <div className="px-5 flex flex-col items-center justify-center w-full gap-y-3 ">
          {data.map((medicine, index) => {
            return (
              <div
                className="w-full flex items-center justify-center  gap-x-4"
                key={index}
              >
                <div className="flex flex-col items-center justify-between gap-y-2 w-md h-20">
                  <input
                    autoComplete="off"
                    type="text"
                    value={medicine.Name}
                    disabled={true}
                    id={`medicineName-${index}`}
                    className="form_input"
                  />
                </div>
                <div className="flex flex-col items-center justify-between gap-y-2 w-md h-20">
                  <input
                    autoComplete="off"
                    type="text"
                    id={`medicinePrice-${index}`}
                    defaultValue={formatCurrency(Number(medicine.Price))}
                    className="form_input"
                    disabled={true}
                  />
                </div>
                <div className="flex flex-col items-center justify-between gap-y-2 w-md h-20">
                  <input
                    autoComplete="off"
                    type="text"
                    id={medicine.needed as string}
                    defaultValue={medicine.needed}
                    className="form_input"
                    disabled={true}
                  />
                </div>
              </div>
            )
          })}
          <button
            onClick={() => {
              receiptHandler()
              window.print()
            }}
            className="my-3 w-50 h-15 rounded-md text-white cursor-pointer  bg-mb-primary-500 transition-transform active:translate-y-1 shadow-md shadow-mb-secondary-200 print:hidden"
          >
            {`Print reciept ${formatCurrency(totalCost!) ?? null}`}
          </button>
          <span className="hidden print:block">
            Total Cost : {formatCurrency(totalCost)}
          </span>
        </div>
      </div>
    </>
  )
}

export default Reciept
