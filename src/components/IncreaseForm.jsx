import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
// import DefaultLabel from "../label/DefaultLabel";
// import { Spinner } from "@material-tailwind/react";
import Swal from "sweetalert2";
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../Hooks/UseAxiosSecure";
import { useNavigate } from "react-router-dom";
import useUserData from "../Hooks/useUserData";
import { AuthContext } from "../Providers/AuthProvider";



function IncreaseForm() {
  const { user } = useContext(AuthContext);
  const { userData, isLoading, refetch } = useUserData();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [selectedPackage, setSelectedPackage] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();

  const handlePackageChange = (event) => {
    const packageValue = event.target.value;
    setSelectedPackage(packageValue);

    const packagePrices = {
      basic: 5,
      standard: 8,
      premium: 15,
    };

    setTotalPrice(packagePrices[packageValue] || 0);
  };

  useEffect(() => {
    if (totalPrice > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: totalPrice })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, totalPrice]);

  const calculateAdditionalLimit = (selectedPackage) => {
    const additionalLimits = {
      basic: 5,
      standard: 10,
      premium: 20,
    };

    return additionalLimits[selectedPackage] || 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error: paymentMethodError, paymentMethod } =
      await stripe.createPaymentMethod({
        type: "card",
        card,
      });

    if (paymentMethodError) {
      console.log("payment error", paymentMethodError);
      setError(paymentMethodError.message);
      return;
    } else {
      console.log("payment method", paymentMethod);
      setError("");
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log("confirm error", confirmError);
      setError(confirmError.message);
      return;
    } else {
      console.log("payment intent", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        console.log("transaction id", paymentIntent.id);
        setTransactionId(paymentIntent.id);

        const payment = {
          hr_email: user.email,
          email: user.email,
          price: totalPrice,
          transactionId: paymentIntent.id,
          payment_from_company: userData.company_name,
          payment_for_package: selectedPackage,
          date: new Date(),
          additionalLimit: calculateAdditionalLimit(selectedPackage),
        };
        try {
          const res = await axiosSecure.put("/payments", payment);
          if (res.data?.paymentResult?.insertedId) {
            Swal.fire({
              icon: "success",
              title: "Payment Done!",
              showConfirmButton: false,
              timer: 1500,
            });
            refetch();
            navigate("/add-employee");
          }
        } catch (err) {
          console.error("Error updating payment:", err);
          setError("Failed to update payment information.");
        }
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center mt-5">
        {/* <Spinner /> */}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      {totalPrice === 0 ? (
        <>
          {/* <Marquee className="mb-3 bg-gray-200 py-2 font-lato">
            <p className="ml-8">Select at least one package to proceed.</p>
            <p className="ml-8">Select at least one package to proceed.</p>
            <p className="ml-8">Select at least one package to proceed.</p>
            <p className="ml-8">Select at least one package to proceed.</p>
            <p className="ml-8">Select at least one package to proceed.</p>
            <p className="ml-8">Select at least one package to proceed.</p>
            <p className="ml-8">Select at least one package to proceed.</p>
            <p className="ml-8">Select at least one package to proceed.</p>
          </Marquee> */}
          <p>ashim</p>
        </>
      ) : (
        <p className="mb-3 text-center">Total Payment: ${totalPrice}</p>
      )}

      <div className="mb-3">
        {/* <DefaultLabel labelName={"Select A Package"} /> */}
        <label htmlFor="">Select A Package</label>
        <select
          required
          className="w-full border border-gray-300 p-3 rounded-md text-base font-normal"
          name="packages"
          onChange={handlePackageChange}
        >
          <option value="" selected disabled>
            Choose your package
          </option>
          <option value="basic">5 Members for $5</option>
          <option value="standard">10 Members for $8</option>
          <option value="premium">20 Members for $15</option>
        </select>
      </div>
      <div className="border border-blue-700 p-2 rounded-md shadow">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
      </div>
      <div className="text-center">
        <button
          className={`px-5 uppercase font-bold rounded-md mt-5 py-2 bg-primary text-white ${
            totalPrice === 0 ? "cursor-not-allowed disabled opacity-50" : ""
          }`}
          type="submit"
          disabled={!stripe || !clientSecret || totalPrice === 0}
        >
          Pay to increase
        </button>
      </div>
      <p className="text-red-600">{error}</p>
      {transactionId && (
        <p className="text-green-600">Your transaction id: {transactionId}</p>
      )}
    </form>
  );
}

export default IncreaseForm;
