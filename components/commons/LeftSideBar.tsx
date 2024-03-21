"use client"

import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { navLinks } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";

const LeftSideBar = () => {
  const pathname = usePathname();

  return (
    <div className="h-screen left-0 top-0 sticky p-10 flex flex-col gap-16 bg-blue-2 shadow-xl max-lg:hidden">
      <Image src="/logo.png" alt="logo" width={150} height={70} />

      <div className="flex flex-col gap-12">
        {navLinks.map((link) => (
          <Link
            href={link.url}
            key={link.label}
            className={`flex gap-4 text-body-medium ${pathname === link.url ? "text-blue-1" : "text-grey-1"
              }`}
          >
            {link.icon} <p>{link.label}</p>
          </Link>
        ))}
      </div>

      <div className="flex gap-4 text-body-medium items-center">
        <SignedIn>
          <UserButton />
          <p>Profile</p>
        </SignedIn>
        <SignedOut>
          <Link href="/sign-in" className={cn(buttonVariants(),"w-full")}>
            Sign In
          </Link>
        </SignedOut>
      </div>
    </div>
  );
};

export default LeftSideBar;
