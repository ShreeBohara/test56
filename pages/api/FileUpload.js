// components/FileUpload.js
import React from 'react';

const FileUpload = ({ handleFileUpload }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleFileUpload(file);
  };

  return (
    <div>
      <h2>Upload a Text File</h2>
      <input type="file" accept=".txt" onChange={handleFileChange} />
    </div>
  );
};

export default FileUpload;
