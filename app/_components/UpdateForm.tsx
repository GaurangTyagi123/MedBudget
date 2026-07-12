"use client"

import { useEffect } from 'react';
import { useUserContext } from '../_providers/UserProvider'
import InfoForm from './InfoForm'
import { createHash } from '../_utils/calculationFns';
import { NUM_COLS_INFO } from '../_utils/globalConstants';
import Link from 'next/link';
import toast from 'react-hot-toast';

function UpdateForm() {
    const { setMedicineData,medicineData,patientName } = useUserContext();
    useEffect(() => {
       async function getMedicineData() {
           try{
               const hash = await createHash(patientName);
               setMedicineData(localStorage.getItem(`medicines-${hash}`) ?? "");
           }
           catch (error: unknown) {
               toast.error((error instanceof Error && error.message) || "There was an error");
           }
        }
        getMedicineData();
    }, [setMedicineData, patientName]);
    console.log(medicineData);
  return (
        <>
          {(medicineData.length > 0) ? <InfoForm defaultValues={JSON.parse(medicineData || "{}")} initialFields={(Object.values(JSON.parse(medicineData)).length) / NUM_COLS_INFO - 1} immutable /> : <div className=' h-[60vh] flex flex-col items-center justify-evenly gap-y-5'>
              <div className='font-extralight text-6xl text-stone-800'>
                  <span> OOps no medicines found !</span>
              </div>
              <Link href={"/info"} className='text-md bg-mb-primary-500 px-5 py-2 text-white capitalize font-extralight rounded-md shadow-2xl shadow-mb-primary-200 transition-transform hover:translate-y-0.5'>Go Back</Link>
          </div>}
        </>
    )
}

export default UpdateForm
