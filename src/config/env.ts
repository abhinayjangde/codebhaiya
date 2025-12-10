const _config = {
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
  databaseUrl:
    process.env.DATABASE_URL ||
    "postgresql://user:password@localhost:5432/dbname",
  discord: process.env.DISCORD || "",
  youtube: process.env.YOUTUBE || "",
  github: process.env.GITHUB || "",
  linkedin: process.env.LINKEDIN || "",
  x: process.env.X || "",
  instagram: process.env.INSTAGRAM || "",
  betterAuthSecret: process.env.BETTER_AUTH_SECRET || "secret",
  betterAuthUrl: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || "",
    apiKey: process.env.CLOUDINARY_API_KEY || "",
    apiSecret: process.env.CLOUDINARY_API_SECRET || "",
  },
};

const env = Object.freeze(_config);
export default env;
