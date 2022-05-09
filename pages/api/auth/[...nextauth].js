import NextAuth from "next-auth";
import Providers from "next-auth/providers";

import { directus } from "/utils/directus";

const providers = [];

/* The following code does not work yet */

// // Add google provider
// if (process.env.OAUTH_GOOGLE_KEY) {
//   providers.push(
//     Providers.Google({
//       clientId: process.env.OAUTH_GOOGLE_KEY,
//       clientSecret: process.env.OAUTH_GOOGLE_SECRET
//     }),
//   )
// }
//
// // Add google provider
// if (process.env.OAUTH_GITHUB_KEY) {
//   providers.push(
//     Providers.GitHub({
//       clientId: process.env.OAUTH_GITHUB_KEY,
//       clientSecret: process.env.OAUTH_GITHUB_SECRET
//     }),
//   )
// }

const options = {
  // @link https://next-auth.js.org/configuration/providers
  providers: [
    ...providers,
    Providers.Credentials({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email@provider.com" },
        password: {  label: "Password", type: "password" }
      },
      requestTokenUrl: `${process.env.API_URL}/auth/login`,
      retrieveTokenUrl: `${process.env.API_URL}/auth/refresh`,
      profileUrl: `${process.env.API_URL}/users/me`,
      async authorize(credentials) {
        const { email, password } = credentials;
        let user = null;
        try {
          const auth = await directus.auth.login({ email, password });
          const data = await directus.users.me.read();

          user = data;
          user.id = data.id;
          user.name = `${data.first_name} ${data.last_name}`;
          user.first_name = data.first_name;
          user.last_name = data.last_name;
          user.title = data.title;
          user.description = data.description;
          user.tags = data.tags;
          user.image = data.avatar ? `${process.env.API_URL}/assets/${data.avatar}` : "/images/User.png";
          user.email = data.email;
          user.accessToken = auth.access_token;
        } catch (e) {
          console.error(e);
          return null;
        }

        // Any user object returned here will be saved in the JSON Web Token
        if (user) return user;
        return null
      }
    }),
  ],

  // @link https://next-auth.js.org/configuration/databases
  // database: process.env.NEXTAUTH_DATABASE_URL,

  // @link https://next-auth.js.org/configuration/options#session
  session: {
    // Use JSON Web Tokens for session instead of database sessions.
    // This option can be used with or without a database for users/accounts.
    // Note: `jwt` is automatically set to `true` if no database is specified.
    jwt: true,
    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 1296000, // ~ 15 days
    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    updateAge: 0,
  },

  // @link https://next-auth.js.org/configuration/options#jwt
  jwt: {
    // A secret to use for key generation - you should set this explicitly
    // Defaults to NextAuth.js secret if not explicitly specified.
    // secret: 'INp8IvdIyeMcoGAgFGoA61DdBglwwSqnXJZkgz8PSnw',
    // Set to true to use encryption. Defaults to false (signing only).
    // encryption: true,
    // You can define your own encode/decode functions for signing and encryption
    // if you want to override the default behaviour.
    // encode: async ({ secret, token, maxAge }) => {},
    // decode: async ({ secret, token, maxAge }) => {},
  },

  // @link https://next-auth.js.org/configuration/callbacks
  callbacks: {
    /**
     * Intercept signIn request and return true if the user is allowed.
     *
     * @link https://next-auth.js.org/configuration/callbacks#sign-in-callback
     * @param  {object} user     User object
     * @param  {object} account  Provider account
     * @param  {object} profile  Provider profile
     * @return {boolean}         Return `true` (or a modified JWT) to allow sign in
     *                           Return `false` to deny access
     */
    signIn: async (user, account, profile) => {
      return true
    },

    /**
     * @link https://next-auth.js.org/configuration/callbacks#session-callback
     * @param  {object} session      Session object
     * @param  {object} user         User object    (if using database sessions)
     *                               JSON Web Token (if not using database sessions)
     * @return {object}              Session that will be returned to the client
     */
    session: async (session, user) => Promise.resolve({ ...session, user }),

    /**
     * @link https://next-auth.js.org/configuration/callbacks#jwt-callback
     * @param  {object}  token     Decrypted JSON Web Token
     * @param  {object}  user      User object      (only available on sign in)
     * @param  {object}  account   Provider account (only available on sign in)
     * @param  {object}  profile   Provider profile (only available on sign in)
     * @param  {boolean} isNewUser True if new user (only available on sign in)
     * @return {object}            JSON Web Token that will be saved
     */
    jwt: async (token, user, account, profile, isNewUser) => {
      const isSignIn = (user) ? true : false
      // Add auth_time to token on signin in
      if (isSignIn) {
        token = {
          ...user,
          auth_time: Math.floor(Date.now() / 1000)
        }
      }
      return Promise.resolve(token)
    },
  },

  // You can define custom pages to override the built-in pages
  // The routes shown here are the default URLs that will be used.
  // @link https://next-auth.js.org/configuration/pages
  pages: {
    signIn: '/login',
    //signOut: '/api/auth/signout',
    //error: '/api/auth/error', // Error code passed in query string as ?error=
    //verifyRequest: '/api/auth/verify-request', // (used for check email message)
    //newUser: null // If set, new users will be directed here on first sign in
  },

  // Additional options
  // secret: 'abcdef123456789' // Recommended (but auto-generated if not specified)
  debug: true, // Use this option to enable debug messages in the console
}

const Auth = (req, res) => NextAuth(req, res, options)

export default Auth
