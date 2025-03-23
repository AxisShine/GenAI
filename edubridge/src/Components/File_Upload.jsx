import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [summary, setSummary] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (event) => {
    const uploadedFile = event.target.files[0];
    const formData = new FormData();
    formData.append('file', uploadedFile);

    setIsUploading(true);

    try {
      const response = await axios.post('http://localhost:8000/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      // Update state with the extracted text and summary
      setExtractedText(response.data.extracted_text);
      setSummary(response.data.summary);
      setAudioUrl(`/read/${uploadedFile.name}`);  // URL for audio playback
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleAudioPlay = () => {
    const audio = new Audio(audioUrl);
    audio.play();
  };

  const renderMarkdownBold = (text) => {
    // Replace *bold* with <strong>bold</strong> for HTML rendering
    return text.replace(/\*(.*?)\*/g, "<strong>$1</strong>");
  };

  return (
    <div className='min-h-screen flex justify-center items-center bg-gray-50'>
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-4 text-blue-600">
          Upload a file for text display and a summary
        </h2>

        <div className="mb-4">
          <input
            type="file"
            onChange={handleFileUpload}
            className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg p-2 mb-4"
          />
        </div>

        {isUploading && (
          <p className="text-center text-yellow-500">Uploading...</p>
        )}

        {extractedText && (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-sm">
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">Extracted Text</h3>
            <p className="text-gray-800 mb-4">{extractedText}</p>
          </div>
        )}

        {summary && (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-sm">
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">Summary</h3>
            <p
              className="text-gray-800 mb-4"
              dangerouslySetInnerHTML={{ __html: renderMarkdownBold(summary) }}
            />
            <button
              onClick={handleAudioPlay}
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
            >
              Read Summary
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUpload;