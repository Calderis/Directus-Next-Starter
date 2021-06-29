import { Component, useState, useEffect } from "react";
import { getSession } from "next-auth/client";
import axios from "axios";
import Layout from "components/layout";
import Protected from "components/protected";
import AccessDenied from "components/access-denied";
import { getUser } from "utils/front/storage";

class Contact extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: "",
      status: "idle",
      user: {}
    };
  }

  componentDidMount() {
    getUser()
      .then(data => this.setUser(({ data })))
      .catch(console.error);
  }

  setUser = ({ data }) => this.setState({ user: data });

  sendMessage = e => {
    e.preventDefault();
    e.stopPropagation();
    const { first_name, last_name, email, message } = e.target;

    axios.post("/api/contact", {
      firstName: first_name.value,
      lastName: last_name.value,
      email: email.value,
      message: message.value
    })
      .then(() => this.setState({ status: "sent" }))
      .catch(() => this.setState({ status: "failed" }));
  };

  render() {
    const { user, status } = this.state;
    const { app } = this.props;
    const { themeColor } = app;

    return (
      <Layout app={app}>
        <div className="md:grid md:grid-cols-6 md:gap-6">
          <div className="md:col-span-1" />
          <div className="mt-5 md:mt-0 md:col-span-4">
            <form onSubmit={this.sendMessage}>
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                  <div>
                    <h3 className="font-semibold text-xl">Contact us</h3>
                    <p className="text-sm text-gray-500">We do respect privacy. We do use your personnal data in the only goal of providing you the best service. We will never share any data with any other party.</p>
                  </div>
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                        First name
                      </label>
                      <input
                        placeholder="John"
                        type="text"
                        name="first_name"
                        id="first_name"
                        defaultValue={user.first_name}
                        autoComplete="given-name"
                        className={`mt-1 focus:ring-${themeColor}-500 focus:border-${themeColor}-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md`}
                        />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                        Last name
                      </label>
                      <input
                        placeholder="Doh"
                        type="text"
                        name="last_name"
                        id="last_name"
                        defaultValue={user.last_name}
                        autoComplete="family-name"
                        className={`mt-1 focus:ring-${themeColor}-500 focus:border-${themeColor}-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md`}
                        />
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email address
                      </label>
                      <input
                        value={user.email}
                        disabled
                        type="text"
                        name="email"
                        id="email"
                        autoComplete="email"
                        className={`mt-1 focus:ring-${themeColor}-500 focus:border-${themeColor}-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md`}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                      Your message
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="message"
                        name="message"
                        rows={3}
                        className={`shadow-sm focus:ring-${themeColor}-500 focus:border-${themeColor}-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md`}
                        placeholder="Once upon a time..."
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Please be respectfull.
                    </p>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  {status}
                  <button
                    type="submit"
                    className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-${themeColor}-600 hover:bg-${themeColor}-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${themeColor}-500`}
                  >
                    Send
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    );
  }
}

export default Contact;
