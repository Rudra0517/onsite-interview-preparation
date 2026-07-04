import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../../API/axiosInstance";
import { toast } from "react-toastify";
import { MdOutlineEmail } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { MdOutlineTransgender } from "react-icons/md";
import { FaBook } from "react-icons/fa";
import { MdOutlineMoreTime } from "react-icons/md";
import { MdNotificationsActive } from "react-icons/md";
import { FaScrewdriverWrench } from "react-icons/fa6";

const AllUsers = () => {
  const [users, serUsers] = useState([]);
  const [status, setStatus] = useState(false);
  const [freeze, setFreeze] = useState(false);

  const freezeUser = async (email, isBlocked) => {
    try {
      const data = await axiosInstance.put("/freeze", {
        isBlocked: isBlocked,
        email: email,
      });
      setStatus(isBlocked);
      setFreeze(!freeze);
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteUser = async (email) => {
    if (!confirm("Are you sure want to delete the user?")) {
      return;
    }
    const data = await axiosInstance.delete("/delete", {
      data: { email },
    });
    if (data.status === 200) {
      return toast.success("User deleted successfully.");
    }
  };

  const fdata = async () => {
    try {
      const { data } = await axiosInstance.get("/allusersbycourse", {
        auth: true,
      });
      serUsers(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fdata();
  }, []);

  return (
    <div className="w-full">
      {!users || users.length === 0 ? (
        <div className="w-full min-h-[91vh] flex items-center justify-center bg-gray-50">
          <div className="text-center max-w-md px-6">
            <h1 className="text-2xl font-semibold text-gray-800 mb-2">
              Nothing here yet
            </h1>

            <p className="text-gray-500 mb-6">
              There are no admins to display right now.
            </p>
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2 text-center">
                  <span className="flex justify-center items-center gap-2">
                    <FaUserAlt />
                    Username
                  </span>
                </th>
                <th className="border px-4 py-2 text-center">
                  <span className="flex justify-center items-center gap-2">
                    <MdOutlineEmail />
                    Email
                  </span>
                </th>
                <th className="border px-4 py-2 text-center">
                  <span className="flex justify-center items-center gap-2">
                    <MdOutlineTransgender />
                    Gender
                  </span>
                </th>
                <th className="border px-4 py-2 text-center">
                  <span className="flex justify-center items-center gap-2">
                    <FaBook />
                    Course
                  </span>
                </th>
                <th className="border px-4 py-2 text-center">
                  <span className="flex justify-center items-center gap-2">
                    <MdOutlineMoreTime />
                    Created At
                  </span>
                </th>
                <th className="border px-4 py-2 text-center">
                  <span className="flex justify-center items-center gap-2">
                    <MdNotificationsActive />
                    Status
                  </span>
                </th>
                <th className="border px-4 py-2 text-center">
                  <span className="flex justify-center items-center gap-2">
                    <FaScrewdriverWrench />
                    Action
                  </span>
                </th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id || user.email}
                  className="bg-white hover:bg-gray-50 transition"
                >
                  <td className="border px-4 py-2 text-center">
                    {user.username}
                  </td>

                  <td className="border px-4 py-2 text-center">{user.email}</td>

                  <td className="border px-4 py-2 text-center">
                    {user.gender}
                  </td>

                  <td className="border px-4 py-2 text-center">
                    {user.course?.toUpperCase()}
                  </td>

                  <td className="border px-4 py-2 text-center">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                        user.isBlocked
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {user.isBlocked ? "Freeze" : "Active"}
                    </span>
                  </td>

                  <td className="border py-2 text-center">
                    <div className="flex justify-center gap-3">
                      <button
                        onClick={() => freezeUser(user.email, !user.isBlocked)}
                        className="px-4 py-2 text-xs font-semibold rounded-xl bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
                      >
                        {user.isBlocked ? "Unfreeze" : "Freeze"}
                      </button>
                      <button
                        onClick={() => deleteUser(user.email)}
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
      )}
    </div>
  );
};

export default AllUsers;
