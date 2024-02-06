"use client";

// import { signOut } from "next-auth/react"; // we can also use this method

import { logout } from "@/actions/logout";

interface Props {
  children?: React.ReactNode;
}

export const LogoutButton = ({ children }: Props) => {
  const onClick = async () => {
    logout();
    // await signOut();
    // await signOut({});
  };

  return (
    <span onClick={onClick} className="cursor-pointer">
      {children}
    </span>
  );
};
