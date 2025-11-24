"use client";
import { authClient } from "@/lib/auth-client";
import { registerSchema, RegisterSchema } from "@/schemas/register-schema";
import { useState } from "react";
import { toast } from "sonner";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.error("All fields are required");
      return;
    }

    try {
      const { data, error } = await authClient.signUp.email(
        {
          name,
          email,
          password,
          callbackURL: "/dashboard",
        },
        {
          onRequest: () => {
            // Optional: loading state handled above
          },
          onSuccess: () => {
            toast.success("Account created successfully!");
          },
          onError: (ctx) => {
            toast.error(ctx.error.message);
          },
        }
      );
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };
  return (
    <>
      <div>
        <form onSubmit={handleRegister} className="">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border"
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border"
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border"
          />
          <button type="submit">Register</button>
        </form>
      </div>
    </>
  );
};

export default Register;
