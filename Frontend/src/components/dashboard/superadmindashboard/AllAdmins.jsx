import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../../API/axiosInstance";
import { toast } from "react-toastify";

const AllAdmins = () => {
  const [admins, setAdmins] = useState([]);
  const [status, setStatus] = useState(false);
  const [freeze, setFreeze] = useState(false);

  const fdata = async () => {
    const { data } = await axiosInstance.get("/alladmins");
    setAdmins(data);
  };

  useEffect(() => {
    fdata();
  }, [freeze]);

  const freezeAdmin = async (email, isBlocked) => {
    const data = await axiosInstance.put("/freeze", {
      isBlocked: isBlocked,
      email: email,
    });
    setStatus(isBlocked);
    setFreeze(!freeze);
  };

  const deleteAdmin = async (email) => {
    if (!confirm("Are you sure want to delete the admin?")) {
      return;
    }
    const data = await axiosInstance.delete(
      "/delete",
      { data: { email } },
    );
    if (data.status === 200) {
      return toast.success("Admin deleted successfully.");
    }
  };

  return (
    <div className="p-4 md:p-8 w-full">
      <div className="overflow-x-auto rounded-2xl shadow-lg bg-white">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                Username
              </th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                Email
              </th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                Course
              </th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                Status
              </th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {admins.map((admin, index) => (
              <tr key={index} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 text-sm text-center text-gray-800 font-medium">
                  {admin.username}
                </td>
                <td className="px-6 py-4 text-sm text-center text-gray-600 break-all">
                  {admin.email}
                </td>
                <td className="px-6 py-4 text-sm text-center text-gray-600">
                  {admin.course.toUpperCase()}
                </td>
                <td className="px-6 py-4 text-center">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                      admin.isBlocked
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {admin.isBlocked ? "Freeze" : "Active"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => freezeAdmin(admin.email, !admin.isBlocked)}
                      className="px-4 py-2 text-xs font-semibold rounded-xl bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
                    >
                      {admin.isBlocked ? "Unfreeze" : "Freeze"}
                    </button>
                    <button
                      onClick={() => deleteAdmin(admin.email)}
                      className="px-4 py-2 text-xs font-semibold rounded-xl bg-red-100 text-red-700 hover:bg-red-200 transition"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile-friendly card layout */}
      {/* <div className="flex flex-col gap-4 mt-6 md:hidden">
        {admins.map((admin, index) => (
          <div
            key={index}
            className="rounded-2xl border p-4 shadow-sm bg-white flex flex-col"
          >
            <div className="space-y-2 text-sm flex-1">
              <p>
                <span className="font-semibold">Username:</span>{" "}
                {admins.username}
              </p>
              <p>
                <span className="font-semibold">Email:</span> {admin.email}
              </p>
              <p>
                <span className="font-semibold">Course:</span> {admin.course}
              </p>
              <p>
                <span className="font-semibold">Status:</span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    admin.isBlocked
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {admin.isBlocked ? "Freeze" : "Active"}
                </span>
              </p>
            </div>
            <div className="flex gap-3 mt-4">
              <button
                onClick={freezeAdmin}
                className="flex-1 px-4 py-2 text-xs font-semibold rounded-xl bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
              >
                Freeze
              </button>
              <button className="flex-1 px-4 py-2 text-xs font-semibold rounded-xl bg-red-100 text-red-700 hover:bg-red-200 transition">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default AllAdmins;
