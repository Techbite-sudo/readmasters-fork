import { LoginForm } from "@/components/forms/LoginForm";

export default function LoginPage() {
    return (
        <div className="container mx-auto max-w-md py-12">
            <h1 className="text-2xl font-bold mb-6">Log In</h1>
            <LoginForm />
        </div>
    );
}