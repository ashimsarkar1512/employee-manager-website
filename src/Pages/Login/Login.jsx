import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import { FaEye, FaEyeSlash } from "react-icons/fa"; 
import SocialLogin from "../../components/SocialLogin/SocialLogin";
import Swal from "sweetalert2";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { signInUser } = useContext(AuthContext);

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);

    signInUser(email, password)
      .then(result => {
        const user = result.user;
        console.log(user);
        Swal.fire({
          title: "User logged in successfully",
          showClass: {
            popup: `animate__animated animate__fadeInUp animate__faster`,
          },
          hideClass: {
            popup: `animate__animated animate__fadeOutDown animate__faster`,
          },
        });
        navigate('/');
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: error.message,
        });
      });
  };

  return (
    <div className="h-screen flex items-center justify-center lg:pt-12 bg-gray-100">
      <div className="w-[80%] mx-auto lg:w-[50%]">
        <h1 className="text-2xl font-bold text-center text-green-500 my-5">Log in to your account</h1>
        <div className="w-full lg:w-[75%] mx-auto">
          <form onSubmit={handleLogin} className="space-y-10">
            {/* Email input */}
            <input
              className="block w-full rounded outline-none border-b-2 focus:border-orange-500 p-4"
              type="email"
              name="email"
              placeholder="Email"
              required
            />
            {/* Password input with toggle for show password */}
            <div className="relative">
              <input
                className="block w-full rounded outline-none border-b-2 focus:border-orange-500 p-4 pr-10"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                required
              />
              {/* Show Password toggle icon */}
              <span
                className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <button className="btn w-full text-white text-xl bg-green-600">
              Log in
            </button>
          </form>
          <hr className="mt-5" />
          <div className="text-5xl flex ml-20 lg:ml-44">
            <SocialLogin />
          </div>
          
          <h1 className="font-medium text-center ">
            Do not have an account?{" "}
            <Link className="text-blue-500 font-semibold" to="/register">
              Register
            </Link>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Login;
