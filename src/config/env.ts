const _config = {
  baseUrl: process.env.BASE_URL || "http://localhost:3000",
  databaseUrl:
    process.env.DATABASE_URL ||
    "postgresql://user:password@localhost:5432/dbname",
  discord: process.env.DISCORD || "",
  youtube: process.env.YOUTUBE || "",
  github: process.env.GITHUB || "",
  linkedin: process.env.LINKEDIN || "",
  x: process.env.X || "",
  instagram: process.env.INSTAGRAM || "",
};

const env = Object.freeze(_config);
export default env;
