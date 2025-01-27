import React from "react";

const FileUploadComponent = () => {
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    console.log(file);
  };

  const uploadFileToPublicFolder = (file) => {
    const formData = new FormData();
    formData.append("file", file);

    fetch("/public/uploads", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("File uploaded successfully:", data);
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
      });
  };

  return (
    <div>
      <h1>File Upload</h1>
      <form>
        <div className="form-group">
          <label htmlFor="exampleFormControlFile1">Example file input</label>
          <input
            type="file"
            className="form-control-file"
            id="exampleFormControlFile1"
          />
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={uploadFileToPublicFolder}
        >
          Upload File
        </button>
      </form>
    </div>
  );
};

export default FileUploadComponent;
