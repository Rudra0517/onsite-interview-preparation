import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { axiosInstance } from "../../../API/axiosInstance";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { ImCross } from "react-icons/im";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/AuthContext";

const AllQuestions = () => {
  const { userData } = useAuth();
  const [toBeUpdateQuestion, setToBeUpdateQuestion] = useState({
    question: "",
    answer: "",
    questionType: "",
    subject: "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setToBeUpdateQuestion({ ...toBeUpdateQuestion, [name]: value });
  };

  const [questionTypeFilter, setQuestionTypeFilter] = useState({
    questionType: "",
  });

  const [filteredQuestions, setFilteredQuestions] = useState([]);

  const [modal, setModal] = useState(false);

  const [course, setCourse] = useState("");

  useEffect(() => {
    const fdata = async () => {
      try {
        setCourse(userData.course);
      } catch (error) {
        console.log(error.message);
      }
    };
    fdata();
  }, []);

  const handleQuestionTypeFilter = (e) => {
    const { name, value } = e.target;
    setQuestionTypeFilter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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

  //* Filtered questions by type
  useEffect(() => {
    const fetchFilteredQuestions = async () => {
      try {
        const { data } = await axiosInstance.post(
          "/filterquestionsByType",
          questionTypeFilter,
        );
        setFilteredQuestions(data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchFilteredQuestions();
  }, [questionTypeFilter, modal]);

  //* Edit the question
  const editQuestion = async (id) => {
    try {
      setModal(true);
      const { data } = await axiosInstance.post(
        "/getquestion",
        { _id: id },
        { auth: true },
      );
      setToBeUpdateQuestion(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axiosInstance.put(
        "/updatequestion",
        toBeUpdateQuestion,
      );
      setModal(false);
      toast.success("Question updated successfully.");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteQuestion = async (id) => {
    try {
      const { data } = await axiosInstance.delete("/deletequestion", {
        data: { id },
      });
      toast.success("Question deleted successfully.");
      setModal(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="overflow-x-auto bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800">
      <table className="w-full border-collapse">
        {/* Table Head */}
        <thead className="sticky top-0 bg-gray-100 dark:bg-gray-800 z-10">
          <tr className="text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
            <th className="px-4 py-3">#</th>
            <th className="px-4 py-3">Question</th>
            <th className="px-4 py-3">Subject</th>

            <th className="px-4 py-3">
              <div className="flex items-center gap-2">
                <span>Type</span>
                <select
                  name="questionType"
                  onChange={handleQuestionTypeFilter}
                  className="text-sm rounded-md dark:border-gray-600
                   dark:bg-gray-700 text-gray-700 dark:text-gray-200
                     px-2 py-1 outline-none"
                >
                  <option value="">All</option>
                  <option value="Interview">Interview</option>
                  <option value="Coding">Coding</option>
                </select>
              </div>
            </th>

            <th className="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {filteredQuestions.map((ele, index) => (
            <tr
              key={index}
              className="border-t border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
            >
              {/* Index */}
              <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                {index + 1}
              </td>

              {/* Question */}
              <td className="px-4 py-3 max-w-md">
                <p className="font-medium text-gray-900 dark:text-white line-clamp-2">
                  {ele.question}
                </p>
              </td>

              {/* Subject */}
              <td className="px-4 py-3">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {ele.subject}
                </span>
              </td>

              {/* Question Type */}
              <td className="px-4 py-3">
                <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
                  {ele.questionType}
                </span>
              </td>

              {/* Actions */}
              <td className="px-4 py-3">
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => editQuestion(ele._id)}
                    className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition"
                  >
                    <FiEdit2 className="text-sm" />
                    Edit
                  </button>
                  {modal && (
                    <form
                      onSubmit={handleUpdate}
                      className="fixed bg-gray-900/30 min-h-screen z-10 w-screen flex justify-center items-center top-0 left-0 text-white"
                    >
                      <div className="w-[50%] bg-white shadow-lg rounded-lg pb-4">
                        <p className="text-end pr-2 pt-2">
                          <button
                            onClick={() => setModal(false)}
                            className="text-black"
                          >
                            <ImCross />
                          </button>
                        </p>
                        <div className="w-[95%] mx-auto">
                          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Question
                          </label>
                          <input
                            type="text"
                            placeholder="Enter the question"
                            onChange={handleInput}
                            value={toBeUpdateQuestion?.question}
                            name="question"
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          />
                        </div>

                        <div className="w-[95%] mx-auto">
                          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Answer
                          </label>
                          <textarea
                            rows="6"
                            placeholder="Enter the answer"
                            onChange={handleInput}
                            name="answer"
                            value={toBeUpdateQuestion?.answer}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none"
                          />
                        </div>
                        <div className="w-[95%] mx-auto">
                          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Question Type
                          </label>
                          <select
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                            value={toBeUpdateQuestion?.questionType}
                            // required
                            name="questionType"
                            onChange={handleInput}
                          >
                            <option value="">---select question type---</option>
                            <option value="Interview">Interview</option>
                            <option value="Coding">Coding</option>
                          </select>
                        </div>

                        <div className="w-[95%] mx-auto">
                          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Subject
                          </label>
                          <select
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                            name="subject"
                            onChange={handleInput}
                            value={toBeUpdateQuestion?.subject}
                          >
                            <option value="">-- Choose a Subject --</option>
                            {subjectsByCourse[course]?.map((sub) => (
                              <option key={sub} value={sub}>
                                {sub}
                              </option>
                            ))}
                          </select>
                          <div>
                            <button
                              type="submit"
                              className="w-full mt-6 rounded-xl bg-amber-500 py-2 text-white font-semibold shadow-lg hover:bg-amber-400 hover:shadow-xl transition"
                            >
                              UPDATE
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  )}
                  <button
                    onClick={() => deleteQuestion(ele._id)}
                    className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-md border border-red-500 text-red-600 hover:bg-red-50 transition"
                  >
                    <FiTrash2 className="text-sm" />
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllQuestions;
