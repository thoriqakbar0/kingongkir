import { signIn, signOut, auth } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import Banner from "@/component/Banner";
import { OngkirSearchEngine } from "@/component/OngkirSearchEngine";

export default async function Navbar() {
  const session = await auth();

  if (!session?.user) {
    return (
      <div className="flex flex-col w-full h-full">
        <nav className="flex justify-between items-center p-4 bg-gray-100 w-full z-50">
          <Link href="/" className="text-xl font-bold">
            KingOngkir
          </Link>
          <form
            action={async () => {
              "use server";
              await signIn("google");
            }}
          >
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
            >
              Sign in with Google
            </button>
          </form>
        </nav>
        <Banner />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-full">
      <nav className="flex justify-between items-center px-4 py-2 bg-gray-100 w-full z-50">
        <Link href="/" className="text-xl font-bold">
          KingOngkir
        </Link>
        <div className="relative group">
          <button className="flex items-center space-x-2 py-2">
            {session.user.image && (
              <Image
                src={session.user.image}
                alt="Profile picture"
                width={40}
                height={40}
                className="rounded-full"
              />
            )}
            <span className="ml-2">{session.user.name}</span>
          </button>
          <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <button
                type="submit"
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Exit
              </button>
            </form>
          </div>
        </div>
      </nav>
      <Banner />
    </div>
  );
}
