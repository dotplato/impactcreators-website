import { FC } from 'react';
import SectionTitle from '@/components/ui/SectionTitle';
import TestimonialCard from '@/components/TestimonialCard'; // Adjust the import path as needed
import { TESTIMONIAL_CARDS } from '@/data';

interface Props {}

const Index: FC<Props> = () => {
  return (
    <section id="testimonials" className="relative border-t border-gray-1 py-[6vw] md:py-[4vw]">
      <SectionTitle title="Testimonials." classes="text-right px-[6vw] md:px-[3vw] pt-[3vw]" />
      {TESTIMONIAL_CARDS.map((card) => (
        <TestimonialCard key={card.name} card={card} />
      ))}
    </section>
  );
};

export default Index;