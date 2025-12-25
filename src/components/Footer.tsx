import Logo from "./Logo"

function Footer() {
  return (
    <footer className="min-h-30 w-full text-mb-secondary-100 tracking-widest  md:text-md bg-mb-primary-500 shadow-xl rounded-t-2xl flex space-x-4 divide-x items-center justify-center">
      <Logo />
      <a href="https://gaurang.work" className="md:text-[1.5rem] text-[1rem] text-wrap">Copyright © 2025- <b>GaurangTyagi</b></a>
    </footer>
  )
}

export default Footer
