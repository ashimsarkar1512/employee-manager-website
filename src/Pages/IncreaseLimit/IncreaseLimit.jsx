
import SectionTitle from "../../components/SectionTitle2";
import PageTitle from "../../components/PageTitle";

import IncreaseForm from "../../components/IncreaseForm";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

function IncreaseLimit() {
    // Stripe
    const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);
  
    return (
      <section className="py-6">
        <PageTitle title={"Increase Limit"} />
        <div className="container mx-auto">
          <div className="text-center mb-6">
            <SectionTitle sectionTitle={"Increase Your Limit"} />
          </div>
          <div className="w-full lg:w-2/6 md:w-3/6 mx-auto md:px-0 px-2">
            <Elements stripe={stripePromise}>
              <IncreaseForm />
            </Elements>
          </div>
        </div>
      </section>
    );
  }
  
  export default IncreaseLimit;