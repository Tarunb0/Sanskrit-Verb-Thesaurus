import React, { useState } from 'react';

function Upload() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      console.log('Selected file:', selectedFile);
    } else {
      console.log('No file selected');
    }
  };

  return (
    <div style = {{alignContent : "center", paddingLeft : "36%", paddingBottom : "15px"}}>
      <input type="file" onChange={handleFileChange} style = {{width : "24%", paddingBottom : "10px"}}/>
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default Upload;