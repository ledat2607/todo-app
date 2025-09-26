import { UserButton } from "@/features/auth/components/user-button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const StandAloneLayout = ({children}:{children:React.ReactNode}) => {
    return (
      <main className="bg-neutral-100 min-h-screen">
        <div className="mx-auto max-w-screen-2xl p-8">
          <nav className="flex justify-between items-center h-[73px]">
            <Link href={"/"} className="flex gap-4 items-center">
              <Image src={"/logo.svg"} alt="Logo" height={46} width={102} />
              <span className="font-bold text-2xl flex gap-2">
                Task <p className="text-blue-500">Manager</p>
              </span>
            </Link>
            <UserButton />
          </nav>
          <div className="flex flex-col items-center justify-center py-4">
            {children}
          </div>
        </div>
      </main>
    );
}
 
export default StandAloneLayout;