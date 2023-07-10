import Link from "next/link";
import Nav from "./Nav/page";
import "./globals.css";
import Providers from "./utils/providers";
import { Rubik } from "next/font/google";

export const metadata = {
  title: "Danmaczku",
  description: "Imagine grać w touhou nieironicznie",
};
const rubik = Rubik({ subsets: ["latin"] });
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`bg-background mx-1 2xl:mx-44 ${rubik.className}`}>
        <Providers>
          <Nav />
          {children}
          <div className="fixed bottom-24 right-5 p-3  opacity-10 bg-slate-300">
            <Link href={"https://github.com/Horikaze/danmaczku"} target="_blank">GIT</Link>
          </div>
          <div className="fixed text-3xl bottom-5 right-5 p-3  opacity-10 bg-slate-300">
            <p>v0.1</p>
          </div>
        </Providers>
      </body>
    </html>
  );
}
