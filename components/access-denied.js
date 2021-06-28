import { signIn } from 'next-auth/client'

export default function AccessDenied () {
  return (
    <>
      <h1>Access Denied</h1>
      <p>
        You must be signed in to view this page
      </p>
    </>
  )
}
