"use client";
import React, { useTransition } from "react";
import { useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { settings } from "@/actions/settings";
// import { logout } from "@/actions/logout";
// import { useClientUser } from "@/hooks/use-client-user";

const SettingsPage = () => {
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();
  const onClick = async () => {
    // it is useful when we want to some server stuff before logout like removing the session and also some analytics for the data
    // await logout();
    startTransition(() => {
      settings({
        name: "boy",
      }).then((res) => {
        if (res.success) {
          update();
        }
      });
    });
  };
  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center"> ⚙️ Settings </p>
      </CardHeader>
      <CardContent>
        <Button disabled={isPending} onClick={onClick}>
          Update Name
        </Button>
      </CardContent>
    </Card>
  );
};

export default SettingsPage;
