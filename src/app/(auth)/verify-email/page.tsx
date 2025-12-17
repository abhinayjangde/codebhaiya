"use client";

import { Suspense, useEffect, useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle, XCircle, Mail, ArrowRight, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const VerifyEmailContent = () => {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const error = searchParams.get("error");

    if (error) {
      setStatus("error");
      if (error === "invalid_token") {
        setErrorMessage("The verification link is invalid or has expired.");
      } else {
        setErrorMessage("An error occurred while verifying your email.");
      }
    } else {
      // If no error, the verification was successful
      setStatus("success");
    }
  }, [searchParams]);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-muted/50 px-4 py-12">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -left-40 w-80 h-80 bg-chart-1/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-2 h-2 ${status === "success" ? "bg-green-500/20" : "bg-red-500/20"} rounded-full`}
          style={{
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, -40, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 4 + i * 0.3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.2,
          }}
        />
      ))}

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md"
      >
        {status === "loading" ? (
          <Card className="backdrop-blur-xl bg-card/80 border-border/50 shadow-2xl">
            <CardContent className="flex flex-col items-center justify-center py-16">
              <Loader2 className="w-12 h-12 text-primary animate-spin" />
              <p className="mt-4 text-muted-foreground">
                Verifying your email...
              </p>
            </CardContent>
          </Card>
        ) : status === "success" ? (
          <>
            {/* Success Icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center mb-8"
            >
              <motion.div
                className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/10 mb-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                  delay: 0.2,
                }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <CheckCircle className="w-10 h-10 text-green-500" />
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Success Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="backdrop-blur-xl bg-card/80 border-border/50 shadow-2xl border-green-500/20">
                <CardHeader className="space-y-1 pb-4 text-center">
                  <CardTitle className="text-2xl font-bold tracking-tight text-green-500">
                    Email Verified!
                  </CardTitle>
                  <CardDescription className="text-base">
                    Your account has been verified successfully
                  </CardDescription>
                </CardHeader>

                <CardContent className="text-center pb-6">
                  <p className="text-muted-foreground">
                    Thank you for verifying your email address. You can now log
                    in to your account and start exploring CodeBhaiya!
                  </p>
                </CardContent>

                <CardFooter className="flex flex-col gap-4">
                  <motion.div
                    className="w-full"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <Button
                      asChild
                      className="w-full h-11 text-base font-medium"
                    >
                      <Link
                        href="/login"
                        className="flex items-center justify-center gap-2"
                      >
                        Continue to Login
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </Button>
                  </motion.div>
                </CardFooter>
              </Card>
            </motion.div>
          </>
        ) : (
          <>
            {/* Error Icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center mb-8"
            >
              <motion.div
                className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-500/10 mb-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                  delay: 0.2,
                }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <XCircle className="w-10 h-10 text-red-500" />
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Error Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="backdrop-blur-xl bg-card/80 border-border/50 shadow-2xl border-red-500/20">
                <CardHeader className="space-y-1 pb-4 text-center">
                  <CardTitle className="text-2xl font-bold tracking-tight text-red-500">
                    Verification Failed
                  </CardTitle>
                  <CardDescription className="text-base">
                    {errorMessage}
                  </CardDescription>
                </CardHeader>

                <CardContent className="text-center pb-6">
                  <p className="text-muted-foreground">
                    The verification link may have expired or already been used.
                    Please try registering again or request a new verification
                    email.
                  </p>
                </CardContent>

                <CardFooter className="flex flex-col gap-3">
                  <motion.div
                    className="w-full"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <Button
                      asChild
                      variant="outline"
                      className="w-full h-11 text-base font-medium"
                    >
                      <Link
                        href="/register"
                        className="flex items-center justify-center gap-2"
                      >
                        <Mail className="w-4 h-4" />
                        Try Again
                      </Link>
                    </Button>
                  </motion.div>
                  <motion.div
                    className="w-full"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <Button
                      asChild
                      variant="ghost"
                      className="w-full h-11 text-base font-medium"
                    >
                      <Link href="/login">Back to Login</Link>
                    </Button>
                  </motion.div>
                </CardFooter>
              </Card>
            </motion.div>
          </>
        )}

        {/* Footer text */}
        <motion.p
          className="text-center text-xs text-muted-foreground mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.6 }}
        >
          Need help?{" "}
          <Link
            href="/contact"
            className="underline hover:text-foreground transition-colors"
          >
            Contact Support
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
};

const VerifyEmail = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/50">
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
};

export default VerifyEmail;
