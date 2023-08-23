import NavBar from "./NavBar";
import { AuthContext } from "./(client-side)/context/AuthContext";
import ToasterContext from "./(client-side)/context/ToasterContext";
import "./globals.css";
import Selector from "./admin/selector";

export const metadata = {
  title: "Tinta Planner",
  description: "The content planner of tinta.wine",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <AuthContext>
          <ToasterContext />
          <div className="flex flex-col min-h-screen bg-tinta-natural">
            {children}
          </div>
        </AuthContext>
      </body>
    </html>
  );
}
