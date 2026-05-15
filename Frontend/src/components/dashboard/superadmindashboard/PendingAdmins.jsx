import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { axiosInstance } from "../../../API/axiosInstance";
const PendingAdmins = () => {
  const [admins, setAdmins] = useState([]);

  const fdata = async () => {
    const { data } = await axiosInstance.get(
      "/pendingadmins",
    );
    setAdmins(data);
  };

  useEffect(() => {
    fdata();
  }, []);

  const approval = async (status, mail) => {
    try {
      const { data } = await axiosInstance.post(
        "/pendingadmins/status",
        {
          status: status,
          email: mail,
        },
      );
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      {admins.length == 0 ? (
        <div className="w-screen h-min-[91vh] flex items-center justify-center bg-gray-50">
          <div className="text-center max-w-md px-6">
            <h1 className="text-2xl font-semibold text-gray-800 mb-2">
              Nothing here yet
            </h1>

            <p className="text-gray-500 mb-6">
              There's no Admins to display right now.
            </p>
          </div>
        </div>
      ) : (
        admins.map((admin) => {
          return (
            <div
              key={admin.email}
              className="flex items-center flex-col pt-5 w-full"
            >
              <div className="w-full max-w-md rounded-2xl bg-white shadow-lg border border-gray-200 p-6 hover:shadow-xl transition">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Admin Registration Request
                </h2>

                <div className="space-y-2 text-sm text-gray-700">
                  <p>
                    <span className="font-medium text-gray-900">Email:</span>
                    {admin.email}
                  </p>
                  <p>
                    <span className="font-medium text-gray-900">Gender:</span>
                    {admin.gender}
                  </p>
                  <p>
                    <span className="font-medium text-gray-900">Course:</span>
                    {admin.course}
                  </p>
                  <p>
                    <span className="font-medium text-gray-900">Role:</span>
                    {admin.role}
                  </p>
                </div>

                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => approval(true, admin.email)}
                    className="flex-1 rounded-xl bg-green-600 px-4 py-2 text-white font-medium hover:bg-green-700 transition"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() => approval(false, admin.email)}
                    className="flex-1 rounded-xl bg-red-600 px-4 py-2 text-white font-medium hover:bg-red-700 transition"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          );
        })
      )}
    </>
  );
};

export default PendingAdmins;
