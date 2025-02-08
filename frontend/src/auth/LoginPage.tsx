import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useId } from "react";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import { useNavigate } from "react-router";

const LoginPage: React.FC = () => {
  const id = useId();
  const { login } = useUser();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await login(username, password); 
      navigate("/"); 
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="w-72 mx-auto border px-3 py-6 rounded-md">
        <h1 className="text-xl text-center font-semibold">Login</h1>
        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor={`${id}-username`}>Username</Label>
              <Input
                id={`${id}-username`}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="username"
                type="username"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor={`${id}-password`}>Password</Label>
              <Input
                id={`${id}-password`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                type="password"
                required
              />
            </div>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="flex justify-between gap-2">
            <p className="text-sm text-gray-400">
              Create new account?
              <a href="/register" className="text-[#7F56D9] underline px-1">
                Register
              </a>
            </p>
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
