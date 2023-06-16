
import MenuCliente from "./MenuCliente";

export default function AdminLayout({ children }: { children: React.ReactNode }) {

    return (
        <>
            <main className="flex flex-col flex-grow">
                <MenuCliente />
                <div className="flex-grow">
                    {children}
                </div>
            </main>
        </>
    );
}
