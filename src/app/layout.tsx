import NavBar from "./NavBar";
import { AuthContext } from "./(client-side)/context/AuthContext";
import ToasterContext from "./(client-side)/context/ToasterContext";
import "./globals.css";

export const metadata = {
  title: "Social Planner",
  description: "The content planner of tinta.wine",
  
  openGraph: {
    title: 'Social Planner',
    description: 'The content planner of tinta.wine',
    url: 'https://tinta.wine',
    siteName: 'Tinta Social Planner',
    images: [
      {
        url: 'https://social-planner.tinta.wine/images/opengraph-image.png',
        width: 800,
        height: 600,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

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
