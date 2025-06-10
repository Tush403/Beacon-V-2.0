// app/layout.tsx

import '../src/app/globals.css'; // Import your global CSS from the correct path

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
