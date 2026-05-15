import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../../API/axiosInstance";

const AdminPannel = () => {
  const [allusers, setAllUsers] = useState([]);
  const fdata = async () => {
    const { data } = await axiosInstance("/allusers");
    setAllUsers(data);
  };

  useEffect(() => {
    fdata();
  }, []);
  return (
    <div className="h-full bg-gray-50overflow-x-auto bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 p-6 text-white">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm tracking-wide text-emerald-400">
            ADMIN DASHBOARD
          </p>
          <h1 className="mt-1 text-3xl font-bold text-gray-900">
            Admin management panel for daily operations
          </h1>
          <p className="mt-2 max-w-2xl text-gray-900">
            Add new questions, maintain your question bank and monitor learner
            activity from one place.
          </p>
        </div>

        <button className="rounded-lg bg-emerald-500 px-5 py-2 font-medium text-slate-900 transition hover:bg-emerald-400">
          <Link to="/dashboard/admin/createquestion"> + Add Question</Link>
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left Column */}
        <div className="col-span-12 md:col-span-4 space-y-6">
          <div className="rounded-xl bg-white p-6 shadow-md">
            <h3 className="text-lg text-gray-700 font-semibold">
              Focus This Week
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Keep your course fresh by adding interview and coding questions
              regularly.
            </p>

            <button className="mt-4 text-sm font-medium text-emerald-400 hover:underline">
              <Link to="/dashboard/admin/createquestion">
                Add new content →
              </Link>
            </button>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-md">
            <h3 className="text-lg text-gray-700 font-semibold">
              Question Bank
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Edit existing questions and remove outdated entries with one
              click.
            </p>

            <button className="mt-4 text-sm font-medium text-amber-400 hover:underline">
              <Link to="/dashboard/admin/allquestions">
                Open all questions →
              </Link>
            </button>
          </div>
        </div>

        {/* Right Column */}
        <div className="col-span-12 md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Total Users */}
          <div className="flex items-center justify-between rounded-xl bg-white p-5 shadow-md">
            <div>
              <p className="text-sm text-gray-700">Total Users</p>
              <h3 className="mt-1 text-2xl font-semibold text-gray-700">
                {allusers.length}
              </h3>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/20">
              <span className="text-emerald-400 text-lg">👥</span>
            </div>
          </div>

          {/* Course Enrollment */}
          <div className="flex items-center justify-between rounded-xl bg-white p-5 shadow-md">
            <div>
              <p className="text-sm text-gray-700">Course Enrollment</p>
              <h3 className="mt-1 text-2xl font-semibold text-gray-700">
                {allusers.length}
              </h3>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/20">
              <span className="text-amber-400 text-lg">🎓</span>
            </div>
          </div>

          {/* Blocked Accounts */}
          <div className="flex items-center justify-between rounded-xl bg-white p-5 shadow-md">
            <div>
              <p className="text-sm text-gray-700">Blocked Accounts</p>
              <h3 className="mt-1 text-2xl font-semibold text-gray-700">0</h3>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-rose-500/20">
              <span className="text-rose-400 text-lg">🚫</span>
            </div>
          </div>

          {/* New Registrations */}
          <div className="flex items-center justify-between rounded-xl bg-white p-5 shadow-md">
            <div>
              <p className="text-sm text-gray-700">New Registrations</p>
              <h3 className="mt-1 text-2xl font-semibold text-gray-700">
                {allusers.length}
              </h3>
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-500/20">
              <span className="text-sky-400 text-lg">✨</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPannel;
