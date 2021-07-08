import React from "react";
import Router from "next/router";
import axios from "axios";
import { PaperAirplaneIcon, CheckIcon } from "@heroicons/react/solid";
import { debounce } from "utils/front/search";

class Forgot extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: "",
      email: "",
      joking: false,
      emailFound: false,
      requestSent: false,
    }
  }

  onEmailChange = debounce(e => {
    const email = e.target.value;

    this.setState({ emailFound: false, error: false });

    axios.get(`/api/users/search?filter[email][_eq]=${email}`)
      .then(({ data }) => {
        if (data.data && data.data.length) this.setState({ emailFound: true });
        this.setState({ email })
      })
      .catch(error => this.setState({ error }));
  });

  resetPassword = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const options = { redirect: false };
    let error = "";

    const { email } = event.target;

    this.setState({ error: "", loading: true });

    axios.post("/api/auth/request-password", { email: email.value })
      .then(() => this.setState({ requestSent: true, loading: false }))
      .catch(error => this.setState({ error, loading: false }));
  };

  render() {
    const { error, emailFound, email, joking, requestSent, loading } = this.state;
    const { app, onSignIn } = this.props;
    const { themeColor } = app;

    return (
      <form onSubmit={this.resetPassword} className="space-y-6">
        <div className="shadow sm:rounded-md sm:overflow-hidden">
          <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
            <div>
              <legend className="text-base font-medium text-gray-900">
                What's you email ?
              </legend>
              <p className="text-sm text-gray-500">
                We will send you an email with a link to reset you password.
              </p>
            </div>
            <div className="col-span-6 sm:col-span-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="relative block w-full">
                <input
                  type="email"
                  name="email"
                  placeholder="anonymous@mail.com"
                  id="email"
                  autoComplete="email"
                  onChange={this.onEmailChange}
                  required
                  className={`mt-1 focus:ring-${themeColor}-500 focus:border-${themeColor}-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md`}
                />
                {email && (
                  <div className="absolute right-5 inset-y-0 flex items-center pl-3">
                    {emailFound && (
                      <div className="flex flex-row text-green-500 content-center items-center">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        <span className="ml-2">Email found</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <fieldset>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      disabled={joking}
                      id="promise-forgot-password"
                      name="promise-forgot-password"
                      type="checkbox"
                      onChange={() => this.setState({ joking: true })}
                      className={`focus:ring-${themeColor}-500 h-4 w-4 text-${themeColor}-600 border-gray-300 rounded`}
                      />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="promise-forgot-password" className="font-medium text-gray-700">
                      I promise that I won't forget my password again
                    </label>
                    {joking && (
                      <p className="text-gray-500">
                        Kidding, you can forgot any time ;)
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
        {error && <span className="text-red-500 text-sm">{error}</span>}

        {emailFound && (
          requestSent ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="text-sm font-medium text-gray-600">
                  New Password requested ! (Check your mails)
                </div>
              </div>
            </div>
          ) : (
            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-${themeColor}-600 hover:bg-${themeColor}-700 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${themeColor}-500`}
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                {loading ? (
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <PaperAirplaneIcon className={`h-5 w-5 text-${themeColor}-500 group-hover:text-${themeColor}-400`} aria-hidden="true" />
                )}
              </span>
              Send reset password email
            </button>
          )
        )}

        {!emailFound && email && (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="text-sm font-medium text-gray-600">
                No email such as "{email}" has been found in our database. Check with another email maybe ?
              </div>
            </div>
          </div>
        )}


        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="text-sm">
              <a href="#" onClick={onSignIn} className={`font-medium text-${themeColor}-600 hover:text-${themeColor}-500`}>
                Back to login
              </a>
            </div>
          </div>
        </div>
      </form>
    )
  }
}

export default Forgot;
