import { FC } from 'react';
import { useInView } from 'react-intersection-observer';

interface Props {
  card: {
    name: string;
    testimonial: string;
    rating: number; // Rating out of 5
    number: string; // Keep number for background design
    classes?: string; // Optional classes for additional styling
  };
}

const TestimonialCard: FC<Props> = ({ card: { name, testimonial, rating, number, classes } }) => {
  const { ref } = useInView({
    triggerOnce: true,
    threshold: 0.6,
  });

  // Generate star rating display
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={`text-[4vw] md:text-[5vw] ${i <= rating ? 'text-yellow-400' : 'text-gray-400'}`}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div ref={ref} key={number} className="px-[6vw] md:px-[3vw] pb-[9.5vw] last:pb-[13vw]">
      <h4 className="text-[3.7vw] md:text-[7vw] md:mt-[3vw] font-light">{name}</h4>
      <div className={`flex items-start space-x-[3vw] md:space-x-0 pt-[3vw] first:border-none md:flex-col ${classes}`}>
        <div className="flex-1 md:mb-[2vw]">
          <div className="flex items-center space-x-[1vw] md:space-x-[1.5vw]">
            {renderStars(rating)}
          </div>
        </div>
        <div className="relative flex-1">
          <p className="relative z-[2000] line-clamp-4 text-[1.5vw] md:text-[3vw] font-medium leading-[1.7] md:text-balance md:leading-[1.5] md:mt-[3vw]">
            "{testimonial}"
          </p>
          <div className="absolute right-[6vw] top-[1.8vw] z-[1] text-right text-[16vw] font-extrabold tracking-[5%] text-blue-900/50 md:text-[28vw] md:top-0">
            {number}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;