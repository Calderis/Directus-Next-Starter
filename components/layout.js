import Header from '../components/header'
import Footer from '../components/footer'

export default function Layout ({ children, title, app }) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Header {...app} />
      <main className="antialiased font-sans bg-gray-50 overflow-hidden">
        {title && (
          <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
            </div>
          </header>
        )}
        <main style={{ flex: 1 }}>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </main>
      <Footer/>
    </div>
  )
}
