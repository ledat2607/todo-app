import Image from "next/image";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main
      className="min-h-screen flex flex-col justify-center
      bg-[radial-gradient(circle_at_center,_#9ebaf3,_#112d61)]"
    >
      <div className="max-w-6xl mx-auto">
        <nav className="flex justify-center items-center">
          <Image src={"/logo.svg"} height={50} width={50} alt="logo" />
          <span className="font-bold text-2xl flex gap-2 ml-2 text-white">
            Task <p className="text-blue-800">Manager</p>
          </span>
        </nav>
        <div className="flex flex-col items-center justify-center pt-4 md:pt-8">
          {children}
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;
