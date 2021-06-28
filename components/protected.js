import { useState, useEffect } from "react";
import { useSession } from "next-auth/client";
import AccessDenied from "./access-denied";

export default function Protected ({ children }) {
  const [ session, loading ] = useSession();

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== "undefined" && loading) return null

  // If no session exists, display access denied message
  if (!session) return <AccessDenied/>;

  // If session exists, display content
  return children;
}
