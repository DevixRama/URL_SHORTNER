import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AppContext } from '../context/AppContext';

const HomeLock = () => {
  const { fetchAllUrls, userAllUrls, setUserAllUrls, token } = useContext(AppContext);

  const [url, setUrl] = useState('');
  const [slug, setSlug] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [copiedIndex, setCopiedIndex] = useState(null);

  useEffect(() => {
    fetchAllUrls();
    userAllUrls
  }, [userAllUrls]);

  const handleShorten = async () => {
    if (!url) return;
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/create/`,
        { url, slug },
        { headers: { Authorization: `bearer ${token}` } }
      );
      setShortUrl(res.data.shortUrl);
      setUserAllUrls([res.data, ...userAllUrls]);
      setUrl('');
      setSlug('');
      setCopiedIndex(null);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Error shortening URL');
    }
  };

  const handleCopy = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">Advanced URL Shortener</h1>
      <input type="url" placeholder="Enter URL" value={url} onChange={(e) => setUrl(e.target.value)} className="w-full border rounded px-3 py-2 mb-2 focus:outline-none" />
      <input type="text" placeholder="Custom slug (optional)" value={slug} onChange={(e) => setSlug(e.target.value)} className="w-full border rounded px-3 py-2 mb-3 focus:outline-none" />
      <button onClick={handleShorten} className="w-full bg-blue-800 text-white py-2 rounded hover:bg-blue-700 mb-4">Shorten URL</button>

      {shortUrl && (
        <div className="flex items-center justify-between border rounded px-3 py-2 mb-4">
          <span className="truncate">{shortUrl}</span>
          <button onClick={() => handleCopy(shortUrl, 'short')} className="ml-2 bg-gray-200 px-2 py-1 rounded hover:bg-gray-300">{copiedIndex === 'short' ? 'Copied!' : 'Copy'}</button>
        </div>
      )}

      <h2 className="text-xl font-semibold mb-2">Your Past URLs</h2>

      <div className="space-y-2">
        {userAllUrls.map((item, idx) => (
          <div key={item._id || idx} onClick={() => handleCopy(item.short_url, idx)} className="flex flex-col border rounded px-3 py-2 cursor-pointer hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <span className="font-medium truncate">{item.short_url}</span>
              <button onClick={(e) => { e.stopPropagation(); handleCopy(item.short_url, idx); }} className="ml-2 bg-gray-200 px-2 py-1 rounded hover:bg-gray-300">{copiedIndex === idx ? 'Copied!' : 'Copy'}</button>
            </div>
            <span className="text-sm text-gray-500 truncate">{item.full_url}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeLock;
