import React from "react";
import { AiOutlineDelete, AiFillDelete } from "react-icons/ai";
import { PiSpinnerGap } from "react-icons/pi";

type Props = {
  loading: boolean;
};

export default function DeleteButton({loading }: Props) {
  return (
    <div className="relative hover:opacity-80 transition cursor-pointer">
      {
        !loading ? (
            <>
              <AiOutlineDelete className="fill-white absolute -top-[2px] -right[2px] " size={32}/>
              <AiFillDelete className="fill-red-600" size={28}/>
            </>
        ) : (
            <PiSpinnerGap className="fill-white animate-spin" size={32} />
        )
      }
    </div>
  );
}
