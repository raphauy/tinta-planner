
import Link from "next/link";
import getCurrentUser from "./(server-side)/services/getCurrentUser";
import NavBar from "./NavBar";
import AuthForm from "./login/EmailForm";

export default async function HomePage() {

  const user = await getCurrentUser()
  const role= user?.role
  console.log("role: " + role);
  
  return (
    <>
      <nav>
        {user ? (
          <>
          <NavBar />
          <section className="flex flex-col items-center justify-center">
            <div className="flex flex-col items-center mt-10 text-3xl">
              <p>{user.email}</p>
              <p>({user.role} role)</p>
            </div>
            {role === "agency" && (
              <div className="flex justify-center p-4 mt-10 bg-gray-200 border border-gray-300 w-fit rounded-xl">
                <Link href={"/admin/tinta"} className="px-5 py-1 mx-2 text-center text-white w-36 bg-tinta-vino rounded-xl">
                  Admin page
                </Link>
              </div>
            )}
          </section>
          </>      
          
        ) : (
          <div className="flex items-center justify-center min-h-screen pb-20">
            <AuthForm />
          </div>
        )}
      </nav>
    </>
      );
}
