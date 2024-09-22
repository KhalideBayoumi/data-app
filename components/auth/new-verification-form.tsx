"use client";

import { useCallback, useEffect, useState, useRef } from "react";
import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";

import { newVerification } from "@/actions/new-verification";
import { CardWrapper } from "@/components/auth//card-wrapper";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

export const NewVerificationForm = () => {
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();
    const [isPending, setIsPending] = useState(true);
    const verificationAttempted = useRef(false);

    const searchParams = useSearchParams();
    const tokenRef = useRef(searchParams.get("token"));

    const onSubmit = useCallback(() => {
        // on localhost it will be called twice, user has verified his email
        // but the token no longer exists in the database.
        // to avoid this, have state changes and display errors, we run the method only once
        
        if (verificationAttempted.current || !tokenRef.current) {
            setIsPending(false);
            return;
        }

        verificationAttempted.current = true;

        newVerification(tokenRef.current)
            .then((data) => {
                setTimeout(() => {
                    if (data.success) {
                        setSuccess(data.success);
                    } else {
                        setError(data.error);
                    }
                    setIsPending(false);
                }, 1000);
            })
            .catch(() => {
                setTimeout(() => {
                    setError("Something went wrong");
                    setIsPending(false);
                }, 1000);
            });
    }, []);

    useEffect(() => {
        onSubmit();
    }, [onSubmit]);

    return (
        <CardWrapper
            headerLabel="Confirming your account"
            backButtonHref="/auth/login"
            backButtonLabel="Return to login page"
        >
            <div className="flex items-center w-full justify-center">
                {isPending ? (
                    <BeatLoader />
                ) : (
                    <>
                        {success && <FormSuccess message={success} />}
                        {error && <FormError message={error} />}
                    </>
                )}
            </div>
        </CardWrapper>
    )
}