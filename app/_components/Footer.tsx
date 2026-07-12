import Logo from "./Logo"
import Link from "next/link"

function Footer() {
    return (
        <footer className="min-h-30 m-0 min-w-full text-mb-secondary-100 tracking-widest  md:text-md bg-mb-primary-500 shadow-xl rounded-t-2xl flex space-x-4 divide-x items-center justify-center print:hidden">
            <Logo />
            <Link href="https://gaurang.work" className="md:text-[1rem] sm:text-[.5rem] text-[1rem] text-wrap">Copyright © 2025- <b>GaurangTyagi</b></Link>
        </footer>
    )
}

export default Footer