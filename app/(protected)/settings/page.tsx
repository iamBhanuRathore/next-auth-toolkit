import { auth } from "@/auth";
import React from "react";
import { signOut } from "@/auth";
// import { LogoutButton } from "@/componentss/auth/logout-button";
const SettingsPage = async () => {
  const session = await auth();
  return (
    <div>
      <p>SettingsPage {JSON.stringify(session)}</p>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}>
        <button type="submit">Sign Out</button>
      </form>
      {/* <LogoutButton>Logout</LogoutButton> */}
    </div>
  );
};

export default SettingsPage;
