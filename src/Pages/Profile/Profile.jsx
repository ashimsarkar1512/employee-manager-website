

import { useForm } from "react-hook-form";
import { AuthContext } from "../../Providers/AuthProvider";
import { useContext, useEffect } from "react";
import Swal from "sweetalert2";
import Avatar from "react-avatar";



const Profile = () => {
  const { user, setUser, updateUserProfile } = useContext(AuthContext); // Assuming setUser is available to update user context
  const { register, handleSubmit,  setValue, watch } = useForm();

  useEffect(() => {
    if (user) {
      setValue("displayName", user.displayName);
      setValue("email", user.email);
    }
  }, [user, setValue]);

  const onSubmit = (data) => {
    updateUserProfile(data.displayName, user?.photoURL)
      .then(() => {
        // Update user context or state here
        setUser((prevUser) => ({
          ...prevUser,
          displayName: data.displayName,
        }));

        Swal.fire({
          position: "center",
          icon: "success",
          title: "Profile updated successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        console.log("Name updated successfully");
      })
      .catch((error) => {
        console.error("Error updating name:", error);
      });
  };

  const displayNameValue = watch("displayName");

  const isSubmitDisabled = user?.displayName === displayNameValue;

  return (
    <div className="min-h-screen container mx-auto flex justify-center items-center">
      <div className="lg:w-4/12 md:w-5/12 w-full flex flex-col justify-center items-center shadow-xl py-12 border">
        {/* <img className=" rounded-full" src={user?.photoURL} alt="" /> */}
        {user && (
          <>
            <div className="pb-3 flex justify-center items-center">
              <Avatar
                className="w-24 h-24"
                src={
                  user?.photoURL
                    ? user?.photoURL
                    : "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Missing_avatar.svg/2048px-Missing_avatar.svg.png"
                }
                alt="avatar"
              />
            </div>
          </>
        )}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col items-center space-y-3"
        >
          <div>
            <input
              className="text-center border-b focus:outline-none px-2"
              type="text"
              {...register("displayName")}
              name="displayName"
              id="displayName"
            />
          </div>
          <div>
            <p className="text-center border-none bg-blue-50 px-2">
              {user?.email}
            </p>
          </div>
          <button
            className={`py-2 font-bold font-roboto px-5 text-white ${
              isSubmitDisabled ? "bg-gray-400" : "bg-primary"
            }`}
            type="submit"
            disabled={isSubmitDisabled}
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
