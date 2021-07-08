import Layout from "components/layout";
import Terms from "components/content/terms";

export default function Page ({ app }) {
  return (
    <Layout app={app}>
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className={`text-base text-${app.themeColor}-600 font-semibold tracking-wide uppercase`}>
            Policy
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Terms of Service
            </p>
            <Terms app={app} />
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
          <div className="lg:text-center">
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Privacy Policy
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              This site uses JSON Web Tokens and an in-memory database which resets every ~2 hours.
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Data provided to this site is exclusively used to support signing in
              and is not passed to any third party services, other than via SMTP or OAuth for the
              purposes of authentication.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )
}
