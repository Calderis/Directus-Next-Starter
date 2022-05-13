import axios from "axios";
import { ChevronRightIcon, StarIcon } from "@heroicons/react/solid";
import navigation from "menus/main";

import Header from "../components/layout/header";

const logos = [
  { name: 'Directus', url: 'https://user-images.githubusercontent.com/522079/89687381-23943700-d8ce-11ea-9a4d-ae3eae136423.png' },
  { name: 'Next.js', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Nextjs-logo.svg/800px-Nextjs-logo.svg.png' },
  { name: 'React', url: 'https://editor.revealit.dk/sites/default/files/2019-08/react-logo-inline.svg' },
  { name: 'Tailwindcss', url: 'https://cdn.worldvectorlogo.com/logos/tailwind-css-wordmark.svg' },
]
const footerNavigation = {
  main: navigation.map(({ text, href }) => ({ name: text, href })),
  social: [
    {
      name: 'GitHub',
      href: 'https://github.com/Calderis/Directus-Next-Starter',
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ],
}

export default function Page ({ app, title, releases, repo }) {
  console.log("app", app);
  console.log("releases", releases);
  console.log("repo", repo);

  let starEmoji = "🥲";
  if (repo.stargazers_count > 10) starEmoji = "🙃";
  if (repo.stargazers_count > 100) starEmoji = "😃";
  if (repo.stargazers_count > 1000) starEmoji = "🤩";

  return (
    <div className="bg-white">
      <Header {...app} title={title} />
      <main>
        {/* Hero section */}
        <div className="pt-8 overflow-hidden sm:pt-12 lg:relative lg:py-48">
          <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl lg:grid lg:grid-cols-2 lg:gap-24">
            <div>
              <div>
                <img class="h-40 w-40" src={app.logo} alt={app.name} />
              </div>
              <div className="mt-20">
                {releases && (
                  <div>
                    <a href={releases[0].html_url} className="inline-flex space-x-4">
                      <span className={`rounded bg-${app.themeColor}-50 px-2.5 py-1 text-xs font-semibold text-${app.themeColor}-500 tracking-wide uppercase`}>
                        What's new
                      </span>
                      <span className={`inline-flex items-center text-sm font-medium text-${app.themeColor}-500 space-x-1`}>
                      <span>Just shipped {releases[0].name}</span>
                        <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    </a>
                  </div>
                )}
                <div className="mt-6 sm:max-w-xl">
                  <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                    Directus-Next-Starter
                  </h1>
                  <p className="mt-6 text-xl text-gray-500">
                    Setup your ready-to-dev Directus-Tailwind-Next.js website with Auth ready et multiple examples pages !
                  </p>
                  <div className="mt-12 sm:max-w-lg sm:w-full sm:flex">
                    <div className="mt-4 sm:mt-0 sm:ml-3">
                      <a
                        href="https://github.com/Calderis/Directus-Next-Starter/generate"
                        className={`block w-full rounded-md border border-transparent px-5 py-3 bg-${app.themeColor}-500 text-base font-medium text-white shadow hover:bg-${app.themeColor}-600 focus:outline-none focus:ring-2 focus:ring-${app.themeColor}-500 focus:ring-offset-2 sm:px-10`}
                      >
                        Use this template
                      </a>
                    </div>
                    <div className="mt-4 sm:mt-0 sm:ml-3">
                      <a
                        href="https://github.com/Calderis/Directus-Next-Starter"
                        className={`block w-full rounded-md border border-transparent px-5 py-3 bg-gray-900 text-base font-medium text-white shadow hover:bg-${app.themeColor}-600 focus:outline-none focus:ring-2 focus:ring-${app.themeColor}-500 focus:ring-offset-2 sm:px-10`}
                      >
                        Star the repo ⭐️
                      </a>
                    </div>
                  </div>
                </div>
                {repo && (
                  <div className="mt-6">
                    <div className="inline-flex items-center">
                      <div className="flex-shrink-0 flex pr-2">
                        <StarIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
                      </div>
                      <div className="min-w-0 flex-1 py-1 text-sm text-gray-500 sm:py-3">
                        <span className="font-medium text-gray-900">Have {repo.stargazers_count} stars</span> on github {starEmoji}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="sm:mx-auto sm:max-w-3xl sm:px-6">
            <div className="py-12 sm:relative sm:mt-12 sm:py-16 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
              <div className="hidden sm:block">
                <div className="absolute inset-y-0 left-1/2 w-screen bg-gray-50 rounded-l-3xl lg:left-80 lg:right-0 lg:w-full" />
                <svg
                  className="absolute top-8 right-1/2 -mr-3 lg:m-0 lg:left-0"
                  width={404}
                  height={392}
                  fill="none"
                  viewBox="0 0 404 392"
                >
                  <defs>
                    <pattern
                      id="837c3e70-6c3a-44e6-8854-cc48c737b659"
                      x={0}
                      y={0}
                      width={20}
                      height={20}
                      patternUnits="userSpaceOnUse"
                    >
                      <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
                    </pattern>
                  </defs>
                  <rect width={404} height={392} fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)" />
                </svg>
              </div>
              <div className="relative pl-4 -mr-40 sm:mx-auto sm:max-w-3xl sm:px-0 lg:max-w-none lg:h-full lg:pl-12">
                <img
                  className="w-full rounded-md shadow-xl ring-1 ring-black ring-opacity-5 lg:h-full lg:w-auto lg:max-w-none"
                  src="https://camo.githubusercontent.com/afe5be3811032b7bd86b7ecf1f8d3506c8c6fed83f5e12cb9fb10a80a10ce901/68747470733a2f2f692e696d6775722e636f6d2f627635596150552e706e67"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial/stats section */}
        <div className="relative mt-20">
          <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:gap-24 lg:items-start">
            <div className="relative sm:py-16 lg:py-0">
              <div aria-hidden="true" className="hidden sm:block lg:absolute lg:inset-y-0 lg:right-0 lg:w-screen">
                <div className="absolute inset-y-0 right-1/2 w-full bg-gray-50 rounded-r-3xl lg:right-72" />
                <svg
                  className="absolute top-8 left-1/2 -ml-3 lg:-right-8 lg:left-auto lg:top-12"
                  width={404}
                  height={392}
                  fill="none"
                  viewBox="0 0 404 392"
                >
                  <defs>
                    <pattern
                      id="02f20b47-fd69-4224-a62a-4c9de5c763f7"
                      x={0}
                      y={0}
                      width={20}
                      height={20}
                      patternUnits="userSpaceOnUse"
                    >
                      <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
                    </pattern>
                  </defs>
                  <rect width={404} height={392} fill="url(#02f20b47-fd69-4224-a62a-4c9de5c763f7)" />
                </svg>
              </div>
              <div className="relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-0 lg:max-w-none lg:py-20">
                {/* Testimonial card*/}
                <div className="relative pt-64 pb-10 rounded-2xl shadow-xl overflow-hidden">
                  <img
                    className="absolute inset-0 h-full w-full object-cover"
                    src="https://i.imgur.com/DHSTCRb.png"
                    alt=""
                  />
                  <div className={`absolute inset-0 bg-${app.themeColor}-500 mix-blend-multiply`} />
                  <div className={`absolute inset-0 bg-gradient-to-t from-${app.themeColor}-600 via-${app.themeColor}-600 opacity-90`} />
                  <div className="relative px-8">
                    <blockquote className="mt-8">
                      <div className="relative text-lg font-medium text-white md:flex-grow">
                        <svg
                          className={`absolute top-0 left-0 transform -translate-x-3 -translate-y-2 h-8 w-8 text-${app.themeColor}-400`}
                          fill="currentColor"
                          viewBox="0 0 32 32"
                          aria-hidden="true"
                        >
                          <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                        </svg>
                        <p className="relative">
                          Your next idea won't last the development time of your next website. Directus is already ready, just get the Next.js side of it!
                        </p>
                      </div>

                      <footer className="mt-4">
                        <div className="flex items-center space-x-3">
                          <div className="flex-shrink-0">
                            <img
                              className="h-6 w-6 rounded-full"
                              src="https://avatars.githubusercontent.com/u/8955109?s=60&v=4"
                              alt=""
                            />
                          </div>
                          <div className={`text-base font-semibold text-${app.themeColor}-200`}>
                            Calderis
                          </div>
                        </div>
                      </footer>
                    </blockquote>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-0">
              {/* Content area */}
              <div className="pt-12 sm:pt-16 lg:pt-20">
                <h2 className="text-3xl text-gray-900 font-extrabold tracking-tight sm:text-4xl">
                  About The Project
                </h2>
                <div className="mt-6 text-gray-500 space-y-6">
                  <p className="text-lg">
                  I do love Directus. Here is a project to kickstart a website while using Directus as Backend service. It uses the auth api, the settings as well to get the Project name, the Project logo, the main site color, and so on. There is already a protected page example to help you fasten your development.
                  </p>
                  <p className="text-base leading-7">
                    You will find multiples examples such as login page, contact page, page with required authentification, page with data collection from directus and so on!
                  </p>
                  <p className="text-base leading-7">
                    If you think about a feature or two, please help yourself and submit a pull request 😃 ! Just keep it simple, I do not plan on making this repo a full war-ready factory.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Logo cloud section */}
        <div className="mt-32">
          <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
            <div className="lg:grid lg:grid-cols-2 lg:gap-24 lg:items-center">
              <div>
                <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
                  A stack with fresh techs
                </h2>
                <p className="mt-6 max-w-3xl text-lg leading-7 text-gray-500">
                  Known to work well alltogether, this quick start website has been using four major frameworks. Each of them has been selected for their communities, efficiency and documentation. Enjoy coding !
                </p>
                <div className="mt-6">
                  <a href="#" className={`text-base font-medium text-${app.themeColor}-500`}>
                    Meet our investors and advisors &rarr;
                  </a>
                </div>
              </div>
              <div className="mt-12 grid grid-cols-2 gap-0.5 md:grid-cols-3 lg:mt-0 lg:grid-cols-2">
                {logos.map((logo) => (
                  <div key={logo.name} className="col-span-1 flex justify-center py-8 px-8 bg-gray-50">
                    <img className="max-h-12" src={logo.url} alt={logo.name} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA section */}
        <div className="relative mt-24 sm:mt-32 sm:py-16">
          <div aria-hidden="true" className="hidden sm:block">
            <div className="absolute inset-y-0 left-0 w-1/2 bg-gray-50 rounded-r-3xl" />
            <svg className="absolute top-8 left-1/2 -ml-3" width={404} height={392} fill="none" viewBox="0 0 404 392">
              <defs>
                <pattern
                  id="8228f071-bcee-4ec8-905a-2a059a2cc4fb"
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits="userSpaceOnUse"
                >
                  <rect x={0} y={0} width={4} height={4} className="text-gray-200" fill="currentColor" />
                </pattern>
              </defs>
              <rect width={404} height={392} fill="url(#8228f071-bcee-4ec8-905a-2a059a2cc4fb)" />
            </svg>
          </div>
          <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
            <div className={`relative rounded-2xl px-6 py-10 bg-${app.themeColor}-500 overflow-hidden shadow-xl sm:px-12 sm:py-20`}>
              <div aria-hidden="true" className="absolute inset-0 -mt-72 sm:-mt-32 md:mt-0">
                <svg
                  className="absolute inset-0 h-full w-full"
                  preserveAspectRatio="xMidYMid slice"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 1463 360"
                >
                  <path
                    className={`text-${app.themeColor}-400 text-opacity-40`}
                    fill="currentColor"
                    d="M-82.673 72l1761.849 472.086-134.327 501.315-1761.85-472.086z"
                  />
                  <path
                    className={`text-${app.themeColor}-600 text-opacity-40`}
                    fill="currentColor"
                    d="M-217.088 544.086L1544.761 72l134.327 501.316-1761.849 472.086z"
                  />
                </svg>
              </div>
              <div className="relative">
                <div className="sm:text-center">
                  <h2 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
                    Use Directus as your administration back office
                  </h2>
                  <p className={`mt-6 mx-auto max-w-2xl text-lg text-${app.themeColor}-100`}>
                    Did I said that the name, the logo and the title can be managed directly from Directus ?
                  </p>
                </div>
                <div action="#" className="mt-12 sm:mx-auto sm:max-w-lg sm:flex">
                  <div className="mt-12 sm:max-w-lg sm:w-full sm:flex">
                    <div className="mt-4 sm:mt-0 sm:ml-3">
                      <a
                        href="https://github.com/Calderis/Directus-Next-Starter/generate"
                        className={`block w-full rounded-md border border-transparent px-5 py-3 bg-${app.themeColor}-500 text-base font-medium text-white shadow hover:bg-${app.themeColor}-600 focus:outline-none focus:ring-2 focus:ring-${app.themeColor}-500 focus:ring-offset-2 sm:px-10`}
                      >
                        Use this template
                      </a>
                    </div>
                    <div className="mt-4 sm:mt-0 sm:ml-3">
                      <a
                        href="https://github.com/Calderis/Directus-Next-Starter"
                        className={`block w-full rounded-md border border-transparent px-5 py-3 bg-gray-900 text-base font-medium text-white shadow hover:bg-${app.themeColor}-600 focus:outline-none focus:ring-2 focus:ring-${app.themeColor}-500 focus:ring-offset-2 sm:px-10`}
                      >
                        Star the repo ⭐️
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer section */}
      <footer className="mt-24 bg-gray-900 sm:mt-12">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <div className="xl:grid xl:grid-cols-3 xl:gap-8">
            <div className="grid grid-cols-3 gap-8 xl:col-span-2">
              {navigation.map(nav => (
                <div className="md:grid md:gap-8">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">{nav.text}</h3>
                    <ul role="list" className="mt-4 space-y-4">
                      {nav.subMenu && nav.subMenu.content.map(item => (
                        <li key={item.title}>
                          <a href={item.href} className="text-base text-gray-300 hover:text-white">
                            {item.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-8 border-t border-gray-700 pt-8 md:flex md:items-center md:justify-between">
            <div className="flex space-x-6 md:order-2">
              {footerNavigation.social.map((item) => (
                <a key={item.name} href={item.href} className="text-gray-400 hover:text-gray-300">
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </a>
              ))}
            </div>
            <p className="mt-8 text-base text-gray-400 md:mt-0 md:order-1">
              ISC licenced. Just clone it without worries.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};


// Export the `session` prop to use sessions with Server Side Rendering
export async function getServerSideProps(context) {
  const { data: releases } = await axios.get("https://api.github.com/repos/Calderis/Directus-Next-Starter/releases");
  const { data: repo } = await axios.get("https://api.github.com/repos/Calderis/Directus-Next-Starter");

  return {
    props: {
      releases,
      repo
    }
  }
}
