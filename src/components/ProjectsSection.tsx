import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion"
import { Check, Zap, Utensils, ArrowUpRight } from "lucide-react"
import Image from "next/image"

// Define the project prop type
interface Project {
  title: string
  description: string
  oneLiner: string
  imageUrl: string
  features: string[]
  status: "coming soon" | "live"
  icon?: React.ReactNode
  link?: string
}

// Define component props
interface ProjectsSectionProps {
  projects: Project[]
}

// Custom scrollable image component
const ScrollableImage = ({ src, alt }: { src: string; alt: string }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [imageHeight, setImageHeight] = useState(0)
  const [containerHeight, setContainerHeight] = useState(0)
  const imageRef = useRef<HTMLImageElement>(null)

  // Set up scroll detection using Motion's useScroll hook
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  // Map scroll position to image position
  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -1 * Math.max(0, imageHeight - containerHeight)]
  )

  // Track scroll state for UI feedback
  const [reachedBottom, setReachedBottom] = useState(false)
  const [reachedTop, setReachedTop] = useState(true)

  // Update state based on scroll position
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setReachedTop(latest <= 0.05)
    setReachedBottom(latest >= 0.95)
  })

  // Update measurements when image loads
  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget
    setImageHeight(img.offsetHeight)

    if (containerRef.current) {
      setContainerHeight(containerRef.current.offsetHeight)
    }
  }

  // Update dimensions on resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current && imageRef.current) {
        setContainerHeight(containerRef.current.offsetHeight)
        setImageHeight(imageRef.current.offsetHeight)
      }
    }

    window.addEventListener("resize", updateDimensions)
    updateDimensions()

    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <motion.div
        className="w-full"
        style={{
          y: imageY,
        }}
      >
        <img
          ref={imageRef}
          src={src}
          alt={alt}
          className="w-full"
          style={{ minHeight: "150%" }}
          onLoad={handleImageLoad}
          draggable={false}
        />
      </motion.div>

      {/* Scroll indicators */}
      <motion.div
        className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-black/40 to-transparent"
        animate={{ opacity: reachedTop ? 0 : 0.7 }}
      />
      <motion.div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent"
        animate={{ opacity: reachedBottom ? 0 : 0.7 }}
      />

      {/* Scroll hint - shows more prominently when hovering */}
      <motion.div
        className="pointer-events-none absolute right-3 top-3 flex items-center gap-1 rounded-full bg-black/20 px-2 py-1 text-xs text-white/60 backdrop-blur-sm"
        animate={{
          opacity: isHovering && !reachedBottom ? 0.9 : 0.4,
        }}
        transition={{ duration: 0.2 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 5v14M5 12h14"></path>
        </svg>
        <span>Scroll to explore</span>
      </motion.div>

      {/* Continue scrolling hint at bottom */}
      <motion.div
        className="pointer-events-none absolute inset-x-0 bottom-2 flex justify-center"
        animate={{
          opacity: reachedBottom && isHovering ? 0.9 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center gap-1.5 rounded-full bg-black/30 px-3 py-1.5 text-xs text-white/80 backdrop-blur-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14M12 19l7-7M12 19l-7-7"></path>
          </svg>
          <span>Continue scrolling page</span>
        </div>
      </motion.div>
    </div>
  )
}

const ProjectsSection = ({ projects }: ProjectsSectionProps) => {
  // State for mobile accordions
  const [openCard, setOpenCard] = useState<number | null>(null)

  // Toggle accordion function
  const toggleCard = (index: number) => {
    setOpenCard(openCard === index ? null : index)
  }

  return (
    <motion.div
      className="my-24  lg:my-48 px-[6vw]"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      id="products" 
    >
      <div className="mb-8 text-center"       id="products" 
      >
        <h3 className="mb-4 text-8xl font-bold tracking-tight text-foreground">
         Our Products
        </h3>
        <p className="mx-auto max-w-2xl px-4 text-sm text-muted-foreground sm:text-base">
          Innovative solutions built with modern tech stacks
        </p>
      </div>

      {/* Project Cards */}
      {projects.map((project, index) => (
        <div
          key={index}
          className="mx-auto mb-12 mt-48 pl-8 relative rounded-3xl bg-gradient-to-br from-slate-900/40 via-slate-800/40 to-slate-900 overflow-hidden"
        >
            <div className="gradient-03"/>
          <div className="overflow-hidden  ">
            <div className="hidden sm:grid sm:grid-cols-2 gap-8">
              {/* Content Side (Left) */}
              <div className=" flex flex-col justify-around h-[90vh] max-h-[980px]">
                <div className="mb-4 flex items-center">
                  {project.icon || <Utensils className="mr-2 h-8 w-8 text-sky-500" />}
                </div>
                <div className="flex flex-col gap-4">

                <h4 className="mb-4 text-7xl font-bold text-foreground">
                  {project.title}
                </h4>
                <p className="mb-6 text-base text-muted-foreground">
                  {project.description}
                </p>

                {/* Status Badge - Desktop */}
                <div className={`mb-4 flex self-start items-center rounded-md px-2.5 py-0.5 text-xs font-medium ${
                  project.status === "live"
                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                    : "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
                }`}>
                  <Zap className="mr-1 h-3 w-3" />
                  <span>{project.status === "live" ? "Live" : "Under Development"}</span>
                </div>

                {/* Key Features - Desktop */}
                <div className="mb-6 space-y-2">
                  <h5 className="mb-2 text-sm font-medium text-foreground">
                    Key Features
                  </h5>
                  {project.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-sm text-muted-foreground">
                      <Check className="mr-2 h-4 w-4 flex-shrink-0 text-green-500" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
                </div>
              
  
                {/* Project Link Button */}
                {project.link && (
                  <Link
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-20  mt-3 border border-1 rounded-full items-center justify-center px-4 text-xl z-[1] font-medium text-primary-foreground  transition-colors hover:bg-sky-500/10  disabled:pointer-events-none disabled:opacity-50"
                  >
                  <ArrowUpRight className="mr-4"/>
                    <span>View Project</span>
                  </Link>
                )}
              </div>

              {/* Image Side (Right) */}
              <div className="relative">
                <div className="absolute  inset-0  bg-gradient-to-br from-slate-900/50 to-slate-800/50">
                  {/* Custom scrollable image implementation */}
                  <ScrollableImage
                    src={project.imageUrl}
                    alt={`${project.title} project preview`}
                   
                  />

              

                  {/* Enhanced gradient overlay */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/95 via-background/30 to-transparent opacity-70"></div>

                  {/* Status Badge - Desktop Image */}
                  <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-black/40 px-3 py-1 backdrop-blur-md">
                    <div className={`h-2 w-2 animate-pulse rounded-full ${
                      project.status === "live" ? "bg-green-400" : "bg-amber-400"
                    }`}></div>
                    <span className="text-xs font-medium text-white">
                      {project.status === "coming soon" ? "Coming Soon" : "Live"}
                    </span>
                  </div>

                  {/* Bottom Caption */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 p-6">
                    <p className="max-w-sm text-xs text-white/90">
                      {project.oneLiner}
                    </p>
                  </div>

                  {/* Decorative elements */}
                  <div className="pointer-events-none absolute right-1/4 top-1/4 h-24 w-24 rounded-full bg-amber-500/10 blur-2xl filter"></div>
                  <div className="pointer-events-none absolute bottom-1/3 left-1/4 h-20 w-20 rounded-full bg-blue-500/10 blur-xl filter"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </motion.div>
  )
}

export default ProjectsSection