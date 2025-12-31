import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Homepage = () => {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [loading, setLoading] = useState(false);


  const handleShorten = async () => {
    if (!url) return;
    setLoading(true)

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/create/`,
        { url },
        { timeout: 8000 }
      );

      setShortUrl(response.data.shortUrl);
      setCopiedIndex(null);
    } catch (err) {
      toast.error("Server is waking up, please try again in a minute");
    } finally {
      setLoading(false)
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
      <input type="url" placeholder="Enter URL" value={url}
        onChange={(e) => setUrl(e.target.value)} className="w-full border rounded px-3 py-2 mb-3 focus:outline-none" />
      <button
        onClick={handleShorten} disabled={loading}
        className={`w-full py-2 rounded mb-3 flex items-center justify-center ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"}`}
      >{loading ? (<span className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />) :
        ("Shorten URL")}
      </button>

      {
        shortUrl && (
          <div className="flex items-center justify-between border rounded px-3 py-2">
            <span className="truncate">{shortUrl}</span>
            <button onClick={(e) => { e.stopPropagation(); handleCopy(shortUrl, 0); }} className="ml-2 bg-lime-200 p-1 h-10 w-10 rounded-full text-xl hover:bg-lime-300">{copiedIndex === 0 ? <i class='bx bxs-copy' ></i> : <i class='bx bx-copy' ></i>}</button>
          </div>
        )
      }
    </div >
  );
};

export default Homepage;
