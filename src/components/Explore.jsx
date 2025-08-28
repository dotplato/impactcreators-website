"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import styles from "../shared/styles";
import { staggerContainer } from "../shared/utils/animations";
import { TypingText, TitleText } from "../components/index";
import ExploreCard from "./ExploreCard";
import { services } from "../data/index"
import SectionTitle from '@/components/ui/SectionTitle';

const Explore = () => {
  const [activeCard, setActiveCard] = useState("world-1");
  
  console.log("services rendered", { activeCard, services });
  
  return (
    <section className={`${styles.paddings}`} id="services">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className={`${styles.innerWidth} mx-auto flex flex-col`}
      >
        <SectionTitle title="Services." classes="px-[6vw] md:px-[3vw] pt-[3vw] z-10" />

        {/* Column layout on small screens, row on larger */}
        <div className="mt-[50px] flex flex-col sm:flex-row sm:min-h-[70vh] gap-6 w-full justify-center">
          {services.map((world, index) => {
            console.log("Rendering world", world, { index, active: activeCard });
            return (
              <ExploreCard
                key={world.id}
                {...world}
                index={index}
                active={activeCard}
                handleClick={setActiveCard}
              />
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};

export default Explore;