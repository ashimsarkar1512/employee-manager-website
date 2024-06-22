
import PrimaryButton from "../../../components/PrimaryButton";
import DefaultInput from "../../../components/DefaultInput";
import DefaultLabel from "../../../components/DefaultLabel";
import SectionTitle from "../../../components/SectionTitle2";
import PageTitle from "../../../components/PageTitle";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure";
import useUserData from "../../../Hooks/useUserData";
import { Link, useNavigate } from "react-router-dom";

function AddAsset() {
    const { userData } = useUserData();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const form = e.target;
      const productName = form.product_name.value;
      const productType = form.product_type.value;
      // const productQuantity = form.product_quantity.value;
      const productQuantity = Number(form.product_quantity.value);
  
      const assetData = {
        product_name: productName,
        product_type: productType,
        product_quantity: productQuantity,
        creator_name: userData.name,
        creator_email: userData.email,
        company_name: userData.company_name,
        created_date: new Date().toISOString(),
      };
  
      try {
        const response = await axiosSecure.post("/assets", assetData);
        if (response.data.insertedId) {
          Swal.fire({
            icon: "success",
            title: "Asset Created!",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/dashboard/assetList");
        }
      } catch (error) {
        const errorMessage = error.message;
        Swal.fire({
          icon: "error",
          title: `${errorMessage}`,
        });
      }
    };
  
    return (
      <section className="py-8">
        <PageTitle title={"Add an Asset"} />
        {!userData?.payment_status ? (
          <div className="text-center">
            <p className="text-red-700 font-bold text-xl mb-4">
              You Have To Pay First
            </p>
            <Link to="/payment">
              <PrimaryButton
                buttonName={"Go For Payment"}
                buttonBGColor={"bg-green-700"}
                buttonTextColor={"text-white"}
              />
            </Link>
          </div>
        ) : (
          <div className="template-container">
            <div className="text-center">
              <SectionTitle sectionTitle={"Add an Asset"} />
            </div>
            <form
              className="mt-6 w-full md:w-2/3 mx-auto"
              onSubmit={handleSubmit}
            >
              <div className="mb-3">
                <div className="mb-2">
                  <DefaultLabel labelName={"Product Name"} />
                </div>
                <DefaultInput
                  inputType={"text"}
                  inputName={"product_name"}
                  inputPlaceholder={"Product Name"}
                />
              </div>
              <div className="w-full mb-3">
                <div className="mb-2">
                  <DefaultLabel labelName={"Product Type"} />
                </div>
                <select
                  required
                  name="product_type"
                  className="w-full p-2 border border-green-700 rounded-md text-lg"
                >
                  <option value="" selected disabled>
                    Select Option
                  </option>
                  <option value="Returnable">Returnable</option>
                  <option value="Non-Returnable">Non-Returnable</option>
                </select>
              </div>
              <div className="w-full mb-6">
                <div className="mb-2">
                  <DefaultLabel labelName={"Product Quantity"} />
                </div>
                <DefaultInput
                  inputType={"number"}
                  inputName={"product_quantity"}
                  inputPlaceholder={"Product Quantity"}
                />
              </div>
              <div className="text-center">
                <PrimaryButton
                  buttonType={"submit"}
                  buttonName={"Add"}
                  buttonBGColor={"bg-primary"}
                  buttonTextColor={"text-white"}
                />
              </div>
            </form>
          </div>
        )}
      </section>
    );
  }
  
  export default AddAsset;