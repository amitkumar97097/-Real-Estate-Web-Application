import Stripe from "stripe";
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function createCheckoutSession({ customerEmail }) {
  return stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price: process.env.STRIPE_PRICE_ID, quantity: 1 }],
    customer_email: customerEmail,
    success_url: "http://localhost:3000/premium/success",
    cancel_url: "http://localhost:3000/premium/cancel",
  });
}
