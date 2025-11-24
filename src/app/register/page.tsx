"use client";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }
    try {
      const { data, error } = await authClient.signUp.email({
        name,
        email,
        password,
      });
      if (error) {
        console.error("Registration error:", error);
        alert("Registration failed: " + error);
      } else {
        console.log("Registration successful:", data);
        alert(
          "Registration successful! Please check your email to verify your account."
        );
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("An unexpected error occurred. Please try again later.");
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
