
import React from 'react';
import Link from 'next/link'; // Import Link component

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 flex flex-col">
      {/* Header */}
      <header className="flex items-center p-6">
        <img src="/Logo/TAO Logo.png" alt="TAO Digital Logo" className="h-10 w-10 mr-3" />
        <div>
          <h1 className="text-xl font-bold text-blue-700">TAO DIGITAL</h1>
          <p className="text-sm text-gray-500">Transformation Made Simple</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-blue-700 mb-2">
          Welcome to TAO's Beacon
        </h1>

        <p className="text-gray-600 text-lg max-w-3xl mb-8 mt-0">
          Elevate your test automation strategy with TAO's Beacon. This enterprise-grade decision
          engine demystifies tool selection, providing data-driven recommendations to optimize your
          QA processes, accelerate delivery, and drive innovation at scale.
        </p>

        <Link
          href="/dashboard"
          className="bg-purple-600 text-white px-8 py-3 text-lg rounded-full shadow-lg hover:bg-purple-700 active:scale-95 transform transition-all duration-300"
        >
          Get Started
        </Link>
      </main>
    </div>
  );
};

export default HomePage;
