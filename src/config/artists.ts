import { salon } from "./media";

/**
 * Real Scissor's Dewas team photography. Names, specialties and bios
 * below are editable placeholder copy — update with each artist's
 * actual details whenever the client confirms them.
 */
export type Artist = {
  id: string;
  name: string;
  role: string;
  bio: string;
  expertise: string[];
  experience: string;
  image: string;
};

export const artists: Artist[] = [
  {
    id: "artist-1",
    name: "Ankit",
    role: "Senior Stylist & Studio Lead",
    bio: "Leads the floor at Scissor's with an eye for structure — the artist clients ask for when a cut needs to be exactly right the first time.",
    expertise: ["Precision cutting", "Men's grooming", "Client consultation"],
    experience: "10+ years",
    image: salon.artists.a1,
  },
  {
    id: "artist-2",
    name: "Rahul",
    role: "Creative Colour Artist",
    bio: "Thinks in tone and undertone before he thinks in product — balayage, global colour and tricky corrections are where he does his best work.",
    expertise: ["Balayage & global colour", "Grey coverage", "Fashion tones"],
    experience: "7+ years",
    image: salon.artists.a2,
  },
  {
    id: "artist-3",
    name: "Aarav",
    role: "Hairstylist",
    bio: "Brings energy to every chair — sharp fades, textured crops and the kind of finish that photographs as well as it feels.",
    expertise: ["Texture & crop cuts", "Skin fades", "Styling & finishing"],
    experience: "4+ years",
    image: salon.artists.a3,
  },
  {
    id: "artist-4",
    name: "Priya",
    role: "Makeup & Skin Specialist",
    bio: "Bridal trials, party glam and everyday skin care — she plans the look days in advance so there's never a surprise on the day it matters.",
    expertise: ["Bridal & HD makeup", "Facials & skin care", "Threading"],
    experience: "5+ years",
    image: salon.artists.a4,
  },
];
