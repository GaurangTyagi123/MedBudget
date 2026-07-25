import Footer from '../_components/Footer'
import Protect from '../_components/Protect'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Protect>
      <div className="bg-mb-secondary-100 min-h-screen min-w-full space-y-4 flex flex-col items-center justify-between ">
        {children}
        <Footer />
      </div>
    </Protect>
  )
}
