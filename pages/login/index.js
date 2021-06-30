import { providers, csrfToken } from "next-auth/client";
import Layout from "components/layout";
import ConnexionForm from "components/form/connexion";

function Login ({ app, providers, csrfToken }) {
  return (
    <div className={`md:grid md:grid-cols-2 md:gap-6 bg-${app.themeColor || "blue"}-500`}>
      <div className="md:col-span-1">
        <ConnexionForm app={app} providers={providers} csrfToken={csrfToken} />
      </div>
      <div className={`md:col-span-1`} />
    </div>
  )
}


Login.getInitialProps = async (context) => {
  return {
    providers: await providers(context),
    csrfToken: await csrfToken(context)
  }
}

export default Login;
