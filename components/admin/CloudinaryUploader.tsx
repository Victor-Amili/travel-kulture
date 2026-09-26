
"use client";

import { useRef, useState } from "react";

type CloudinaryUploaderProps = {
  folder: string;
  multiple?: boolean;
  onUpload: (images: UploadedImage[]) => void;
};

export type UploadedImage = {
  secure_url: string;
  public_id: string;
};

export default function CloudinaryUploader({
  folder,
  multiple = false,
  onUpload,
}: CloudinaryUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");

  async function uploadFiles(files: FileList | null) {
    if (!files || files.length === 0) return;

    setError("");
    setUploading(true);
    setProgress(0);

    try {
      const uploaded: UploadedImage[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        if (!file.type.startsWith("image/")) {
          throw new Error(`${file.name} is not an image.`);
        }

        if (file.size > 10 * 1024 * 1024) {
          throw new Error(`${file.name} is larger than 10MB.`);
        }

        const signatureResponse = await fetch(
          "/api/cloudinary/signature",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              folder,
            }),
          }
        );

        if (!signatureResponse.ok) {
          throw new Error("Unable to create Cloudinary upload signature.");
        }

        const signatureData = await signatureResponse.json();

        const formData = new FormData();

        formData.append("file", file);
        formData.append("api_key", signatureData.apiKey);
        formData.append("timestamp", signatureData.timestamp.toString());
        formData.append("signature", signatureData.signature);
        formData.append("folder", signatureData.folder);

        const cloudinaryResponse = await fetch(
          `https://api.cloudinary.com/v1_1/${signatureData.cloudName}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (!cloudinaryResponse.ok) {
          throw new Error(`Cloudinary upload failed for ${file.name}.`);
        }

        const cloudinaryData = await cloudinaryResponse.json();

        uploaded.push({
          secure_url: cloudinaryData.secure_url,
          public_id: cloudinaryData.public_id,
        });

        setProgress(Math.round(((i + 1) / files.length) * 100));

        if (!multiple) break;
      }

      onUpload(uploaded);
    } catch (err) {
      console.error("Cloudinary upload error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Image upload failed."
      );
    } finally {
      setUploading(false);
    }
  }

  function handleFileChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    uploadFiles(event.target.files);
  }

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple={multiple}
        onChange={handleFileChange}
        disabled={uploading}
        style={{ display: "none" }}
      />

      <button
        type="button"
        className="btn secondary"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
      >
        {uploading
          ? `Uploading... ${progress}%`
          : multiple
          ? "Choose Images"
          : "Choose Image"}
      </button>

      {uploading && (
        <div style={{ marginTop: 12 }}>
          <div
            style={{
              width: "100%",
              height: 8,
              background: "#e5e7eb",
              borderRadius: 999,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                height: "100%",
                background: "currentColor",
                transition: "width 0.2s ease",
              }}
            />
          </div>
        </div>
      )}

      {error && (
        <p
          role="alert"
          style={{
            marginTop: 10,
            color: "crimson",
          }}
        >
          {error}
        </p>
      )}
    </div>
  );
}
