import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../../API/axiosInstance";

const UserDashboard = () => {
  const [course, setCourse] = useState("");
  const [subject, setSubject] = useState("");
  const [questionType, setQuestionType] = useState("");
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [companyType, setCompanyType] = useState("");
  const [location, setLocation] = useState("");
  const [questions, setQuestions] = useState([]);

  // Subjects mapped by course
  const subjectsByCourse = {
    MERN: ["HTML", "CSS", "JavaScript", "MongoDB", "Express", "React", "Node"],
    Java: [
      "Core Java",
      "JDBC",
      "Hibernate with JPA",
      "Spring",
      "HTML",
      "CSS",
      "JavaScript",
      "SQL",
    ],
    Python: ["Python", "Django", "HTML", "CSS", "JavaScript", "SQL"],
  };

  const fdata = async () => {
    const { data } = await axiosInstance.get("/allquestions");
    setQuestions(data);
  };

  useEffect(() => {
    fdata();
  }, []);

  const handleSearch = async (e) => {
    try {
      e.preventDefault();
      const filterData = {
        course,
        subject,
        questionType,
        companyType,
        location,
      };
      const { data } = await axiosInstance.post("/filterquestions", filterData);
      setFilteredQuestions(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-[91vh] bg-gray-50 text-black p-6">
      <div className="w-[90%] mx-auto">
        {/* Header */}
        <h1 className="text-2xl font-semibold flex items-center gap-2 mb-6">
          🎓 Learn and grow as DEVELOPER
        </h1>
        <form
          onSubmit={handleSearch}
          className="border border-black/10 rounded-xl p-4 flex flex-col md:flex-row gap-4"
        >
          {/* Course */}
          <div className="flex-1">
            <label className="text-sm text-black/70 mb-1 block">
              Select Course
            </label>
            <select
              value={course}
              required
              onChange={(e) => {
                setCourse(e.target.value);
              }}
              className="w-full border border-black/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-amber-500"
            >
              <option value="">Choose a Course</option>
              <option value="MERN">MERN</option>
              <option value="Java">Java</option>
              <option value="Python">Python</option>
            </select>
          </div>

          {/* Subject */}
          <div className="flex-1">
            <label className="text-sm text-black/70 mb-1 block">
              Select Subject
            </label>
            <select
              value={subject}
              required
              disabled={!course}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full border border-black/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-amber-500 disabled:opacity-50"
            >
              <option value="">Choose a Subject</option>
              {course &&
                subjectsByCourse[course]?.map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
            </select>
          </div>

          {/* Question Type */}
          <div className="flex-1">
            <label className="text-sm text-black/70 mb-1 block">
              Question Type
            </label>
            <select
              value={questionType}
              required
              onChange={(e) => setQuestionType(e.target.value)}
              className="w-full border border-black/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-amber-500"
            >
              <option value="">Select Question Type</option>
              <option value="Coding">Coding</option>
              <option value="Interview">Interview</option>
            </select>
          </div>

          {/* Company */}
          <div className="flex-1">
            <label className="text-sm text-black/70 mb-1 block">
              Company Type
            </label>
            <select
              value={companyType}
              onChange={(e) => setCompanyType(e.target.value)}
              className="w-full border border-black/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-amber-500"
            >
              <option value="">All company</option>
              <option value="Start up">Start up</option>
              <option value="MNC">MNC</option>
            </select>
          </div>

          {/* Location */}
          <div className="flex-1">
            <label className="text-sm text-black/70 mb-1 block">Location</label>
            <select
              value={location}
              required
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border border-black/10 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-amber-500"
            >
              <option value="">Select location</option>
              <option value="BBSR">BBSR</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Kolkata">Kolkata</option>
              <option value="Pune">Pune</option>
            </select>
          </div>

          {/* Search */}
          <div className="flex items-end">
            <button
              type="submit"
              className="h-[42px] px-6 rounded-lg bg-amber-500 hover:bg-amber-400 transition font-medium text-white w-full md:w-auto"
            >
              🔍 Search
            </button>
          </div>
        </form>

        <div>
          {filteredQuestions.length === 0
            ? questions.map((filteredQuestion, index) => {
                return (
                  <div key={index} className="flex flex-col lg:flex-row mt-2">
                    <div className="w-full bg-gray-100/20 dark:bg-gray-900 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-800">
                      <div className="flex justify-between">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          {filteredQuestion?.question}
                        </h3>
                        <div className="flex mt-1">
                          <span className=" py-1 mr-2 text-xs font-light">
                            Added By: {filteredQuestion?.user?.username}
                          </span>
                          <span className="px-3 py-1 text-xs font-bold text-green-600">
                            {filteredQuestion?.questionType}
                          </span>
                        </div>
                      </div>

                      <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
                        <span className="font-bold text-gray-500">
                          Answer:{" "}
                        </span>
                        {filteredQuestion?.answer}
                      </p>
                    </div>
                  </div>
                );
              })
            : filteredQuestions.map((filteredQuestion, index) => {
                return (
                  <div key={index} className="flex flex-col lg:flex-row mt-2">
                    <div className="w-full bg-gray-100/20 dark:bg-gray-900 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-800">
                      <div className="flex justify-between">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                          {filteredQuestion?.question}
                        </h3>
                        <div className="flex mt-1">
                          <span className=" py-1 mr-2 text-xs font-light">
                            Added By: {filteredQuestion?.user?.username}
                          </span>
                          <span className="px-3 py-1 text-xs font-bold text-green-600">
                            {filteredQuestion?.questionType}
                          </span>
                        </div>
                      </div>

                      <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
                        <span className="font-bold text-gray-500">
                          Answer:{" "}
                        </span>
                        {filteredQuestion?.answer}
                      </p>
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
