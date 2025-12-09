import env from "@/config/env";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: env.cloudinary.cloudName,
  api_key: env.cloudinary.apiKey,
  api_secret: env.cloudinary.apiSecret,
});

export default cloudinary;

export const deleteImageFromCloudinary = async (url: string) => {
  if (!url) return;

  // Extract public_id from URL
  // Example URL: https://res.cloudinary.com/dvxxxxxxx/image/upload/v1234567890/codebhaiya-posts/my-image.jpg
  // We need: codebhaiya-posts/my-image

  try {
    const parts = url.split("/");
    const filename = parts.pop();
    const folder = parts.pop(); // typically 'codebhaiya-posts' or similar
    
    // Check if it's a cloudinary url
    if (!url.includes("cloudinary.com")) return;

    if (filename && folder) {
      const publicId = `${folder}/${filename.split(".")[0]}`;
      
      console.log(`Deleting image from Cloudinary: ${publicId}`);
      
      await cloudinary.uploader.destroy(publicId);
    }
  } catch (error) {
    console.error("Error deleting image from Cloudinary:", error);
  }
};
