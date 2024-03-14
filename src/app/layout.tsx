import dotenv from "dotenv";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/next"
import { TailwindIndicator } from "@/components/shadcn/tailwind-indicator";
import { GeistSans } from "geist/font";
import { AuthContext } from "./(client-side)/context/AuthContext";
import ToasterContext from "./(client-side)/context/ToasterContext";
import "./globals.css";

export const metadata = {
  title: "Tinta Planner",
  description: "The content planner of tinta.wine",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const nodeEnv = process.env.NODE_ENV

  return (
    <html lang="es" className={`${GeistSans.className}`}>
      <body className="w-full">
        <AuthContext>

            <ToasterContext />
            <div className="flex flex-col min-w-full min-h-screen w-fit">
              {children}
              {nodeEnv === "production" && 
                <>
                  <Analytics />
                  <SpeedInsights />
                </>
              }
            </div>          
            <TailwindIndicator />
            
        </AuthContext>
      </body>
    </html>
  );
}
