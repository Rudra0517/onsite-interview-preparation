import React from "react";
import { useState } from "react";
import { axiosInstance } from "../../../API/axiosInstance";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/AuthContext";

const CreateQuestion = () => {
  const navigate = useNavigate();
  const [course, setCourse] = useState("");
  const { userData } = useAuth();
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    questionType: "",
    subject: "",
    companyType: "",
    location: "",
  });
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
  useEffect(() => {
    const fdata = async () => {
      setCourse(userData.course);
    };
    fdata();
  }, []);

  const handleInput = async (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleForm = async (e) => {
    try {
      e.preventDefault();
      const data = await axiosInstance.post("/createQuestion", formData, {
        auth: true,
      });
      console.log(formData);
      toast.success("Question created successfully.");
      navigate("/dashboard/admin/allquestions");
      setFormData({
        question: "",
        answer: "",
        questionType: "",
        subject: "",
        companyType: "",
        location: "",
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl p-8 mb-8 border border-gray-200 dark:border-gray-800">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Create New Question
        </h2>

        <form className="space-y-5" onSubmit={handleForm}>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Question
            </label>
            <input
              type="text"
              placeholder="Enter the question"
              onChange={handleInput}
              value={formData.question}
              name="question"
              required
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Answer
            </label>
            <textarea
              rows="6"
              required
              placeholder="Enter the answer"
              onChange={handleInput}
              name="answer"
              value={formData.answer}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Question Type
              </label>
              <select
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                value={formData.questionType}
                required
                name="questionType"
                onChange={handleInput}
              >
                <option value="">---select question type---</option>
                <option value="Interview">Interview</option>
                <option value="Coding">Coding</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Subject
              </label>
              <select
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                name="subject"
                required
                onChange={handleInput}
                value={formData.subject}
              >
                <option value="">-- Choose a Subject --</option>
                {subjectsByCourse[course]?.map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Company Type
              </label>
              <select
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                value={formData.companyType}
                required
                name="companyType"
                onChange={handleInput}
              >
                <option value="">---select company type---</option>
                <option value="MNC">MNC</option>
                <option value="Start up">Start up</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                placeholder="e.g Bangalore"
                onChange={handleInput}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              />
            </div>
          </div>
          <button className="w-full py-3 text-white bg-amber-400 font-semibold rounded-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300">
            ➕ Add Question
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateQuestion;
