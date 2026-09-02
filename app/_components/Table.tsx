/**
 * Table component for rendering medicine line items.
 */

import { TableProps } from '@/types'
import { FieldValues, useForm } from 'react-hook-form'
import {
  calculateTotal,
  formatCurrency,
  parseData,
} from '../_utils/calculationFns'
import { useUserContext } from '../_providers/UserProvider'
import { NUM_COLS_INFO } from '../_utils/globalConstants'

function Table({
  data,
  columns,
  ref,
  setTotal,
  setShow,
  days = 1,
}: TableProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const { medicineData } = useUserContext()

  function onSubmit(data: FieldValues) {
    const result = calculateTotal(
      parseData(medicineData, NUM_COLS_INFO),
      data,
      days,
    )
    setTotal?.(result)
    setShow?.(true)
  }
  return (
    <>
      <div className="space-y-5 relative print:hidden w-screen">
        <h1 className="my-10 text-center md:text-5xl text-3xl uppercase tracking-widest font-extralight ">
          Order your Medicines
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
        <form
          role="form"
          ref={ref}
          className="flex flex-col items-center justify-center w-full gap-y-3 "
          onSubmit={handleSubmit(onSubmit)}
        >
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
                    value={
                      medicine[
                      !index ? 'medicineName' : `medicineName-${index}`
                      ]
                    }
                    disabled={true}
                    id={`medicineName-${index}`}
                    className="form_input"
                  />
                  {errors[`medicineName-${index}`]?.message && (
                    <span className="text-red-500 font-bold text-xs uppercase">
                      {String(errors[`medicineName-${index}`]?.message)}
                    </span>
                  )}
                </div>
                <div className="flex flex-col items-center justify-between gap-y-2 w-md h-20">
                  <input
                    autoComplete="off"
                    type="text"
                    id={`medicinePrice-${index}`}
                    defaultValue={formatCurrency(
                      Number(
                        medicine[
                        !index ? 'medicinePrice' : `medicinePrice-${index}`
                        ],
                      ),
                    )}
                    className="form_input"
                    disabled={true}
                  />
                </div>
                <div className="flex flex-col items-center justify-between gap-y-2 w-md h-20">
                  <input
                    autoComplete="off"
                    type="text"
                    id={
                      medicine[
                      !index ? 'medicineName' : `medicineName-${index}`
                      ] as string
                    }
                    defaultValue={1}
                    className="form_input"
                    required
                    {...register(
                      medicine[
                        !index ? 'medicineName' : `medicineName-${index}`
                      ].toString(),
                      {
                        valueAsNumber: true,
                        required: 'Please enter quantity per pack',
                        min: {
                          value: 0,
                          message: 'quantity should be greater than or equal to 0',
                        },
                      },
                    )}
                  />
                  {errors?.[
                    medicine[!index ? 'medicineName' : `medicineName-${index}`]
                  ]?.message && (
                      <span className="text-red-500 font-bold text-xs uppercase">
                        {String(
                          errors?.[
                            medicine[
                            !index ? 'medicineName' : `medicineName-${index}`
                            ]
                          ]?.message,
                        )}
                      </span>
                    )}
                </div>
              </div>
            )
          })}
        </form>
      </div>
    </>
  )
}

export default Table
