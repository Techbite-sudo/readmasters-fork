import { RegisterForm } from "@/components/forms/RegisterForm";

export default function RegisterPage() {
    return (
        <div className="container mx-auto max-w-md py-12">
            <h1 className="text-2xl font-bold mb-6">Create an Account</h1>
            <RegisterForm />
        </div>
    );
}