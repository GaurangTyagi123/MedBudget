import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import UserProvider from "./_providers/UserProvider";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});



export const metadata: Metadata = {
  title: "Med Budget",
  description: "A simple medical budget app to help you manage your medical expenses and keep track of your health.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.className} h-full antialiased bg-mb-secondary-100`}
    >
      <body>
        <UserProvider>
            <Toaster containerStyle={{
              padding: "5px"
            }} toastOptions={{
              success: {
                duration: 3000
              },
              error: {
                duration: 5000
              }
            }} />
            <Header />
            {children}
        </UserProvider>
      </body>
    </html>
  );
}
