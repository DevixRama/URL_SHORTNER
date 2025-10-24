import React, { useState } from 'react';
import axios from 'axios';

const Homepage = () => {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [copied, setCopied] = useState(false);

  const handleShorten = async () => {
    if (!url) return;
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/create/`, { url });
      setShortUrl(response.data.shortUrl);
      setCopied(false);
    } catch (err) {
      console.error(err);
      alert('Error shortening URL');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
  };

  return (
    <div className="max-w-md mx-auto max-h-[90vh] mt-10 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">URL Shortener</h1>
      <input
        type="url"
        placeholder="Enter URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-full border rounded px-3 py-2 mb-3 focus:outline-none"
      />
      <button
        onClick={handleShorten}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 mb-3"
      >
        Shorten URL
      </button>

      {shortUrl && (
        <div className="flex items-center justify-between border rounded px-3 py-2">
          <span className="truncate">{shortUrl}</span>
          <button
            onClick={handleCopy}
            className="ml-2 bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      )}
    </div>
  );
};

export default Homepage;
