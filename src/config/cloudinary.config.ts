import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import config from ".";

cloudinary.config({
  cloud_name: config.cloudinary.cloudinaryCloudName,
  api_key: config.cloudinary.cloudinaryApiKey,
  api_secret: config.cloudinary.cloudinaryApiSecret,
});

export const uploadFileToCloudinary = async (
  buffer: Buffer,
  fileName: string,
): Promise<UploadApiResponse> => {
  if (!buffer || !fileName) {
    throw new Error(
      "File buffer and file name are required for upload",
    );
  }

  const extension = fileName.substring(fileName.lastIndexOf(".")).toLowerCase();

  const fileNameWithoutExt = fileName
    .substring(0, fileName.lastIndexOf("."))
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9\-]/g, "");

  const uniqueName =
    Math.random().toString(36).substring(2) +
    "-" +
    Date.now() +
    "-" +
    fileNameWithoutExt +
    extension;

  const folder =
    extension === ".png" || extension === ".jpg" || extension === ".jpeg" || extension === ".webp" || extension === ".svg"
      ? "images"
      : "others";

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: `personalPortfolio/${folder}`,
          public_id: uniqueName,
          resource_type: "auto",
        },
        (error, result) => {
          if (error) {
            return reject(
              new Error("Failed to upload file to Cloudinary")
            );
          }
          resolve(result as UploadApiResponse);
        },
      )
      .end(buffer);
  });
};

export const deleteFileFromCloudinary = async (url: string) => {
  try {
    const regex = /\/(image|raw|video|auto)\/upload\/v\d+\/(.+)$/;

    const match = url.match(regex);

    if (match && match[1] && match[2]) {
      const resourceType = match[1] === "auto" ? "raw" : match[1];
      // Image/video public_ids exclude the extension; raw (PDF/doc) public_ids keep it.
      const publicId =
        resourceType === "raw"
          ? match[2]
          : match[2].replace(/\.[a-zA-Z0-9]+$/, "");
      await cloudinary.uploader.destroy(publicId, { resource_type: resourceType as "image" | "raw" | "video" });
      console.log(`File ${publicId} deleted successfully from Cloudinary.`);
    }
  } catch (error) {
    console.error("Error occurred while deleting file from Cloudinary:", error);
    throw new Error("Failed to delete file from Cloudinary");
  }
};

export const cloudinaryUpload = cloudinary;
