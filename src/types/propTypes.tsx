import { Dispatch, SetStateAction } from "react";
import { ExplosionHeart } from "@/types/types";

export interface ConsoleBannerProps {
  nodeVersion: string;
}

export interface ValentineProposalProps {
  showNoButton: boolean;
  setShowNoButton: Dispatch<SetStateAction<boolean>>;
  handleYesClick: () => void;
  playErrorSound: () => void;
}

export interface ExplosionHeartsProps {
  explosionHearts: ExplosionHeart[];
}
