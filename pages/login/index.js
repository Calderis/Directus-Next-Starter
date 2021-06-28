import Head from "next/head";
import Link from "next/link";
import { providers, signIn, csrfToken } from "next-auth/client";
import { LockClosedIcon } from "@heroicons/react/solid";

function Login({ providers, csrfToken }) {

  return (
    <section className="login">
    {Object.values(providers).map((provider, index) => (
      <div key={provider.name}>
        {index > 0 && (
          <div className="page-separator justify-content-center">
            <div className="page-separator__text bg-white">ou</div>
          </div>
        )}
        {provider.name === "Credentials" ? (
          <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
              <div>
                <img
                  className="mx-auto h-12 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                  alt="Workflow"
                />
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                  Sign in to Starbase Ship Shop
                </h2>
              </div>
              <form className="mt-8 space-y-6" method="post" action="/api/auth/callback/credentials">
                <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                <input type="hidden" name="remember" defaultValue="true" />
                <div className="rounded-md shadow-sm -space-y-px">
                  <div>
                    <label htmlFor="email-address" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="email-address"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Email address"
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="sr-only">
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Password"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="text-sm">
                      <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Create your account
                      </a>
                    </div>
                  </div>

                  <div className="text-sm">
                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                      Forgot your password?
                    </a>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                      <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                    </span>
                    Sign in
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <button
            onClick={() => signIn(provider.id)}
            className="btn btn-light btn-block mb-24pt"
          >
            <span className="fab fa-google icon--left" />
            Continuer avec {provider.name}
          </button>
        )}
      </div>
    ))}
      </section>
  )
}

Login.getInitialProps = async (context) => {
  return {
    providers: await providers(context),
    csrfToken: await csrfToken(context)
  }
}

export default Login;
