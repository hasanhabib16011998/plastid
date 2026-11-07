// ============================================================================
// Plastid Interior & Architecture — Services Tree & SEO Content Data
// ============================================================================

export const SITE_URL = 'https://plastidbd.com'

/**
 * Hierarchical Service Tree used by:
 * - Header Desktop Flyout Submenu & Mobile Accordion Drawer
 * - Services Overview Page (/services)
 * - ServiceDetail Sidebar Tree & Mobile Pill Selector (/services/[slug])
 * - Footer & Consultation Forms
 */
export const serviceTree = [
  {
    slug: 'residential-interior',
    label: 'Residential Interior',
    to: '/services/residential-interior',
    children: [
      {
        slug: 'full-apartment-interior',
        label: 'Full Apartment Interior',
        to: '/services/full-apartment-interior',
      },
      {
        slug: 'duplex-and-villa',
        label: 'Duplex and Villa',
        to: '/services/duplex-and-villa',
      },
      {
        slug: 'modular-kitchen',
        label: 'Modular Kitchen',
        to: '/services/modular-kitchen',
      },
      {
        slug: 'bedroom-design',
        label: 'Bedroom Design',
        to: '/services/bedroom-design',
      },
      {
        slug: 'home-renovation',
        label: 'Home Renovation',
        to: '/services/home-renovation',
      },
    ],
  },
  {
    slug: 'commercial-interior',
    label: 'Commercial Interior',
    to: '/services/commercial-interior',
    children: [
      {
        slug: 'office-and-corporate',
        label: 'Office & Corporate',
        to: '/services/office-and-corporate',
      },
      {
        slug: 'studio-office-design',
        label: 'Studio Office Design',
        to: '/services/studio-office-design',
      },
      {
        slug: 'retail-and-showrooms',
        label: 'Retail and Showrooms',
        to: '/services/retail-and-showrooms',
      },
      {
        slug: 'clinics-and-hospitality',
        label: 'Clinics & Hospitality',
        to: '/services/clinics-and-hospitality',
      },
    ],
  },
  {
    slug: 'restaurant-interior',
    label: 'Restaurant Interior',
    to: '/services/restaurant-interior',
    children: null,
  },
  {
    slug: 'exterior-design',
    label: 'Exterior Design',
    to: '/services/exterior-design',
    children: null,
  },
  {
    slug: 'furniture-and-decor',
    label: 'Furniture and Decor',
    to: '/services/furniture-and-decor',
    children: null,
  },
  {
    slug: '3d-and-design-consultancy',
    label: '3D & Design Consultancy',
    to: '/services/3d-and-design-consultancy',
    children: null,
  },
]

/**
 * Rich content and SEO properties for all 15 dedicated service pages.
 * Every service page is rendered from the single `ServiceDetail` component.
 */
