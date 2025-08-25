"use client";
import { motion } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import styles from "../shared/styles";
import headset from "../../public/headset.svg";

import React from "react";
import { Briefcase } from "lucide-react";

interface ExploreCardProps {
  id: string | number;
  imgUrl: string | StaticImageData;
  title: string;
  index: number;
  active: string | number;
  handleClick: (id: string | number) => void;
}

const ExploreCard: React.FC<ExploreCardProps> = ({
  id,
  imgUrl,
  title,
  index,
  active,
  handleClick,
}) => {
  console.log("ExploreCard rendered", { id, title, active, isActive: active === id });
  
  return (
    <motion.div
      className={`relative flex-shrink-0 ${
        active === id ? "lg:w-[400px] w-[300px]" : "lg:w-[200px] w-[200px]"
      } ${
        styles.flexCenter
      } min-w-[170px] h-[600px] transition-all duration-[0.7s] ease-out cursor-pointer`}
      onClick={() => handleClick(id)}
    >
      <Image
        src={imgUrl}
        alt={title}
        className="absolute w-full h-full object-cover rounded-[24px]"
      />
      {active !== id ? (
        <h3 className="font-semibold sm:text-[26px] text-[18px] text-white absolute z-10 lg:bottom-20 lg:rotate-[-90deg] lg:origin-[0,0] ">
          {title}
        </h3>
      ) : (
        <div className="absolute bottom-0 p-8 justify-start w-full flex-col bg-[rgba(0,0,0,0.5)] rounded-b-[24px] z-20">
          <div
            className={`${styles.flexCenter} w-[60px] h-[60px] rounded-[24px] glassmorphism mb-[16px]`}
          >
            
            <Briefcase  className="w-1/2 h-1/2 object-contain"/>
          </div>
          <p className="font-normal text-[16px] leading-[20px] text-white uppercase ">
            Best in Class
          </p>
          <h2 className="mt-[24px] font-semibold sm:text-[32px] text-[24px] text-white ">
            {title}
          </h2>
        </div>
      )}
    </motion.div>
  );
};

export default ExploreCard;