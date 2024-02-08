"use client";
import React from "react";
import axios from "axios";
import RoleGate from "@/components/auth/role-gate";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useClientUser } from "@/hooks/use-client-user";
import { UserRole } from "@prisma/client";
import { toast } from "sonner";
import { admin } from "@/actions/admin";

const AdminPage = () => {
  const user = useClientUser();

  const onApiRouteClick = async () => {
    try {
      await axios.get("/api/admin");
      toast.success("Allowed Api Route");
    } catch (error) {
      toast.error("Forbidden Api Route");
    }
  };
  const onServerActionClick = async () => {
    admin()
      .then((res) => {
        if (res?.success) {
          toast.success(res.success);
        }
        if (res?.error) {
          toast.error(res.error);
        }
      })
      .catch((err) => {
        toast.error("Some Error Occured");
      });
  };
  return (
    <Card className="w-[600px] shadow-md">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">🗝️ Admin</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <RoleGate allowedRole={UserRole.ADMIN}>
          <FormSuccess message="You are allowed to see this content!" />
        </RoleGate>
        <div className="flex flex-row items-center justify-between rounded-md border p-3 shadow-md">
          <p className="text-sm font-medium">Admin Only Api Route</p>
          <Button onClick={onApiRouteClick}>Click To Test</Button>
        </div>
        <div className="flex flex-row items-center justify-between rounded-md border p-3 shadow-md">
          <p className="text-sm font-medium">Admin Only Server Action</p>
          <Button onClick={onServerActionClick}>Click To Test</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminPage;
