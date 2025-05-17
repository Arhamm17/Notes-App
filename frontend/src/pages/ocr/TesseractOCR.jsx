import { useState } from "react";
import "./tesseractOCR.css";
import Navbar from "../../components/Navbar";
import { useSelector } from "react-redux";

const TesseractOCR = () => {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [image, setImage] = useState(null);
  const [text, setText] = useState('');
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState('eng');
  const [error, setError] = useState('');

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setText('');
      setError('');
    }
  };

  const performOCR = async () => {
    if (!image || !window.Tesseract) {
      setError('Please upload an image first');
      return;
    }

    setIsLoading(true);
    setProgress(0);
    setText('');
    setError('');

    try {
      const { createWorker } = window.Tesseract;
      const worker = await createWorker({
        logger: (m) => {
          if (m.status === 'recognizing text') {
            setProgress(Math.floor(m.progress * 100));
          }
        },
      });

      await worker.loadLanguage(language);
      await worker.initialize(language);
      const { data } = await worker.recognize(image);
      setText(data.text);

      await worker.terminate();
    } catch (error) {
      console.error('OCR Error:', error);
      setError('Error occurred during OCR processing. Please try another image.');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
  };

  const clearAll = () => {
    setImage(null);
    setText('');
    setProgress(0);
    setError('');
    document.getElementById('file-upload').value = '';
  };

  return (
    <>
      <Navbar
        userInfo={currentUser?.rest}
        onSearchNote={() => {}}
        handleClearSearch={() => {}}
        searchQuery=""
      />
      <div className="tesseract-ocr-container">
        <header className="ocr-header">
          <h1>Image Text Extractor</h1>
          <p>Upload an image to extract text using OCR technology</p>
        </header>

        <div className="ocr-controls">
          <div className="file-upload-wrapper">
            <label htmlFor="file-upload" className="file-upload-label">
              <span className="material-icons">upload</span>
              {image ? 'Change Image' : 'Choose Image'}
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isLoading}
              />
            </label>
            {image && (
              <button className="clear-btn" onClick={clearAll} disabled={isLoading}>
                <span className="material-icons">clear</span>
              </button>
            )}
          </div>

          <div className="language-selector">
            <label htmlFor="language">Language:</label>
            <select
              id="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              disabled={isLoading}
            >
              <option value="eng">English</option>
              <option value="spa">Spanish</option>
              <option value="fra">French</option>
              <option value="deu">German</option>
              <option value="chi_sim">Chinese</option>
              <option value="jpn">Japanese</option>
            </select>
          </div>

          <button
            className="extract-btn"
            onClick={performOCR}
            disabled={!image || isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner"></span>
                Extracting... {progress}%
              </>
            ) : (
              <>
                <span className="material-icons">text_snippet</span>
                Extract Text
              </>
            )}
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="ocr-results">
          {image && (
            <div className="image-section">
              <div className="image-preview-container">
                <img
                  src={image}
                  alt="Uploaded for OCR"
                  className="preview-image"
                />
                <div className="image-overlay">
                  <span>Image Preview</span>
                </div>
              </div>
            </div>
          )}

          {(text || isLoading) && (
            <div className="text-section">
              <div className="text-header">
                <h3>Extracted Text</h3>
                {text && (
                  <button className="copy-btn" onClick={copyToClipboard}>
                    <span className="material-icons">content_copy</span>
                    Copy
                  </button>
                )}
              </div>
              <div className="text-content">
                {isLoading && !text ? (
                  <div className="loading-placeholder">
                    <div className="progress-bar" style={{ width: `${progress}%` }}></div>
                    <p>Processing your image...</p>
                  </div>
                ) : (
                  <textarea
                    value={text}
                    readOnly
                    placeholder="Extracted text will appear here..."
                  />
                )}
              </div>
            </div>
          )}
        </div>

        <footer className="ocr-footer">
          <p>Powered by Tesseract.js v{window.Tesseract?.version || 'x.x.x'}</p>
        </footer>
      </div>
    </>
  );
};

export default TesseractOCR;
