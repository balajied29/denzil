import type { StaticImageData } from "next/image";

import hero from "@/assets/photos/hero-portrait.jpg";
import cathedralDoor from "@/assets/photos/cathedral-door.jpg";
import cathedralWide from "@/assets/photos/cathedral-wide.jpg";
import gardenLaugh from "@/assets/photos/garden-laugh.jpg";
import gardenWalk from "@/assets/photos/garden-walk.jpg";
import proposal from "@/assets/photos/proposal.jpg";
import pewsMono from "@/assets/photos/pews-mono.jpg";
import handsMono from "@/assets/photos/hands-mono.jpg";

export type Photo = { src: StaticImageData; alt: string; wide?: boolean };

export const heroPhoto: Photo = {
  src: hero,
  alt: "Cordelia and Denzil smiling together in a garden outside the cathedral",
};

// Filmstrip order. `wide` marks the one landscape frame so the strip can
// size it at 3:2 instead of 2:3.
export const gallery: Photo[] = [
  { src: cathedralDoor, alt: "Cordelia and Denzil holding hands at a tall wooden cathedral door" },
  { src: gardenLaugh, alt: "Cordelia and Denzil laughing in the garden" },
  { src: cathedralWide, alt: "Cordelia and Denzil standing in front of the blue cathedral", wide: true },
  { src: handsMono, alt: "Black and white close-up of their hands, her engagement ring showing" },
  { src: proposal, alt: "Denzil kneeling and holding Cordelia's hand on the lawn" },
  { src: pewsMono, alt: "Black and white portrait of the couple among the church pews" },
  { src: gardenWalk, alt: "Cordelia and Denzil walking hand in hand" },
];
