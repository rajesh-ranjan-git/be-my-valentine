import { Dispatch, SetStateAction } from "react";
import { ExplosionHeart } from "@/types/types";

export interface ValentineProposalProps {
  showNoButton: boolean;
  setShowNoButton: Dispatch<SetStateAction<boolean>>;
  handleYesClick: () => void;
}

export interface ExplosionHeartsProps {
  explosionHearts: ExplosionHeart[];
}
