const ImageClassifier = ({ result }) => {
  return (
    <div className="resultSection">
      {result && (
        <div className="result">
          <h2>Result</h2>
          <div className="resultItem">
            <span>{result.label}</span>
            <span>{result.confidence}%</span>
          </div>
          {result.otherLabels.map((item, index) => (
            <div key={index} className="resultItem">
              <span>{item.label}</span>
              <span>{item.confidence}%</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageClassifier;
