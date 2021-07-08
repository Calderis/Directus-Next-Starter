import { providers, csrfToken } from "next-auth/client";
import Link from "next/link";
import Layout from "components/layout";
import ConnexionForm from "components/form/connexion";

function WelcomePage ({ app }) {
  return (
    <div className={`md:grid md:grid-cols-2 md:gap-6 bg-${app.themeColor || "blue"}-500`}>
      <div className="md:col-span-1">
      <div className="min-h-screen flex flex-col text-enter items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="max-w-md w-full">
          <div className="space-y-8">
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Welcome !
            </h2>
            <h2 className="text-center text-xl font-normal text-gray-500">
              Your account has been created.
            </h2>
          </div>
        </div>
        <Link href="/">
          <a className={`whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-${app.themeColor}-600 hover:bg-${app.themeColor}-700`}>
            Take me to the home page !
          </a>
        </Link>
      </div>
      </div>
      <div className={`md:col-span-1 flex justify-center items-center`}>
        <img src="/images/Welcome.png" className="h-50 w-50"/>
      </div>
    </div>
  )
}


WelcomePage.getInitialProps = async (context) => {
  return {
    providers: await providers(context),
    csrfToken: await csrfToken(context)
  }
}

export default WelcomePage;
