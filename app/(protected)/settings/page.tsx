import { auth } from "@/auth";
import React from "react";
import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";
// import { LogoutButton } from "@/componentss/auth/logout-button";
const SettingsPage = async () => {
  const session = await auth();
  return (
    <div>
      <p>{JSON.stringify(session)}</p>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}>
        <Button type="submit">Sign Out</Button>
      </form>
      {/* <LogoutButton>Logout</LogoutButton> */}
    </div>
  );
};

export default SettingsPage;
