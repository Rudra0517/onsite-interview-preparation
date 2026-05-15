import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { GoArrowUpRight } from "react-icons/go";
// import homepageGirl from "../../assets/images/homepageGirl";

const Home = () => {
  const { isLoggedIn } = useAuth();

  const navigate = useNavigate();

  const dashboardDirect = () => {
    isLoggedIn ? navigate("/dashboard") : navigate("/login");
  };
  const features = [
    { label: "Students Trained", value: "1K+" },
    { label: "Placement Questions", value: "5k+" },
    { label: "Company Patterns", value: "20+" },
    { label: "Success Rate", value: "92%" },
  ];
  const companies = [
    {
      name: "Google",
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    },
    {
      name: "Amazon",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    },
    {
      name: "Microsoft",
      logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    },
    {
      name: "TCS",
      logo: "https://logo.svgcdn.com/simple-icons/tcs-dark.svg",
    },
    {
      name: "Infosys",
      logo: "https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg",
    },
    {
      name: "Wipro",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Wipro_Primary_Logo_Color_RGB.svg",
    },
    {
      name: "Accenture",
      logo: "https://upload.wikimedia.org/wikipedia/commons/c/cd/Accenture.svg",
    },
    {
      name: "Deloitte",
      logo: "https://upload.wikimedia.org/wikipedia/commons/5/53/Deloitte_Logo.svg",
    },
  ];

  return (
    <main className="bg-white">
      <section className="bg-gray-50 text-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h1 className="text-6xl md:text-5xl font-extrabold leading-tight">
              Learn <span className="text-[#F59E0B]">Smart</span>, Achieve
              <span className="text-[#F59E0B]">Fast</span>
            </h1>

            <p className="mt-4 text-lg text-gray-700">
              Crack Top Company Placements with Confidence
            </p>

            <p className="mt-2 text-gray-600">
              Prepare for Aptitude, Coding, and Interviews with industry-level
              questions.
            </p>

            <div className="mt-6 flex gap-4">
              <button
                onClick={dashboardDirect}
                className="bg-teal-500 flex gap-1 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-600 transition"
              >
                Get Started
                <span className="mt-1">
                  <GoArrowUpRight />
                </span>
              </button>

              <button className="border border-teal-700 text-teal-500 px-6 py-3 rounded-lg font-semibold hover:bg-teal-400 hover:text-white transition">
                Explore Courses
              </button>
            </div>
          </div>

          {/* Right Design Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
            {/* Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="border rounded-xl p-4 text-center hover:shadow-md transition">
                <h3 className="font-semibold text-lg text-amber-500">
                  Aptitude
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Quant, Logical & Verbal
                </p>
              </div>

              <div className="border rounded-xl p-4 text-center hover:shadow-md transition">
                <h3 className="font-semibold text-lg text-amber-500">Coding</h3>
                <p className="text-sm text-gray-600 mt-1">
                  DSA & Company Problems
                </p>
              </div>

              <div className="border rounded-xl p-4 text-center hover:shadow-md transition">
                <h3 className="font-semibold text-lg text-amber-500">
                  Interviews
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  HR & Technical Rounds
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {features.map((item, idx) => (
            <div key={idx}>
              <p className="text-3xl font-bold text-amber-500">{item.value}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}

      <section className="bg-gray-50 dark:bg-gray-950">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
            Why Choose Us?
          </h2>

          <div className="mt-10 grid md:grid-cols-3 gap-8">
            {[
              "Company-Specific Preparation",
              "Updated Placement Questions",
              "Expert-Designed Roadmaps",
            ].map((title, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md"
              >
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                  {title}
                </h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Learn with real interview patterns and structured preparation
                  plans.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
            Companies You’ll Be Ready For
          </h2>

          {/* <div className="mt-10 overflow-hidden">
            <div className="flex gap-10 animate-scroll whitespace-nowrap">
              {company.map((company, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-center min-w-[180px] h-20 bg-gray-50 dark:bg-gray-800 rounded-xl shadow"
                >
                  <span className="font-semibold text-gray-700 dark:text-gray-200">
                    {company}
                  </span>
                </div>
              ))}
            </div>
          </div> */}
          <div className="mt-10 overflow-hidden">
            <div className="flex gap-10 animate-scroll whitespace-nowrap">
              {[...companies, ...companies].map((company, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-center min-w-[180px] h-20 
                   bg-white rounded-xl shadow-sm
                   transition-transform duration-300 ease-in-out
                   hover:scale-105 hover:shadow-md"
                >
                  <img
                    src={company.logo}
                    alt={company.name}
                    className="max-h-10 object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="bg-gray-900 text-white py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold">
            Start Your Developer Journey Today
          </h2>
          <p className="mt-4 text-gray-300">
            Explore curated learning resources and level up your skills with
            confidence.
          </p>
          <button className="mt-6 bg-[#111827] border-white border-[2px] px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 hover:text-[#F59E0B] transition">
            Start Learning
          </button>
        </div>
      </section>
    </main>
  );
};

export default Home;
