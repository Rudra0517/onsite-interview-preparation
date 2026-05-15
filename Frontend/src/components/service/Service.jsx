import React from "react";

const Service = () => {
  const services = [
    {
      title: "Structured Learning Paths",
      description:
        "Step-by-step learning paths for frontend, backend, and full-stack development, designed for beginners to advanced developers.",
      icon: "📘",
    },
    {
      title: "Developer Notes & Guides",
      description:
        "Concise notes, best practices, and real-world examples covering modern technologies and frameworks.",
      icon: "🧠",
    },
    {
      title: "Code Examples & Snippets",
      description:
        "Reusable code snippets and practical examples to help developers learn faster and build better.",
      icon: "💻",
    },
    {
      title: "Interview Preparation",
      description:
        "Curated interview questions, system design basics, and coding challenges to help you prepare with confidence.",
      icon: "🎯",
    },
  ];

  return (
    <section className="h-[91vh] bg-gray-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">Our Services</h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            We help developers learn efficiently by providing high-quality,
            well-structured study materials tailored to real-world development.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Service;
