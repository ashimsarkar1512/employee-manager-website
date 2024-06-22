import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "../../../components/PaymentForm";
import SectionTitle from "../../../components/SectionTitle2";
import PageTitle from "../../../components/PageTitle";
import useUserData from "../../../Hooks/useUserData";
import { loadStripe } from "@stripe/stripe-js";


function Payment() {
    // Stripe
    const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);
    const { userData } = useUserData();
    console.log(stripePromise);
  
    return (
      <section className="py-8 min-h-[70vh] flex items-center">
        <PageTitle title={"Payment"} />
        <div className="template-container">
          <div className="text-center">
            <SectionTitle
              sectionTitle={
                userData?.packages === "basic"
                  ? "You Are Using 5 Members For $5 Package!"
                  : userData?.packages === "standard"
                  ? "You Are Using 10 Members For $8 Package!"
                  : userData?.packages === "premium"
                  ? "You Are Using 20 Members For $15 Package!"
                  : ""
              }
            />
          </div>
          <div className="w-full md:w-2/3 xl:w-1/3 mx-auto">
            <div>
              <div>
                <Elements stripe={stripePromise}>
                  <PaymentForm />
                </Elements>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  
  export default Payment;