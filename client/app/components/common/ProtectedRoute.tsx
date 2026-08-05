"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { CircularProgress, Box } from "@mui/material";
import { useAuth } from "@/app/contexts/AuthContext";

export default function ProtectedRoute({
    children,
}: {
    children: React.ReactNode;
}) {

    const router = useRouter();

    const { token, loading } = useAuth();

    useEffect(() => {

        if (!loading && !token) {

            router.replace("/auth/login");

        }

    }, [loading, token, router]);

    if (loading) {

        return (

            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                }}
            >

                <CircularProgress />

            </Box>

        );

    }

    if (!token) {

        return null;

    }

    return children;

}