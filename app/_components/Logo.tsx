/**
 * Logo mark used in the MedBudget header.
 */

import Image from 'next/image'
import Link from 'next/link'

function Logo() {
  return (
    <div className=" flex items-center gap-4 px-4 w-[40%]">
      <div className="w-15 h-15 rounded-4xl relative overflow-clip">
        <Image
          src="/MB_logo.ico"
          alt="MedBudget Logo"
          fill
          objectFit="contain"
        />
      </div>
      <Link
        href="/"
        title="Go to home page"
        className="text-mb-secondary-100 tracking-widest capitalize"
      >
        MedBudget
      </Link>
    </div>
  )
}

export default Logo
