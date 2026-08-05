"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/contexts/AuthContext";

export default function PublicRoute({
    children,
}: {
    children: React.ReactNode;
}) {

    const { token, loading } = useAuth();

    const router = useRouter();

    useEffect(() => {

        if (!loading && token) {

            router.replace("/dashboard");

        }

    }, [loading, token, router]);

    if (loading) {

        return null;

    }

    return children;

}