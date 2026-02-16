'use client';

import { useEffect, useState } from 'react';

type ScrapeResult = {
  success?: boolean;
  description: string;
  links: string[];
  title?: string;
  fullHTML: string;
};

interface Props {
  initialResult: ScrapeResult | null;
  initialUrl: string | null;
  initialError?: string | null;
}

export default function ResultClient({ 
  initialResult, 
  initialUrl, 
  initialError 
}: Props) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScrapeResult | null>(initialResult);
  const [error, setError] = useState<string | null>(initialError || null);
  const url = initialUrl;

  // Retry functionality (uses the url prop)
  useEffect(() => {
    if (initialError) {
      setError(initialError);
      return;
    }
    
    if (!initialResult && !initialError) {
      setError('No URL provided');
    }
  }, [initialResult, initialError]);

  const handleRetry = async () => {
    if (!url) {
      setError('No URL provided');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/scrape?url=${encodeURIComponent(url)}`);
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      const data = await res.json();
      setResult(data);
    } catch (e: any) {
      setError(e.message ?? 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col items-center space-y-6">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-white border-t-white rounded-full animate-spin"></div>
              <div className="absolute inset-0 w-20 h-20 border-4 border-white rounded-full animate-ping"></div>
            </div>
            <div className="text-center">
              <h2 className="text-xl font-semibold text-white mb-2">Loading scrape results</h2>
              <p className="text-gray-600">Fetching and parsing page data...</p>
            </div>
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-white rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
              <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-16 h-16 mx-auto mb-6 bg-black rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white mb-4">Scraping Error</h1>
          <p className="text-white max-w-md mx-auto mb-8">{error}</p>
          <button 
            onClick={handleRetry}
            className="inline-flex items-center px-6 py-3 bg-black text-gray-500 text-sm font-medium rounded-lg hover:bg-white border border-white transition-colors"
          >
            Try Again
          </button>
          <p className="leading-25 text-gray-400 mt-4">This often occurs due to timeout issues when the website is too big.</p>
        </div>
      </main>
    );
  }

  if (!result) {
    return (
      <main className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-900 rounded-full animate-pulse"></div>
          <h1 className="text-2xl font-bold text-white mb-2">No Data Available</h1>
          <p className="text-gray-900 max-w-md mx-auto">
            The scraping process completed but returned no data.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="bg-black rounded-xl shadow-sm p-8 border border-gray-100">
          <h1 className="text-3xl font-bold text-white mb-2">Scrape Results</h1>
          <p className="text-gray-500 text-lg">{url}</p>
        </div>

        {result.title && (
          <div className="bg-black rounded-xl shadow-sm p-8 border border-gray-100">
            <h2 className="text-xl font-semibold text-white mb-3">Title</h2>
            <p className="text-gray-500 leading-relaxed">{result.title}</p>
          </div>
        )}

        <div className="bg-black rounded-xl shadow-sm p-8 border border-gray-100">
          <h2 className="text-xl font-semibold text-white mb-3">Description</h2>
          <p className="text-gray-500 leading-relaxed">
            {result.description || <span className="text-gray-500 italic">(none)</span>}
          </p>
        </div>

        <div className="bg-black rounded-xl shadow-sm p-8 border border-gray-100">
          <h2 className="text-xl font-semibold text-white mb-6">Links</h2>
          <ul className="space-y-2">
            {result.links.map((link, idx) => (
              <li key={idx} className="group">
                <a 
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-gray-700 hover:underline flex items-center py-2 px-3 rounded-lg transition-all duration-200 group-hover:bg-gray-50"
                >
                  <span className="truncate max-w-full">{link}</span>
                  <svg className="w-4 h-4 ml-2 text-gray-400 group-hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="overflow-x-auto max-w-full whitespace-normal bg-black rounded-xl shadow-sm p-8 border border-gray-100">
          <h2 className="text-xl font-semibold text-white mb-3">Full HTML</h2>
          <p className="text-gray-500 leading-relaxed">
            {result.fullHTML || <span className="text-gray-500 italic">(none)</span>}
          </p>
        </div>
      </div>
    </main>
  );
}
