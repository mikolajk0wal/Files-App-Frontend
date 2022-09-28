import React, { useRef, ChangeEvent, Dispatch, SetStateAction } from "react";
import { Label, StyledFileInput } from "./FileInput.styles";

interface Props {
  setFile: Dispatch<SetStateAction<File | null>>;
  file: File | null;
}

const FileInput: React.FC<Props> = ({ setFile, file }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target && event.target.files) {
      const uploadedFile = event.target.files[0];
      setFile(uploadedFile);
    }
  };

  return (
    <>
      <StyledFileInput
        type="file"
        ref={fileInputRef}
        onChange={handleChange}
        id="file"
        name="file"
      />
      <Label htmlFor="file">
        {file?.name ? `Załączony plik: ${file.name}` : "Nie załączono pliku"}
      </Label>
    </>
  );
};

export default FileInput;
