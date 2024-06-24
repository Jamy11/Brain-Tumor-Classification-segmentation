// import React, { useState } from "react";
// import  from "..//Bootstrap.css";
// const ImageSelectorBox = () => {
//   const [result, setResult] = useState(null);

//   const handleClassify = () => {
//     // Dummy data to mimic classification result
//     setResult({
//       label: "golden retriever",
//       confidence: 80.59,
//       otherLabels: [
//         { label: "Labrador retriever", confidence: 2.27 },
//         { label: "tennis ball", confidence: 0.3 },
//         { label: "kuvasz", confidence: 0.22 },
//         { label: "cocker spaniel", confidence: 0.2 },
//       ],
//     });
//   };
//   return (
//     <div>
//       <div className="container">
//         <h1>Brain Tumor Classification And Segmentation</h1>
//         <div className="imageContainer">
//           <img
//             src="pagesimage.png"
//             alt="Classify this image"
//             width={500}
//             height={500}
//           />
//         </div>
//         <button onClick={handleClassify} className="classifyButton">
//           Classify
//         </button>
//         {result && (
//           <div className="result">
//             <h2>Result</h2>
//             <div className="resultItem">
//               <span>{result.label}</span>
//               <span>{result.confidence}%</span>
//             </div>
//             {result.otherLabels.map((item, index) => (
//               <div key={index} className="resultItem">
//                 <span>{item.label}</span>
//                 <span>{item.confidence}%</span>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ImageSelectorBox;

import React, { useState } from 'react';
// import  from '..//Home.module.css';

export default function ImageSelectorBox() {
  const [result, setResult] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);

  const handleClassify = () => {
    // Dummy data to mimic classification result
    setResult({
      label: 'golden retriever',
      confidence: 80.59,
      otherLabels: [
        { label: 'Labrador retriever', confidence: 2.27 },
        { label: 'tennis ball', confidence: 0.30 },
        { label: 'kuvasz', confidence: 0.22 },
        { label: 'cocker spaniel', confidence: 0.20 }
      ]
    });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageSrc(reader.result);
      setResult(null); // Clear previous result when a new image is uploaded
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={'container'}>
      <h1>Brain Tumor Classification And Segmentation</h1>
      <div className='imageContainer'>
        {imageSrc ? (
          <img src={imageSrc} alt="Uploaded" className='uploadedImage' />
        ) : (
          <p>Please upload an image to classify.</p>
        )}
      </div>
      <input type="file" accept="image/*" onChange={handleImageUpload} className='uploadInput' />
      {imageSrc ? (
        <button onClick={handleClassify} className='classifyButton'>Classify</button>
      ) : (
        <p>Please upload an image to see the classification result.</p>
      )}
      {result && (
        <div className='result'>
          <h2>Result</h2>
          <div className='resultItem'>
            <span>{result.label}</span>
            <span>{result.confidence}%</span>
          </div>
          {result.otherLabels.map((item, index) => (
            <div key={index} className='resultItem'>
              <span>{item.label}</span>
              <span>{item.confidence}%</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
// export default ImageSelectorBox;
