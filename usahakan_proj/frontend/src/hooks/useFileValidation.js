import { useState } from "react";

export const useFileValidation = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");

  const validateFile = (e) => {
    const file = e.target.files[0];
    if (!file) {
      setFileName("");
      return;
    }

    const allowedExtensions = [".png", ".jpg", ".jpeg"];
    const fileExt = file.name.toLowerCase();
    const isValid = allowedExtensions.some((ext) => fileExt.endsWith(ext));

    if (!isValid) {
      setError("Hanya file PNG, JPG, atau JPEG yang diperbolehkan kak!");
      e.target.value = "";
      setFileName("");
      return;
    }

    setError("");
    setSelectedFile(file);
    setFileName(file.name);
  };

  const resetFile = () => {
    setSelectedFile(null);
    setFileName("");
    setError("");
  };

  return { selectedFile, fileName, error, validateFile, resetFile };
};
