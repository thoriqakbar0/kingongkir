
import { signIn, auth } from "@/auth"
import Image from "next/image"
 
export default async function SignIn() {
  const session = await auth()
  
  if (session?.user) {
    console.log("Server-side JWT:", session.user)
    return (
      <div>
        <h1>Welcome, {session.user.name}!</h1>
        {session.user.image && (
          <Image src={session.user.image} alt="Profile picture" width={100} height={100} />
        )}
        <p>You are signed in.</p>
      </div>
    )
  }

  return (
    <form
      action={async () => {
        "use server"
        await signIn("google")
      }}
    >
      <button type="submit">Signin with Google</button>
    </form>
  )
}