export const serviceData = {
  // ──────────────────────────────────────────────────────────
  // 1. RESIDENTIAL INTERIOR (Parent + 5 Sub-Services)
  // ──────────────────────────────────────────────────────────
  'residential-interior': {
    slug: 'residential-interior',
    title: 'Residential Interior',
    heroTitle: 'Residential Interior Design',
    h2Title: 'Turnkey Home & Apartment Interior Architecture in Dhaka',
    subtitle: 'Bespoke Home & Living Environments',
    category: 'Residential',
    parentSlug: null,
    icon: 'icon-architecture-and-city1',
    cardImg: '/images/resources/working-1.jpg',
    mainImg: '/images/slides/v1-1.jpg',
    formOptionLabel: 'Residential — Full Apartment Interior',
    specs: {
      timeline: '6–12 Weeks Execution',
      designRate: 'BDT 40 / sq.ft (3D)',
      rebate: '50% Fee Refund on Build',
      scope: 'Full Turnkey & Custom',
    },
    shortText:
      'Turnkey residential interior design for apartments, duplexes, villas, modular kitchens, and bedrooms crafted around your family lifestyle.',
    description1:
      'At Plastid Interior & Architecture, our Residential Interior practice transforms houses and apartments across Dhaka and Bangladesh into refined, deeply personal sanctuaries. Whether you have just received handover of a new apartment or are building a custom residence, we harmonize spatial flow, natural light, acoustic warmth, and bespoke millwork to elevate everyday living.',
    description2:
      'From initial space planning and photorealistic 3D visualizations to custom cabinetry fabrication, false ceiling lighting, and turnkey site execution, our in-house architects and master craftsmen manage every detail under one roof—delivering on schedule and within a transparent, itemized budget.',
    highlights: [
      'Complete Turnkey Apartment & Home Execution',
      'Custom Floor Plan Optimization & Ergonomic Zoning',
      'Bespoke TV Units, Wall Paneling & Ambient False Ceilings',
      'Modular Kitchens, Walk-In Wardrobes & Storage Systems',
      'Curated Material Boards, Lighting Design & Soft Furnishings',
      'Itemized BOQ with 50% 3D Design Fee Rebate on Execution',
    ],
    advantages: [
      {
        icon: 'icon-architecture-and-city1',
        title: 'Tailored Lifestyle Fit',
        text: 'Layouts, circulation, and hidden storage custom-engineered around your family’s daily routines.',
      },
      {
        icon: 'icon-guarantee-certificate',
        title: 'Climate-Ready Materials',
        text: 'Moisture-resistant boards, seasoned timber, and imported hardware built for Bangladesh’s humidity.',
      },
      {
        icon: 'icon-hr',
        title: 'Turnkey Peace of Mind',
        text: 'Single-point accountability from 3D concept design and civil work to final move-in handover.',
      },
      {
        icon: 'icon-wallet',
        title: 'Transparent BOQ Costing',
        text: 'Detailed line-by-line BOQ with zero hidden charges and 50% 3D design fee rebate on execution.',
      },
    ],
    processSteps: [
      {
        title: 'Site Measurement & Lifestyle Discovery',
        duration: 'Days 1–3',
        desc: 'On-site laser measurement of your residence and a deep-dive briefing on family routines, storage needs, and budget.',
      },
      {
        title: '2D Space Zoning & Moodboard Curation',
        duration: 'Week 1–2',
        desc: 'Optimizing room circulation, furniture placement, electrical points, and aesthetic direction.',
      },
      {
        title: 'Photorealistic 3D Visualization & BOQ',
        duration: 'Week 2–4',
        desc: 'Room-by-room 3D renders paired with physical material swatches and an itemized Bill of Quantities.',
      },
      {
        title: 'Factory Millwork, Ceiling & MEP Execution',
        duration: 'Week 5–10',
        desc: 'Parallel off-site cabinet fabrication and on-site false ceiling, lighting, paint, and wall paneling.',
      },
      {
        title: 'Quality Walkthrough & Key Handover',
        duration: 'Final Week',
        desc: 'Multi-point quality inspection, deep cleaning, final styling, and turnkey handover with 50% design fee rebate.',
      },
    ],
    faqs: [
      {
        q: 'How long does a full residential interior project take in Dhaka?',
        a: 'A typical 1,500–2,500 sq.ft residential project takes 2–4 weeks for 2D space planning and 3D approval, followed by 8–12 weeks for complete on-site turnkey execution.',
      },
      {
        q: 'Can I customize materials to fit my target budget?',
        a: 'Yes. We provide tiered material specifications (such as HPL Laminate, Acrylic, UV, Natural Veneer, or PU Lacquer finishes) so you can balance luxury aesthetics with your exact budget.',
      },
      {
        q: 'How does the BDT 40/sqft 3D design fee and 50% refund work?',
        a: 'We charge BDT 40/sq.ft for complete 2D layout planning and photorealistic 3D renders. When you appoint Plastid for the turnkey execution of your home interior, 50% of that design fee is credited back upon project completion.',
      },
    ],
    seo: {
      metaTitle: 'Residential Interior Design in Dhaka | Home & Flat Interior | Plastid',
      metaDescription:
        'Transform your home with Plastid Interior & Architecture. Expert turnkey residential interior design in Dhaka for apartments, duplexes, kitchens, and bedrooms.',
      keywords: [
        'residential interior design Dhaka',
        'home interior design Bangladesh',
        'flat interior design company Dhaka',
        'turnkey home interior Bangladesh',
        'Plastid Interior and Architecture',
      ],
      serviceType: 'Residential Interior Design',
    },
  },

  'full-apartment-interior': {
    slug: 'full-apartment-interior',
    title: 'Full Apartment Interior',
    heroTitle: 'Full Apartment Interior Design',
    h2Title: 'Complete Turnkey Flat Interior Solutions From Foyer to Balcony',
    subtitle: 'Residential Interior',
    category: 'Residential',
    parentSlug: 'residential-interior',
    icon: 'icon-floor',
    cardImg: '/images/services/service-single/pricing-1.jpg',
    mainImg: '/images/slides/v2-2.jpg',
    formOptionLabel: 'Residential — Full Apartment Interior',
    specs: {
      timeline: '8–10 Weeks Execution',
      designRate: 'BDT 40 / sq.ft (3D)',
      rebate: '50% Fee Refund on Build',
      scope: 'Foyer, Living, Kitchen & Beds',
    },
    shortText:
      'End-to-end turnkey interior solutions for newly handed-over flats and luxury apartments—covering foyer, living, dining, bedrooms, and kitchen.',
    description1:
      'Buying an apartment is a milestone; turning that bare concrete shell into a warm, cohesive home requires architectural precision. Our Full Apartment Interior service is designed specifically for flat owners in Dhaka looking for a seamless, stress-free turnkey transformation from foyer to balcony.',
    description2:
      'We create a unified design language across your drawing room, family lounge, dining area, kitchen, and bedrooms. By maximizing vertical storage, concealing wiring and AC trunking, and layering warm architectural lighting, we make standard Dhaka apartment footprints feel significantly more spacious and luxurious.',
    highlights: [
      'Entry Foyer, Shoe Rack & Statement Partition Screens',
      'Formal Drawing & Family Living Room Media Walls',
      'Dining Space with Custom Crockery & Basin Vanities',
      'Master, Kids & Guest Bedroom Wardrobes and Study Units',
      'Modular Kitchen with Waterproof Core & Chimney Ducting',
      'Layered Cove, Spot & Chandelier Lighting with Smart Switching',
    ],
    advantages: [
      {
        icon: 'icon-floor',
        title: 'Space Maximization',
        text: 'Smart built-in floor-to-ceiling storage that keeps 1,200–3,500+ sq.ft flats clutter-free and airy.',
      },
      {
        icon: 'icon-concept',
        title: 'Cohesive Design Theme',
        text: 'Seamless flow of colors, wood grains, and lighting from the entrance foyer to every bedroom.',
      },
      {
        icon: 'icon-guarantee-certificate',
        title: 'On-Time Flat Handover',
        text: 'Milestone-tracked execution schedule so your family can move in without contractor delays.',
      },
      {
        icon: 'icon-wallet',
        title: '50% Design Fee Rebate',
        text: 'Get 50% of your BDT 40/sqft 3D design fee refunded upon turnkey apartment completion.',
      },
    ],
    processSteps: [
      {
        title: 'On-Site Flat Inspection & Laser Survey',
        duration: 'Days 1–3',
        desc: 'Checking developer handover conditions, beam heights, electrical DB points, and exact wall dimensions.',
      },
      {
        title: '2D Furniture, Ceiling & Electrical Layout',
        duration: 'Week 1–2',
        desc: 'Finalizing room zoning, AC placement, false ceiling grids, and switchboard ergonomics.',
      },
      {
        title: 'Room-by-Room 3D Visualization & BOQ',
        duration: 'Week 2–4',
        desc: 'Photorealistic 3D views of every room alongside board, laminate, hardware, and paint selection.',
      },
      {
        title: 'Turnkey Ceiling, Carpentry & Lighting Fit-Out',
        duration: 'Week 5–9',
        desc: 'Coordinated execution of gypsum ceiling, wiring, custom cabinetry, glasswork, and luxury wall finishes.',
      },
      {
        title: 'Final Styling, Audit & Move-In Handover',
        duration: 'Week 10',
        desc: 'Hardware tuning, deep cleaning, snag-list verification, and key handover ready for your family.',
      },
    ],
    faqs: [
      {
        q: 'When is the best time to book apartment interior design?',
        a: 'Ideally 1–2 months before your developer hands over the flat, allowing us to complete 2D layouts and 3D renders so site work can begin the day you receive the keys.',
      },
      {
        q: 'Do you handle electrical, false ceiling, and painting along with woodwork?',
        a: 'Yes, our Full Apartment Interior package is 100% turnkey—including false ceilings, electrical rewiring, lighting, wall treatments, glasswork, and custom cabinetry.',
      },
      {
        q: 'What is the typical budget range for a full apartment interior in Dhaka?',
        a: 'Budgets vary based on square footage and material tier (HPL vs. Acrylic/Veneer/PU). After our initial consultation and 2D layout, we provide a transparent, itemized BOQ tailored to your target investment.',
      },
    ],
    seo: {
      metaTitle: 'Full Apartment Interior Design in Dhaka | Turnkey Flat Interior | Plastid',
      metaDescription:
        'Complete turnkey apartment interior design in Dhaka. We design and execute living rooms, dining spaces, modular kitchens, and bedrooms with 3D visualization.',
      keywords: [
        'apartment interior design Dhaka',
        'full flat interior design Bangladesh',
        'turnkey apartment interior cost Dhaka',
        'modern flat interior design',
        'luxury apartment interior Dhaka',
      ],
      serviceType: 'Full Apartment Interior Design',
    },
  },

  'duplex-and-villa': {
    slug: 'duplex-and-villa',
    title: 'Duplex and Villa',
    heroTitle: 'Duplex & Villa Interior Design',
    h2Title: 'Bespoke Multi-Level Interior Architecture for Duplexes, Penthouses & Villas',
    subtitle: 'Residential Interior',
    category: 'Residential',
    parentSlug: 'residential-interior',
    icon: 'icon-architecture-and-city',
    cardImg: '/images/resources/working-1.jpg',
    mainImg: '/images/slides/v1-3.jpg',
    formOptionLabel: 'Residential — Duplex & Villa',
    specs: {
      timeline: '10–16 Weeks Execution',
      designRate: 'BDT 40 / sq.ft (3D)',
      rebate: '50% Fee Refund on Build',
      scope: 'Multi-Floor Turnkey Build',
    },
    shortText:
      'Bespoke multi-level interior architecture for duplex penthouses, independent villas, and vacation homes with grand staircases and double-height lounges.',
    description1:
      'Duplexes, triplexes, and independent villas offer extraordinary architectural volume—from double-height living atriums to sweeping feature staircases and private terraces. Our Duplex & Villa Interior service celebrates these proportions with bespoke luxury detailing and effortless vertical flow.',
    description2:
      'We design statement staircase railings in tempered glass, brass, and wrought iron, monumental double-height feature walls, private home theaters, prayer rooms, and indoor-outdoor terrace lounges. Every floor is zoned for privacy and acoustic comfort while maintaining a grand, unified architectural identity.',
    highlights: [
      'Double-Height Atrium Feature Walls & Cascade Chandeliers',
      'Custom Architectural Staircases (Glass, Wood, Brass & Wrought Iron)',
      'Private Family Lounges, Home Theaters & Study Libraries',
      'Luxury Master Suites with Walk-In Closets & Spa Bathrooms',
      'Terrace, Patio & Indoor Courtyard Integration',
      'Floor-by-Floor Acoustic, HVAC & Smart Lighting Zoning',
    ],
    advantages: [
      {
        icon: 'icon-architecture-and-city',
        title: 'Grand Scale Expertise',
        text: 'Specialized in proportioning double-height ceilings and multi-floor vertical circulation.',
      },
      {
        icon: 'icon-guarantee-certificate',
        title: 'Bespoke Craftsmanship',
        text: 'Custom marble, sintered stone, brass metal, and natural wood veneer detailing.',
      },
      {
        icon: 'icon-hr',
        title: 'Acoustic & MEP Zoning',
        text: 'Smart floor-by-floor HVAC, lighting automation, and sound insulation between public and private levels.',
      },
      {
        icon: 'icon-wallet',
        title: 'Phased Milestone Billing',
        text: 'Structured floor-wise execution schedules and dedicated site engineers for large residences.',
      },
    ],
    processSteps: [
      {
        title: 'Architectural Volume & Structural Assessment',
        duration: 'Week 1',
        desc: 'Evaluating slab openings, staircase structure, double-height glazing, and MEP shaft routing.',
      },
      {
        title: 'Multi-Level Zoning & Circulation Design',
        duration: 'Week 2–3',
        desc: 'Separating formal entertaining zones on lower levels from private family retreats above.',
      },
      {
        title: 'Bespoke 3D Renders for Atrium & Suites',
        duration: 'Week 4–6',
        desc: 'High-resolution 3D visualizations of double-height walls, staircases, bedrooms, and terrace lounges.',
      },
      {
        title: 'Custom Metal, Stone, Glass & Millwork Build',
        duration: 'Week 7–14',
        desc: 'Precision fabrication and installation of staircases, paneling, custom furniture, and architectural lighting.',
      },
      {
        title: 'White-Glove Commissioning & Handover',
        duration: 'Week 15–16',
        desc: 'Full lighting/HVAC testing, soft furnishing styling, and final turnkey handover.',
      },
    ],
    faqs: [
      {
        q: 'Can you redesign and build the internal staircase of a duplex?',
        a: 'Yes. We engineer and fabricate custom structural and decorative staircases using mild steel, solid timber treads, tempered glass balustrades, brass accents, and wrought iron.',
      },
      {
        q: 'Do you travel outside Dhaka for villa and country home projects?',
        a: 'Absolutely. We undertake duplex, villa, and country residence projects across Bangladesh—including Sylhet, Chattogram, Gazipur, and Cumilla—with dedicated on-site engineering supervision.',
      },
      {
        q: 'How do you handle lighting and maintenance for double-height ceilings?',
        a: 'We design layered cascade chandeliers paired with accessible wall washers, cove lighting, and motorized drapery tracks so maintenance remains practical.',
      },
    ],
    seo: {
      metaTitle: 'Duplex & Villa Interior Design in Bangladesh | Luxury Home Interior | Plastid',
      metaDescription:
        'Luxury duplex, penthouse, and villa interior design in Dhaka and across Bangladesh. Double-height living rooms, custom staircases, and turnkey execution.',
      keywords: [
        'duplex interior design Bangladesh',
        'villa interior design Dhaka',
        'duplex house design Bangladesh',
        'penthouse interior design Dhaka',
        'double height living room interior',
      ],
      serviceType: 'Duplex and Villa Interior Design',
    },
  },

  'modular-kitchen': {
    slug: 'modular-kitchen',
    title: 'Modular Kitchen',
    heroTitle: 'Modular Kitchen Design & Fabrication',
    h2Title: 'Ergonomic, Waterproof Modular Kitchens Engineered for Bangladeshi Cooking',
    subtitle: 'Residential Interior',
    category: 'Residential',
    parentSlug: 'residential-interior',
    icon: 'icon-kitchen',
    cardImg: '/images/services/v2-5.jpg',
    mainImg: '/images/services/v2-5.jpg',
    formOptionLabel: 'Residential — Modular Kitchen',
    specs: {
      timeline: '3–5 Weeks Execution',
      designRate: 'BDT 40 / sq.ft (3D)',
      rebate: '50% Fee Refund on Build',
      scope: 'Cabinets, Countertop & MEP',
    },
    shortText:
      'Ergonomic, moisture-resistant, and high-storage modular kitchens engineered for Bangladeshi cooking habits with premium hardware and sleek finishes.',
    description1:
      'The kitchen is the hardest-working space in any home—especially in Bangladeshi households where heavy cooking, heat, moisture, and spice storage demand heavy-duty engineering. Our Modular Kitchen service blends European ergonomic workflows with ultra-durable, water- and heat-resistant materials.',
    description2:
      'We apply the classic "Golden Work Triangle" (Hob, Sink, Refrigerator) to L-shaped, U-shaped, Parallel, and Island kitchens. Equipped with soft-close Blum/Hettich hardware, tall pantry pull-outs, bottle racks, magic corners, high-suction chimney ducting, and quartz/granite countertops, your kitchen remains spotless and effortless to use for years.',
    highlights: [
      'L-Shape, U-Shape, Parallel, Straight & Island Kitchen Layouts',
      'Waterproof Marine Plywood / PVC / HDHMR Core Construction',
      'Acrylic, High-Gloss Laminate (HPL), PU Lacquer & Matte Finishes',
      'Soft-Close Tandem Drawers, Tall Pantry Units & Corner Carousels',
      'Quartz/Granite Countertops, Backsplash Tiling & Under-Cabinet LEDs',
      'Concealed Chimney Ducting, Gas/Water Piping & Appliance Integration',
    ],
    advantages: [
      {
        icon: 'icon-kitchen',
        title: 'Ergonomic Work Triangle',
        text: 'Designed around the cooking triangle for effortless prep, cooking, and cleaning.',
      },
      {
        icon: 'icon-guarantee-certificate',
        title: 'Heat & Water Resistant',
        text: 'Built specifically with marine-grade and PVC cores to withstand humidity, oil, and heavy daily cooking.',
      },
      {
        icon: 'icon-cupboard',
        title: 'Smart Storage Organizers',
        text: 'Dedicated cutlery trays, spice pull-outs, dish drainers, magic corners, and tall pantry units.',
      },
      {
        icon: 'icon-wallet',
        title: 'Precision Factory Finish',
        text: 'Machine edge-banded cabinetry with soft-close hinges and transparent per-sqft/unit pricing.',
      },
    ],
    processSteps: [
      {
        title: 'Kitchen Measurement & Appliance Audit',
        duration: 'Days 1–2',
        desc: 'Recording exact plumbing points, gas lines, chimney exhaust routes, and oven/fridge dimensions.',
      },
      {
        title: 'Work-Triangle & Storage Zoning Plan',
        duration: 'Week 1',
        desc: 'Mapping wet and dry zones, drawer heights, tall pantry units, and countertop workflow.',
      },
      {
        title: '3D Kitchen Render & Swatch Approval',
        duration: 'Week 2',
        desc: 'Visualizing cabinet colors, quartz/granite slabs, backsplash tiles, and internal hardware accessories.',
      },
      {
        title: 'Factory Cabinetry Fabrication & Site Prep',
        duration: 'Week 3–4',
        desc: 'Precision panel cutting and edge-banding while civil, tiling, and electrical prep finish on site.',
      },
      {
        title: 'Installation, Countertop Fitting & Testing',
        duration: 'Week 5',
        desc: 'Cabinet mounting, soft-close alignment, chimney/hob installation, and under-cabinet LED testing.',
      },
    ],
    faqs: [
      {
        q: 'Which board material is best for modular kitchens in Bangladesh?',
        a: 'For sink and wet zones, we recommend 100% waterproof PVC board or Marine Grade Plywood, paired with high-density moisture-resistant boards and Acrylic or HPL laminates for upper cabinets.',
      },
      {
        q: 'Can you remodel my old existing kitchen into a modern modular kitchen?',
        a: 'Yes! We handle complete kitchen remodeling—including dismantling old civil/wood cabinets, updating plumbing and electrical points, retiling backsplashes, and installing your new modular system.',
      },
      {
        q: 'How is modular kitchen pricing calculated?',
        a: 'Pricing depends on total cabinet square footage, core material (Marine Ply, HDHMR, PVC), surface finish (HPL vs. Acrylic/PU), and hardware accessories (tandem boxes, pantry pull-outs). We provide an itemized quote before fabrication.',
      },
    ],
    seo: {
      metaTitle: 'Modular Kitchen Design in Dhaka | Custom Kitchen Cabinet | Plastid',
      metaDescription:
        'Custom modular kitchen design and installation in Dhaka. Waterproof cabinets, Acrylic & HPL finishes, soft-close hardware, and ergonomic kitchen layouts.',
      keywords: [
        'modular kitchen Dhaka',
        'kitchen cabinet design Bangladesh',
        'modular kitchen price in Bangladesh',
        'acrylic kitchen cabinet Dhaka',
        'modern kitchen interior design',
      ],
      serviceType: 'Modular Kitchen Design',
    },
  },

  'bedroom-design': {
    slug: 'bedroom-design',
    title: 'Bedroom Design',
    heroTitle: 'Bespoke Bedroom Interior Design',
    h2Title: 'Luxury Master Suites, Custom Wardrobes & Kids’ Bedroom Interiors',
    subtitle: 'Residential Interior',
    category: 'Residential',
    parentSlug: 'residential-interior',
    icon: 'icon-furniture-and-household',
    cardImg: '/images/services/v2-2.jpg',
    mainImg: '/images/services/service-single/pricing-2.jpg',
    formOptionLabel: 'Residential — Bedroom Design',
    specs: {
      timeline: '3–5 Weeks Execution',
      designRate: 'BDT 40 / sq.ft (3D)',
      rebate: '50% Fee Refund on Build',
      scope: 'Single Room or Full Suite',
    },
    shortText:
      'Serene master suites, space-saving kids’ bedrooms, and custom floor-to-ceiling wardrobes designed for restful sleep and clutter-free organization.',
    description1:
      'Your bedroom should be a personal retreat—a calm, restorative space that begins and ends your day in comfort. Our Bedroom Design service creates tailored master bedrooms, playful and adaptable children’s rooms, and welcoming guest suites that balance luxury aesthetics with smart storage.',
    description2:
      'We craft upholstered and paneled headboard feature walls, floor-to-ceiling sliding or hinged wardrobes with internal LED sensors, floating dressing vanities, cozy window seating, and ergonomic study corners. Warm dimmable lighting and soothing color palettes ensure hotel-grade tranquility at home.',
    highlights: [
      'Upholstered, Fluted & Veneer Bed-Back Accent Walls',
      'Floor-to-Ceiling Sliding & Walk-In Wardrobes with Loft Storage',
      'Built-In Dressing Tables, Backlit Mirrors & Jewelry Organizers',
      'Space-Saving Kids’ Bunk Beds, Study Desks & Bookshelves',
      'Warm Cove Lighting, Reading Sconces & Blackout Drapery Pelmets',
      'Custom TV Consoles, Bay Window Seating & Acoustic Soft Furnishings',
    ],
    advantages: [
      {
        icon: 'icon-furniture-and-household',
        title: 'Restful Hotel Ambiance',
        text: 'Calming acoustics, warm color psychology, and glare-free layered bedroom lighting.',
      },
      {
        icon: 'icon-cupboard',
        title: 'Maximum Wardrobe Space',
        text: 'Custom internal compartments for sarees, suits, drawer safes, luggage lofts, and daily wear.',
      },
      {
        icon: 'icon-guarantee-certificate',
        title: 'Tailored to Every Age',
        text: 'Specialized layouts for master suites, growing kids’ study rooms, and senior comfort.',
      },
      {
        icon: 'icon-wallet',
        title: 'Fast Room Turnaround',
        text: 'Clean, rapid installation whether upgrading one bedroom or furnishing an entire flat.',
      },
    ],
    processSteps: [
      {
        title: 'Room Measurement & Storage Audit',
        duration: 'Days 1–2',
        desc: 'Measuring wall spans, window positions, and cataloging your wardrobe and dressing requirements.',
      },
      {
        title: 'Bed, Wardrobe & Circulation Layout',
        duration: 'Week 1',
        desc: 'Ensuring optimal door clearance, AC airflow, bedside power access, and ergonomic dressing zones.',
      },
      {
        title: '3D Bedroom Visualization & Swatches',
        duration: 'Week 2',
        desc: 'Selecting headboard upholstery fabrics, laminate/veneer grains, mirror styles, and warm lighting.',
      },
      {
        title: 'Wardrobe, Headboard & Ceiling Build',
        duration: 'Week 3–4',
        desc: 'Precision fabrication of full-height closets, bed-back paneling, dressing units, and cove ceiling.',
      },
      {
        title: 'Lighting Setup, Hardware Tuning & Handover',
        duration: 'Week 5',
        desc: 'Installing profile LEDs, soft-close hinges, drapery pelmets, and delivering a spotless bedroom.',
      },
    ],
    faqs: [
      {
        q: 'Can I hire Plastid for just one master bedroom or custom wardrobe?',
        a: 'Yes, we undertake standalone master bedroom makeovers, kids’ rooms, and floor-to-ceiling wardrobe projects in addition to full-apartment interiors.',
      },
      {
        q: 'Should I choose sliding or hinged doors for my bedroom wardrobe?',
        a: 'Sliding wardrobes are ideal when clearance between the bed and closet is under 3 feet, while hinged doors offer 100% full-width visibility when space permits. We help you choose based on your room layout.',
      },
      {
        q: 'Can you include hidden safe lockers and sensor lights inside the wardrobe?',
        a: 'Absolutely. We regularly integrate concealed security drawers, pull-down hanger rods, tie/jewelry organizers, and automatic door-sensor LED strips.',
      },
    ],
    seo: {
      metaTitle: 'Bedroom Interior Design & Custom Wardrobe in Dhaka | Plastid',
      metaDescription:
        'Luxury master bedroom, kids bedroom interior design, and floor-to-ceiling wardrobe fabrication in Dhaka. Create a peaceful, clutter-free sanctuary.',
      keywords: [
        'bedroom interior design Dhaka',
        'master bedroom design Bangladesh',
        'custom wardrobe design Dhaka',
        'kids bedroom interior Bangladesh',
        'modern bedroom cabinet design',
      ],
      serviceType: 'Bedroom Interior Design',
    },
  },

  'home-renovation': {
    slug: 'home-renovation',
    title: 'Home Renovation',
    heroTitle: 'Home Renovation & Interior Makeover',
    h2Title: 'Complete Flat Remodeling, Civil Upgrades & Damp-Proof Interior Makeovers',
    subtitle: 'Residential Interior',
    category: 'Residential',
    parentSlug: 'residential-interior',
    icon: 'icon-paint',
    cardImg: '/images/services/v2-3.jpg',
    mainImg: '/images/services/v2-3.jpg',
    formOptionLabel: 'Residential — Home Renovation',
    specs: {
      timeline: '6–12 Weeks Execution',
      designRate: 'BDT 40 / sq.ft (3D)',
      rebate: '50% Fee Refund on Build',
      scope: 'Civil, MEP, Tiling & Interior',
    },
    shortText:
      'Complete remodeling and modernization of older flats and houses—upgrading layouts, bathrooms, kitchens, flooring, wiring, and cabinetry.',
    description1:
      'Older apartments and ancestral homes in Dhaka often have generous square footage but suffer from dated layouts, dark corridors, aging plumbing, and worn-out finishes. Our Home Renovation & Makeover service breathes modern life into existing residences without the stress of managing multiple contractors.',
    description2:
      'Whether you want a non-structural cosmetic refresh or a full gut-renovation involving wall reconfiguration, new floor tiles, concealed electrical rewiring, bathroom modernization, and contemporary woodwork, our team executes with strict dust control and minimal disruption.',
    highlights: [
      'Internal Partition Reconfiguration & Open-Plan Conversions',
      'Bathroom & Kitchen Gut-Renovation with Modern Plumbing',
      'Floor Tile Replacement, Wooden Flooring & Wall Dampness Treatment',
      'Concealed Electrical Rewiring, DB Box Upgrade & Modern Lighting',
      'Refacing or Replacing Old Cabinets, Doors & Window Grilles',
      'Complete Repainting, False Ceilings & Modern Storage Additions',
    ],
    advantages: [
      {
        icon: 'icon-paint',
        title: 'Total Flat Transformation',
        text: 'Turn a 10–25 year old apartment into a bright, contemporary luxury residence.',
      },
      {
        icon: 'icon-hr',
        title: 'Phased Low-Disruption Work',
        text: 'Structured room-by-room execution options for families renovating lived-in homes.',
      },
      {
        icon: 'icon-guarantee-certificate',
        title: 'Structural & Damp Safety',
        text: 'Root-cause waterproofing, dampness treatment, and safe load-aware civil modifications.',
      },
      {
        icon: 'icon-wallet',
        title: 'High Property Value ROI',
        text: 'Dramatically increases both daily living comfort and apartment resale or rental value.',
      },
    ],
    processSteps: [
      {
        title: 'Structural, Plumbing, Damp & Electrical Audit',
        duration: 'Week 1',
        desc: 'Inspecting wall dampness, beam/column positions, old wiring loads, and bathroom plumbing health.',
      },
      {
        title: 'Redesign Proposal, 3D Visuals & Itemized BOQ',
        duration: 'Week 2–3',
        desc: 'New layout plans, 3D before/after visualizations, and clear civil + interior cost breakdown.',
      },
      {
        title: 'Controlled Dismantling, Civil & MEP Upgrades',
        duration: 'Week 4–6',
        desc: 'Safe demolition, damp-proofing, concealed electrical rewiring, and bathroom/kitchen pipe replacement.',
      },
      {
        title: 'Tiling, False Ceiling, Woodwork & Painting',
        duration: 'Week 7–10',
        desc: 'Installing new large-format tiles, gypsum ceilings, modular kitchen/wardrobes, and luxury paint.',
      },
      {
        title: 'Post-Renovation Deep Cleaning & Handover',
        duration: 'Week 11–12',
        desc: 'Pressure-testing plumbing, electrical load checks, industrial deep cleaning, and key handover.',
      },
    ],
    faqs: [
      {
        q: 'Can you fix wall dampness and old electrical wiring during renovation?',
        a: 'Yes. Before installing any new wall paneling or paint, we treat the root causes of dampness with chemical waterproofing, upgrade old electrical wiring for AC/appliance safety, and pressure-test plumbing lines.',
      },
      {
        q: 'Can our family stay in the apartment while renovation is going on?',
        a: 'For partial makeovers (e.g., bedrooms or kitchen only), we can work in phases with dust barriers. For full gut-renovations involving floor tiling and all bathrooms, temporary relocation is faster and cleaner.',
      },
      {
        q: 'Do you handle building management permissions and debris removal?',
        a: 'Yes, our site team coordinates working hours with your apartment society and manages bagged debris disposal regularly.',
      },
    ],
    seo: {
      metaTitle: 'Home Renovation & Flat Makeover Service in Dhaka | Plastid Interior',
      metaDescription:
        'Modernize your existing flat or house in Dhaka with Plastid’s Home Renovation service. Civil remodeling, damp repair, tiling, bathroom, kitchen, and interior upgrades.',
      keywords: [
        'home renovation Dhaka',
        'flat renovation service Bangladesh',
        'apartment makeover Dhaka',
        'old flat remodeling Bangladesh',
        'interior renovation contractor Dhaka',
      ],
      serviceType: 'Home Renovation and Remodeling',
    },
  },

  // ──────────────────────────────────────────────────────────
  // 2. COMMERCIAL INTERIOR (Parent + 4 Sub-Services)
  // ──────────────────────────────────────────────────────────
  'commercial-interior': {
    slug: 'commercial-interior',
    title: 'Commercial Interior',
    heroTitle: 'Commercial & Workspace Interior Design',
    h2Title: 'High-Performance Corporate Offices, Retail Showrooms & Commercial Fit-Outs',
    subtitle: 'High-Performance Business Environments',
    category: 'Commercial',
    parentSlug: null,
    icon: 'icon-company',
    cardImg: '/images/resources/history-2.jpg',
    mainImg: '/images/projects/project-single/video-gallery-1.jpg',
    formOptionLabel: 'Commercial — Office & Corporate',
    specs: {
      timeline: '4–10 Weeks Fast-Track',
      designRate: 'BDT 40 / sq.ft (3D)',
      rebate: '50% Fee Refund on Build',
      scope: 'Turnkey Civil, MEP & Fit-Out',
    },
    shortText:
      'Strategic commercial interior architecture for corporate offices, creative studios, retail showrooms, clinics, and hospitality venues.',
    description1:
      'In business, your physical space is your most powerful silent ambassador. It shapes first impressions for clients, drives daily employee productivity, and directly influences customer dwell time and sales. Plastid’s Commercial Interior division engineers high-impact workspaces and commercial destinations across Bangladesh.',
    description2:
      'We combine brand storytelling with rigorous commercial engineering—covering space efficiency, acoustic privacy, commercial HVAC integration, IT/networking trunking, fire safety compliance, and high-traffic material durability—delivered on rapid commercial timelines so your business opens faster.',
    highlights: [
      'Corporate Offices, Headquarters & Co-Working Hubs',
      'Creative Studios, Tech Agencies & Podcast/Media Suites',
      'Flagship Retail Showrooms, Boutiques & Experience Centers',
      'Medical Clinics, Diagnostic Centers, Spas & Hospitality Spaces',
      'Complete MEP, Networking, Acoustics, Glass Partitions & Branding',
      'Fast-Track Day/Night Site Shifts to Save Commercial Rent',
    ],
    advantages: [
      {
        icon: 'icon-company',
        title: 'Brand-Aligned Identity',
        text: 'Spatial design that translates your corporate colors, culture, and ethos into built architecture.',
      },
      {
        icon: 'icon-productive',
        title: 'Fast-Track Delivery',
        text: 'Accelerated day/night site shifts so you save on rent-free fit-out periods and launch on schedule.',
      },
      {
        icon: 'icon-guarantee-certificate',
        title: 'Commercial Durability',
        text: 'Heavy-duty flooring, acoustic tempered glass, and commercial hardware built for high footfall.',
      },
      {
        icon: 'icon-wallet',
        title: 'Turnkey Corporate BOQ',
        text: 'Single-vendor civil, glass, workstations, electrical, networking, and HVAC coordination.',
      },
    ],
    processSteps: [
      {
        title: 'Operational Workflow, Headcount & Brand Audit',
        duration: 'Days 1–3',
        desc: 'Analyzing team structure, customer journey, IT/MEP requirements, and brand guidelines.',
      },
      {
        title: 'Space Planning, Seat Density & MEP Layout',
        duration: 'Week 1–2',
        desc: 'CAD test-fit layouts optimizing workstations, cabins, circulation, networking, and AC tonnage.',
      },
      {
        title: '3D Commercial Visualization & Corporate BOQ',
        duration: 'Week 2–3',
        desc: 'Photorealistic 3D renders and itemized commercial bill of quantities for management sign-off.',
      },
      {
        title: 'Fast-Track Site Fit-Out, Glass & Workstations',
        duration: 'Week 4–8',
        desc: 'Parallel off-site modular furniture manufacturing and on-site ceiling, glass, networking, and flooring.',
      },
      {
        title: 'Systems Testing, Snag Clearance & Handover',
        duration: 'Final Week',
        desc: 'IT/AV testing, lighting lux verification, signage check, and turnkey handover ready for operations.',
      },
    ],
    faqs: [
      {
        q: 'Do you handle IT networking, server rooms, and AC ducting in commercial projects?',
        a: 'Yes. Our commercial turnkey scope includes structured LAN cabling, floor pop-up boxes, server rack enclosures, acoustic partitions, and cassette/ducted HVAC integration.',
      },
      {
        q: 'Can you work night shifts in commercial buildings with daytime restrictions?',
        a: 'Yes, our site teams regularly work evening and weekend schedules to comply with commercial tower management rules in Banani, Gulshan, Tejgaon, Motijheel, and Agrabad.',
      },
      {
        q: 'Do you provide formal VAT/Tax compliant corporate billing and BOQs?',
        a: 'Yes, we provide complete technical specifications, formal work orders, milestone invoices, and corporate documentation required by procurement departments.',
      },
    ],
    seo: {
      metaTitle: 'Commercial Interior Design in Dhaka | Office, Retail & Clinic | Plastid',
      metaDescription:
        'Leading commercial interior design firm in Dhaka. Turnkey corporate offices, studio workspaces, retail showrooms, and clinic interiors delivered on time.',
      keywords: [
        'commercial interior design Dhaka',
        'commercial space interior Bangladesh',
        'corporate interior firm Dhaka',
        'turnkey commercial fit out Bangladesh',
        'Plastid commercial interior',
      ],
      serviceType: 'Commercial Interior Design',
    },
  },

  'office-and-corporate': {
    slug: 'office-and-corporate',
    title: 'Office & Corporate',
    heroTitle: 'Office & Corporate Interior Design',
    h2Title: 'Ergonomic Corporate Headquarters, Boardrooms & Open-Plan Workspaces',
    subtitle: 'Commercial Interior',
    category: 'Commercial',
    parentSlug: 'commercial-interior',
    icon: 'icon-productive',
    cardImg: '/images/projects/v6-6.jpg',
    mainImg: '/images/resources/history-2.jpg',
    formOptionLabel: 'Commercial — Office & Corporate',
    specs: {
      timeline: '5–8 Weeks Fast-Track',
      designRate: 'BDT 40 / sq.ft (3D)',
      rebate: '50% Fee Refund on Build',
      scope: 'Workstations, Glass & MEP',
    },
    shortText:
      'Ergonomic corporate headquarters, executive cabins, acoustic boardrooms, and modern open-plan workstations designed to boost team productivity.',
    description1:
      'A well-designed corporate office attracts top talent, impresses visiting stakeholders, and eliminates workplace fatigue. Our Office & Corporate Interior service designs high-efficiency workplaces for multinational companies, local conglomerates, financial institutions, and growing enterprises.',
    description2:
      'From commanding reception lobbies and soundproof glass boardrooms to ergonomic modular workstations, MD/CEO suites, breakout cafeterias, and prayer rooms, we optimize every square foot for collaboration, focus, and seamless technology integration.',
    highlights: [
      'Signature Reception Lobbies with 3D Brand Signage',
      'Acoustic Tempered Glass Partitions & Smart Boardrooms',
      'Ergonomic Modular Workstations with Concealed Cable Management',
      'Executive Cabins, MD Suites & Private Meeting Pods',
      'Breakout Cafeterias, Pantry Zones & Biophilic Indoor Greening',
      'Structured LAN Cabling, Access Control & Commercial Lighting',
    ],
    advantages: [
      {
        icon: 'icon-productive',
        title: 'Employee Productivity',
        text: 'Ergonomic seating, glare-free task lighting (400–500 lux), and acoustic noise control.',
      },
      {
        icon: 'icon-scheme',
        title: 'Smart Space Density',
        text: 'Maximized workstation capacity and meeting zones without making the floor feel cramped.',
      },
      {
        icon: 'icon-guarantee-certificate',
        title: 'Tech-Ready Infrastructure',
        text: 'Integrated video-conferencing walls, floor pop-up boxes, access control, and server rooms.',
      },
      {
        icon: 'icon-wallet',
        title: 'Rapid Parallel Fit-Out',
        text: 'Parallel factory workstation manufacturing and site ceiling/MEP work to cut delivery time.',
      },
    ],
    processSteps: [
      {
        title: 'Departmental Headcount & Workflow Mapping',
        duration: 'Days 1–3',
        desc: 'Understanding team sizes, expansion projections, meeting room frequency, and executive cabin needs.',
      },
      {
        title: '2D Workstation Layout, Zoning & MEP Plan',
        duration: 'Week 1–2',
        desc: 'Optimizing seat density, fire exit corridors, power/data trunking, and HVAC distribution.',
      },
      {
        title: '3D Corporate Interior Rendering & BOQ',
        duration: 'Week 2–3',
        desc: 'Visualizing reception, boardrooms, MD suite, and open floor with exact material and cost specs.',
      },
      {
        title: 'Glass Partitions, Ceiling, IT & Workstation Fit-Out',
        duration: 'Week 4–7',
        desc: 'Installing acoustic ceilings, tempered glass, carpet/vinyl flooring, and modular desks.',
      },
      {
        title: 'AV/IT Testing, Ergonomic Check & Handover',
        duration: 'Week 8',
        desc: 'Testing LAN ports, boardroom AV, lighting levels, and handing over a move-in-ready office.',
      },
    ],
    faqs: [
      {
        q: 'How much space is needed per employee in a modern office layout?',
        a: 'Typically 60–90 sq.ft per person including circulation, meeting rooms, and common areas. We can create rapid test-fit layouts even before you sign your commercial lease.',
      },
      {
        q: 'Do you supply office chairs and modular workstation desks?',
        a: 'Yes, we both custom-manufacture executive suites/conference tables and supply commercial-grade modular workstations and ergonomic mesh/leather seating.',
      },
      {
        q: 'How do you ensure sound privacy for boardrooms and MD cabins?',
        a: 'We use double-glazed or thick laminated acoustic glass with drop-seals, rockwool-insulated partition headers, and acoustic ceiling/carpet treatments.',
      },
    ],
    seo: {
      metaTitle: 'Office Interior Design in Dhaka | Corporate Workspace Fit-Out | Plastid',
      metaDescription:
        'Modern corporate office interior design and turnkey fit-out in Dhaka. Workstations, glass partitions, boardrooms, and executive cabins built on schedule.',
      keywords: [
        'office interior design Dhaka',
        'corporate office interior Bangladesh',
        'modern office workstation design Dhaka',
        'office renovation company Bangladesh',
        'commercial office fit out Dhaka',
      ],
      serviceType: 'Office and Corporate Interior Design',
    },
  },

  'studio-office-design': {
    slug: 'studio-office-design',
    title: 'Studio Office Design',
    heroTitle: 'Creative Studio & Boutique Office Design',
    h2Title: 'Agile Workspaces for Tech Startups, Design Agencies & Media Studios',
    subtitle: 'Commercial Interior',
    category: 'Commercial',
    parentSlug: 'commercial-interior',
    icon: 'icon-lamp',
    cardImg: '/images/projects/v5-5.jpg',
    mainImg: '/images/projects/v6-8.jpg',
    formOptionLabel: 'Commercial — Studio Office Design',
    specs: {
      timeline: '3–6 Weeks Execution',
      designRate: 'BDT 40 / sq.ft (3D)',
      rebate: '50% Fee Refund on Build',
      scope: 'Creative, Acoustic & Agile',
    },
    shortText:
      'Inspiring, flexible workspaces for architecture studios, software agencies, content creators, photography/podcast studios, and boutique consultancies.',
    description1:
      'Creative teams, tech startups, and boutique studios don’t thrive in rigid, sterile cubicles—they need dynamic environments that spark collaboration, double as content-ready backdrops, and adapt throughout the day. Our Studio Office Design service crafts distinctive, high-character workspaces.',
    description2:
      'Whether you need acoustic treatment for a podcast/video production suite, color-accurate lighting for a design/fashion studio, or an industrial-minimalist hub for a software team, we blend raw architectural textures, flexible furniture, and bold lighting into an unforgettable workspace.',
    highlights: [
      'Open-Concept Collaborative Desks & Brainstorming Lounges',
      'Acoustic Foam/Fabric Paneling for Recording, Podcast & Media Rooms',
      'Camera-Ready Branded Backdrops & Studio Track Lighting',
      'Material Sample Libraries, Pin-Up Walls & Prototype Zones',
      'Compact Coffee Bars, Lounge Nooks & Multi-Use Event Spaces',
      'Exposed Ceiling Industrial Styling & Biophilic Accent Zones',
    ],
    advantages: [
      {
        icon: 'icon-lamp',
        title: 'High-Character Aesthetic',
        text: 'Distinctive industrial, minimalist, or biophilic styling that inspires creative teams.',
      },
      {
        icon: 'icon-music',
        title: 'Acoustic & Light Precision',
        text: 'Echo-free recording zones and high-CRI studio track lighting setups for media production.',
      },
      {
        icon: 'icon-floor',
        title: 'Agile & Scalable Layout',
        text: 'Modular desks and multi-use lounge zones that easily adapt as your team grows.',
      },
      {
        icon: 'icon-wallet',
        title: 'Smart Focal Budgeting',
        text: 'High visual impact achieved through strategic material choices and camera-ready focal walls.',
      },
    ],
    processSteps: [
      {
        title: 'Creative Workflow, Gear & Acoustic Brief',
        duration: 'Days 1–3',
        desc: 'Mapping team collaboration zones, recording/camera angles, lighting needs, and storage.',
      },
      {
        title: 'Flexible Zoning & Sound/Light Layout',
        duration: 'Week 1',
        desc: 'Separating quiet production/coding zones from lively lounge and client meeting areas.',
      },
      {
        title: '3D Studio Concept Renders & Texture Board',
        duration: 'Week 2',
        desc: 'Visualizing exposed ceilings, micro-cement/brick textures, custom desks, and neon/brass branding.',
      },
      {
        title: 'Acoustic Treatment, Desks & Lighting Fit-Out',
        duration: 'Week 3–5',
        desc: 'Installing acoustic panels, track lighting, glass partitions, and custom studio furniture.',
      },
      {
        title: 'Sound/Light Calibration & Studio Handover',
        duration: 'Week 6',
        desc: 'Testing room acoustics, dimmer scenes, and power points for immediate creative production.',
      },
    ],
    faqs: [
      {
        q: 'Can you soundproof a room inside an office for video or podcast recording?',
        a: 'Yes! We build acoustic studio rooms using high-density rockwool insulation, double-glazed glass, acoustic door seals, and decorative slatted wood/fabric diffuser panels.',
      },
      {
        q: 'How can we make a compact 800–1,500 sq.ft studio office look spacious and premium?',
        a: 'By using exposed open ceilings with matte dark paint and track lighting, clear fluted/tempered glass partitions, built-in wall storage, and one bold architectural focal wall.',
      },
      {
        q: 'Can the studio double as a client lounge and content shooting space?',
        a: 'Absolutely. We design multi-set corners with concealed storage and adjustable color-temperature lighting so every angle of your studio is camera-ready.',
      },
    ],
    seo: {
      metaTitle: 'Studio Office & Creative Workspace Interior Design in Dhaka | Plastid',
      metaDescription:
        'Custom studio office interior design in Dhaka for tech startups, creative agencies, architecture firms, and podcast/media production studios.',
      keywords: [
        'studio office interior design Dhaka',
        'creative workspace design Bangladesh',
        'podcast studio interior Dhaka',
        'small office interior design Dhaka',
        'startup office design Bangladesh',
      ],
      serviceType: 'Studio Office Interior Design',
    },
  },

  'retail-and-showrooms': {
    slug: 'retail-and-showrooms',
    title: 'Retail and Showrooms',
    heroTitle: 'Retail Store & Showroom Interior Design',
    h2Title: 'High-Conversion Retail Boutiques, Flagship Showrooms & Visual Merchandising',
    subtitle: 'Commercial Interior',
    category: 'Commercial',
    parentSlug: 'commercial-interior',
    icon: 'icon-shop',
    cardImg: '/images/resources/history-1.jpg',
    mainImg: '/images/slides/v2-3.jpg',
    formOptionLabel: 'Commercial — Retail & Showrooms',
    specs: {
      timeline: '3–6 Weeks Rapid Fit-Out',
      designRate: 'BDT 40 / sq.ft (3D)',
      rebate: '50% Fee Refund on Build',
      scope: 'Facade, Racks, Lighting & POS',
    },
    shortText:
      'High-conversion retail boutiques, fashion outlets, jewelry shops, electronics showrooms, and brand experience centers designed to maximize sales.',
    description1:
      'Great retail interior design doesn’t just look attractive—it guides customer footsteps, highlights hero products, and increases average basket size. Our Retail & Showrooms service combines visual merchandising psychology with luxury architectural detailing.',
    description2:
      'We design magnetic shopfronts and window displays that pull foot traffic inside, intuitive customer circulation loops, high-CRI spotlighting that makes merchandise pop, flattering trial rooms, and sleek POS cash counters for fashion brands, jewelry houses, lifestyle outlets, and corporate showrooms.',
    highlights: [
      'Eye-Catching Storefront Facades & Window Display Stages',
      'Custom Display Gondolas, Wall Racks, Shelving & Illuminated Niches',
      'High-CRI Product Spotlighting & Ambient Brand Lighting',
      'Flattering Trial Rooms, Customer Lounge & Cash Wrap Counters',
      'Security Camera, EAS Gate & Back-of-House Stockroom Integration',
      'Standardized Multi-Outlet Franchise Rollout Execution',
    ],
    advantages: [
      {
        icon: 'icon-shop',
        title: 'Sales-Driven Merchandising',
        text: 'Customer flow and sightlines engineered to spotlight high-margin hero products.',
      },
      {
        icon: 'icon-lamp',
        title: 'True-Color CRI 90+ Lighting',
        text: 'Precision retail spotlighting that makes fabrics, jewelry, and product finishes pop.',
      },
      {
        icon: 'icon-guarantee-certificate',
        title: 'Rapid Mall & Street Fit-Out',
        text: 'Fast off-site fixture fabrication so you launch within your rent-free fit-out window.',
      },
      {
        icon: 'icon-wallet',
        title: 'Modular Display Systems',
        text: 'Adaptable shelving, hanging racks, and pedestals that evolve with seasonal collections.',
      },
    ],
    processSteps: [
      {
        title: 'Brand Identity, SKU Volume & Footfall Audit',
        duration: 'Days 1–3',
        desc: 'Analyzing product categories, display density, trial/storage ratios, and brand visual identity.',
      },
      {
        title: 'Store Circulation, Fixture & Lighting Plan',
        duration: 'Week 1',
        desc: 'Mapping the decompression zone, power walls, gondolas, trial rooms, and POS counter.',
      },
      {
        title: '3D Storefront & Merchandising Visualization',
        duration: 'Week 2',
        desc: 'Photorealistic 3D renders of window displays, illuminated shelving, and brand signage.',
      },
      {
        title: 'Off-Site Fixture Build & On-Site Civil/Lighting',
        duration: 'Week 3–5',
        desc: 'Simultaneous factory fabrication of metal/wood display racks and on-site flooring, ceiling, and glass.',
      },
      {
        title: 'Spotlight Aiming, Styling & Grand Opening',
        duration: 'Week 6',
        desc: 'Focusing track spotlights on displays, final signage check, and handover for stock placement.',
      },
    ],
    faqs: [
      {
        q: 'Can you match the strict brand guidelines of a franchise or multi-outlet retail brand?',
        a: 'Yes. We regularly execute standardized brand rollouts with exact brand colors, custom powder-coated metal/wood fixtures, and consistent lighting specs across multiple locations.',
      },
      {
        q: 'How fast can you complete a retail showroom interior in a shopping mall?',
        a: 'Most retail store fit-outs are completed within 3–6 weeks by fabricating display units off-site in our workshop while ceiling, flooring, and electrical work happens on-site.',
      },
      {
        q: 'What type of lighting is best for clothing, cosmetics, or jewelry showrooms?',
        a: 'We specify high-CRI (CRI 90+) cob track lights, recessed anti-glare spots, and concealed shelf LED strips tuned to the ideal Kelvin temperature (3000K warm for luxury/jewelry, 4000K neutral for fashion/cosmetics).',
      },
    ],
    seo: {
      metaTitle: 'Retail Store & Showroom Interior Design in Dhaka | Plastid Interior',
      metaDescription:
        'High-converting retail shop, fashion boutique, jewelry store, and showroom interior design in Dhaka. Custom display racks, storefront glass, and retail lighting.',
      keywords: [
        'showroom interior design Dhaka',
        'retail store interior design Bangladesh',
        'clothing shop interior design Dhaka',
        'boutique interior design Bangladesh',
        'jewelry showroom interior Dhaka',
      ],
      serviceType: 'Retail and Showroom Interior Design',
    },
  },

  'clinics-and-hospitality': {
    slug: 'clinics-and-hospitality',
    title: 'Clinics & Hospitality',
    heroTitle: 'Clinics, Healthcare & Hospitality Interior',
    h2Title: 'Hygienic, Calming Interiors for Medical Clinics, Aesthetic Centers, Spas & Hotels',
    subtitle: 'Commercial Interior',
    category: 'Commercial',
    parentSlug: 'commercial-interior',
    icon: 'icon-heart',
    cardImg: '/images/projects/project-single/project-info-1.jpg',
    mainImg: '/images/projects/project-single/project-info-1.jpg',
    formOptionLabel: 'Commercial — Clinics & Hospitality',
    specs: {
      timeline: '4–8 Weeks Execution',
      designRate: 'BDT 40 / sq.ft (3D)',
      rebate: '50% Fee Refund on Build',
      scope: 'Hygienic MEP, Rooms & Lobby',
    },
    shortText:
      'Hygienic, calming, and welcoming interiors for medical clinics, dental & aesthetic centers, salons, wellness spas, and boutique hotels.',
    description1:
      'Healthcare and hospitality environments share a vital goal: making guests and patients feel immediately cared for, calm, and confident in your standards. Our Clinics & Hospitality Interior service merges clinical hygiene and ergonomic compliance with warm, anxiety-reducing hospitality aesthetics.',
    description2:
      'For dental practices, dermatology/aesthetic clinics, diagnostic centers, luxury salons, wellness spas, and boutique hotel lobbies/suites, we specify anti-bacterial easy-clean surfaces, seamless flooring, soothing lighting, private consultation chambers, and barrier-free accessibility.',
    highlights: [
      'Welcoming Reception Lounges & Calming Patient Waiting Areas',
      'Doctor Consultation Chambers, Dental Operatories & Procedure Rooms',
      'Aesthetic Clinics, Luxury Salons, Wellness Spas & Treatment Suites',
      'Boutique Hotel Lobbies, Guest Rooms, Corridors & Executive Lounges',
      'Hygienic Non-Porous Surfaces, Acoustic Privacy & Medical Lighting',
      'Concealed Dental/Salon Plumbing, Suction & Equipment Power Routing',
    ],
    advantages: [
      {
        icon: 'icon-heart',
        title: 'Anxiety-Free Comfort',
        text: 'Biophilic touches, acoustic privacy, and warm lighting that replace cold clinical sterility.',
      },
      {
        icon: 'icon-guarantee-certificate',
        title: 'Hygiene & Code Compliant',
        text: 'Stain-resistant, antibacterial surfaces, proper air exchange, and easy sanitization.',
      },
      {
        icon: 'icon-floor',
        title: 'Smart Clinical Flow',
        text: 'Clear separation between public waiting lounges, consultation chambers, and sterilization zones.',
      },
      {
        icon: 'icon-wallet',
        title: 'High-Traffic Durability',
        text: 'Engineered to look pristine after years of heavy daily patient and hospitality turnover.',
      },
    ],
    processSteps: [
      {
        title: 'Equipment, Hygiene & Guest Flow Audit',
        duration: 'Days 1–3',
        desc: 'Reviewing medical/salon equipment specs, water/drainage needs, and patient/guest privacy flow.',
      },
      {
        title: 'Zoning for Waiting, Treatment & Sterilization',
        duration: 'Week 1–2',
        desc: 'Designing barrier-free circulation, acoustic chambers, reception counters, and utility rooms.',
      },
      {
        title: '3D Healthcare/Hospitality Renders & Specs',
        duration: 'Week 2–3',
        desc: 'Visualizing calming lobbies and treatment suites with non-porous quartz, vinyl, and antibacterial paint.',
      },
      {
        title: 'Specialized Plumbing, Lighting & Millwork Build',
        duration: 'Week 4–7',
        desc: 'Pre-routing concealed water/suction/power lines followed by partitions, ceilings, and custom cabinetry.',
      },
      {
        title: 'Sanitization Audit, Equipment Hookup & Handover',
        duration: 'Week 8',
        desc: 'Testing clinical lighting, plumbing pressure, HVAC ventilation, and handing over a spotless facility.',
      },
    ],
    faqs: [
      {
        q: 'Do you coordinate plumbing and electrical points for dental chairs or salon stations?',
        a: 'Yes. We work directly from your medical, dental, or salon equipment specifications to pre-route concealed water, drainage, air compressor, suction, and power lines before flooring and carpentry.',
      },
      {
        q: 'What materials do you recommend for clinic and diagnostic center interiors?',
        a: 'We prioritize non-porous Corian/quartz countertops, antimicrobial washable wall paints, commercial homogeneous vinyl or large-format vitrified flooring, and moisture-resistant cabinetry.',
      },
      {
        q: 'Do you design luxury beauty salons, dermatology clinics, and wellness spas?',
        a: 'Yes! Aesthetic clinics and luxury salons are one of our core specialties—blending flattering high-CRI mirror lighting with plush, hotel-grade reception and treatment suites.',
      },
    ],
    seo: {
      metaTitle: 'Clinic, Salon & Hospitality Interior Design in Dhaka | Plastid',
      metaDescription:
        'Specialized interior design for medical clinics, dental chambers, aesthetic centers, luxury salons, spas, and boutique hotels in Dhaka, Bangladesh.',
      keywords: [
        'clinic interior design Dhaka',
        'dental chamber interior Bangladesh',
        'beauty salon interior design Dhaka',
        'hospitality interior design Bangladesh',
        'hotel interior design company Dhaka',
      ],
      serviceType: 'Healthcare and Hospitality Interior Design',
    },
  },

  // ──────────────────────────────────────────────────────────
  // 3. RESTAURANT INTERIOR (Standalone Top-Level Branch)
  // ──────────────────────────────────────────────────────────
  'restaurant-interior': {
    slug: 'restaurant-interior',
    title: 'Restaurant Interior',
    heroTitle: 'Restaurant, Cafe & Lounge Interior Design',
    h2Title: 'Photogenic Cafes, Fine-Dining Restaurants & Rooftop Lounges Built for High Turnover',
    subtitle: 'Culinary & Social Destinations',
    category: 'Commercial',
    parentSlug: null,
    icon: 'icon-star',
    cardImg: '/images/projects/v5-4.jpg',
    mainImg: '/images/projects/project-single/project-description-1.jpg',
    formOptionLabel: 'Restaurant & Cafe Interior',
    specs: {
      timeline: '4–8 Weeks Fast-Track',
      designRate: 'BDT 40 / sq.ft (3D)',
      rebate: '50% Fee Refund on Build',
      scope: 'Dining, Bar, Kitchen & HVAC',
    },
    shortText:
      'Instagrammable cafes, fine-dining restaurants, rooftop lounges, bakeries, and food courts engineered for unforgettable ambiance and high table turnover.',
    description1:
      'In today’s dining scene, customers eat with their eyes first—and share their experience online before the food even arrives. Our Restaurant Interior service creates immersive, photogenic dining environments that turn first-time visitors into loyal regulars while optimizing every square foot for profitable seating capacity.',
    description2:
      'From cozy specialty coffee shops and pastry boutiques to fine-dining restaurants, rooftop lounges, and fast-casual chains, we balance front-of-house theatrical ambiance (statement lighting, custom booth seating, acoustic comfort, and selfie-worthy focal walls) with smooth service circulation and commercial kitchen/bar integration.',
    highlights: [
      'Thematic Concept Design for Cafes, Fine Dining & Rooftop Lounges',
      'Optimized Seating Mix (Banquette Booths, Loose Tables & Communal Bars)',
      'Statement Coffee/Mocktail Bars, Bakery Display Counters & Live Kitchens',
      'Instagrammable Feature Walls, Custom Neon/Brass Signage & Greenery',
      'Mood Lighting, Acoustic Echo Control & Commercial Exhaust Coordination',
      'Weatherproof Rooftop Pergolas, Outdoor Decking & Landscape Lighting',
    ],
    advantages: [
      {
        icon: 'icon-star',
        title: 'Instagrammable Ambiance',
        text: 'Photogenic focal corners and warm theatrical lighting that generate organic social media buzz.',
      },
      {
        icon: 'icon-floor',
        title: 'Optimal Seat Turnover',
        text: 'Smart table spacing and service aisles that maximize dining covers without crowding guests.',
      },
      {
        icon: 'icon-guarantee-certificate',
        title: 'Spill & Stain-Proof Finishes',
        text: 'Commercial-grade upholstery, stone/solid-wood tabletops, and washable wall treatments.',
      },
      {
        icon: 'icon-wallet',
        title: 'Rapid Launch Execution',
        text: 'Streamlined turnkey buildout so you start serving guests and generating revenue faster.',
      },
    ],
    processSteps: [
      {
        title: 'Cuisine Concept, Audience & Cover Capacity Brief',
        duration: 'Days 1–3',
        desc: 'Defining your target diner profile, target seat count, kitchen/bar equipment footprint, and theme.',
      },
      {
        title: 'Seating Layout, Service Flow & Kitchen Zoning',
        duration: 'Week 1–2',
        desc: 'Engineering smooth waiter circulation, POS placement, wash zones, and commercial exhaust routes.',
      },
      {
        title: '3D Thematic Visualization & Furniture Design',
        duration: 'Week 2–3',
        desc: 'Photorealistic 3D renders of dining zones, bar counters, custom booths, signage, and mood lighting.',
      },
      {
        title: 'Civil, HVAC/Exhaust, Booths, Bar & Decor Build',
        duration: 'Week 4–7',
        desc: 'Turnkey on-site construction paired with custom fabrication of dining tables, chairs, and lighting.',
      },
      {
        title: 'Dimming Calibration, Styling & Opening Handover',
        duration: 'Week 8',
        desc: 'Setting day/evening lighting scenes, final greenery/art styling, and handover for grand opening.',
      },
    ],
    faqs: [
      {
        q: 'Do you custom-build restaurant tables, chairs, and sofa booths?',
        a: 'Yes. We design and fabricate custom commercial-grade banquette booths, solid wood/stone dining tables, and bar counters tailored to your restaurant theme and heavy daily use.',
      },
      {
        q: 'Can you design rooftop or semi-outdoor restaurants in Dhaka?',
        a: 'Absolutely. We specialize in weather-resistant rooftop cafes and lounges with steel/glass pergolas, WPC outdoor decking, waterproof ambient lighting, and cooling setups.',
      },
      {
        q: 'Do you coordinate commercial kitchen exhaust and fresh-air HVAC?',
        a: 'Yes, we plan kitchen hood exhaust ducting, fresh air make-up, grease trap plumbing, and dining-area AC tonnage so food odors and heat never enter the guest dining room.',
      },
    ],
    seo: {
      metaTitle: 'Restaurant & Cafe Interior Design in Dhaka | Coffee Shop & Lounge | Plastid',
      metaDescription:
        'Create a landmark dining destination with Plastid. Expert restaurant, coffee shop, bakery, and rooftop cafe interior design and turnkey execution in Dhaka.',
      keywords: [
        'restaurant interior design Dhaka',
        'cafe interior design Bangladesh',
        'coffee shop interior design Dhaka',
        'rooftop restaurant design Bangladesh',
        'fast food shop interior design',
      ],
      serviceType: 'Restaurant and Cafe Interior Design',
    },
  },

  // ──────────────────────────────────────────────────────────
  // 4. EXTERIOR DESIGN (Standalone Top-Level Branch)
  // ──────────────────────────────────────────────────────────
  'exterior-design': {
    slug: 'exterior-design',
    title: 'Exterior Design',
    heroTitle: 'Architectural Exterior, Facade & Landscape Design',
    h2Title: 'Iconic Building Facades, Rooftop Gardens & Architectural Landscaping',
    subtitle: 'Architecture & Outdoor Living',
    category: 'Architecture',
    parentSlug: null,
    icon: 'icon-architecture-and-city',
    cardImg: '/images/projects/v6-7.jpg',
    mainImg: '/images/slides/v3-1.jpg',
    formOptionLabel: 'Exterior & Landscape Design',
    specs: {
      timeline: '4–10 Weeks Execution',
      designRate: 'BDT 40 / sq.ft (3D)',
      rebate: '50% Fee Refund on Build',
      scope: 'Facade, Rooftop & Landscape',
    },
    shortText:
      'Striking building facades, rooftop gardens, architectural landscaping, boundary gates, and outdoor lifestyle spaces crafted for lasting curb appeal.',
    description1:
      'True architectural excellence begins before you step through the front door. As an integrated interior and architecture practice, Plastid’s Exterior Design service crafts commanding building facades, serene rooftop gardens, and inviting outdoor living spaces for residential buildings, villas, and commercial properties.',
    description2:
      'We blend tropical modern architecture suited to Bangladesh’s monsoon and sun exposure—utilizing fair-faced concrete, ceramic louvers, aluminum composite panels (ACP), tempered curtain glass, wrought iron/CNC screens, architectural facade lighting, and lush rooftop landscaping with gazebos and water features.',
    highlights: [
      'Residential & Commercial Building Facade Architecture',
      'Rooftop Gardens, Wooden Pergolas, Gazebos & Outdoor Seating',
      'Architectural Facade Uplighting & Landscape Illumination',
      'Custom Boundary Walls, Main Gates, Wrought Iron & CNC Screens',
      'Terrace Waterproofing, Planter Boxes, Water Bodies & Walkways',
      'Ground-Floor Reception Lobbies, Lift Lobbies & Driveway Paving',
    ],
    advantages: [
      {
        icon: 'icon-architecture-and-city',
        title: 'Iconic Curb Appeal',
        text: 'Timeless architectural facades that turn your building into a neighborhood landmark.',
      },
      {
        icon: 'icon-guarantee-certificate',
        title: 'Monsoon-Proof Engineering',
        text: 'UV-stable, weatherproof cladding, proper roof drainage slopes, and root-barrier membranes.',
      },
      {
        icon: 'icon-lamp',
        title: 'Nighttime Architectural Drama',
        text: 'IP65-rated facade and garden illumination that transforms the building after dusk.',
      },
      {
        icon: 'icon-wallet',
        title: 'Thermal & Property Value',
        text: 'Rooftop greenery and sun-shading louvers that naturally cool top floors and boost asset value.',
      },
    ],
    processSteps: [
      {
        title: 'Site Orientation, Sun-Path & Structural Audit',
        duration: 'Week 1',
        desc: 'Analyzing building elevations, West-facing heat gain, roof load capacity, and drainage points.',
      },
      {
        title: 'Architectural Facade & Landscape Masterplan',
        duration: 'Week 2',
        desc: 'Developing 2D elevation drawings, pergola/gazebo zoning, walkway loops, and planting plans.',
      },
      {
        title: 'Day & Night Photorealistic 3D Exterior Renders',
        duration: 'Week 3–4',
        desc: 'Visualizing the building facade and rooftop in both daylight and evening architectural lighting.',
      },
      {
        title: 'Waterproofing, Cladding, Pergola & Hardscape Build',
        duration: 'Week 5–8',
        desc: 'Executing elastomeric roof waterproofing, steel/wood pergolas, CNC louvers, and stone paving.',
      },
      {
        title: 'Softscape Planting, IP65 Lighting & Handover',
        duration: 'Week 9–10',
        desc: 'Installing curated tropical plants, automated drip irrigation, exterior lights, and outdoor furniture.',
      },
    ],
    faqs: [
      {
        q: 'Will a rooftop garden cause water leakage or dampness on the top floor?',
        a: 'Not when engineered properly. We install multi-layer elastomeric waterproofing, root-barrier membranes, and dedicated drainage cells before adding any soil or planter boxes.',
      },
      {
        q: 'Can you redesign the front facade of an existing commercial or residential building?',
        a: 'Yes! Facade face-lifts using aluminum/WPC louvers, ACP cladding, curtain glass, and architectural uplighting are one of the fastest ways to modernize and revalue an older building.',
      },
      {
        q: 'Do you also design the ground-floor entrance gate, guard room, and lift lobby?',
        a: 'Yes, we design the complete arrival experience—from the main boundary gate and guard post to the driveway, reception lobby, and rooftop lounge.',
      },
    ],
    seo: {
      metaTitle: 'Exterior, Building Facade & Rooftop Landscape Design in Dhaka | Plastid',
      metaDescription:
        'Architectural exterior design, modern building facades, rooftop garden landscaping, pergola construction, and facade lighting in Dhaka, Bangladesh.',
      keywords: [
        'exterior design Bangladesh',
        'building facade design Dhaka',
        'rooftop garden design Dhaka',
        'landscape architecture Bangladesh',
        'modern house exterior design',
      ],
      serviceType: 'Architectural Exterior and Landscape Design',
    },
  },

  // ──────────────────────────────────────────────────────────
  // 5. FURNITURE AND DECOR (Standalone Top-Level Branch)
  // ──────────────────────────────────────────────────────────
  'furniture-and-decor': {
    slug: 'furniture-and-decor',
    title: 'Furniture and Decor',
    heroTitle: 'Bespoke Furniture, Glass & Custom Decor',
    h2Title: 'Made-to-Measure Sofas, Dining Sets, Glass Partitions & Artisanal Metalwork',
    subtitle: 'Artisanal Craftsmanship & Styling',
    category: 'Residential',
    parentSlug: null,
    icon: 'icon-cupboard',
    cardImg: '/images/projects/v5-1.jpg',
    mainImg: '/images/resources/about-image.jpg',
    formOptionLabel: 'Furniture & Custom Decor',
    specs: {
      timeline: '2–5 Weeks Fabrication',
      designRate: 'Custom Shop Drawings',
      rebate: 'Direct Workshop Pricing',
      scope: 'Furniture, Glass & Styling',
    },
    shortText:
      'Custom-crafted sofas, dining sets, executive desks, glass & wrought-iron architectural partitions, lighting fixtures, and curated interior styling.',
    description1:
      'Off-the-shelf showroom furniture rarely fits the exact proportions, color palette, or storage requirements of a bespoke space. Our Furniture & Decor service designs and custom-manufactures heirloom-quality loose and built-in furniture, architectural metal and glasswork, and curated soft furnishings.',
    description2:
      'From plush L-shaped sectionals, solid wood/marble dining tables, and upholstered beds to ornamental brass/wrought-iron dividers, fluted glass sliding doors, curtains, rugs, wall art, and decorative lighting—every piece is tailored to your room’s exact dimensions and aesthetic.',
    highlights: [
      'Custom Sofas, Accent Chairs, Dining Tables & Upholstered Beds',
      'Architectural Glass Partitions, Fluted Glass Doors & Backlit Mirrors',
      'Bespoke Wrought Iron, Brass & MS Metal Dividers, Railings & Shelving',
      'Custom TV Consoles, Credenzas, Study Tables & Shoe Cabinets',
      'Curated Drapery, Blinds, Rugs, Wall Art, Planters & Chandeliers',
      'Workshop-Direct Fabrication Based on Pinterest/ArchDaily References',
    ],
    advantages: [
      {
        icon: 'icon-cupboard',
        title: 'Made-to-Measure Fit',
        text: 'Built to the exact millimeter of your room—no awkward gaps or oversized showroom pieces.',
      },
      {
        icon: 'icon-guarantee-certificate',
        title: 'Master Artisans & Timber',
        text: 'Kiln-dried seasoned timber, high-density memory/HR foam, and precision PVD/powder-coated metal.',
      },
      {
        icon: 'icon-paint',
        title: '100% Custom Finishes',
        text: 'Choose your exact bouclé/velvet upholstery, wood stain, lacquer shade, and brass/matte-black trim.',
      },
      {
        icon: 'icon-wallet',
        title: 'Direct Workshop Value',
        text: 'In-house fabrication delivering boutique designer furniture without retail showroom markups.',
      },
    ],
    processSteps: [
      {
        title: 'Room Measurement & Style Reference Brief',
        duration: 'Days 1–2',
        desc: 'Measuring room proportions, elevator/doorway clearances, and reviewing your reference inspirations.',
      },
      {
        title: '3D Models & Technical Shop Drawings',
        duration: 'Week 1',
        desc: 'Producing millimeter-accurate CAD shop drawings with ergonomics, joinery, and cushion specs.',
      },
      {
        title: 'Fabric Swatch, Veneer, Glass & Metal Selection',
        duration: 'Week 1–2',
        desc: 'Touching and approving physical fabric books, marble/stone tops, fluted glass, and wood stains.',
      },
      {
        title: 'In-House Carpentry, Upholstery & Metal Fabrication',
        duration: 'Week 2–4',
        desc: 'Crafted by our master carpenters, welders, and upholsterers with mid-production quality checks.',
      },
      {
        title: 'White-Glove Delivery, Installation & Styling',
        duration: 'Week 5',
        desc: 'Careful on-site delivery, partition/mirror mounting, drapery steaming, and final room styling.',
      },
    ],
    faqs: [
      {
        q: 'Can you build a custom furniture design I saw on Pinterest or Instagram?',
        a: 'Yes! Share your reference photos with us and our designers will produce technical shop drawings, adjust the dimensions to fit your room, let you pick the exact fabric/wood finish, and craft it in our workshop.',
      },
      {
        q: 'Do you fabricate slim-profile fluted glass partitions and brass dividers?',
        a: 'Yes, we specialize in slim-profile aluminum and MS-framed fluted glass sliding/fixed partitions, brass-finish CNC room dividers, and custom wrought-iron features.',
      },
      {
        q: 'Can you help style an already completed apartment with curtains, lighting, and decor?',
        a: 'Absolutely. Our interior stylists curate custom drapery, blinds, area rugs, statement chandeliers, indoor planters, and wall art to pull your entire home together.',
      },
    ],
    seo: {
      metaTitle: 'Custom Furniture, Glass Partition & Interior Decor in Dhaka | Plastid',
      metaDescription:
        'Bespoke furniture manufacturing, custom sofas, dining tables, glass & metal partitions, curtains, and interior decor styling in Dhaka, Bangladesh.',
      keywords: [
        'custom furniture Dhaka',
        'bespoke furniture Bangladesh',
        'glass partition design Dhaka',
        'interior decor and styling Dhaka',
        'custom sofa and wardrobe maker',
      ],
      serviceType: 'Custom Furniture and Interior Decor',
    },
  },

  // ──────────────────────────────────────────────────────────
  // 6. 3D & DESIGN CONSULTANCY (Standalone Top-Level Branch)
  // ──────────────────────────────────────────────────────────
  '3d-and-design-consultancy': {
    slug: '3d-and-design-consultancy',
    title: '3D & Design Consultancy',
    heroTitle: '3D Visualization, Space Planning & Design Consultancy',
    h2Title: 'Photorealistic 3D Renders, Working CAD Drawings & Itemized BOQ at BDT 40/sq.ft',
    subtitle: 'Architectural Planning & Engineering',
    category: 'Consultancy',
    parentSlug: null,
    icon: 'icon-concept',
    cardImg: '/images/services/v2-6.jpg',
    mainImg: '/images/slides/v2-1.jpg',
    formOptionLabel: '3D & Design Consultancy',
    specs: {
      timeline: '2–4 Weeks Design Package',
      designRate: 'BDT 40 / sq.ft Flat Rate',
      rebate: '50% Refunded on Turnkey Build',
      scope: '2D CAD, 3D Renders & BOQ',
    },
    shortText:
      'Photorealistic 3D interior/exterior renders, 2D space planning, working drawings, and BOQ consultancy—with a 50% 3D design fee refund when you build with us.',
    description1:
      'Every extraordinary project starts with crystal-clear planning. Whether you want to visualize your space in photorealistic 3D before committing to construction, or you are located outside Dhaka and need a complete architectural drawing package for your local contractors, our 3D & Design Consultancy service delivers total clarity.',
    description2:
      'For just BDT 40/sq.ft, our architects develop optimized 2D furniture layouts, mood boards, high-resolution 3D renders, detailed working drawings (electrical, ceiling, plumbing, carpentry elevations), and itemized BOQs. Best of all: when you execute the turnkey project with Plastid, 50% of your 3D design fee is refunded upon completion.',
    highlights: [
      '2D Space Planning, Furniture Layouts & Circulation Optimization',
      'Photorealistic 3D Interior & Exterior Renders + 360° Walkthroughs',
      'Full Working Drawings (False Ceiling, Lighting, Electrical, Plumbing & Carpentry)',
      'Material Specification Schedules & Itemized Bill of Quantities (BOQ)',
      '50% 3D Design Fee Refund Policy Upon Turnkey Execution with Plastid',
      'Remote Design Packages for Projects Outside Dhaka & NRB Clients',
    ],
    advantages: [
      {
        icon: 'icon-concept',
        title: 'See Before You Build',
        text: 'Photorealistic 3D renders eliminate guesswork and prevent costly on-site construction mistakes.',
      },
      {
        icon: 'icon-document',
        title: 'Contractor-Ready CAD',
        text: 'Millimeter-accurate technical working drawings for flawless execution anywhere in Bangladesh.',
      },
      {
        icon: 'icon-wallet',
        title: 'BDT 40/sqft + 50% Refund',
        text: 'Accessible BDT 40/sqft 3D design fee with 50% rebated when Plastid executes your project.',
      },
      {
        icon: 'icon-hr',
        title: 'Expert Architect Advisory',
        text: 'Optional milestone site visits, vendor coordination, and material shopping guidance.',
      },
    ],
    processSteps: [
      {
        title: 'Consultation, Floor Plan Review & Briefing',
        duration: 'Days 1–3',
        desc: 'Reviewing your architectural floor plan (or conducting a laser site survey) and style preferences.',
      },
      {
        title: '2D Space Planning & Ergonomic Layout',
        duration: 'Week 1',
        desc: 'Developing optimized furniture layouts, partition changes, and circulation options for your approval.',
      },
      {
        title: 'Moodboard & Photorealistic 3D Visualization',
        duration: 'Week 2–3',
        desc: 'Crafting multi-angle high-resolution 3D renders with realistic lighting, textures, and colors.',
      },
      {
        title: 'Engineering CAD Drawings & Itemized BOQ',
        duration: 'Week 3–4',
        desc: 'Preparing detailed electrical, ceiling, plumbing, and carpentry elevation drawings plus a full BOQ.',
      },
      {
        title: 'Design Package Handover or Turnkey Transition',
        duration: 'Final Step',
        desc: 'Receive your complete print/digital drawing book—or seamlessly transition to Plastid turnkey build with a 50% design fee rebate.',
      },
    ],
    faqs: [
      {
        q: 'How does the BDT 40/sqft 3D design fee and 50% refund policy work?',
        a: 'Our 3D design fee is BDT 40 per sq.ft, which covers space planning and photorealistic 3D visualizations. If you appoint Plastid for the full turnkey execution of your project, we refund 50% of that design fee at project completion.',
      },
      {
        q: 'Can I hire Plastid for 3D design and working drawings only if my project is outside Dhaka?',
        a: 'Yes! Clients across Bangladesh—and Non-Resident Bangladeshis (NRBs) building homes from abroad—regularly use our 3D & Design Consultancy package to get complete 3D renders, working CAD drawings, and BOQs.',
      },
      {
        q: 'How many design revisions are included during the 3D visualization phase?',
        a: 'We work collaboratively—first locking in the 2D furniture layout and moodboard, followed by structured 3D revision rounds on colors, materials, and cabinetry details until you are 100% confident.',
      },
    ],
    seo: {
      metaTitle: '3D Interior Visualization, Space Planning & Design Consultancy Dhaka | Plastid',
      metaDescription:
        'Photorealistic 3D interior design, 2D space planning, working CAD drawings, and BOQ consultancy in Dhaka at BDT 40/sqft (50% refunded on turnkey execution).',
      keywords: [
        '3D interior design Dhaka',
        'interior design consultancy Bangladesh',
        'space planning service Dhaka',
        '3D architectural rendering Bangladesh',
        'interior design fee per sqft Bangladesh',
      ],
      serviceType: '3D Interior Visualization and Design Consultancy',
    },
  },
}

