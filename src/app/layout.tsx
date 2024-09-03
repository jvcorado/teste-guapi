import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import Header from "./components/header/header";

import "./globals.css";

const poppins = Poppins({
  weight: ["400", "600"], // você pode especificar os pesos que deseja usar
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={poppins.className}>
        {/*     <Theme> */}

        <Header />
        <div className="flex w-full ">
          <div className="h-screen bg-red-200 w-[350px] hidden md:block"></div>
          <div className="p-5 lg:py-10 lg:container lg:gap-7 lg:bg-blue-gray-500 lg:mx-auto lg:min-h-[100%] w-full">
            {children}
          </div>
        </div>

        {/*    </Theme> */}
      </body>
    </html>
  );
}
