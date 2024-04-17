import React from "react";

const FeatureSection = () => {
  const features = [
    {
      title: "Browse Jobs",
      description:
        "Explore a wide range of job opportunities from top companies.",
      icon: "🔍",
    },
    {
      title: "Apply Easily",
      description: "Apply to your desired jobs with just a few clicks.",
      icon: "✉️",
    },
    {
      title: "Save Favorites",
      description: "Save your favorite job listings for quick access later.",
      icon: "⭐",
    },
    {
      title: "Get Notified",
      description:
        "Receive notifications for new job postings matching your preferences.",
      icon: "🔔",
    },
  ];

  return (
    <div className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Features
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Discover the features that make our job portal stand out.
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-md"
            >
              <span className="text-5xl mb-4">{feature.icon}</span>
              <h3 className="text-lg font-semibold mb-2 text-black">
                {feature.title}
              </h3>
              <p className="text-gray-700 text-center">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
