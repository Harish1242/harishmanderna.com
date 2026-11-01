/* ==== EDIT HERE: all swappable placeholders live in this one object ==== */
window.SITE_CONFIG = {
  // Live Stripe Payment Links (pay first; after payment the client lands on the enquiry form to pick a time).
  booking: [
    { minutes: 15, price: "£75",  title: "Quick deal check", desc: "One question, one deal, a clear next step.", url: "https://buy.stripe.com/3cIfZaf6h2lm2Mb9BF7bW00" },
    { minutes: 30, price: "£125", title: "Deal review", desc: "Walk through a target, the numbers and the gaps.", url: "https://buy.stripe.com/eVq4gs1fr4tudqPg037bW01" },
    { minutes: 60, price: "£200", title: "Deep dive", desc: "Full working session on a live deal or plan. Maximum length.", url: "https://buy.stripe.com/fZu5kwgal8JK4Uj3dh7bW02" }
  ],
  // PLACEHOLDER form endpoint (Formspree-style, e.g. https://formspree.io/f/xxxxxxx). Empty = mailto fallback.
  FORM_ENDPOINT: "",
  // NOTE: configure the form service (Formspree or similar) to deliver to contact@harishmanderna.com.
  FALLBACK_EMAIL: "contact@harishmanderna.com"
};
