/**
 * MEDIA CONFIG
 * ----------------------------------------------------------------
 * Two kinds of media power this site:
 *
 *  1. `salon.*`   — real photography of Scissor's Dewas, supplied by
 *                   the client, stored locally under src/assets/salon.
 *  2. `stock.*`   — free-license editorial/campaign imagery & video
 *                   (Mixkit / Pexels, no attribution required) used
 *                   where a cinematic beauty-campaign look is needed
 *                   and will be swapped for real shoot footage later.
 *
 * Swap any URL below and every section that references it updates.
 */

// ---- Real Scissor's Dewas photography ----
import artist1 from "@/assets/salon/artist-1.jpg";
import artist2 from "@/assets/salon/artist-2.jpg";
import artist3 from "@/assets/salon/artist-3.jpg";
import artist4 from "@/assets/salon/artist-4.jpg";
import gallery1 from "@/assets/salon/gallery-1.jpg";
import gallery2 from "@/assets/salon/gallery-2.jpg";
import gallery3 from "@/assets/salon/gallery-3.jpg";
import gallery4 from "@/assets/salon/gallery-4.jpg";
import gallery5 from "@/assets/salon/gallery-5.jpg";
import gallery6 from "@/assets/salon/gallery-6.jpg";
import gallery7 from "@/assets/salon/gallery-7.jpg";
import gallery8 from "@/assets/salon/gallery-8.jpg";
import logoMark from "@/assets/logo-mark.png";

export const salon = {
  logo: logoMark,
  artists: { a1: artist1, a2: artist2, a3: artist3, a4: artist4 },
  gallery: {
    backwash: gallery1,
    floor: gallery2,
    colorWall: gallery3,
    styling: gallery4,
    pedicure: gallery5,
    reception: gallery6,
    chairsRow: gallery7,
    frontDesk: gallery8,
  },
};

// ---- Free-license stock (Mixkit video / Pexels photo) ----
// Mixkit Stock Video Free License — no watermark, commercial use ok.
export const stockVideo = {
  heroBlowDry: "https://assets.mixkit.co/videos/49556/49556-360.mp4",
  stylingComb: "https://assets.mixkit.co/videos/33257/33257-360.mp4",
  makeupMirror: "https://assets.mixkit.co/videos/42723/42723-720.mp4",
};

// Pexels — free to use, no attribution required.
export const stockPhoto = {
  hairColorProcess:
    "https://images.pexels.com/photos/2799605/pexels-photo-2799605.jpeg?auto=compress&cs=tinysrgb&w=1600",
  hairDyeMixing:
    "https://images.pexels.com/photos/3993292/pexels-photo-3993292.jpeg?auto=compress&cs=tinysrgb&w=1600",
  bridalPortrait:
    "https://images.pexels.com/photos/27212066/pexels-photo-27212066.jpeg?auto=compress&cs=tinysrgb&w=1600",
  bridalCeremony:
    "https://images.pexels.com/photos/30171219/pexels-photo-30171219.jpeg?auto=compress&cs=tinysrgb&w=1600",
  weddingCouple:
    "https://images.pexels.com/photos/19733687/pexels-photo-19733687.jpeg?auto=compress&cs=tinysrgb&w=1600",
  groomingBeard:
    "https://images.pexels.com/photos/4625615/pexels-photo-4625615.jpeg?auto=compress&cs=tinysrgb&w=1600",
  groomingBarber:
    "https://images.pexels.com/photos/9992819/pexels-photo-9992819.jpeg?auto=compress&cs=tinysrgb&w=1600",
  facialSpa:
    "https://images.pexels.com/photos/3738349/pexels-photo-3738349.jpeg?auto=compress&cs=tinysrgb&w=1600",
  facialTreatment:
    "https://images.pexels.com/photos/19242406/pexels-photo-19242406.jpeg?auto=compress&cs=tinysrgb&w=1600",
};
