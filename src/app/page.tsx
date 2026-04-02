'use client';

import dynamic from 'next/dynamic';

/**
 * The entire Home UI depends on browser APIs (localStorage, window events,
 * IntersectionObserver, requestAnimationFrame). We use dynamic import with
 * ssr:false so Next.js never server-renders it — eliminating the hydration
 * mismatch that occurs when the server always sees mode=null (gateway) but
 * the client may read a saved mode from localStorage.
 */
const HomeClient = dynamic(() => import('./home-client'), {
  ssr: false,
});

export default function Home() {
  return <HomeClient />;
}
