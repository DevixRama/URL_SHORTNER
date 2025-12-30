import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Homepage = () => {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [copied, setCopied] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleShorten = async () => {
    if (!url) return;
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/create/`, { url });
      setShortUrl(response.data.shortUrl);
      setCopiedIndex(null);
    } catch (err) {
      alert('Error shortening URL');
    }
  };

  const handleCopy = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    toast.success("Link copied!")
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded">
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
          <button onClick={(e) => { e.stopPropagation(); handleCopy(shortUrl, 0); }} className="ml-2 bg-lime-200 p-1 h-10 w-10 rounded-full text-xl hover:bg-lime-300">{copiedIndex === 0 ? <i class='bx bxs-copy' ></i> : <i class='bx bx-copy' ></i>}</button>
        </div>
      )}
    </div>
  );
};

export default Homepage;
