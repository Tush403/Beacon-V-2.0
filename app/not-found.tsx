// app/not-found.tsx

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p className="mt-3 text-xl">
        The page you are looking for does not exist.
      </p>
      {/* Fix for Next.js Link component usage */}
      <Link href="/" className="mt-5 text-blue-500 hover:underline">
        Go back home
      </Link>
    </div>
  );
}
