"use client"
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Signin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);

    const onSubmit = async () => {
        setLoading(true);
        const response = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        setLoading(false);

        if (response?.error) {
            toast({ title: "Invalid credentials. Please try again.", variant: "destructive" });
        } else {
            toast({ title: "Login successful!" });
            window.location.href = "/client/dashboard";
        }
    };

    return (
        <div className="grid gap-3 p-5 justify-center pt-40">
            <h1 className="text-center text-2xl text-white">Login</h1>
            <Input
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-72 sm:w-96"
            />
            <Input
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button
                className="bg-purple-600 p-2 rounded-lg"
                onClick={onSubmit}
                disabled={loading}
            >
                {loading ? "Logging in..." : "Login"}
            </Button>
        </div>
    );
};

export default Signin;