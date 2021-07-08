import React from "react";
import Router from "next/router";
import { LockClosedIcon, EyeIcon, EyeOffIcon } from "@heroicons/react/solid";
import SignInForm from "./signin";
import SignUpForm from "./signup";
import ForgotForm from "./forgot";
import ChangePasswordForm from "./changePassword";

class Connexion extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: "",
      showPassword: false,
      token: null,
      screenMode: props.screenMode || "Sign In"
    }
  }

  componentDidMount() {
    if (typeof document !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token");
      if (token) this.setState({ token });
    }
  }

  toggleShowPassword = () => {
    const { showPassword } = this.state;
    this.setState({ showPassword: !showPassword });
  }

  openScreen = screenMode => this.setState({ screenMode });

  render() {
    const { error, showPassword, screenMode, token } = this.state;
    const { providers, csrfToken, app } = this.props;
    const { themeColor, logo, name } = app;

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
                <SignInForm
                  app={app}
                  providers={providers}
                  csrfToken={csrfToken}
                  onCreateAccount={() => this.openScreen("Sign Up")}
                  onForgotPassword={() => this.openScreen("Reset password")}
                />
              </div>
            )}
            {screenMode === "Sign Up" && (
              <div>
                <SignUpForm
                  app={app}
                  onSignIn={() => this.openScreen("Sign In")}
                  onForgotPassword={() => this.openScreen("Reset password")}
                />
              </div>
            )}
            {screenMode === "Reset password" && (
              <div>
                {token ? (
                  <ChangePasswordForm
                    app={app}
                    token={token}
                    onSignIn={() => this.openScreen("Sign In")}
                  />
                ) : (
                  <ForgotForm
                    app={app}
                    onSignIn={() => this.openScreen("Sign In")}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    )
  }
}

export default Connexion;
