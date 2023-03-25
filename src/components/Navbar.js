import Cookies from "js-cookie";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { profile, provider } = useContext(GlobalContext);

  return (
    <div>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl px-4 md:px-6 py-2.5">
          <div className="flex items-center">
            <img
              src="https://logopond.com/logos/b3958ca66429b7ca1c5af7d70e95ad78.png"
              className="h-6 mr-3 sm:h-9"
              alt="Job Hunter Logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              Job Hunter
            </span>
          </div>
          <div className="flex items-center">
            <p className="mr-6 text-sm font-medium text-gray-500 dark:text-white">
              Login with {provider} -{" "}
              {profile.name ? profile.name : profile.userID}
            </p>
            <Link
              className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline"
              onClick={() => {
                Cookies.remove("token");
                Cookies.remove("profile");
                Cookies.remove("provider");
                navigate("/");
              }}
            >
              Logout
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
