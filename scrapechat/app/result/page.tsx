'use client';
import ResultClient from './ResultsClient';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function ResultPageContent() {
  const searchParams = useSearchParams();
  const url = searchParams.get('url') || null;
  
  return <ResultClient initialUrl={url} initialResult={null} />;
}

export default function ResultPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultPageContent />
    </Suspense>
  );
}
