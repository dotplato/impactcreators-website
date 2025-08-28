import { FC } from 'react';
import { useRouter } from 'next/navigation';

import SectionOpacity from '@/components/ui/SectionOpacity';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

interface Props {}

const Index: FC<Props> = () => {
  const router = useRouter();

  const handleFormToggle = () => {
    router.push('/book');
  };

  return (
    <SectionOpacity classes="flex flex-col justify-center h-screen">

      <div className=" mx-auto flex w-full max-w-[60vw] md:max-w-[90%] flex-1 flex-col items-center justify-center text-center">
        <h3 className="text-[4vw] md:text-[8vw] font-medium">Not Sure Yet?</h3>
        <p className="mt-[0.6vw] text-[1.7vw] md:text-[3.2vw] font-normal text-gray-300 md:leading-[1.3]">
        If you're not sure about your project yet, you can either get a quote or contact us directly here.

        </p>
        <Link
                    href="/contact"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-20  mt-8 border border-1 rounded-full w-8/12 items-center justify-center px-6 text-xl z-[1] font-medium text-primary-foreground  transition-colors hover:bg-sky-500/10  disabled:pointer-events-none disabled:opacity-50"
                  >
                  <ArrowUpRight className="mr-4"/>
                    <span>Get a Quote</span>
                  </Link>
      </div>
    </SectionOpacity>
  );
};
export default Index;
