import Header from "./header";
import Footer from "./footer";

export default function Layout ({ children, title, app }) {
  return (
    <div className="min-h-screen flex" style={{ display: "flex", flexDirection: "column" }}>
      <Header {...app} title={title} />
      <main className="antialiased font-sans bg-gray-50 overflow-hidden flex-1">
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
