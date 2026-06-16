import sharp from "sharp";

export type OptimizedImage = {
  buffer: Buffer;
  mimeType: string;
  filename: string;
  sizeBytes: number;
};

/** Convert raster uploads to WebP; GIFs are left unchanged. */
export async function optimizeImageUpload(
  file: File,
  bytes: Buffer,
): Promise<OptimizedImage> {
  if (file.type === "image/gif") {
    return {
      buffer: bytes,
      mimeType: file.type,
      filename: file.name,
      sizeBytes: bytes.length,
    };
  }

  const webp = await sharp(bytes)
    .rotate()
    .webp({ quality: 82, effort: 4 })
    .toBuffer();

  const baseName = file.name.replace(/\.[^.]+$/, "") || "image";
  return {
    buffer: webp,
    mimeType: "image/webp",
    filename: `${baseName}.webp`,
    sizeBytes: webp.length,
  };
}
