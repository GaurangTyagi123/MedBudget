'use client'

import { useRouter } from 'next/navigation'
import { useUserContext } from '../_providers/UserProvider'
import Link from 'next/link'

function Protect({ children }: { children: React.ReactNode }) {
  const { patientName } = useUserContext()
  const router = useRouter()
  if (patientName.length) return <>{children}</>
  else
    return (
      <div className=" h-[60vh] flex flex-col items-center justify-evenly gap-y-5">
        <div className="font-extralight text-6xl text-stone-800">
          <span> Please provide a name for the patient</span>
        </div>
        <Link
          href={'/'}
          className="text-md bg-mb-primary-500 px-5 py-2 text-white capitalize font-extralight rounded-md shadow-2xl shadow-mb-primary-200 transition-transform hover:translate-y-0.5"
        >
          Go Back
        </Link>
      </div>
    )
}

export default Protect
