import Image from "next/image";
import Navbar from "./components/Nav";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col flex-1 justify-center bg-zinc-50 font-sans dark:bg-black">
        <main className="p-10">
          <h1 className="font-heading text-7xl text-accent">Wisdom</h1>
          <p className="font-label mt-4 px-5 text-sm uppercase tracking-widest">
            Full-stack developer and data analyst
          </p>
        </main>
      </div>
    </>
  );
}
