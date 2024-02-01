"use client";
import React, { useEffect, useCallback } from "react";
import { Loader2 } from "lucide-react";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { useSearchParams } from "next/navigation";

const NewVerificationForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const onSubmit = useCallback(() => {
    console.log(token);
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);
  return (
    <CardWrapper
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
      headerLabel="Confirming your verfication">
      <div className="flex justify-center w-full">
        <Loader2 className="h-12 w-12 animate-spin" />
      </div>
    </CardWrapper>
  );
};

export default NewVerificationForm;
