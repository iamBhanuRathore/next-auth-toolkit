"use client";
import UserInfo from "@/components/user-info";
import { useClientUser } from "@/hooks/use-client-user";
import React from "react";

const ClientPage = () => {
  const user = useClientUser();
  return (
    <div>
      <UserInfo label="💻 Client Component" user={user} />
    </div>
  );
};

export default ClientPage;
