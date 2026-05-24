import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { IoIosLogIn } from "react-icons/io";
import ROUTES from "../../constants/routes";

const Navbar = () => {
  const { isLoggedIn, username, logout } = useAuth();
  const navigate = useNavigate();

  const firstLetter = username?.slice(0, 1).toUpperCase() ?? "";

  const handleLogout = async () => {
    await logout();
    navigate(ROUTES.LOGIN);
  };

  return (
    <nav className="w-full h-16 bg-teal-500  shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <Link to={ROUTES.HOME} className="text-lg font-semibold text-white">
            𝙥𝙧𝙤𝙟𝙚𝙘𝙩_𝙄𝘾
          </Link>
        </div>

        <div className="gap-8 mx-auto hidden sm:flex">
          <Link className="text-white hover:underline transition text-[1.1rem]">
            Home
          </Link>
          <Link
            to={ROUTES.ABOUT}
            className="text-white hover:underline transition text-[1.1rem]"
          >
            About
          </Link>
          <Link
            to={ROUTES.ABOUT}
            className="text-white hover:underline transition text-[1.1rem]"
          >
            Services
          </Link>
          <Link
            to={ROUTES.CONTACT}
            className="text-white hover:underline transition text-[1.1rem]"
          >
            Contact
          </Link>
        </div>
        {isLoggedIn ? (
          <div className="h-[3rem] w-[3rem] rounded-full text-blue-100 flex justify-center items-center bg-teal-700 mr-4 font-bold text-[1.6rem]">
            {firstLetter}
          </div>
        ) : null}

        <div>
          {!isLoggedIn ? (
            <button
              className="py-1 rounded-lg bg-amber-400 text-gray-700 font-bold w-[5rem] hover:bg-amber-500 hover:text-white hover:border-white border-[2px] flex justify-evenly items-center transition"
              onClick={() => navigate(ROUTES.LOGIN)}
            >
              Login
              <span className="mt-1">
                <IoIosLogIn />
              </span>
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
