'use client';

import Navigation from '@/widgets/Navigation';
import Hero from '@/widgets/Hero';
import About from '@/widgets/About';
import Testimonials from '@/widgets/Testimonials';
import TextSlideEffect from "@/components/TextSlideEffect"


import {Footer} from '@/widgets/Footer';
import {  Utensils , GraduationCap } from "lucide-react"

import ShadowCursor from '@/components/ui/ShadowCursor'

import { Explore } from '@/components'
import ProjectsSection from '@/components/ProjectsSection';

const projects = [
  {
    title: "OrderImpact",
    description: "A comprehensive food delivery and POS solution for restaurants, streamlining orders, payments, and inventory management with real-time analytics.",
    oneLiner: "Empowering restaurants with seamless food delivery and efficient point-of-sale operations.",
    imageUrl: "/orderimpact2.png",
    features: [
      "Integrated online ordering and delivery tracking",
      "Real-time inventory management",
      "Secure payment processing with multiple gateways",
      "Advanced analytics dashboard for sales insights",
      "Customizable POS interface for restaurant staff",
    ],
    status: "live",
    icon: <Utensils className="mr-2 h-8 w-8 text-sky-500" />,
    link: "https://github.com/Cadogy/OrderImpact",
  },

  {
    title: "ImpactEd",
    description: "An all-in-one online school LMS solution, empowering educators to create, manage, and deliver engaging digital learning experiences.",
    oneLiner: "Transform learning with a modern, powerful LMS platform.",
    imageUrl: "/product1.png",
    features: [
      "Interactive course creation and management",
      "Seamless student enrollment and tracking",
      "Live classes with video integration",
      "Quizzes, assignments, and grading system",
      "Analytics dashboard for teachers and admins",
    ],
    status: "live",
    icon: <GraduationCap className="mr-2 h-8 w-8 text-blue-500" />,
    link: "https://github.com/Cadogy/ImpactEd",
  },
]
export default function Home() {
  return (
    <>
          <ShadowCursor />

      <Navigation />
      <div className='relative'>
      <Hero />
      <div className='feedback-gradient'/>
      </div>

      <div className='relative'>

      <About />
      <div className='gradient-04'/>
      </div>
   
     <TextSlideEffect />


      <Explore/>

      <div className='relative'>

      <ProjectsSection projects={projects.map(project => ({
        ...project,
        status: project.status as "live" | "coming soon"
      }))} />
      <div className='gradient-02'/>
      </div>

      <div className='relative'>

      <Testimonials/>
      <div className='gradient-03'/>
      </div>

      <div className='relative'>

<Footer/>
<div className='footer-gradient'/>
      </div>
      {/* disable cursor here */}
    

    </>
  );
}
