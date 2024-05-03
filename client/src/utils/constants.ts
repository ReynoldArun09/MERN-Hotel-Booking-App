import { loadStripe } from "@stripe/stripe-js";

export const BASE_URL = import.meta.env.VITE_BASE_URL || '';
const STRIPE_PUB_KEY = import.meta.env.VITE_STRIPE_PUB_KEY as string;
export const stripePromise = loadStripe(STRIPE_PUB_KEY);