import Layout from "components/layout";
import ContactForm from "components/form/contact";

export default function Contact ({ app }) {
  return (
    <Layout app={app}>
      <div className="md:grid md:grid-cols-6 md:gap-6">
        <div className="md:col-span-1" />
        <div className="mt-5 md:mt-0 md:col-span-4">
          <ContactForm app={app} />
        </div>
      </div>
    </Layout>
  )
}
