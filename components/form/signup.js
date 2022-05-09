import React from "react";
import Router from "next/router";
import axios from "axios";
import Link from "next/link";
import { BookmarkIcon, ShieldCheckIcon, EyeIcon, EyeOffIcon, CheckIcon, ExclamationIcon } from "@heroicons/react/solid";
import { signIn } from "next-auth/client";
import Modal from "components/layout/modal";
import Terms from "components/content/terms";
import PasswordStrength from "components/passwordStrength";

class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: "",
      title: "",
      password: "",
      created: false,
      showPassword: false,
      pseudoTaken: false,
    }
  }

  updatePassword = e => this.setState({ password: e.target.value });

  toggleShowPassword = () => {
    const { showPassword } = this.state;
    this.setState({ showPassword: !showPassword });
  }

  onPseudoChange = e => {
    const title = e.target.value;

    this.setState({ pseudoTaken: false });

    axios.get(`/api/users/search?filter[title][_eq]=${title}`)
      .then(({ data }) => {
        if (data.data && data.data.length) this.setState({ pseudoTaken: true });
        this.setState({ title })
      })
      .catch(error => this.setState({ error }));
  }

  signUp = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const options = { redirect: false };
    let error = "";

    const { first_name, last_name, title, email, password } = event.target;

    this.setState({ error: "", loading: true });

    axios.post("/api/users/create", {
      first_name: first_name.value,
      last_name: last_name.value,
      title: title.value,
      email: email.value,
      password: password.value
    })
      .then(() => {
        signIn("credentials", { redirect: false, email: email.value, password: password.value })
          .then(async (response) => {
            if (response && !response.ok) this.setState({ error, loading: false });
            else Router.push({ pathname: "/user/welcome" });
          })
          .catch(error => this.setState({ error, loading: false }));
      })
      .catch(error => this.setState({ error, loading: false }));
  };

  render() {
    const { error, showPassword, passwordStrengh, pseudoTaken, title, password, loading } = this.state;
    const { app, onSignIn } = this.props;
    const { themeColor } = app;

    return (
      <form onSubmit={this.signUp} className="space-y-6">
        <div className="shadow sm:rounded-md sm:overflow-hidden">
          <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
            <div>
              <legend className="text-base font-medium text-gray-900">Create your account</legend>
              <p className="text-sm text-gray-500">
                Choose the best pseudo !
              </p>
            </div>
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-3">
                <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                  First name
                </label>
                <input
                  type="text"
                  name="first_name"
                  id="first_name"
                  placeholder="John"
                  className={`mt-1 focus:ring-${themeColor}-500 focus:border-${themeColor}-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md`}
                  />
              </div>

              <div className="col-span-3">
                <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                  Last name
                </label>
                <input
                  type="text"
                  name="last_name"
                  id="last_name"
                  placeholder="Doe"
                  className={`mt-1 focus:ring-${themeColor}-500 focus:border-${themeColor}-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md`}
                  />
              </div>
            </div>
            <div className="col-span-6 sm:col-span-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Pseudo
              </label>
              <div className="relative block w-full">
                <input
                  type="text"
                  name="title"
                  id="title"
                  required
                  invalid={pseudoTaken}
                  onChange={this.onPseudoChange}
                  placeholder="Anonymous"
                  className={`mt-1 focus:ring-${themeColor}-500 focus:border-${themeColor}-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md`}
                />
                {title && (
                  <div className="absolute right-5 inset-y-0 flex items-center pl-3">
                    {pseudoTaken ? (
                      <div className="flex flex-row text-red-500 content-center items-center">
                        <ExclamationIcon className="h-5 w-5" aria-hidden="true" />
                        <span className="ml-2">Pseudo already taken</span>
                      </div>
                    ) : (
                      <CheckIcon className={`h-5 w-5 text-${themeColor}-500`} aria-hidden="true" />
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="col-span-6 sm:col-span-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="anonymous@mail.com"
                id="email"
                autoComplete="email"
                required
                className={`mt-1 focus:ring-${themeColor}-500 focus:border-${themeColor}-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md`}
                />
            </div>

            <div className="col-span-6 sm:col-span-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative block w-full">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  onChange={this.updatePassword}
                  className={`mt-1 focus:ring-${themeColor}-500 focus:border-${themeColor}-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md`}
                  placeholder="*******************"
                  />
                <span className="absolute right-5 inset-y-0 flex items-center pl-3 cursor-pointer" onClick={this.toggleShowPassword}>
                  {showPassword ? (
                    <EyeOffIcon className={`h-5 w-5 text-gray-500 hover:text-${themeColor}-500`} aria-hidden="true" />
                  ) : (
                    <EyeIcon className={`h-5 w-5 text-gray-500 hover:text-${themeColor}-500`} aria-hidden="true" />
                  )}
                </span>
              </div>
              <PasswordStrength password={password} />
            </div>

            <fieldset>
              <div className="mt-4 space-y-4">
                <div className="text-sm">
                  <Modal
                    app={app}
                    title="Terms and conditions"
                    icon={BookmarkIcon}
                    color={app.themeColor}
                    acceptButton="Understood"
                    cancelButton="Close"
                    button={(
                      <a href="#" className={`font-medium text-${themeColor}-600 hover:text-${themeColor}-500`}>
                        Read terms and conditions
                      </a>
                    )}
                  >
                    <div className="overflow-auto" style={{ maxHeight: "calc(75vh - 64px)" }}>
                      <Terms app={app} />
                    </div>
                  </Modal>
                </div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      required
                      id="terms-agreement"
                      name="terms-agreement"
                      type="checkbox"
                      className={`focus:ring-${themeColor}-500 h-4 w-4 text-${themeColor}-600 border-gray-300 rounded`}
                      />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="terms-agreement" className="font-medium text-gray-700">
                      I agree to the term and condition
                    </label>
                    <p className="text-gray-500">
                      And consent {app.name} to save and used my data.
                    </p>
                  </div>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
        {error && <span className="text-red-500 text-sm">{error}</span>}

        <button
          type="submit"
          disabled={pseudoTaken || loading}
          className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-${themeColor}-600 hover:bg-${themeColor}-700 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${themeColor}-500`}
        >
          <span className="absolute left-0 inset-y-0 flex items-center pl-3">
            {loading ? (
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <ShieldCheckIcon className={`h-5 w-5 text-${themeColor}-500 group-hover:text-${themeColor}-400`} aria-hidden="true" />
            )}
          </span>
          Sign up
        </button>

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

export default SignUp;
