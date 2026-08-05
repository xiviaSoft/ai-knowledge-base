"use client";
import { Box, Button, Card, CardContent, TextField, Typography, Alert } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "@/app/contexts/AuthContext";
import authService from "@/app/services/auth.service";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from "react";
import * as yup from "yup";


const schema = yup.object({

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

    const [error, setError] = useState("");

    const {

        register,

        handleSubmit,

        formState: { errors, isSubmitting }

    } = useForm({

        resolver: yupResolver(schema)

    });

    const onSubmit = async (data: any) => {

        try {

            setError("");

            const response = await authService.login(data);
            login(

                response.accessToken,

                response.user

            );

            router.push("/dashboard");

        }

        catch (err: any) {

            setError(

                err.response?.data?.message ||

                "Login failed."

            );

        }

    };

    return (

        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
            }}
        >

            <Card sx={{ width: 450 }}>

                <CardContent>

                    <Typography
                        variant="h4"
                        sx={{
                            textAlign: 'center',
                            mb: 3,
                        }}
                    >

                        Login

                    </Typography>

                    {error && (

                        <Alert severity="error">

                            {error}

                        </Alert>

                    )}

                    <form onSubmit={handleSubmit(onSubmit)}>

                        <TextField
                            fullWidth
                            margin="normal"
                            label="Email"
                            {...register("email")}
                            error={!!errors.email}
                            helperText={errors.email?.message}
                        />

                        <TextField
                            fullWidth
                            margin="normal"
                            type="password"
                            label="Password"
                            {...register("password")}
                            error={!!errors.password}
                            helperText={errors.password?.message}
                        />

                        <Button
                            fullWidth
                            sx={{ mt: 3 }}
                            variant="contained"
                            type="submit"
                            disabled={isSubmitting}
                        >

                            Login

                        </Button>

                    </form>

                </CardContent>

            </Card>

        </Box>

    );

}