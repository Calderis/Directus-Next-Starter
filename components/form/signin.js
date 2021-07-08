import React from "react";
import Router from "next/router";
import { LockClosedIcon, EyeIcon, EyeOffIcon } from "@heroicons/react/solid";
import { signIn } from "next-auth/client";

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: "",
      showPassword: false
    }
  }

  toggleShowPassword = () => {
    const { showPassword } = this.state;
    this.setState({ showPassword: !showPassword });
  }

  login = (e, providerId) => {
    e.preventDefault();
    e.stopPropagation();

    const options = { redirect: false };
    let error = "";

    this.setState({ error: "", loading: true });

    if (providerId === "credentials") {
      error = "Wrong email or password.";
      options.email = e.target.elements.email.value;
      options.password = e.target.elements.password.value;
    } else error = "Failed to authenticate.";


    signIn(providerId, options)
      .then(async (response) => {
        if (response && !response.ok) this.setState({ error, loading: false });
        else {
          // Redirect
          const urlParams = new URLSearchParams(window.location.search);
          const callbackUrl = urlParams.get("callbackUrl");
          if (callbackUrl) Router.push({ pathname: callbackUrl })
          else Router.push({ pathname: "/" })
        }
      })
      .catch(error => this.setState({ error, loading: fasle }));
  };

  render() {
    const { error, showPassword, loading } = this.state;
    const { providers, csrfToken, app, onCreateAccount, onForgotPassword } = this.props;
    const { themeColor } = app;

    return (
      <div>
        {Object.values(providers).map((provider, index) => (
          <div key={provider.name}>
            {index > 0 && (
              <p className="my-2 text-center text-sm text-gray-600">
                Or
              </p>
            )}
            {provider.name === "Credentials" ? (
              <form className="space-y-6" onSubmit={e => this.login(e, "credentials")}>
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
                      className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-${themeColor}-500 focus:border-${themeColor}-500 focus:z-10 sm:text-sm`}
                      placeholder="Email address"
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="sr-only">
                      Password
                    </label>
                    <div className="relative block w-full">
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        required
                        className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-${themeColor}-500 focus:border-${themeColor}-500 focus:z-10 sm:text-sm`}
                        placeholder="Password"
                      />
                      <span className="absolute right-5 inset-y-0 flex items-center pl-3 cursor-pointer" onClick={this.toggleShowPassword}>
                        {showPassword ? (
                          <EyeOffIcon className={`h-5 w-5 text-gray-500 hover:text-${themeColor}-500`} aria-hidden="true" />
                        ) : (
                          <EyeIcon className={`h-5 w-5 text-gray-500 hover:text-${themeColor}-500`} aria-hidden="true" />
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                {error && <span className="text-red-500 text-sm">{error}</span>}

                <button
                  type="submit"
                  disabled={loading}
                  className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-${themeColor}-600 hover:bg-${themeColor}-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${themeColor}-500`}
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    {loading ? (
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      <LockClosedIcon className={`h-5 w-5 text-${themeColor}-500 group-hover:text-${themeColor}-400`} aria-hidden="true" />
                    )}
                  </span>
                  Sign in
                </button>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="text-sm">
                      <a href="#" onClick={onCreateAccount} className={`font-medium text-${themeColor}-600 hover:text-${themeColor}-500`}>
                        Create your account
                      </a>
                    </div>
                  </div>

                  <div className="text-sm">
                    <a href="#" onClick={onForgotPassword} className={`font-medium text-${themeColor}-600 hover:text-${themeColor}-500`}>
                      Forgot your password?
                    </a>
                  </div>
                </div>
              </form>
            ) : (
              <button
                onClick={e => this.login(e, provider.id)}
                className="w-full text-center block items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                Sign with {provider.name}
              </button>
            )}
          </div>
        ))}
      </div>
    )
  }
}

export default SignIn;
