import { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [scrolled, setScrolled] = useState(false);
  const navigate=useNavigate()

   const handleLogout = () => {
    logOut()
      .then(() => {
        navigate("/"); // Redirect to home after logout
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-base font-medium text-black"
              : "text-base text-black hover:text-green-500"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/employee"
          className={({ isActive }) =>
            isActive
              ? "text-base font-medium text-black"
              : "text-base text-black hover:text-green-500"
          }
        >
          Join as Employee
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/manager"
          className={({ isActive }) =>
            isActive
              ? "text-base font-medium text-black"
              : "text-base text-black hover:text-green-500"
          }
        >
          Join as HR Manager
        </NavLink>
      </li>
    </>
  );

  return (
    <div
      className={`navbar fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white text-black shadow-md" : "bg-transparent text-white"
      }`}
    >
      <div className="navbar max-w-screen-xl mx-auto h-[60px]">
        {/* Navbar Start */}
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] bg-white text-black p-2 shadow rounded-box w-52"
            >
              {navLinks}
            </ul>
          </div>
          <Link to="/" className="flex items-center gap-2 text-lg font-bold">
            <img
              src="https://i.ibb.co/Wff1shd/download-1.jpg"
              alt="Logo"
              className="w-8 h-8 rounded-full"
            />
            <span className="text-black">Trinet</span>
          </Link>
        </div>

        {/* Navbar Center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navLinks}</ul>
        </div>

        {/* Navbar End */}
        <div className="navbar-end">
          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-8 h-8 rounded-full">
                  <img
                    src={user?.photoURL || "https://via.placeholder.com/150"}
                    alt="User"
                    className="w-full h-full rounded-full"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] bg-white text-black p-2 shadow rounded-box w-52"
              >
                <li className="text-center font-medium">{user?.displayName}</li>
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="text-red-500 hover:underline"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/login">
              <button className="px-4 py-2 rounded-md border text-black text-sm hover:text-green-500">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
