/* eslint-disable @next/next/no-img-element */
"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

type PhotoUploaderProps = {
  setData: (photo: { src: string; blob: string }) => void;
};
const PhotoUploader = ({ setData }: PhotoUploaderProps) => {
  const [photo, setPhoto] = useState<string>();
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const url = URL.createObjectURL(acceptedFiles[0]);
      setData({
        src: url,
        blob: await acceptedFiles[0].text(),
      });
      setPhoto(url);
    },
    [setData]
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
  });
  return (
    <div
      {...getRootProps()}
      className="flex h-32 justify-center items-center border rounded-lg border-primary-light hover:border-primary-main"
    >
      <input {...getInputProps()} />
      {!photo ? (
        <p>Arrastra o toca para seleccionar archivos</p>
      ) : (
        <img
          className="object-cover h-28 rounded-lg"
          src={photo}
          alt="preview"
        />
      )}
    </div>
  );
};

export default PhotoUploader;
