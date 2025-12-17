import fs from "fs";
import path from "path";


// Function to get all images from a folder dynamically
export function getImages(folderPath: string) {
  // Ensure we don't double up on "public" if the user passed it
  const cleanPath = folderPath.replace(/^\/?public\//, "").replace(/^\//, "");
  const directoryPath = path.join(process.cwd(), "public", cleanPath);
  try {
    const files = fs.readdirSync(directoryPath);

    const images = files
      .filter((file) => /\.(jpg|jpeg|png|webp)$/i.test(file))

      .map((file) => `/${cleanPath}/${file}`);

    return images;
  } catch (error) {
    console.error(`Error reading directory ${directoryPath}:`, error);
    return [];
  }
}
