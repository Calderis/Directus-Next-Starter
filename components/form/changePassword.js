import React from "react";
import Router from "next/router";
import axios from "axios";
import { PaperAirplaneIcon, CheckIcon } from "@heroicons/react/solid";
import { debounce } from "utils/front/search";

import PasswordStrength from "components/passwordStrength";

class ChangePassword extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: "",
      password: "",
      loading: false,
      passwordChanged: false
    }
  }

  onPasswordChange = e => this.setState({ password: e.target.value });

  resetPassword = (e) => {
    e.preventDefault();
    e.stopPropagation();
    let error = "";

    const { token } = this.props;
    const { password } = this.state;

    this.setState({ error: "", loading: true });

    axios.post("/api/auth/reset-password", { password, token })
      .then(() => this.setState({ passwordChanged: true, loading: false }))
      .catch(error => this.setState({ error, loading: false }));

  };

  render() {
    const { error, passwordChanged, password, loading } = this.state;
    const { app, onSignIn } = this.props;
    const { themeColor } = app;

    return (
      <form onSubmit={this.resetPassword} className="space-y-6">
        <div className="shadow sm:rounded-md sm:overflow-hidden">
          <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
            <div>
              <legend className="text-base font-medium text-gray-900">
                Ready to set your new password ?
              </legend>
              <p className="text-sm text-gray-500">
                What you will submit next will become your new password. Choose wisely !
              </p>
            </div>
            <div className="col-span-6 sm:col-span-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Your new password
              </label>
              <div className="relative block w-full">
                <input
                  type="password"
                  name="password"
                  placeholder="**********"
                  id="password"
                  autoComplete="password"
                  onChange={this.onPasswordChange}
                  required
                  className={`mt-1 focus:ring-${themeColor}-500 focus:border-${themeColor}-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md`}
                />
                <PasswordStrength password={password} />
              </div>
            </div>
          </div>
        </div>
        {error && <span className="text-red-500 text-sm">{error}</span>}

        {password && !passwordChanged && (
          <button
            disabled={loading}
            type="submit"
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
        )}

        {passwordChanged && (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="text-sm font-medium text-gray-600">
                Your password has been changed !
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

export default ChangePassword;
