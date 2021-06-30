import React from "react";
import Router from "next/router";
import { LockClosedIcon, EyeIcon, EyeOffIcon } from "@heroicons/react/solid";
import LoginForm from "./login";

class Connexion extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: "",
      showPassword: false,
      screenMode: "Sign In"
    }
  }

  toggleShowPassword = () => {
    const { showPassword } = this.state;
    this.setState({ showPassword: !showPassword });
  }

  login = e => {
    e.preventDefault();
    e.stopPropagation();
    const email = e.target.elements.email.value;
    const password = e.target.elements.password.value;

    this.setState({ error: "" });

    signIn("credentials", { redirect: false, email, password })
      .then(async ({ ok, status, url }) => {
        if (!ok) this.setState({ error: "Wrong email or password." })
        else {
          // Redirect
          const urlParams = new URLSearchParams(window.location.search);
          const callbackUrl = urlParams.get("callbackUrl");
          if (callbackUrl) Router.push({ pathname: callbackUrl })
          else Router.push({ pathname: "/" })
        }
      })
      .catch(console.error);
  };

  render() {
    const { error, showPassword, screenMode } = this.state;
    const { providers, csrfToken, app } = this.props;
    const { themeColor, logo, name } = app;

    console.log("providers", providers);

    return (
      <section className="login">
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8">
            <div>
              <img
                className="mx-auto h-12 w-auto"
                src={logo}
                alt="Workflow"
              />
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                {name}
              </h2>
              <h2 className="text-center text-xl font-bold text-gray-500">
                {screenMode}
              </h2>
            </div>
            {screenMode === "Sign In" && (
              <div>
                <LoginForm app={app} providers={providers} csrfToken={csrfToken} />
              </div>
            )}
          </div>
        </div>
      </section>
    )
  }
}

export default Connexion;
