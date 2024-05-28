"use client";

import LocationComponent from "@/components/Location/Location";
import Map from "@/components/ShowMap/Map";
import Image from "next/image";
import { useSelector } from "react-redux";

const HomePage = () => {
  const { returents } = useSelector((state: any) => state.lcation);

  return (
    <>
      <div className="relative">
        <div className="h-[70vh]">
          <Map />
        </div>
        <div className="absolute top-[50%] flex justify-center w-full">
          <LocationComponent />
        </div>
      </div>
      {returents.length > 0 ? (
        <div className="bg-[#8EE590]">
          <div className="h-auto w-[80%] py-7 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-7 items-center rounded-tr-[3rem] rounded-br-[3rem] bg-[#EFF4F7]">
            {returents.map((item: any) => {
              return (
                <div className="w-[16rem] h-[18rem] ml-6 hover:bg-black flex flex-col items-center hover:text-[#8EE590] text-[black] justify-center bg-[#8EE590] rounded-2xl">
                  <div className="h-[50%] w-[90%] rounded-xl">
                    <Image
                      alt="icons"
                      priority={true}
                      src={item.image}
                      height={40}
                      width={60}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <p className="font-bold text-center text-base">{item.name}</p>
                  <p className="font-bold text-base">
                    {item.rating}/{item.userRating}
                  </p>
                  <p className="font-bold text-base text-center">
                    {item.address}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div>
          <p className="font-bold text-center text-base">No Data Found</p>
        </div>
      )}
    </>
  );
};

export default HomePage;
