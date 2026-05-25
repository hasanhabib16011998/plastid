import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Loader = () => {
  const loaderRef = useRef(null);

  // Brand colors
  const colors = {
    primary: '#947f64',
    gold: '#d0a937',
    bg: '#ffffff',
  };

  useEffect(() => {
    // gsap.context ensures all animations are scoped to this component 
    // and properly cleaned up when the component unmounts.
    const ctx = gsap.context(() => {
      
      // 1. Initial Setup
      // Set the dash array/offset so the lines are initially "hidden"
      gsap.set('.anim-path', { strokeDasharray: 1000, strokeDashoffset: 1000 });
      gsap.set('.anim-text', { opacity: 0, y: 10 });

      // 2. The Master Timeline
      const tl = gsap.timeline({ repeat: -1 }); // Infinite loop

      tl.to('.anim-path', {
        strokeDashoffset: 0,
        duration: 2,
        stagger: 0.15, // Draws elements one after another
        ease: 'power2.inOut',
      })
      .to('.anim-text', {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2, // Fades main text, then subtext
        ease: 'power2.out',
      }, "-=1.5") // Start text fade-in while the lines are still drawing
      
      // Hold the fully drawn logo on screen for 1.5 seconds
      .to({}, { duration: 1.5 }) 
      
      // Erase lines and fade text out
      .to('.anim-path', {
        strokeDashoffset: -1000,
        duration: 1.5,
        stagger: 0.1,
        ease: 'power2.inOut',
      })
      .to('.anim-text', {
        opacity: 0,
        y: -10,
        duration: 1,
        stagger: 0.1,
        ease: 'power2.in',
      }, "<"); // The "<" means this runs at the exact same time as the previous animation

    }, loaderRef);

    return () => ctx.revert(); // Cleanup
  }, []);

  // --- Styles ---
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh', // Ensure it takes full viewport height for a global loader
      width: '100%',
      backgroundColor: colors.bg,
      position: 'fixed', // Keep it fixed on top of everything
      top: 0,
      left: 0,
      zIndex: 9999,
    },
    svg: {
      width: '200px',
      height: 'auto',
      overflow: 'visible',
      filter: 'drop-shadow(0px 2px 2px rgba(0,0,0,0.05))',
    },
    basePath: {
      fill: 'none',
      stroke: colors.primary,
      strokeWidth: '2.5',
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
    },
    accentPath: {
      stroke: colors.gold,
    },
    textContainer: {
      marginTop: '10px',
      textAlign: 'center',
    },
    mainText: {
      fontFamily: 'Garamond, "Times New Roman", serif',
      fontSize: '36px',
      color: colors.gold,
      letterSpacing: '2px',
      marginBottom: '5px',
    },
    subText: {
      fontFamily: 'Arial, sans-serif',
      fontSize: '12px',
      color: colors.primary,
      letterSpacing: '3px',
      fontWeight: 'bold',
      opacity: 0.7,
    }
  };

  return (
    <div ref={loaderRef} style={styles.container}>
      <svg 
        viewBox="0 0 400 450" 
        style={styles.svg}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Floor Line */}
        <path 
          className="anim-path"
          d="M 20,420 H 380" 
          style={styles.basePath} 
        />
        
        {/* Main House Frame */}
        <path 
          className="anim-path"
          d="M 60,420 V 180 H 235 M 15,215 L 190,40 L 320,170" 
          style={styles.basePath} 
        />
        
        {/* The Window (Grouped to keep styling clean) */}
        <g className="anim-path" style={{...styles.basePath, ...styles.accentPath, strokeWidth: '2'}}>
          <path d="M 160,130 H 200 V 170 H 160 Z" />
          <path d="M 180,130 V 170 M 160,150 H 200" />
        </g>

        {/* The Pendant Light Wire */}
        <path 
          className="anim-path"
          d="M 180,180 V 250 L 168,275 H 192 L 180,250" 
          style={styles.basePath} 
        />
        
        {/* The Bulb */}
        <path 
          className="anim-path"
          d="M 180,275 V 280 M 175,285 Q 180,295 185,285"
          style={{...styles.basePath, ...styles.accentPath}} 
        />

        {/* Table */}
        <path 
          className="anim-path"
          d="M 70,365 Q 180,355 290,365" 
          style={styles.basePath} 
        />
        <path 
          className="anim-path"
          d="M 100,365 L 85,420 M 180,365 V 420 M 260,365 L 275,420" 
          style={styles.basePath} 
        />

        {/* Chair */}
        <path 
          className="anim-path"
          d="M 305,355 L 300,400 H 275 M 280,400 V 420 M 300,400 V 420" 
          style={styles.basePath} 
        />

        {/* Pot */}
        <path 
          className="anim-path"
          d="M 335,420 L 330,385 H 360 L 355,420 Z" 
          style={styles.basePath} 
        />
        
        {/* Plant Stems & Flower */}
        <path 
          className="anim-path"
          d="M 345,385 Q 340,350 325,340 M 345,385 Q 355,350 365,335 M 345,385 V 320 M 345,310 L 345,325 M 340,315 L 350,315 M 341,311 L 349,319 M 341,319 L 349,311" 
          style={{...styles.basePath, strokeWidth: '1.5'}} 
        />
      </svg>
      
      {/* Text Block */}
      <div style={styles.textContainer}>
        <div className="anim-text" style={styles.mainText}>PLASTID</div>
        <div className="anim-text" style={styles.subText}>INTERIOR ARCHITECTURE LANDSCAPE</div>
      </div>
    </div>
  );
};

export default Loader;