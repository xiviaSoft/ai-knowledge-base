import LoginForm from "@/app/components/auth/LoginForm";
import PublicRoute from "@/app/components/common/PublicRoute";


export default function LoginPage() {

    return (

        <PublicRoute>

            <LoginForm />

        </PublicRoute>

    );

}