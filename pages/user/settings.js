import { Component, useState, useEffect } from "react";
import { getSession } from "next-auth/client";
import axios from "axios";
import Layout from "../../components/layout";
import Protected from "../../components/protected";
import AccessDenied from "../../components/access-denied";

import { directus } from "/utils/directus";

class UserSettings extends Component {
  constructor(props) {
    super(props);

    const { session, myself } = props;

    console.log("session", session);

    this.state = {
      user: session.user
    };
  }

  savePersonnalForm = event => {
    event.preventDefault();
    const { first_name, last_name } = event.target;

    axios.post("/api/user/me", {
      first_name: first_name.value,
      last_name: last_name.value,
      accessToken: this.state.user.accessToken
    })
      .then(console.log)
      .catch(console.error);
  }

  render() {
    const { user } = this.state;

    if (!user) return null;

    console.log("user", user);

    // If session exists, display content
    return (
      <Layout title="User settings">
        <Protected>
          <div className="mt-10 sm:mt-0">
            <div className="md:grid md:grid-cols-3 md:gap-6">
              <div className="md:col-span-1">
                <div className="px-4 sm:px-0">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Personal Information
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Everything here is confidential and won't be shared with any other user or be displayed on the platform.
                  </p>
                </div>
              </div>
              <div className="mt-5 md:mt-0 md:col-span-2">
                <form onSubmit={this.savePersonnalForm}>
                  <div className="shadow overflow-hidden sm:rounded-md">
                    <div className="px-4 py-5 bg-white sm:p-6">
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
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
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
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            />
                        </div>

                        <div className="col-span-6 sm:col-span-4">
                          <label htmlFor="email_address" className="block text-sm font-medium text-gray-700">
                            Email address
                          </label>
                          <input
                            value={user.email}
                            disabled
                            type="text"
                            name="email_address"
                            id="email_address"
                            autoComplete="email"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                          <p className="mt-2 text-sm text-gray-500">
                            Sorry but you can't change your email.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                      <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                        Save
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="hidden sm:block" aria-hidden="true">
            <div className="py-5">
              <div className="border-t border-gray-200" />
            </div>
          </div>

          <div className="mt-10 sm:mt-0">
            <div className="md:grid md:grid-cols-3 md:gap-6">
              <div className="md:col-span-1">
                <div className="px-4 sm:px-0">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Password
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    This is the passphrase your are using to connect on this website.
                  </p>
                </div>
              </div>
              <div className="mt-5 md:mt-0 md:col-span-2">
                <form action="#" method="POST">
                  <div className="shadow overflow-hidden sm:rounded-md">
                    <div className="px-4 py-5 bg-white sm:p-6">
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-4">
                          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                          </label>
                          <input
                            placeholder="***********"
                            type="password"
                            name="password"
                            id="password"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                          <p className="mt-2 text-sm text-gray-500">
                            Just fill the input and save to update your password
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                      <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                        Save
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="hidden sm:block" aria-hidden="true">
            <div className="py-5">
              <div className="border-t border-gray-200" />
            </div>
          </div>

          <div>
            <div className="md:grid md:grid-cols-3 md:gap-6">
              <div className="md:col-span-1">
                <div className="px-4 sm:px-0">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Profile</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    This information will be displayed publicly so be careful what you share.
                  </p>
                </div>
              </div>
              <div className="mt-5 md:mt-0 md:col-span-2">
                <form action="#" method="POST">
                  <div className="shadow sm:rounded-md sm:overflow-hidden">
                    <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Photo</label>
                        <div className="mt-1 flex items-center">
                          <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                            <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                          </span>
                          <button
                            type="button"
                            className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                            Change
                          </button>
                        </div>
                      </div>

                      <div className="col-span-6 sm:col-span-4">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                          Pseudo
                        </label>
                        <input
                          defaultValue={user.title}
                          type="text"
                          name="title"
                          placeholder="Anonymous"
                          id="title"
                          autoComplete="title"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div>
                        <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                          About
                        </label>
                        <div className="mt-1">
                          <textarea
                            defaultValue={user.description}
                            id="about"
                            name="about"
                            rows={3}
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                            placeholder="I am so brave"
                            defaultValue={''}
                            />
                        </div>
                        <p className="mt-2 text-sm text-gray-500">
                          Brief description for your profile.
                        </p>
                      </div>
                    </div>
                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                      <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                        Save
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Protected>
      </Layout>
    );
  }
}

export async function getServerSideProps(context) {
  return {
    props: {
      session: await getSession(context),
      // myself: await directus.users.me.read(),
    }
  }
}

export default UserSettings;
