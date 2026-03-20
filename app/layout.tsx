import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Resume Builder",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`bg-blue-50`}>
        <div className="flex xl:hidden w-screen h-screen justify-center items-center text-3xl">
          Please use a bigger screen
        </div>

        <div className="hidden xl:block">{children}</div>
      </body>
    </html>
  );
}