/**
 * Legacy slug redirect/fallback mapping so any old links continue to resolve gracefully.
 */
export const legacySlugMap = {
  'concept-designs': '3d-and-design-consultancy',
  'project-designs': 'full-apartment-interior',
  'make-overs': 'home-renovation',
  consulting: '3d-and-design-consultancy',
  'glass-wrought': 'furniture-and-decor',
  'space-planning': '3d-and-design-consultancy',
}

/**
 * Helper to resolve a service by slug (including legacy slugs).
 */
export function getServiceBySlug(slug) {
  if (!slug) return null
  if (serviceData[slug]) return serviceData[slug]
  const mapped = legacySlugMap[slug]
  if (mapped && serviceData[mapped]) return serviceData[mapped]
  return null
}

/**
 * Flat ordered array of all 15 services for static path generation, mobile pills, and sitemaps.
 */
export const allServicesList = serviceTree.flatMap((branch) => {
  const parentItem = serviceData[branch.slug]
  const childItems = (branch.children || [])
    .map((child) => serviceData[child.slug])
    .filter(Boolean)
  return parentItem ? [parentItem, ...childItems] : childItems
})

/**
 * Dropdown options formatted for AppointmentForm (Home.jsx) and ContactForm (Contact.jsx).
 */
export const serviceFormOptions = [
  'Residential — Full Apartment Interior',
  'Residential — Duplex & Villa',
  'Residential — Modular Kitchen',
  'Residential — Bedroom Design',
  'Residential — Home Renovation',
  'Commercial — Office & Corporate',
  'Commercial — Studio Office Design',
  'Commercial — Retail & Showrooms',
  'Commercial — Clinics & Hospitality',
  'Restaurant & Cafe Interior',
  'Exterior & Landscape Design',
  'Furniture & Custom Decor',
  '3D & Design Consultancy',
]

/**
 * Resolve a URL query param (slug or label) to a valid `serviceFormOptions` string.
 */
export function resolveServiceFormOption(queryVal) {
  if (!queryVal) return ''
  const trimmed = String(queryVal).trim()
  if (serviceFormOptions.includes(trimmed)) return trimmed
  const svc = getServiceBySlug(trimmed.toLowerCase())
  if (svc && svc.formOptionLabel) return svc.formOptionLabel
  const matched = serviceFormOptions.find(
    (opt) => opt.toLowerCase().includes(trimmed.toLowerCase())
  )
  return matched || ''
}
