import UserInfo from "@/components/user-info";
import { useServerUser } from "@/hooks/use-server-user";
import React from "react";

const ServerPage = async () => {
  const user = await useServerUser();
  return (
    <div>
      <UserInfo label="💻 Server Component" user={user} />
    </div>
  );
};

export default ServerPage;
