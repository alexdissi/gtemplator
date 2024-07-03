import React, { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="w-full mt-4 md:mt-0 lg:grid lg:min-h-[600px] lg:grid-cols-2 h-screen">
      <div className="flex items-center justify-center flex-col gap-5">
        {children}
      </div>
      <div className="hidden bg-muted h-screen lg:block">
        <img
          src="https://img3.wallspic.com/crops/4/2/3/6/5/156324/156324-abstract_art-art-illustration-painting-liquid-2160x3840.jpg"
          alt="Image"
        />
      </div>
    </main>
  );
}
