import Layout from '../components/layout'

export default function Page ({ app }) {
  return (
    <Layout title={`Project ${app.name}`} app={app}>
      <p>
        This is an example site to demonstrate how to use <a href={`https://next-auth.js.org`}>NextAuth.js</a> for authentication.
      </p>
    </Layout>
  )
}
