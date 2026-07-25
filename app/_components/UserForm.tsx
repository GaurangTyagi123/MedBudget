'use client'

import { createHash } from '../_utils/calculationFns'
import { useUserContext } from '../_providers/UserProvider'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

function UserForm() {
  const { setPatientname, patientName } = useUserContext()
  const router = useRouter()
  async function handleClick() {
    if (patientName.length) {
      try {
        const hash = await createHash(patientName)
        localStorage.setItem('patientName', patientName)
        const location = localStorage.getItem(`medicines-${hash}`)
          ? '/order'
          : 'info'
        router.replace(location)
      } catch (error: unknown) {
        toast.error(
          (error instanceof Error && error.message) || 'There was an error',
        )
      }
    }
  }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-5 ">
      <input
        type="text"
        name="patientName"
        id="patientName"
        placeholder="Enter patient's Name"
        className="text-center w-md h-10 rounded-md outline focus:outline-mb-primary-500 text-lg text-mb-secondary-500 font-extralight tracking-wider"
        onChange={(e) => setPatientname(e.target.value)}
        defaultValue={patientName}
      />
      <button
        className="w-32 h-10 rounded-md text-white  bg-mb-primary-500 shadow-lg shadow-mb-secondary-500 transition-all  hover:translate-y-px hover:shodow-xl cursor-pointer"
        onClick={handleClick}
      >
        Continue
      </button>
    </div>
  )
}

export default UserForm
