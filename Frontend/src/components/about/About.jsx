const About = () => {
  return (
    <div className="h-[91vh] bg-gray-50 px-6 py-12">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-6 text-4xl font-bold text-gray-900">
          About Our Project
        </h1>

        <p className="mb-6 text-lg text-gray-700">
          Our project is built with one clear mission: to make high-quality
          study materials easily accessible for developers at every stage of
          their learning journey.
        </p>

        <div className="mb-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="mb-3 text-xl font-semibold text-gray-900">
              🎯 Our Purpose
            </h2>
            <p className="text-gray-600">
              We aim to help developers learn faster and more effectively by
              providing well-structured, reliable, and practical study resources
              covering modern technologies and development practices.
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="mb-3 text-xl font-semibold text-gray-900">
              📚 What We Provide
            </h2>
            <p className="text-gray-600">
              The platform offers curated learning materials such as tutorials,
              documentation references, code examples, and conceptual guides
              designed to support real-world development.
            </p>
          </div>
        </div>

        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="mb-3 text-xl font-semibold text-gray-900">
            👨‍💻 Who It’s For
          </h2>
          <p className="text-gray-600">
            Whether you are a beginner starting your programming journey or an
            experienced developer sharpening your skills, this project is
            designed to support continuous learning and professional growth.
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-4xl h-auto py-2">
        <h1 className="mb-6 text-4xl font-bold text-gray-900 text-center">🚀TECH STACK</h1>
        <div></div>
      </div>
    </div>
  );
};

export default About;
