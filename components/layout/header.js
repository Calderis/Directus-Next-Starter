import Link from "next/link";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/client";

import { Fragment } from "react"
import { Disclosure, Menu, Transition, Popover } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { MenuIcon, XIcon } from "@heroicons/react/outline";

import navigation from "menus/main";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// The approach used in this component shows how to built a sign in and sign out
// component that works on pages which support both client and server side
// rendering, and avoids any flash incorrect content on initial page load.
export default function Header ({ logo, themeColor, title }) {
  const [ session, loading ] = useSession();
  const router = useRouter();

  return (
    <Popover className="relative bg-white">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className={`flex justify-between items-center ${title && "border-b-2 border-gray-100"} py-6 md:justify-start md:space-x-10`}>
              <div className="flex justify-start lg:w-0 lg:flex-1">
                <Link href="/">
                  <a>
                    <span className="sr-only">{title}</span>
                    <img
                      className="h-8 w-auto sm:h-10"
                      src={logo}
                      alt=""
                    />
                  </a>
                </Link>
              </div>
              <div className="-mr-2 -my-2 md:hidden">
                <Popover.Button className={`bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-${themeColor}-500`}>
                  <span className="sr-only">Open menu</span>
                  <MenuIcon className="h-6 w-6" aria-hidden="true" />
                </Popover.Button>
              </div>
              <div className="hidden md:flex space-x-10">
                {navigation.map(item =>
                  item.subMenu ? (
                    <Popover.Group as="nav" key={item.text}>
                      <Popover className="relative">
                        {({ open }) => (
                          <>
                            <Popover.Button
                              className={classNames(
                                open ? 'text-gray-900' : 'text-gray-500',
                                `group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${themeColor}-500`
                              )}
                            >
                              <span className="ml-2">{item.text}</span>
                              <ChevronDownIcon
                                className={classNames(
                                  open ? 'text-gray-600' : 'text-gray-400',
                                  'ml-2 h-5 w-5 group-hover:text-gray-500'
                                )}
                                aria-hidden="true"
                              />
                            </Popover.Button>

                            <Transition
                              show={open}
                              as={Fragment}
                              enter="transition ease-out duration-200"
                              enterFrom="opacity-0 translate-y-1"
                              enterTo="opacity-100 translate-y-0"
                              leave="transition ease-in duration-150"
                              leaveFrom="opacity-100 translate-y-0"
                              leaveTo="opacity-0 translate-y-1"
                            >
                              <Popover.Panel
                                static
                                className="absolute z-10 -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2"
                              >
                                <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                                  <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                                    {item.subMenu.content.map((subItem) => (
                                      <Link href={subItem.href} key={subItem.title}>
                                        <a
                                          className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50"
                                        >
                                          <subItem.icon className={`flex-shrink-0 h-6 w-6 text-${themeColor}-600`} aria-hidden="true" />
                                          <div className="ml-4">
                                            <p className="text-base font-medium text-gray-900">{subItem.title}</p>
                                            <p className="mt-1 text-sm text-gray-500">{subItem.description}</p>
                                          </div>
                                        </a>
                                      </Link>
                                    ))}
                                  </div>
                                  {item.subMenu.footer && item.subMenu.footer.length > 0 && (
                                    <div className="px-5 py-5 bg-gray-50 space-y-6 sm:flex sm:space-y-0 sm:space-x-10 sm:px-8">
                                      {item.subMenu.footer.map((subItem) => (
                                        <div key={subItem.title} className="flow-root">
                                          <Link href={subItem.href}>
                                            <a className="-m-3 p-3 flex items-center rounded-md text-base font-medium text-gray-900 hover:bg-gray-100">
                                              <subItem.icon className="flex-shrink-0 h-6 w-6 text-gray-400" aria-hidden="true" />
                                              <span className="ml-3">{subItem.title}</span>
                                            </a>
                                          </Link>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </Popover.Panel>
                            </Transition>
                          </>
                        )}
                      </Popover>
                    </Popover.Group>
                  ) : (
                      <Link href={item.href} key={item.text}>
                        <a className="text-base font-medium text-gray-500 hover:text-gray-900">
                          {item.text}
                        </a>
                      </Link>
                    )
                )}
              </div>

              <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
                {session ? (
                  <Menu as="div" className="relative inline-block text-left">
                    {({ open }) => (
                      <>
                        <div>
                          <Menu.Button className={`inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-${themeColor}-500`}>
                            <div className="flex-shrink-0 h-5 w-5 mr-2">
                              <img className="h-5 w-5 rounded-full" src={session.user.image} alt="" />
                            </div>
                            {session.user.title || session.user.name}
                            <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                          </Menu.Button>
                        </div>

                        <Transition
                          show={open}
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items
                            static
                            className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none"
                          >
                            <div className="py-1">
                              <Menu.Item>
                                {({ active }) => (
                                  <Link href="/user/settings">
                                    <a
                                      className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'block px-4 py-2 text-sm'
                                      )}
                                      >
                                      Settings
                                    </a>
                                  </Link>
                                )}
                              </Menu.Item>
                            </div>
                            <div className="py-1">
                              <Menu.Item>
                                {({ active }) => (
                                  <Link href="/api/auth/signin">
                                    <a
                                      className={classNames(
                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                        'block px-4 py-2 text-sm'
                                      )}
                                      onClick={signOut}
                                    >
                                      Sign out
                                    </a>
                                  </Link>
                                )}
                              </Menu.Item>
                            </div>
                          </Menu.Items>
                        </Transition>
                      </>
                    )}
                  </Menu>
                ) : (
                  <Link href="/api/auth/signin">
                    <a
                      className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
                      onClick={(e) => {
                        e.preventDefault()
                        signIn()
                      }}
                    >
                      Sign in
                    </a>
                  </Link>
                )}
              </div>
            </div>
          </div>

          <Transition
            show={open}
            as={Fragment}
            enter="duration-200 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-100 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Popover.Panel
              focus
              static
              className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
            >
              <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
                <div className="pt-5 pb-6 px-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <img className="h-8 w-auto" src={logo} alt="Workflow" />
                    </div>
                    <div className="-mr-2">
                      <Popover.Button className={`bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-${themeColor}-500`}>
                        <span className="sr-only">Close menu</span>
                        <XIcon className="h-6 w-6" aria-hidden="true" />
                      </Popover.Button>
                    </div>
                  </div>
                </div>
                <div className="py-6 px-5 space-y-6">
                  <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                    {navigation.map(item =>
                      item.subMenu ? (
                        <div  key={item.text} />
                      ) : (
                        <Link href={item.href} key={item.text}>
                          <a className="text-base font-medium text-gray-900 hover:text-gray-700">
                            {item.text}
                          </a>
                        </Link>
                      )
                    )}
                  </div>
                  <div>
                    {session ? (
                      <p className="mt-6 text-center text-base font-medium text-gray-500">
                        Existing customer?{' '}

                        <Link href="/user/settings">
                          <a className={`text-${themeColor}-600 hover:text-${themeColor}-500 mx-2`}>
                            Settings
                          </a>
                        </Link>

                        <Link href="/api/auth/signin">
                          <a
                            className={`text-${themeColor}-600 hover:text-${themeColor}-500`}
                            onClick={(e) => {
                              e.preventDefault()
                              signOut()
                            }}
                          >
                            Sign out
                          </a>
                        </Link>
                      </p>
                    ) : (
                      <p className="mt-6 text-center text-base font-medium text-gray-500">
                        Existing customer?{' '}

                        <Link href="/api/auth/signin">
                          <a
                            className={`text-${themeColor}-600 hover:text-${themeColor}-500`}
                            onClick={(e) => {
                              e.preventDefault()
                              signIn()
                            }}
                          >
                            Sign in
                          </a>
                        </Link>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
}
