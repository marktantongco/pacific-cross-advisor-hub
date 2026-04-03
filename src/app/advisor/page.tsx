'use client';

import dynamic from 'next/dynamic';

/**
 * The Advisor page depends on browser APIs (localStorage, window events).
 * We use dynamic import with ssr:false so Next.js never server-renders it —
 * eliminating the hydration mismatch that occurs when the server always
 * sees mode=null (gateway) but the client may read a saved mode from localStorage.
 */
const AdvisorClient = dynamic(() => import('./advisor-client'), {
  ssr: false,
});

export default function AdvisorPage() {
  return <AdvisorClient />;
}
