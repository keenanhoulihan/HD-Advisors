export const contactIntro = {
  label: "Contact",
  title: "Start a conversation",
  intro:
    "Tell us what is going on. There is no wrong place to begin, and every engagement starts with listening.",
};

export const timelineOptions = [
  "As soon as possible",
  "In the next 3 months",
  "In the next 6 months",
  "Just exploring for now",
] as const;

export const budgetOptions = [
  "Under $25K",
  "$25K to $50K",
  "$50K to $100K",
  "$100K or more",
  "Not sure yet",
] as const;

export const contactCopy = {
  successTitle: "Thanks. Clarity starts with a conversation.",
  successBody: "Your note is on its way. We will be in touch soon to find a time to talk.",
  invalid: "Please check the highlighted fields.",
  unavailable: "Sorry, the form could not send your message. Please email us directly at [email].",
};

export const nextSteps = [
  { title: "Share what is going on", body: "A few sentences is plenty. Where does growth feel fuzzy right now?" },
  { title: "An introductory conversation", body: "We talk through where you are, where you want to go, and whether we are a fit." },
  { title: "Listen and assess", body: "If we move forward, the work begins where every roadmap does: listening." },
];
