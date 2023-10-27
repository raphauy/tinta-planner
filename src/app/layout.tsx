import { TailwindIndicator } from "@/components/tailwind-indicator";
import { AuthContext } from "./(client-side)/context/AuthContext";
import ToasterContext from "./(client-side)/context/ToasterContext";
import "./globals.css";

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
    <html lang="es">
      <body>
        <AuthContext>
          <ToasterContext />
          <div className="flex flex-col w-full min-h-screen bg-tinta-natural">
            {children}
          </div>
          <TailwindIndicator />
        </AuthContext>
      </body>
    </html>
  );
}
