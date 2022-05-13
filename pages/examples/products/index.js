import { useSession, getSession } from "next-auth/client";
import { directus } from "/utils/directus";
import Link from "next/link";

import Layout from "components/layout";

export default function Page ({ app, products }) {
  // As this page uses Server Side Rendering, the `session` will be already
  // populated on render without needing to go through a loading stage.
  // This is possible because of the shared context configured in `_app.js` that
  // is used by `useSession()`.
  const [ session, loading ] = useSession();

  return (
    <Layout title="Products page" app={app}>
      <div className="bg-white">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">Customers also purchased</h2>

          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <Link href={`/examples/products/${product.id}`}>
                <a key={product.id} className="group relative">
                  <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                    <img
                      src={`${app.apiUrl}/assets/${product.thumbnail}`}
                      alt={product.name}
                      className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">{product.type}</p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">{product.price}$</p>
                  </div>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

// Export the `session` prop to use sessions with Server Side Rendering
export async function getServerSideProps(context) {
  const products = await directus.items("products").readByQuery({ limit: 10 });

  return {
    props: {
      products: products.data,
      session: await getSession(context)
    }
  }
}
