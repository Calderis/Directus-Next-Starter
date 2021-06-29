<p align="center">
   <br/>
   <h3 align="center">Directus / Next.js / Tailwind starer</h3>
   <p align="center">
   Start a project right now
   </p>
</p>

## Overview

The goal is to start a fresh project based on the following stack : [Directus](https://directus.io) for the Headless CMS, Next.js and tailwind for the integration.

(You can test online here)[directus-next-starter-7ssl47pj5-calderis.vercel.app]

### What's inside ?

- Authentification ready
- User settings page form
- Fetch Directus Settings (require to unlock view permission into Public directus_settings)
- Contact form

**TODO**
- Forgot password
- Register
- Set back button on login forms
- Search Page
- Footer
- Policy page
- Privacy page
- Update profile picture
- Reload session on user settings change

## Getting Started

### 1. Clone the repository and install dependancies

```
git clone https://github.com/Calderis/Directus-Next-Starter.git
cd Directus-Next-Starter
yarn
```

### 2. Configure your local environment

Copy the .env.local.example file in this directory to .env.local (which will be ignored by Git):

```
cp .env.local.example .env.local
```

#### Start a Directus

You will require a Directus to mount your database. By default it does run on the port 8055.

* Quick start: [Getting started](https://directus.io/open-source/#install)

### 3. Start the application

To run your site locally, use:

```
yarn dev
```

To run it it production mode, use:

```
yarn build
yarn start
```

And run your directus in an other terminal

```
npx directus start
```

## License

ISC
