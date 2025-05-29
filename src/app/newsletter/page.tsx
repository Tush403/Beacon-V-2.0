
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { 
  ListChecks, 
  Tags, 
  RefreshCw, 
  Database, 
  Trophy, 
  UserCircle, 
  Sparkles, 
  Award, 
  Lightbulb,
  Star,
  Newspaper, // For the news icon placeholder
  MessageSquare // For the riddle emoji placeholder
} from 'lucide-react';

// Re-using the TAO Digital logo SVG from the Header component for consistency
const TaoDigitalLogo: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 100 100" // Adjusted viewBox for potentially smaller rendering
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <g id="pixel-part">
      <rect x="10" y="30" width="10" height="10" fill="#0D47A1" />
      <rect x="20" y="20" width="10" height="10" fill="#0D47A1" />
      <rect x="20" y="40" width="10" height="10" fill="#1976D2" />
      <rect x="30" y="10" width="10" height="10" fill="#0D47A1" />
      <rect x="30" y="30" width="10" height="10" fill="#1976D2" />
      <rect x="30" y="50" width="10" height="10" fill="#90CAF9" />
      <rect x="40" y="20" width="10" height="10" fill="#1976D2" />
      <rect x="40" y="40" width="10" height="10" fill="#90CAF9" />
      <rect x="40" y="60" width="10" height="10" fill="#FFB74D" />
      <rect x="50" y="30" width="10" height="10" fill="#90CAF9" />
      <rect x="50" y="50" width="10" height="10" fill="#FFB74D" />
      <rect x="50" y="70" width="10" height="10" fill="#81C784" />
    </g>
    <g
      id="gear-part"
      transform="translate(55, 35) scale(0.8)" // Scale down gear part a bit if needed
      className="animate-spin-slow origin-[0px_0px]"
    >
      <path
        d="M0 -25C13.8071 -25 25 -13.8071 25 0C25 13.8071 13.8071 25 0 25V20C11.0457 20 20 11.0457 20 0C20 -11.0457 11.0457 -20 0 -20V-25Z"
        fill="currentColor" // Will inherit color from parent or Tailwind class
      />
      <path d="M-3 -28 L3 -28 L3 -22 L-3 -22 Z" fill="currentColor" />
      <path d="M26.86 -9.5 L22.5 -4.5 L18.14 -9.5 Z" transform="rotate(30 0 0)" fill="currentColor" />
      <path d="M26.86 -9.5 L22.5 -4.5 L18.14 -9.5 Z" transform="rotate(60 0 0)" fill="currentColor" />
      <path d="M26.86 -9.5 L22.5 -4.5 L18.14 -9.5 Z" transform="rotate(90 0 0)" fill="currentColor" />
      <path d="M26.86 -9.5 L22.5 -4.5 L18.14 -9.5 Z" transform="rotate(120 0 0)" fill="currentColor" />
      <path d="M-3 28 L3 28 L3 22 L-3 22 Z" transform="rotate(180 0 0)" fill="currentColor" />
    </g>
  </svg>
);


const NewsletterPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>TAO Quality Engineering Broadcast</title>
        <meta name="description" content="Newsletter for TAO Quality Engineering" />
      </Head>
      <div className="min-h-screen bg-gray-100">
        {/* Newsletter Header */}
        <header className="bg-yellow-400 text-black p-4 text-center">
          <h1 className="text-2xl md:text-3xl font-bold tracking-wider">
            TAO - QUALITY ENGINEERING - BROADCAST
          </h1>
        </header>

        {/* Main Content Area */}
        <main className="bg-black text-white p-6 md:p-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Left Column (takes 2/3 on md screens) */}
            <div className="md:col-span-2 space-y-6 md:space-y-8">
              {/* ZeTA & Functionize Section */}
              <div>
                <div className="h-1 bg-yellow-400 mb-4"></div>
                <section className="mb-6">
                  <h2 className="text-2xl font-bold mb-2 text-yellow-400">ZeTA</h2>
                  <p className="text-sm leading-relaxed text-gray-300">
                    A unified Zero-Touch Automation(ZeTA) framework streamlining functional and non-functional
                    testing (UI, API, security, performance, visual) in one pipeline via GitHub Actions. It enhances
                    efficiency, reduces costs, boosts coverage, drives automation, and centralizes reporting for
                    faster defect resolution and improved engineering productivity.
                  </p>
                </section>
                <section>
                  <h2 className="text-2xl font-bold mb-2 text-yellow-400">Functionize</h2>
                  <p className="text-sm leading-relaxed text-gray-300">
                    TAO's partnership with Al-powered Automation Tool - Functionize has proven its efficacy with a
                    60% improvement in the productivity of automating CDK modules. Same has been recognized in
                    CDK's March Executive Townhall and CY25 Q1 Business Meet.
                  </p>
                </section>
              </div>

              {/* What's New Section */}
              <section className="bg-gray-800 p-6 rounded-lg shadow-xl relative">
                <h3 className="text-xl font-semibold mb-4 text-yellow-400">WHAT'S NEW IN QUALITY ENGINEERING</h3>
                <ul className="list-disc list-inside space-y-3 text-sm text-gray-300">
                  <li>
                    Al-powered tools can now generate test cases based on user behavior, requirements, and even
                    from code itself, reducing manual effort and increasing test coverage.
                  </li>
                  <li>
                    Playwright 1.51 Released - introduces Al-friendly debugging with the 'Copy Prompt' feature, Git info in
                    HTML reports, and enhanced Firebase authentication support.
                  </li>
                  <li>
                    Cypress 13.0 Beta - introduces component testing for React and Angular in the same framework.
                  </li>
                </ul>
                <div className="absolute bottom-4 right-4">
                  <Image src="https://placehold.co/80x80.png" alt="News" width={60} height={60} className="rounded" data-ai-hint="news interface" />
                </div>
              </section>

              {/* Fun Riddle Section */}
              <section className="bg-gray-800 p-6 rounded-lg shadow-xl text-center">
                <div className="inline-block bg-red-500 text-white font-bold p-3 rounded-md mb-4 shadow-md">
                  <span className="text-2xl">FUN!</span>
                </div>
                <div className="text-gray-300 space-y-2 text-sm italic">
                  <p>I'm often skipped but never fail to come back.</p>
                  <p>I make devs nervous and testers smile.</p>
                  <p>I love regression, and I live in the pipeline.</p>
                  <p className="font-semibold mt-2">What am I?</p>
                </div>
                 <div className="mt-4">
                  <Image src="https://placehold.co/100x100.png" alt="Riddle Emoji" width={80} height={80} className="mx-auto rounded-full" data-ai-hint="thinking emoji face" />
                </div>
              </section>
            </div>

            {/* Right Column (takes 1/3 on md screens) */}
            <div className="md:col-span-1 space-y-6 md:space-y-8">
              {/* TAO Digital Logo Section */}
              <section className="flex flex-col items-center p-4 bg-gray-800 rounded-lg shadow-xl">
                <TaoDigitalLogo className="h-20 w-20 md:h-24 md:w-24 text-blue-400 mb-2" />
                <p className="text-xs text-gray-400 tracking-wide">Transformation Made Simple</p>
              </section>

              {/* Best Practices Corner */}
              <section className="bg-gray-800 p-6 rounded-lg shadow-xl">
                <h3 className="text-xl font-semibold mb-4 text-yellow-400">BEST PRACTICES CORNER</h3>
                <ul className="space-y-3 text-sm text-gray-300">
                  <li className="flex items-start">
                    <ListChecks className="h-5 w-5 mr-2 mt-0.5 text-yellow-400 flex-shrink-0" />
                    Keep tests small, modular, and reusable
                  </li>
                  <li className="flex items-start">
                    <Tags className="h-5 w-5 mr-2 mt-0.5 text-yellow-400 flex-shrink-0" />
                    Use tagging to create smart, targeted test suites
                  </li>
                  <li className="flex items-start">
                    <RefreshCw className="h-5 w-5 mr-2 mt-0.5 text-yellow-400 flex-shrink-0" />
                    Regularly review and address flaky tests
                  </li>
                  <li className="flex items-start">
                    <Database className="h-5 w-5 mr-2 mt-0.5 text-yellow-400 flex-shrink-0" />
                    Externalize test data for cleaner and maintainable scripts
                  </li>
                </ul>
              </section>

              {/* Team Shoutouts Section */}
              <section className="bg-gray-800 p-6 rounded-lg shadow-xl">
                <h3 className="flex items-center text-xl font-semibold mb-4 text-yellow-400">
                  <Trophy className="h-6 w-6 mr-2" />
                  TEAM SHOUTOUTS
                </h3>
                <div className="space-y-4 text-xs text-gray-300">
                  <div>
                    <p className="flex items-start">
                      <UserCircle className="h-4 w-4 mr-2 mt-0.5 text-blue-400 flex-shrink-0" />
                      Kudos to <span className="font-semibold text-yellow-500 mx-1">Chinta Mani</span> for taking the lead in UI automation of Parts
                      workflows using Selenium WebDriverIO and driving the Functionize PoC for API automation.
                      Your initiative and ownership have been instrumental in our automation progress!
                    </p>
                  </div>
                  <div>
                    <p className="flex items-start">
                      <Sparkles className="h-4 w-4 mr-2 mt-0.5 text-orange-400 flex-shrink-0" />
                      <span className="font-semibold text-yellow-500 mr-1">Chaitanya Akula</span> for managing multiple responsibilities with such
                      efficiency and focus! Your ability to stay on top of the process while juggling
                      multiple tasks is truly commendable. Keep up the great work!!
                    </p>
                  </div>
                  <div>
                    <p className="flex items-start">
                       <Award className="h-4 w-4 mr-2 mt-0.5 text-green-400 flex-shrink-0" />
                      Congratulations <span className="font-semibold text-yellow-500 mx-1">Brindha Rajendran</span> on successfully completing the AWS Cloud Practitioner Certification.
                    </p>
                  </div>
                  <div>
                    <p className="flex items-start">
                      <Lightbulb className="h-4 w-4 mr-2 mt-0.5 text-purple-400 flex-shrink-0" />
                      <span className="font-semibold text-yellow-500 mr-1">Ponkaviraj</span> has quickly made a strong impact with his fast learning,
                      proactive mindset, and solid work ethics. His dedication, experimentation,
                      and ability to deliver early results are truly commendable. Great start!
                    </p>
                  </div>
                </div>
              </section>

              {/* Opportunities Section */}
              <section className="bg-gray-800 p-6 rounded-lg shadow-xl text-center">
                <div className="flex justify-center text-yellow-400 mb-2">
                  <Star className="h-5 w-5" />
                  <Star className="h-5 w-5" />
                  <Star className="h-5 w-5" />
                </div>
                <h3 className="text-2xl font-bold text-blue-400 tracking-wider mb-3 uppercase">
                  OPPORTUNITIES
                </h3>
                <p className="text-sm text-gray-300">
                  Internal - Looking for volunteer who has skillset in Power BI to build metrics dashboards
                </p>
              </section>
            </div>
          </div>
        </main>

        {/* Newsletter Footer */}
        <footer className="bg-yellow-400 text-black p-4 text-center">
          <p className="font-semibold text-sm md:text-base">
            KEEP TESTING. KEEP IMPROVING. KEEP INNOVATING. - YOUR QA TEAM
          </p>
        </footer>
      </div>
    </>
  );
};

export default NewsletterPage;

    