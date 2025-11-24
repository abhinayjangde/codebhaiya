import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div>
      <nav>
        <h1>CODEBHAIYA</h1>
        <ul>
          <Link href="/">Home</Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/register">Register</Link>
          <Link href="/login">Login</Link>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
