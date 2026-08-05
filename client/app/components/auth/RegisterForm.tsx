"use client";
import { Alert, Box, Button, Card, CardContent, TextField, Typography } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import authService from "@/app/services/auth.service";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from "react";
import * as yup from "yup";


const schema = yup.object({

    firstName: yup
        .string()
        .required("First name is required"),

    lastName: yup
        .string()
        .required("Last name is required"),
        workspaceName: yup
        .string()
        .required("Workspace name is required"),

    email: yup
        .string()
        .email("Invalid email")
        .required("Email is required"),

    password: yup
        .string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),

    confirmPassword: yup
        .string()
        .oneOf(
            [yup.ref("password")],
            "Passwords do not match"
        )
        .required("Confirm your password")

});

export default function RegisterForm() {

    const router = useRouter();

    const [error, setError] = useState("");

    const {

        register,

        handleSubmit,

        formState: {

            errors,

            isSubmitting

        }

    } = useForm({

        resolver: yupResolver(schema)

    });

    async function onSubmit(data: any) {

        try {
            setError("");
            const response = await authService.register({

                firstName: data.firstName,

                lastName: data.lastName,
                
                workspaceName: data.workspaceName,

                email: data.email,

                password: data.password

            });
            console.log(response)

            router.push("/auth/login");

        }

        catch (err: any) {

            console.log("Full Error:", err);

            console.log("Response:", err.response);

            console.log("Response Data:", err.response?.data);

            setError(

                err.response?.data?.message ||

                "Registration failed."

            );

        }

    }

    return (

        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
            }}
        >

            <Card sx={{ width: 500 }}>

                <CardContent>

                    <Typography
                        variant="h4"
                        sx={{
                            textAlign: 'center',
                            mb: 3,
                        }}
                    >

                        Register

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
                            label="First Name"
                            {...register("firstName")}
                            error={!!errors.firstName}
                            helperText={errors.firstName?.message}
                        />

                        <TextField
                            fullWidth
                            margin="normal"
                            label="Last Name"
                            {...register("lastName")}
                            error={!!errors.lastName}
                            helperText={errors.lastName?.message}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Workspace Name"
                            {...register("workspaceName")}
                            error={!!errors.workspaceName}
                            helperText={errors.workspaceName?.message}
                        />
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

                        <TextField
                            fullWidth
                            margin="normal"
                            type="password"
                            label="Confirm Password"
                            {...register("confirmPassword")}
                            error={!!errors.confirmPassword}
                            helperText={errors.confirmPassword?.message}
                        />

                        <Button
                            fullWidth
                            sx={{ mt: 3 }}
                            type="submit"
                            variant="contained"
                            disabled={isSubmitting}
                        >

                            Register

                        </Button>

                    </form>

                </CardContent>

            </Card>

        </Box>

    );

}