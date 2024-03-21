import { Metadata } from "next";
import Navbar from "@/components/commons/Navbar"
import LeftSideBar from "@/components/commons/LeftSideBar";
import { ToasterProvider } from "@/lib/ToastProvider";


export const metadata: Metadata = {
    title: "Borcelle - Admin Dashboard",
    description: "Admin dashboard to manage Borcelle's data",
  };
  
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (

        <main className="">
            <ToasterProvider />
            <div className="flex max-lg:flex-col text-grey-1">
                <LeftSideBar />
                <Navbar />
                <div className="flex-1">{children}</div>
            </div>
        </main>

    );
}
