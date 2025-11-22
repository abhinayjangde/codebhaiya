const _config = {
  discord: process.env.DISCORD || "",
  youtube: process.env.YOUTUBE || "",
  github: process.env.GITHUB || "",
  linkedin: process.env.LINKEDIN || "",
  x: process.env.X || "",
  instagram: process.env.INSTAGRAM || "",
};

const env = Object.freeze(_config);
export default env;
