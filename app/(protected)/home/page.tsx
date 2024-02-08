"use client";
import { logout } from "@/actions/logout";
import { Button } from "@/components/ui/button";
import { useClientUser } from "@/hooks/use-client-user";
// import { signOut } from 'next-auth/react';
import React from "react";

const HomePage = () => {
  const user = useClientUser();
  const onClick = async () => {
    // it is useful when we want to some server stuff before logout like removing the session and also some analytics for the data
    await logout();
  };
  return (
    <div>
      <Button onClick={onClick}>Sign Out</Button>
    </div>
  );
};

export default HomePage;
