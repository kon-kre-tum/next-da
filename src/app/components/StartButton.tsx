import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { PiSpinnerGap } from "react-icons/pi";

type Props = {
  selected: boolean;
  loading: boolean;
};

export default function StartButton({ selected, loading }: Props) {
  return (
    <div className="relative hover:opacity-80 transition cursor-pointer">
      {
        !loading ? (
            <>
              <AiOutlineStar className="fill-white absolute -top-[2px] -right[2px] " size={32}/>
              <AiFillStar className={selected ? "fill-green-700" : "fill-neutral-700/70" } size={28}/>
            </>
        ) : (
            <PiSpinnerGap className="fill-white animate-spin" size={32}/>
        )
      }
    </div>
  );
}
