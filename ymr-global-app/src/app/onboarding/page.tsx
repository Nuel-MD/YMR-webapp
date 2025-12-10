'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

const onboardingSlides = [
  {
    image: '/images/YMR1.jpg',
  },
  {
    image: '/images/YMR2.jpg',
  },
  {
    image: '/images/YMR 3.jpg',
  },
]

export default function OnboardingPage() {
  const router = useRouter()
  const [currentSlide, setCurrentSlide] = useState(0)

  const handleGetStarted = () => {
    router.push('/auth/login')
  }

  // Auto-slide functionality with continuous loop
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => {
        // Loop back to first slide after last slide
        if (prev < onboardingSlides.length - 1) {
          return prev + 1
        }
        return 0 // Loop back to start
      })
    }, 4000) // Change slide every 4 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative flex h-screen w-full flex-col overflow-hidden">
      {/* Background Image Carousel - Continuously Looping */}
      <div className="absolute inset-0 z-0">
        {/* YMR Event Photos with smooth transition */}
        <div className="relative h-full w-full overflow-hidden">
          {onboardingSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-[2000ms] ease-in-out ${
                index === currentSlide 
                  ? 'opacity-100 scale-110' 
                  : 'opacity-0 scale-100'
              }`}
            >
              <Image
                src={slide.image}
                alt="Young Ministers Retreat"
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}
        </div>
      </div>

      {/* YMR Logo - Top Left */}
      <div className="absolute top-6 left-6 z-30">
        <Image
          src="/images/YMR-LOGO-NEW.png"
          alt="YMR Logo"
          width={80}
          height={80}
          className="object-contain"
          priority
        />
      </div>

      {/* Bottom Gradient Overlay - from transparent to #055143 */}
      <div className="absolute bottom-0 left-0 right-0 h-[60%] z-10 bg-gradient-to-t from-[#055143] via-[#055143]/80 to-transparent" />

      {/* Fixed Content - Does NOT swipe with carousel */}
      <div className="relative z-20 flex h-full flex-col justify-end px-6 pb-12">
        {/* Main Content - Centered */}
        <div className="mb-8 text-center space-y-3">
          {/* Event Name Label */}
          <div className="flex items-center space-x-2 justify-center">
          <span className='p-2 rounded-full bg-[#308129]'></span>
          <p className="text-white/90 text-sm font-semibold tracking-wider uppercase">
            Young Ministers Retreat
          </p>
          </div>          
          {/* Main Tagline */}
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight px-4">
            Setting A Generation On Fire for Jesus
          </h1>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center space-x-2 mb-8">
          {onboardingSlides.map((_, index) => (
            <div
              key={index}
              className={`h-1.5 rounded-full transition-all ${
                index === currentSlide
                  ? 'w-8 bg-[#9EFF00]'
                  : 'w-1.5 bg-white/40'
              }`}
            />
          ))}
        </div>

        {/* Get Started Button - Prominent and Fixed */}
        <button
          onClick={handleGetStarted}
          className="w-full bg-[#2A8427] hover:bg-[#236d1f] text-white text-lg font-semibold py-4 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl active:scale-[0.98]"
        >
          Get Started
        </button>
      </div>
    </div>
  )
}
