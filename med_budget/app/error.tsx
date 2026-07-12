"use client"

import Link from "next/link"

function error() {
  return (
      <div className=' h-[60vh] flex flex-col items-center justify-evenly gap-y-5'>
          <div className='font-extralight text-6xl text-stone-800'>
              <span> OOPS SOMETHING WENT WRONG!!!!</span>
          </div>
          <Link href={"/order"} className='text-md bg-mb-primary-500 px-5 py-2 text-white capitalize font-extralight rounded-md shadow-2xl shadow-mb-primary-200 transition-transform hover:translate-y-0.5'>Go Back</Link>
      </div>
  )
}

export default error
