import useAxiosPublic from "../../Hooks/useAxiosPublic";
import PageTitle from "../../components/PageTitle";
import PrimaryButton from "../../components/PrimaryButton";
import DefaultInput from "../../components/DefaultInput";
import DefaultLabel from "../../components/DefaultLabel";
import SectionTitle from "../../components/SectionTitle2";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";
import { updateProfile } from "firebase/auth";
import { FaGoogle } from "react-icons/fa";

function JoinAsEmployee() {
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const { createUser, setUser, signInWithGoogle } = useContext(AuthContext);

  const handleCreateUser = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const dob = form.dob.value;

    // Validation
    if (password.length < 6) {
      Swal.fire({
        icon: "error",
        title: "Please Enter A Password Of At Least 6 Characters",
      });
      return;
    } else if (!/[A-Z]/.test(password)) {
      Swal.fire({
        icon: "error",
        title: "Please Enter A Password Of At Least 1 Uppercase Character",
      });
      return;
    } else if (!/[a-z]/.test(password)) {
      Swal.fire({
        icon: "error",
        title: "Please Enter A Password Of At Least 1 Lowercase Character",
      });
      return;
    }

    try {
      const usersInfo = {
        name: name,
        email: email,
        dob: dob,
        role: "employee",
      };

      const response = await axiosPublic.post("/users", usersInfo);
      console.log(response);
      const result = await createUser(email, password);
      await updateProfile(result.user, {
        displayName: name,
      });
      setUser((prevUser) => {
        return { ...prevUser, displayName: name };
      });
      Swal.fire({
        icon: "success",
        title: "Employee Created!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");
    } catch (error) {
      const errorMessage =
        error.response?.data.message ||
        error.message
          .split("/")[1]
          .replace(/\)\./g, "")
          .replace(/-/g, " ")
          .replace(/\b\w/g, (char) => char.toUpperCase());
      Swal.fire({
        icon: "error",
        title: `${errorMessage}`,
      });
    }
  };

  const handleCreateUserByGoogle = (event) => {
    event.preventDefault();
    signInWithGoogle()
      .then((result) => {
        const usersInfo = {
          name: result.user?.displayName,
          email: result.user?.email,
          profile_image: result.user?.photoURL,
          role: "employee",
        };
        axiosPublic.post("/users", usersInfo).then((response) => {
          console.log(response.data);
          setUser(result.user);
          Swal.fire({
            icon: "success",
            title: "Employee Created!",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/");
        });
      })
      .catch((error) => {
        const errorMessage = error.message
          .split("/")[1]
          .replace(/\)\./g, "")
          .replace(/-/g, " ")
          .replace(/\b\w/g, (char) => char.toUpperCase());
        Swal.fire({
          icon: "error",
          title: `${errorMessage}`,
        });
      });
  };

  return (
    <>
      <PageTitle title={"Join As Employee"} />
      <section className="template-container py-6 h-screen flex justify-center items-center">
        <div className="flex items-center justify-center w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <div className="w-full">
            <SectionTitle sectionTitle={"Join As Employee"} />
            <form onSubmit={handleCreateUser} className="md:px-0 px-2 pb-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <div>
                  <DefaultLabel labelName={"Full Name"} />
                  <DefaultInput
                    inputType={"text"}
                    inputName={"name"}
                    inputPlaceholder={"Full Name"}
                  />
                </div>
                <div>
                  <DefaultLabel labelName={"Email"} />
                  <DefaultInput
                    inputType={"email"}
                    inputName={"email"}
                    inputPlaceholder={"Email"}
                  />
                </div>
                <div>
                  <DefaultLabel labelName={"Password"} />
                  <DefaultInput
                    inputType={"password"}
                    inputName={"password"}
                    inputPlaceholder={"Password"}
                  />
                </div>
                <div>
                  <DefaultLabel labelName={"Date Of Birth"} />
                  <DefaultInput inputType={"date"} inputName={"dob"} />
                </div>
              </div>
              <div className="flex justify-center items-center gap-3 flex-wrap">
                <PrimaryButton
                  buttonType={"submit"}
                  buttonName={"Signup"}
                  buttonTextColor={"text-white"}
                  buttonBGColor={"bg-green-600"}
                />
              </div>
            </form>
            <p className="mb-1 font-roboto text-center text-lg">Or Signup With Google</p>
            <span onClick={handleCreateUserByGoogle}>
              <FaGoogle className= " text-2xl text-green-600 cursor-pointer" />
            </span>
          </div>
        </div>
      </section>
    </>
  );
}

export default JoinAsEmployee;
