import Footer from "./components/Footer"
import Header from "./components/Header"
import Main from "./components/Main"

function App() {
  return (
    <div className="inter bg-mb-secondary-100 min-h-screen space-y-4 flex flex-col items-center justify-between">
      <Header />
      <Main />
      <Footer/>
    </div>
  )
}

export default App
