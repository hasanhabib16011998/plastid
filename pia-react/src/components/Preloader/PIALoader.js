import React from 'react';

const PIALoader = () => {
  // Brand colors based on the image
  const colors = {
    primary: '#947f64', // The main taupe/brown outline color
    gold: '#d0a937',    // The gold accent color (used for window/light accents)
    bg: '#ffffff',      // Clean white background
  };

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      minHeight: '500px',
      backgroundColor: colors.bg,
    },
    svg: {
      width: '200px',
      height: 'auto',
      overflow: 'visible',
      // Subtle drop shadow for depth
      filter: 'drop-shadow(0px 2px 2px rgba(0,0,0,0.05))',
    },
    // Common styles for all outline paths
    outline: {
      fill: 'none',
      stroke: colors.primary,
      strokeWidth: '2.5', // Thin, elegant lines
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeDasharray: '1000', // Long enough to cover paths
      strokeDashoffset: '1000', // Start hidden
      // Slower 4s animation for a relaxed feel
      animation: 'drawPlastid 4s ease-in-out infinite', 
    },
    // Style for the golden accents (window, bulb)
    accentOutline: {
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
      animation: 'fadeInSlow 4s ease-in-out infinite',
    },
    subText: {
      fontFamily: 'Arial, sans-serif',
      fontSize: '12px',
      color: colors.primary,
      letterSpacing: '3px',
      fontWeight: 'bold',
      opacity: 0.7,
      animation: 'fadeInSlow 4s ease-in-out infinite',
      animationDelay: '0.5s', // Delay subtitle slightly
    }
  };

  return (
    <div style={styles.container}>
      <style>
        {`
          @keyframes drawPlastid {
            0% { stroke-dashoffset: 1000; opacity: 0; }
            10% { opacity: 1; }
            50% { stroke-dashoffset: 0; }
            80% { stroke-dashoffset: 0; opacity: 1; }
            100% { stroke-dashoffset: -1000; opacity: 0; }
          }
          @keyframes fadeInSlow {
            0%, 100% { opacity: 0; }
            40%, 70% { opacity: 1; }
          }
        `}
      </style>

      <svg 
        viewBox="0 0 400 450" 
        style={styles.svg}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* === The Structure === */}
        {/* Floor Line */}
        <path 
          d="M 20,420 H 380" 
          style={{...styles.outline, animationDelay: '0s'}} 
        />
        {/* Main House Frame (Left wall, beam, roof) */}
        <path 
          d="M 60,420 V 180 H 235 M 15,215 L 190,40 L 320,170" 
          style={{...styles.outline, animationDelay: '0.1s'}} 
        />
        
        {/* === The Gold Accents === */}
        {/* The Window (4 panes) */}
        <g style={{...styles.outline, ...styles.accentOutline, strokeWidth: '2', animationDelay: '0.5s'}}>
            {/* Outer box */}
            <path d="M 160,130 H 200 V 170 H 160 Z" />
            {/* Inner cross */}
            <path d="M 180,130 V 170 M 160,150 H 200" />
        </g>

        {/* The Pendant Light */}
        {/* Hanging wire and triangular shade */}
        <path 
          d="M 180,180 V 250 L 168,275 H 192 L 180,250" 
          style={{...styles.outline, animationDelay: '0.6s'}} 
        />
        {/* The bulb (Gold accent) */}
        <path 
          d="M 180,275 V 280 M 175,285 Q 180,295 185,285"
          style={{...styles.outline, ...styles.accentOutline, fill:'none', animationDelay: '0.7s'}} 
        />

        {/* === The Furniture === */}
        {/* Table */}
        <path 
          d="M 70,365 Q 180,355 290,365" // Table top arc
          style={{...styles.outline, animationDelay: '0.8s'}} 
        />
        <path 
          d="M 100,365 L 85,420 M 180,365 V 420 M 260,365 L 275,420" // Legs
          style={{...styles.outline, animationDelay: '0.9s'}} 
        />

        {/* Chair (Right side) */}
        <path 
          d="M 305,355 L 300,400 H 275 M 280,400 V 420 M 300,400 V 420" 
          style={{...styles.outline, animationDelay: '1.1s'}} 
        />

        {/* === The Plant === */}
        {/* Pot */}
        <path 
          d="M 335,420 L 330,385 H 360 L 355,420 Z" 
          style={{...styles.outline, animationDelay: '1.3s'}} 
        />
        {/* Plant Stems & Flower spike */}
        <path 
          d="M 345,385 Q 340,350 325,340 M 345,385 Q 355,350 365,335 M 345,385 V 320 M 345,310 L 345,325 M 340,315 L 350,315 M 341,311 L 349,319 M 341,319 L 349,311" 
          style={{...styles.outline, strokeWidth: '1.5', animationDelay: '1.5s'}} 
        />

      </svg>
      
      {/* Text Block */}
      <div style={styles.textContainer}>
        <div style={styles.mainText}>PLASTID</div>
        <div style={styles.subText}>INTERIOR ARCHITECTURE LANDSCAPE</div>
      </div>
    </div>
  );
};

export default PIALoader;