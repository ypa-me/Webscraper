'use client'; // Client-only approach that ALWAYS works
import ResultClient from './ResultsClient';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function ResultPageContent() {
  const searchParams = useSearchParams();
  const url = searchParams.get('url') || null;
  
  // Pass directly to your existing ResultClient
  return <ResultClient initialUrl={url} initialResult={null} />;
}

// Wrap in Suspense to fix build error
export default function ResultPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black-50 flex items-center justify-center">
        <div className="text-white text-xl">Loading results...</div>
      </div>
    }>
      <ResultPageContent />
    </Suspense>
  );
}