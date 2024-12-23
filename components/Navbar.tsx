"use client";
import { useState, useEffect } from "react";
import { redirect, usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useClerk } from "@clerk/nextjs";
import Link from "next/link";
import { Cleanup } from "@/app/server/Server_Actions";
const Navbar = () => {
  const Pathname = usePathname();
  const router = useRouter();
  const [page, setPage] = useState(Pathname);
  useEffect(() => {
    setPage(Pathname);
  }, [router, Pathname]);
  const { signOut } = useClerk();

  return (
    <div className="flex justify-center mt-3">
      <ul className="menu menu-horizontal bg-base-200 rounded-full p-3">
        <li>
          <div>
            <Link href={"/"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </Link>
          </div>
        </li>
        <li>
          <Link href={"/Premium"}>
            <Image
              src="/Premium.gif"
              alt="Premium"
              width={35}
              height={35}
              className="rounded-full"
            />
          </Link>
        </li>

        {page === "/dashboard" || page === "/Premium" ? (
          <>
            <li
              onClick={async () => {
                await Cleanup();
                await signOut({ redirectUrl: "/" });
                setPage("/");
              }}
            >
              <Image
                src="/Logout.png"
                alt="LoginIcon"
                width={500}
                height={500}
                className="h-12 w-16"
              />
            </li>
          </>
        ) : (
          <li>
            <Image
              src="/Login.png"
              alt="LoginIcon"
              width={500}
              height={500}
              className="h-12 w-16"
              onClick={() => {
                redirect("/sign-in");
              }}
            />
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
