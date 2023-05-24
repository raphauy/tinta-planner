
import NavBar from "../NavBar";
import Menu from "./Menu";

export default function AdminLayout({ children }: { children: React.ReactNode }) {

    return (
        <>
            <NavBar />

            <main className="flex flex-col flex-grow">
                <Menu />
                <div className="flex-grow">
                    {children}
                </div>
            </main>
        </>
    );
}
