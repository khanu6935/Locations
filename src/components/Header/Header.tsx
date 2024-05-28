import React from "react";
import { IoFastFoodOutline } from "react-icons/io5";
import { FaUserLarge } from "react-icons/fa6";
import { IoBagHandleSharp } from "react-icons/io5";

export const Header = () => {
  return (
    <>
      <div className="h-[4rem] shadow-lg  flex items-center justify-between px-6">
        <div className="flex gap-3">
          <p className="flex items-center">
            <IoFastFoodOutline size={40} color="#6FCF97" />
          </p>
          <h2 className="flex items-center font-bold text-xl text-black">
            Enatega
          </h2>
        </div>
        <div className="flex h-full gap-3">
          <h2 className="flex items-center h-full border-l-[1px] px-5 border-r-[1px] border-gray-500 gap-2 font-medium text-lg text-black">
            <span>
              <FaUserLarge />
            </span>
            Login
          </h2>
          <span className="flex px-4 items-center">
            <IoBagHandleSharp size={25} />
          </span>
        </div>
      </div>
    </>
  );
};
