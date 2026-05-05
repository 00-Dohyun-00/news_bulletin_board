import React from "react";
import { StoryType } from "../types/news";

interface TabsProps {
  activeTab: StoryType;
  onTabChange: (tab: StoryType) => void;
}

export const Tabs: React.FC<TabsProps> = ({ activeTab, onTabChange }) => {
  const tabs: { key: StoryType; label: string }[] = [
    { key: "top", label: "Top" },
    { key: "new", label: "New" },
    { key: "best", label: "Best" },
  ];

  return (
    <div className="border-b border-gray-200">
      <nav
        className="-mb-px flex space-x-8"
        role="tablist"
        aria-label="Story categories"
      >
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => onTabChange(tab.key)}
            role="tab"
            aria-selected={activeTab === tab.key}
            aria-controls={`${tab.key}-panel`}
            style={{ outline: 'none', WebkitTapHighlightColor: 'transparent' }}
            className={`py-3 px-2 border-b-2 font-medium text-sm transition-all duration-200 focus:outline-none active:outline-none focus-visible:outline-none ${
              activeTab === tab.key
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
};
