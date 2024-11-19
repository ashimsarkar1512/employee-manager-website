import PrimaryButton from "../../components/PrimaryButton";
import DefaultInput from "../../components/DefaultInput";
import DefaultLabel from "../../components/DefaultLabel";
import PageTitle from "../../components/PageTitle";
import SectionTitle from "../../components/SectionTitle2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";
import axios from "axios";

function JoinAsHR() {
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const { createUser, setUser, updateUserProfile, loading } = useContext(AuthContext);
  const [formLoading, setFormLoading] = useState(false);
  const [isImageValidated, setIsImageValidated] = useState(false);

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setIsImageValidated(false);
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const dob = form.dob.value;
    let company_name = form.company_name.value.replace(/\s+/g, "");
    const packages = form.packages.value;
    const image = form.image.files[0];
    let formData = new FormData();
  
    // Image Size Validation
    if (image && image.size <= 1000 * 1024) {
      formData.append("image", image);
      setIsImageValidated(true);
    } else {
      Swal.fire({
        icon: "error",
        title: "Image Size Should Be Less or Equal 100 KB",
      });
      setFormLoading(false);
      return;
    }
  
    // Password Validation
    if (password.length < 6) {
      Swal.fire({
        icon: "error",
        title: "Please Enter A Password Of At Least 6 Characters",
      });
      setFormLoading(false);
      return;
    } else if (!/[A-Z]/.test(password)) {
      Swal.fire({
        icon: "error",
        title: "Please Enter A Password Of At Least 1 Uppercase Character",
      });
      setFormLoading(false);
      return;
    } else if (!/[a-z]/.test(password)) {
      Swal.fire({
        icon: "error",
        title: "Please Enter A Password Of At Least 1 Lowercase Character",
      });
      setFormLoading(false);
      return;
    }
  
    company_name = company_name.toLowerCase();
  
    try {
      const { data } = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
        formData
      );
  
      const usersInfo = {
        name,
        email,
        password,
        company_logo: data.data.display_url,
        dob,
        company_name,
        packages,
        role: "hr",
        payment_status: false,
      };
  
      const { data: users } = await axiosPublic.post("/users", usersInfo);
  
      if (users.insertedId) {
        await createUser(email, password);
        await updateUserProfile(name);
        setUser((prevUser) => ({ ...prevUser, displayName: name }));
        Swal.fire({
          icon: "success",
          title: "HR Created!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/payment");
      } else {
        Swal.fire({
          icon: "error",
          title: users.message,
        });
      }
      setFormLoading(false);
    } catch (error) {
      setFormLoading(false);
      const errorMessage = error.message
        ? error.message
            .split("/")[1]
            .replace(/\)\./g, "")
            .replace(/-/g, " ")
            .replace(/\b\w/g, (char) => char.toUpperCase())
        : "An error occurred";
      Swal.fire({
        icon: "error",
        title: `${errorMessage}`,
      });
    }
  };

  return (
    <>
      <PageTitle title={"Join As HR Manager"} />
      <section className="template-container mt-8 h-screen flex justify-center items-center">
        <div className="flex items-center justify-center w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
          <div className="w-full">
            <SectionTitle sectionTitle={"Join As HR Manager"} />
            {loading || (formLoading && isImageValidated && (
              <p className="text-center text-red-600 text-3xl my-2">
                Please wait...
              </p>
            ))}
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
                  <DefaultLabel labelName={"Company Name"} />
                  <DefaultInput
                    inputType={"text"}
                    inputName={"company_name"}
                    inputPlaceholder={"Company Name"}
                  />
                </div>

                <div>
                  <DefaultLabel labelName={"Select A Package"} />
                  <select
                    required
                    className="w-full border border-gray-300 p-3 rounded-md text-base font-normal"
                    name="packages"
                  >
                    <option value="" selected disabled>
                      Choose your package
                    </option>
                    <option value="basic">5 Members for $5</option>
                    <option value="standard">10 Members for $8</option>
                    <option value="premium">20 Members for $15</option>
                  </select>
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
                  <DefaultLabel labelName={"Data Of Birth"} />
                  <DefaultInput inputType={"date"} inputName={"dob"} />
                </div>
                <div>
                  <DefaultLabel labelName={"Company Logo"} />
                  <label className="block">
                    <span className="sr-only">Choose profile photo</span>
                    <input
                      required
                      type="file"
                      name="image"
                      className="block w-full text-sm text-slate-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-blue-50 file:text-primary
                        hover:file:bg-blue-100"
                    />
                  </label>
                </div>
              </div>
              <div className="flex justify-center items-center gap-3 flex-wrap">
                <PrimaryButton
                  buttonType={"submit"}
                  buttonName={"SignUp"}
                  buttonTextColor={"text-white"}
                  buttonBGColor={"bg-green-600"}
                />
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default JoinAsHR;
