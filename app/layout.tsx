// app/layout.tsx

import '../src/app/globals.css'; // Import your global CSS from the correct path

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en"> 
      <head>
        <title>Beacon - Test Automation Tool Picker</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
