/* ==== EDIT HERE: all swappable placeholders live in this one object ==== */
window.SITE_CONFIG = {
  // PLACEHOLDER booking links. Replace with the real paid Cal.com event URLs.
  booking: [
    { minutes: 15, price: "£75",  title: "Quick deal check", desc: "One question, one deal, a clear next step.", url: "https://cal.com/PLACEHOLDER/15min" },
    { minutes: 30, price: "£125", title: "Deal review", desc: "Walk through a target, the numbers and the gaps.", url: "https://cal.com/PLACEHOLDER/30min" },
    { minutes: 60, price: "£200", title: "Deep dive", desc: "Full working session on a live deal or plan. Maximum length.", url: "https://cal.com/PLACEHOLDER/60min" }
  ],
  // PLACEHOLDER form endpoint (Formspree-style, e.g. https://formspree.io/f/xxxxxxx). Empty = mailto fallback.
  FORM_ENDPOINT: "",
  // NOTE: configure the form service (Formspree or similar) to deliver every submission to BOTH addresses below.
  FALLBACK_EMAIL: "hello@harishmanderna.com",
  CC_EMAIL: "manderna.1242@gmail.com"
};
