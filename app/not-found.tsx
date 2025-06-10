
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-background text-foreground">
      <h1 className="text-4xl font-bold text-primary">404 - Page Not Found</h1>
      <p className="mt-3 text-xl text-muted-foreground">
        The page you are looking for does not exist.
      </p>
      <Link href="/" className="mt-6 px-6 py-2 rounded-md bg-accent text-accent-foreground hover:bg-accent/90 transition-colors duration-150 ease-in-out">
        Go back home
      </Link>
    </div>
  );
}
