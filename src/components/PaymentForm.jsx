
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../Hooks/UseAxiosSecure";
import { useNavigate } from "react-router-dom";
import useUserData from "../Hooks/useUserData";
import { AuthContext } from "../Providers/AuthProvider";


function PaymentForm() {
    const { user } = useContext(AuthContext);
    const { userData, isLoading } = useUserData();
    const navigate = useNavigate();
    const [error, setError] = useState("");
    const [clientSecret, setClientSecret] = useState("");
    const [transactionId, setTransactionId] = useState("");
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
  
    const getTotalPrice = () => {
      switch (userData?.packages) {
        case "basic":
          return 5;
        case "standard":
          return 8;
        case "premium":
          return 15;
        default:
          return null; // Representing an invalid package with null
      }
    };
  
    const totalPrice = getTotalPrice();
    console.log(totalPrice);
  
    useEffect(() => {
      if (totalPrice > 0) {
        axiosSecure
          .post("/create-payment-intent", { price: totalPrice })
          .then((res) => {
            setClientSecret(res.data.clientSecret);
          });
      }
    }, [axiosSecure, totalPrice]);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
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
            price: totalPrice,
            transactionId: paymentIntent.id,
            payment_from_company: userData.company_name,
            payment_for_package: userData.packages,
            date: new Date(), // Consider using moment.js to convert to UTC
            payment_status: true,
          };
          const res = await axiosSecure.post("/payments", payment);
          console.log("payment saved", res.data);
          if (res.data?.paymentResult?.insertedId) {
            Swal.fire({
              icon: "success",
              title: "Payment Done!",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate("/dashboard/addEmployee");
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
        {totalPrice === null ? (
          <p className="mb-3 text-red-600">Wait For The Data</p>
        ) : (
          <>
            <p className="mb-3">You have to pay ${totalPrice}</p>
            <div className="border border-green-700 p-2 rounded-md shadow">
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
                className="px-5 rounded-md mt-5 py-2 bg-green-700 text-white"
                type="submit"
                disabled={!stripe}
              >
                Pay
              </button>
            </div>
          </>
        )}
        <p className="text-red-600">{error}</p>
        {transactionId && (
          <p className="text-green-600">Your transaction id: {transactionId}</p>
        )}
      </form>
    );
  }
  
  export default PaymentForm;