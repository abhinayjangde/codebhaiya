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
  // Example URL: https://res.cloudinary.com/dvxxxxxxx/image/upload/v1234567890/codebhaiya/users/user123/posts/post456/my-image.jpg
  // We need the full path after upload/vXXXX/

  try {
    // Check if it's a cloudinary url
    if (!url.includes("cloudinary.com")) return;

    const parts = url.split("/upload/");
    if (parts.length < 2) return;

    // Remove version number and get the public_id (path without extension)
    const pathWithVersion = parts[1];
    const pathWithoutVersion = pathWithVersion.replace(/^v\d+\//, "");
    const publicId = pathWithoutVersion.replace(/\.[^/.]+$/, ""); // Remove file extension

    console.log(`Deleting image from Cloudinary: ${publicId}`);
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error("Error deleting image from Cloudinary:", error);
  }
};

/**
 * Delete all images in a post's folder
 * @param userId - The user's ID
 * @param postId - The post's ID
 */
export const deletePostImagesFolder = async (
  userId: string,
  postId: string
) => {
  try {
    const folder = `codebhaiya/users/${userId}/posts/${postId}`;
    console.log(`Deleting post images folder: ${folder}`);

    // Delete all resources in the folder
    await cloudinary.api.delete_resources_by_prefix(folder);
    // Delete the empty folder
    await cloudinary.api.delete_folder(folder);
  } catch (error) {
    console.error("Error deleting post images folder:", error);
  }
};

/**
 * Delete all images for a user (when user account is deleted)
 * @param userId - The user's ID
 */
export const deleteUserImagesFolder = async (userId: string) => {
  try {
    const folder = `codebhaiya/users/${userId}`;
    console.log(`Deleting user images folder: ${folder}`);

    // Delete all resources in the folder and subfolders
    await cloudinary.api.delete_resources_by_prefix(folder);
    // Delete the empty folder and subfolders
    await cloudinary.api.delete_folder(folder);
  } catch (error) {
    console.error("Error deleting user images folder:", error);
  }
};
