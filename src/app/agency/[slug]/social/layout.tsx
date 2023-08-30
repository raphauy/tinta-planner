import getCurrentUser from "@/app/(server-side)/services/getCurrentUser";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {

    const currentUser= await getCurrentUser()  

    if (!currentUser)
        return <div>No session</div>

    const agency= currentUser.agency

    if (!agency)
        return <div>El usuario no tiene permisos agencia</div>

    return (
        <>
            <main className="flex flex-grow">
                <div className="flex justify-center flex-grow">
                    {children}
                </div>
            </main>

        </>
    );
}
