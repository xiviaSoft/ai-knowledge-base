"use client";

import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    Typography
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "@/app/contexts/AuthContext";
import authService from "@/app/services/auth.service";
import { useRouter } from "next/navigation";
import {
    SubmitHandler,
    useForm
} from "react-hook-form";
import { useState } from "react";
import * as yup from "yup";

interface LoginFormData {
    email: string;
    password: string;
}

const schema: yup.ObjectSchema<LoginFormData> =
    yup.object({
        email: yup
            .string()
            .email("Invalid email")
            .required("Email is required"),
        password: yup
            .string()
            .required("Password is required")
    });

export default function LoginForm() {
    const router = useRouter();
    const { login } = useAuth();

    const [error, setError] =
        useState("");

    const {
        register,
        handleSubmit,
        formState: {
            errors,
            isSubmitting
        }
    } = useForm<LoginFormData>({
        resolver: yupResolver(schema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const onSubmit: SubmitHandler<LoginFormData> =
        async (data) => {
            try {
                setError("");

                const response =
                    await authService.login(data);
                login(
                    response.accessToken,
                    response.user
                );

                router.push("/dashboard");
            } catch (error: any) {
                console.error(
                    "Login failed:",
                    error
                );

                setError(
                    error?.response?.data?.message ||
                    error?.message ||
                    "Login failed."
                );
            }
        };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh"
            }}
        >
            <Card
                sx={{
                    width: "100%",
                    maxWidth: 450
                }}
            >
                <CardContent sx={{ p: 4 }}>
                    <Typography
                        variant="h4"
                        sx={{
                            textAlign: "center",
                            mb: 3,
                            fontWeight: 700
                        }}
                    >
                        Login
                    </Typography>

                    {error && (
                        <Alert
                            severity="error"
                            sx={{ mb: 2 }}
                        >
                            {error}
                        </Alert>
                    )}

                    <form
                        onSubmit={handleSubmit(
                            onSubmit
                        )}
                    >
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Email"
                            type="email"
                            autoComplete="email"
                            {...register("email")}
                            error={
                                !!errors.email
                            }
                            helperText={
                                errors.email
                                    ?.message
                            }
                            disabled={
                                isSubmitting
                            }
                        />

                        <TextField
                            fullWidth
                            margin="normal"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            {...register(
                                "password"
                            )}
                            error={
                                !!errors.password
                            }
                            helperText={
                                errors.password
                                    ?.message
                            }
                            disabled={
                                isSubmitting
                            }
                        />

                        <Button
                            fullWidth
                            sx={{ mt: 3 }}
                            variant="contained"
                            type="submit"
                            disabled={
                                isSubmitting
                            }
                        >
                            {isSubmitting
                                ? "Logging in..."
                                : "Login"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </Box>
    );
}