import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Borcelle - Auth",
    description: "Authentication page",
  };
  
export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="h-screen flex justify-center items-center">
            {children}
        </div>
    );
}