import { useState } from "react";
import { CheckIcon, QuestionMarkCircleIcon, StarIcon, XIcon } from "@heroicons/react/solid";
import { RadioGroup } from "@headlessui/react";
import { ShieldCheckIcon } from "@heroicons/react/outline";

import { useSession, getSession } from "next-auth/client";
import { directus } from "/utils/directus";
import Layout from "components/layout";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Page ({ app, product }) {
  // As this page uses Server Side Rendering, the `session` will be already
  // populated on render without needing to go through a loading stage.
  // This is possible because of the shared context configured in `_app.js` that
  // is used by `useSession()`.
  const [ session, loading ] = useSession();
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0])

  return (
    <Layout title="Product page" app={app}>
      <div className="bg-white">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:gap-x-8">
          {/* Product details */}
          <div className="lg:max-w-lg lg:self-end">
            <div className="mt-4">
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">{product.name}</h1>
            </div>

            <section aria-labelledby="information-heading" className="mt-4">
              <h2 id="information-heading" className="sr-only">
                Product information
              </h2>

              <div className="flex items-center">
                <p className="text-lg text-gray-900 sm:text-xl">{product.price}$</p>
              </div>

              <div className="mt-4 space-y-6">
                <p className="text-base text-gray-500">{product.description}</p>
              </div>

              {product.quantity ? (
                <div className="mt-6 flex items-center">
                  <CheckIcon className="flex-shrink-0 w-5 h-5 text-green-500" aria-hidden="true" />
                  <p className="ml-2 text-sm text-gray-500">In stock and ready to ship</p>
                </div>
              ) : (
                <div className="mt-6 flex items-center">
                  <XIcon className="flex-shrink-0 w-5 h-5 text-red-500" aria-hidden="true" />
                  <p className="ml-2 text-sm text-gray-500">Out of stock</p>
                </div>
              )}
            </section>
          </div>

          {/* Product image */}
          <div className="mt-10 lg:mt-0 lg:col-start-2 lg:row-span-2 lg:self-center">
            <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
              <img
                src={`${app.apiUrl}/assets/${product.thumbnail}`}
                alt={product.name}
                className="w-full h-full object-center object-cover"
              />
            </div>
          </div>

          {/* Product form */}
          <div className="mt-10 lg:max-w-lg lg:col-start-1 lg:row-start-2 lg:self-start">
            <section aria-labelledby="options-heading">
              <h2 id="options-heading" className="sr-only">
                Product options
              </h2>

              <form>
                <div className="sm:flex sm:justify-between">
                  {/* Variant selector */}
                  <RadioGroup value={selectedVariant} onChange={setSelectedVariant}>
                    <RadioGroup.Label className="block text-sm font-medium text-gray-700">Variant</RadioGroup.Label>
                    <div className="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {product.variants.map((variant) => (
                        <RadioGroup.Option
                          as="div"
                          key={variant.color}
                          value={variant}
                          className={({ active }) =>
                            classNames(
                              active ? 'ring-2 ring-indigo-500' : '',
                              'relative block border border-gray-300 rounded-lg p-4 cursor-pointer focus:outline-none'
                            )
                          }
                        >
                          {({ active, checked }) => (
                            <>
                              <RadioGroup.Label as="p" className="text-base font-medium text-gray-900">
                                {variant.color}
                              </RadioGroup.Label>
                              <RadioGroup.Description as="p" className="mt-1 text-sm text-gray-500">
                                {variant.size}
                              </RadioGroup.Description>
                              <div
                                className={classNames(
                                  active ? 'border' : 'border-2',
                                  checked ? 'border-indigo-500' : 'border-transparent',
                                  'absolute -inset-px rounded-lg pointer-events-none'
                                )}
                                aria-hidden="true"
                              />
                            </>
                          )}
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                </div>
                <div className="mt-4">
                  <a href="#" className="group inline-flex text-sm text-gray-500 hover:text-gray-700">
                    <span>What variant should I buy?</span>
                    <QuestionMarkCircleIcon
                      className="flex-shrink-0 ml-2 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </a>
                </div>
              </form>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  )
}

// Export the `session` prop to use sessions with Server Side Rendering
export async function getServerSideProps(context) {
  const product = await directus.items("products").readOne(context.params.id);

  return {
    props: {
      product,
      session: await getSession(context)
    }
  }
}
