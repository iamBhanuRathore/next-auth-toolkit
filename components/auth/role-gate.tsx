"use client";
import { useClientUser } from "@/hooks/use-client-user";
import { UserRole } from "@prisma/client";
import React from "react";
import { FormError } from "../form-error";

type Props = {
  children: React.ReactNode;
  allowedRole: UserRole;
};

const RoleGate = ({ allowedRole, children }: Props) => {
  const userRole = useClientUser()?.role;
  if (userRole !== allowedRole) {
    return (
      <FormError message="You do not have permission to view this Content !" />
    );
  }
  return <>{children}</>;
};

export default RoleGate;
