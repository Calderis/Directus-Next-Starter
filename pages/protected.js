import { useState, useEffect } from "react";
import { useSession } from "next-auth/client";
import Layout from "../components/layout";
import Protected from "../components/protected";
import AccessDenied from "../components/access-denied";

export default function Page () {
  const [ session, loading ] = useSession();

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== "undefined" && loading) return null;

  // If session exists, display content
  return (
    <Layout title="Protected Page">
      Coucou
      <Protected>
        Ceci n'est affiché uniquement parce que vous êtes connecté
      </Protected>
    </Layout>
  );
}
