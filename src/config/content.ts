import { salon, stockPhoto } from "./media";

// ---------------- Gallery ----------------
export const galleryImages = [
  { id: "g1", src: salon.gallery.floor, caption: "The styling floor" },
  { id: "g2", src: salon.gallery.colorWall, caption: "Colour studio" },
  { id: "g3", src: salon.gallery.backwash, caption: "Wash & spa bay" },
  { id: "g4", src: salon.gallery.reception, caption: "Reception" },
  { id: "g5", src: salon.gallery.pedicure, caption: "Pedicure spa" },
  { id: "g6", src: salon.gallery.chairsRow, caption: "Styling stations" },
  { id: "g7", src: salon.gallery.frontDesk, caption: "Front desk" },
  { id: "g8", src: stockPhoto.hairColorProcess, caption: "Colour in progress" },
];

// ---------------- Transformation / Signature looks ----------------
export const transformationLooks = [
  {
    id: "t1",
    src: stockPhoto.bridalPortrait,
    label: "Bridal Radiance",
    description: "Trialled in advance, so the day itself holds no surprises.",
  },
  {
    id: "t2",
    src: stockPhoto.hairDyeMixing,
    label: "Custom Colour",
    description: "Tone-matched to your skin, not picked off a chart.",
  },
  {
    id: "t3",
    src: stockPhoto.facialTreatment,
    label: "Skin Renewal",
    description: "A routine built for your skin, not a one-size ritual.",
  },
  {
    id: "t4",
    src: stockPhoto.bridalCeremony,
    label: "Occasion Glam",
    description: "Ready for the moment, however big it is.",
  },
  {
    id: "t5",
    src: salon.gallery.colorWall,
    label: "Fashion Colour",
    description: "Bold tones, maintained right so they stay rich.",
  },
  {
    id: "t6",
    src: stockPhoto.groomingBarber,
    label: "Sharp Grooming",
    description: "Precise lines, hot-towel finish, no rush.",
  },
];

// ---------------- Signature editorial features ----------------
export const signatureFeatures = [
  {
    id: "sig-cut",
    title: "The Perfect Cut",
    line: "Precision. Shape. Personality.",
    body: "Every great look starts with structure. We study your face, your hair's texture and your daily routine before we cut — so it still works weeks later, not just on the way out the door.",
    image: salon.gallery.chairsRow,
  },
  {
    id: "sig-colour",
    title: "The Colour Transformation",
    line: "Not just colour. A completely new expression.",
    body: "From a subtle root melt to a full fashion-colour transformation, our colour team matches tone to your skin and maintains it right, so the result stays rich long after the appointment ends.",
    image: stockPhoto.hairColorProcess,
  },
  {
    id: "sig-bridal",
    title: "The Bridal Experience",
    line: "Your biggest moments deserve more than ordinary preparation.",
    body: "Trialled in advance, planned around your outfit and your day's schedule, and executed by an artist who's done this before — so the only thing you have to think about on the day is enjoying it.",
    image: stockPhoto.bridalPortrait,
  },
];

// ---------------- Journey steps ----------------
export const journeySteps = [
  { id: "01", title: "Choose Your Experience", body: "Browse services and pick what you need — or tell us and we'll recommend." },
  { id: "02", title: "Select Your Artist", body: "Pick a specialist, or let us match you with the right one." },
  { id: "03", title: "Pick Your Time", body: "Choose a date and time that works for your day." },
  { id: "04", title: "Confirm On WhatsApp", body: "Send your details in one tap — no forms, no waiting on hold." },
  { id: "05", title: "Walk In. Relax. Transform.", body: "Arrive, settle in, and let the team take it from here." },
];

// ---------------- Why Scissor's ----------------
export const differentiators = [
  { title: "Since 2009", body: "Years of reading hair types, skin tones and changing trends in Dewas — not guessing." },
  { title: "Personalised, Not Generic", body: "Every consultation starts with your hair and your goals, not a fixed package." },
  { title: "Trained Artists", body: "Specialists for cut, colour, skin and bridal — not one stylist doing everything." },
  { title: "Hygiene First", body: "Sanitised tools and fresh consumables for every single client." },
  { title: "Modern Techniques", body: "Products and methods that are updated as the industry moves, not stuck in one era." },
  { title: "One-To-One Attention", body: "No rushed slots — your appointment gets the time it needs." },
];

// ---------------- FAQ ----------------
export const faqs = [
  {
    q: "Do I need to book an appointment in advance?",
    a: "Walk-ins are welcome whenever we have availability, but booking ahead on WhatsApp guarantees your preferred artist and time slot — especially on weekends and for bridal work.",
  },
  {
    q: "Can I choose a specific artist for my service?",
    a: "Yes. Pick an artist on the Meet The Artists section or mention your preference while booking, and we'll confirm their availability on WhatsApp.",
  },
  {
    q: "How do I confirm my booking?",
    a: "Every booking flow on this site ends with a pre-filled WhatsApp message — just hit send and our front desk confirms your slot directly in chat.",
  },
  {
    q: "What payment methods are accepted?",
    a: "We accept cash and all major UPI apps at the salon. Ask our front desk for current options when you visit.",
  },
  {
    q: "Can I consult with an artist before choosing a service?",
    a: "Absolutely — mention that you'd like a consultation first when you message us, and we'll set up time with the right specialist before anything is finalised.",
  },
  {
    q: "Do you take bridal bookings?",
    a: "Yes, including trial sessions ahead of the day. Bridal dates fill up early, so we recommend reaching out on WhatsApp as soon as your date is confirmed.",
  },
];

// ---------------- Reviews ----------------
// Sample structure only — swap in real Google review quotes and
// names once the profile is connected. Do not treat as real feedback.
export const reviews = [
  {
    name: "Kavita Joshi",
    rating: 5,
    text: "Went in for a colour correction I was nervous about and Rahul got the tone exactly right. Been back twice since.",
  },
  {
    name: "Rohan Malhotra",
    rating: 5,
    text: "Ankit does the cleanest beard sculpt I've had in Dewas. Booked through WhatsApp both times, super easy.",
  },
  {
    name: "Sneha Reddy",
    rating: 5,
    text: "Priya did my engagement makeup and it held up through a 6-hour function in this heat. Genuinely impressed.",
  },
  {
    name: "Amit Kapoor",
    rating: 4,
    text: "Good haircut, exactly what I asked for. Was a bit of a wait on a Saturday evening so I'd book ahead next time.",
  },
  {
    name: "Divya Nair",
    rating: 5,
    text: "The keratin spa here fixed hair I thought was beyond saving after a bad colour job elsewhere. Worth every rupee.",
  },
  {
    name: "Sanjay Bhatt",
    rating: 5,
    text: "Been coming here since they opened near Industrial Area. Consistent quality every single time, that's rare.",
  },
];
