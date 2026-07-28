import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_BASE_URL: z.string().url().default("http://localhost:3000"),
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  DISCORD: z.string().optional(),
  YOUTUBE: z.string().optional(),
  GITHUB: z.string().optional(),
  LINKEDIN: z.string().optional(),
  X: z.string().optional(),
  INSTAGRAM: z.string().optional(),
  BETTER_AUTH_SECRET: z
    .string()
    .min(32, "BETTER_AUTH_SECRET must be at least 32 characters"),
  BETTER_AUTH_URL: z.string().url().default("http://localhost:3000"),
  CLOUDINARY_CLOUD_NAME: z.string().optional(),
  CLOUDINARY_API_KEY: z.string().optional(),
  CLOUDINARY_API_SECRET: z.string().optional(),
  SMTP_SERVICE: z.string().optional(),
  SMTP_HOST: z.string().default("smtp.gmail.com"),
  SMTP_PORT: z.coerce.number().min(1).max(65535).default(587),
  SMTP_USER: z.string().optional(),
  SMTP_PASS: z.string().optional(),
  SMTP_FROM: z.string().email().optional(),
  MAIL_SERVICE: z.string().optional(),
  MAIL_HOST: z.string().optional(),
  MAIL_PORT: z.coerce.number().optional(),
  MAIL_USER: z.string().optional(),
  MAIL_PASSWORD: z.string().optional(),
  MAIL_FROM: z.string().email().optional(),
  GEMINI_API_KEY: z.string().optional(),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error(
    "Invalid environment variables:",
    _env.error.flatten().fieldErrors
  );
  throw new Error(
    "Invalid environment variables. Check server console for details."
  );
}

const parsed = _env.data;

const config = {
  baseUrl: parsed.NEXT_PUBLIC_BASE_URL,
  databaseUrl: parsed.DATABASE_URL,
  discord: parsed.DISCORD || "",
  youtube: parsed.YOUTUBE || "",
  github: parsed.GITHUB || "",
  linkedin: parsed.LINKEDIN || "",
  x: parsed.X || "",
  instagram: parsed.INSTAGRAM || "",
  betterAuthSecret: parsed.BETTER_AUTH_SECRET,
  betterAuthUrl: parsed.BETTER_AUTH_URL,
  cloudinary: {
    cloudName: parsed.CLOUDINARY_CLOUD_NAME || "",
    apiKey: parsed.CLOUDINARY_API_KEY || "",
    apiSecret: parsed.CLOUDINARY_API_SECRET || "",
  },
  smtp: {
    service: parsed.SMTP_SERVICE || parsed.MAIL_SERVICE || "",
    host: parsed.SMTP_HOST || parsed.MAIL_HOST || "smtp.gmail.com",
    port: parsed.SMTP_PORT || parsed.MAIL_PORT || 587,
    user: parsed.SMTP_USER || parsed.MAIL_USER || "",
    pass: parsed.SMTP_PASS || parsed.MAIL_PASSWORD || "",
    from: parsed.SMTP_FROM || parsed.MAIL_FROM || "noreply@codebhaiya.com",
  },
  gemini: {
    apiKey: parsed.GEMINI_API_KEY || "",
  },
};

const env = Object.freeze(config);
export default env;
