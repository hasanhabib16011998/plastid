import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './HeroSlider.css';

import slideImg1 from '@images/slides/v1-1.jpg';
import slideImg2 from '@images/slides/v1-2.jpg';
import slideImg3 from '@images/slides/v1-3.jpg';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Slider Data
const slides = [
  {
    id: 1,
    image: slideImg1,
    title: 'Elevate every day',
    text: 'Design is not just what it looks like,<br/>but how it makes you feel in every moment.',
    btnText: 'About Company',
    btnLink: '#',
    align: 'left'
  },
  {
    id: 2,
    image: slideImg2,
    title: 'Curated Spaces',
    text: 'Every corner reflects your story,<br/>thoughtfully brought to life.',
    btnText: 'Our Services',
    btnLink: '#',
    align: 'right'
  },
  {
    id: 3,
    image: slideImg3,
    title: 'Artful Balance',
    text: 'Merging beauty and practicality into seamless harmony.',
    btnText: 'About Company',
    btnLink: '#',
    align: 'left'
  }
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Refs for GSAP
  const sectionRef = useRef(null);
  const bgRefs = useRef([]);
  const textRef = useRef(null);
  const progressRef = useRef(null);

  // Handle Auto-play
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000); // 6 seconds per slide

    return () => clearInterval(timer);
  }, []);

  // Setup Scroll Parallax Effect
  useEffect(() => {
    const parallaxCtx = gsap.context(() => {
      gsap.to(bgRefs.current, {
        yPercent: 30, // Moves the background down slightly as you scroll
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true, // Ties the animation directly to the scrollbar
        }
      });
    }, sectionRef);

    return () => parallaxCtx.revert(); // Cleanup on unmount
  }, []);

  // Handle Slide Transitions & Text Animations
  useEffect(() => {
    // 1. Animate Background Images
    bgRefs.current.forEach((bg, index) => {
      if (index === currentSlide) {
        // Active Slide: Fade in and slowly scale up (Ken Burns effect)
        gsap.to(bg, { 
          opacity: 1, 
          scale: 1.05, 
          duration: 1.5, 
          zIndex: 1, 
          ease: 'power2.out' 
        });
      } else {
        // Inactive Slides: Fade out and reset scale
        gsap.to(bg, { 
          opacity: 0, 
          scale: 1, 
          duration: 1.5, 
          zIndex: 0, 
          ease: 'power2.out' 
        });
      }
    });

    // 2. Animate Text (Mask Reveal)
    const elements = textRef.current.children;
    gsap.fromTo(elements, 
      { 
        y: 60, 
        opacity: 0, 
        clipPath: 'inset(100% 0 0 0)' // Hides the bottom of the text initially
      },
      { 
        y: 0, 
        opacity: 1, 
        clipPath: 'inset(0% 0 0 0)', // Reveals the text
        duration: 1.2, 
        stagger: 0.15, 
        ease: 'power4.out', 
        delay: 0.4 
      }
    );

    // 3. Animate Progress Bar
    gsap.fromTo(progressRef.current,
      { width: '0%' },
      { width: '100%', duration: 6, ease: 'none' } // Matches the 6000ms interval
    );

  }, [currentSlide]);

  const slide = slides[currentSlide];

  return (
    <section className="hero-slider-wrapper" ref={sectionRef}>
      
      {/* Background Image Stack */}
      {slides.map((s, index) => (
        <div 
          key={s.id}
          ref={(el) => (bgRefs.current[index] = el)}
          className="hero-slide-bg"
          style={{ backgroundImage: `url(${s.image})` }}
        />
      ))}
      
      <div className="hero-overlay" />

      {/* Content Container */}
      <div className={`hero-content-container ${slide.align === 'right' ? 'align-right' : 'align-left'}`}>
        <div ref={textRef} style={{ zIndex: 2 }}>
          <h1 className="hero-title">
            {slide.title}
          </h1>
          
          <p 
            className="hero-text" 
            dangerouslySetInnerHTML={{ __html: slide.text }}
          />
          
          <div className="btn-box">
            <a href={slide.btnLink} className="hero-btn">
              {slide.btnText}
            </a>
          </div>
        </div>
      </div>

      {/* Slide Progress Indicator */}
      <div className="hero-progress-track">
        <div className="hero-progress-bar" ref={progressRef} />
      </div>

    </section>
  );
};

export default HeroSlider;