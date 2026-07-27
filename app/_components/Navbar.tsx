'use client'

/**
 * Navigation bar for moving between app sections.
 */

import Link from 'next/link'
import useLocalStorage from '../hooks/useLocalStorage'
import Logo from './Logo'

function Navbar() {
  const patientName = useLocalStorage('patientName')
  return (
    <nav
      role="navigation"
      className="min-h-20 w-full bg-mb-primary-500 shadow-xl rounded-b-2xl flex-row flex items-center justify-evenly relative print:hidden"
    >
      <ul className="flex w-[33%] items-center justify-center  text-white text-[.8rem] md:text-[1rem]  tracking-wider capitalize space-x-2 divide-x-2">
        <li
          title="Recieve Notification"
          className=" cursor-pointer w-28 h-10 grid place-items-center text-md  hover:bg-red-950 text-center "
        >
          <Link href={'/notification'}>Be Notified</Link>
        </li>
        <li
          title="Update Medicine Information"
          className="cursor-pointer w-28 h-10 grid place-items-center text-md hover:bg-red-950 text-center"
        >
          <Link href={'/info/update'}>Update Info</Link>
        </li>
      </ul>
      <Logo />
      <span className="text-mb-secondary-100 text-lg ">{patientName}</span>
    </nav>
  )
}

export default Navbar
