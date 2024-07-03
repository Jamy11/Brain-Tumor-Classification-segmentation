"use client";
import { useState } from "react";
import ImageClassifier from "../components/ImageClassifier";

export default function Home() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("http://localhost:8000/api/predict/", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    setResult(data.prediction);
  };

  return (
    <div>
      {/* <h1>Brain Tumor Detection</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="file" name="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      {result && <div>Prediction: {result}</div>} */}
      <ImageClassifier />
    </div>
  );
}
