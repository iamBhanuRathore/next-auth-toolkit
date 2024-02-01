"use client";
import React, { useEffect, useCallback, useState } from "react";
import { Loader2 } from "lucide-react";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { useSearchParams } from "next/navigation";
import { newVerification } from "@/actions/new-verification";
import { FormSuccess } from "../form-success";
import { FormError } from "../form-error";
import { ROUTE_LOGIN_PAGE } from "@/routes";

const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const onSubmit = useCallback(() => {
    if (success || error) return;
    if (!token) {
      setError("Missing Token");
      return;
    };
    newVerification(token).then(data => {
      setSuccess(data.success);
      setError(data.error);
    }).catch(() => {
      setError("Something Went Wrong !");
    });
  }, [token, success, error]);
  console.log("Hello from verification form");
  useEffect(() => {
    onSubmit();
  }, [onSubmit]);
  return (
    <CardWrapper
      backButtonHref={ROUTE_LOGIN_PAGE}
      backButtonLabel="Back to login"
      headerLabel="Confirming your verfication">
      <div className="flex justify-center w-full">
        {
          !success && !error && (
            <Loader2 className="h-12 w-12 animate-spin" />
          )
        }
        <FormSuccess message={success} />
        <FormError message={error} />
      </div>
    </CardWrapper>
  );
};

export default NewVerificationForm;
