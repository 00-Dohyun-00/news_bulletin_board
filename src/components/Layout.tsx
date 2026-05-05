import React from "react";
import { Link } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link 
              to="/" 
              className="flex items-center group"
              aria-label="Go to homepage"
            >
              <h1 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                📰 AIPIA News
              </h1>
            </Link>
            <nav className="hidden sm:flex space-x-8" role="navigation" aria-label="Main navigation">
              <Link 
                to="/" 
                className="text-gray-500 hover:text-gray-900 focus:text-blue-600 focus:outline-none transition-colors duration-200"
                aria-current="page"
              >
                Home
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <main 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8"
        role="main"
        aria-label="Main content"
      >
        {children}
      </main>
      <footer className="border-t border-gray-200 bg-white mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-500">
            Powered by Hacker News API • Built with React & TypeScript
          </p>
        </div>
      </footer>
    </div>
  );
};
