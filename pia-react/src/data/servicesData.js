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
    subtitle: 'Bespoke Home & Living Environments',
    category: 'Residential Interior',
    parentSlug: null,
    icon: 'icon-architecture-and-city1',
    cardImg: '/images/services/v2-1.jpg',
    mainImg: '/images/services/service-single/single-service-1.jpg',
    shortText:
      'Turnkey residential interior design for apartments, duplexes, villas, modular kitchens, and bedrooms crafted around your family lifestyle.',
    description1:
      'At Plastid Interior & Architecture, our Residential Interior practice transforms houses and apartments across Dhaka and Bangladesh into refined, deeply personal sanctuaries. Whether you have just received handover of a new apartment or are building a custom residence, we harmonize spatial flow, natural light, acoustic warmth, and bespoke millwork to elevate everyday living.',
    description2:
      'From initial space planning and photorealistic 3D visualizations to custom cabinetry fabrication, false ceiling lighting, and turnkey site execution, our in-house architects and master craftsmen manage every detail under one roof—delivering on schedule and within a transparent, itemized budget.',
    highlights: [
      'Complete Turnkey Apartment & Home Execution',
      'Custom Floor Plan Optimization & Vastu/Ergonomic Zoning',
      'Bespoke TV Units, Wall Paneling & Ambient False Ceilings',
      'Modular Kitchens, Walk-In Wardrobes & Storage Systems',
      'Curated Material Boards, Lighting Design & Soft Furnishings',
    ],
    advantages: [
      {
        icon: 'icon-architecture-and-city1',
        title: 'Tailored\n Lifestyle Fit',
        text: 'Layouts and storage custom-engineered around your family’s daily routines.',
      },
      {
        icon: 'icon-guarantee-certificate',
        title: 'Premium\n Materials',
        text: 'Moisture-resistant boards, imported hardware, and durable finishes built for Bangladesh’s climate.',
      },
      {
        icon: 'icon-hr',
        title: 'Turnkey\n Peace of Mind',
        text: 'Single-point accountability from 3D concept design to final move-in handover.',
      },
      {
        icon: 'icon-wallet',
        title: 'Transparent\n Costing',
        text: 'Detailed BOQ with zero hidden charges and 50% 3D design fee rebate on execution.',
      },
    ],
    processSteps: [
      'Home Site Measurement & Lifestyle Discovery',
      'Space Zoning, Furniture Layout & Moodboards',
      'Photorealistic 3D Interior Rendering & Material Selection',
      'Factory-Precision Woodwork, Electrical & Civil Execution',
      'Deep Cleaning, Quality Walkthrough & Key Handover',
    ],
    faqs: [
      {
        q: 'How long does a full residential interior project take?',
        a: 'A typical 1,500–2,500 sq.ft residential project takes 2–4 weeks for design and 3D approval, followed by 8–12 weeks for complete on-site turnkey execution.',
      },
      {
        q: 'Can I customize materials to fit my budget?',
        a: 'Yes. We provide tiered material specifications (e.g., HPL, Acrylic, UV, Veneer, or Lacquer finishes) so you can balance luxury aesthetics with your target budget.',
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
    subtitle: 'Residential Interior',
    category: 'Residential Interior',
    parentSlug: 'residential-interior',
    icon: 'icon-floor',
    cardImg: '/images/services/1.jpg',
    mainImg: '/images/services/service-single/single-service-1.jpg',
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
      'Layered Cove, Spot & Chandelier Lighting with Smart Switching',
    ],
    advantages: [
      {
        icon: 'icon-floor',
        title: 'Space\n Maximization',
        text: 'Smart built-in storage that keeps 1,200–3,500+ sq.ft flats clutter-free and airy.',
      },
      {
        icon: 'icon-concept',
        title: 'Cohesive\n Theme',
        text: 'Seamless flow of colors, textures, and lighting from the entrance to every bedroom.',
      },
      {
        icon: 'icon-guarantee-certificate',
        title: 'On-Time\n Handover',
        text: 'Milestone-tracked execution schedule so your family can move in on time.',
      },
      {
        icon: 'icon-wallet',
        title: '50% Design\n Fee Rebate',
        text: 'Get 50% of your BDT 40/sqft 3D design fee refunded upon turnkey project completion.',
      },
    ],
    processSteps: [
      'On-Site Flat Inspection & Laser Measurement',
      '2D Furniture Layout & Electrical/Ceiling Planning',
      'Room-by-Room 3D Visualization & Finishes Sign-Off',
      'Turnkey Ceiling, Carpentry, Paint & Lighting Installation',
      'Final Styling, Quality Audit & Move-In Handover',
    ],
    faqs: [
      {
        q: 'When is the best time to book apartment interior design?',
        a: 'Ideally 1–2 months before your developer hands over the flat, allowing us to complete 2D layouts and 3D renders so site work can begin the day you get the keys.',
      },
      {
        q: 'Do you handle electrical, false ceiling, and painting along with woodwork?',
        a: 'Yes, our Full Apartment Interior package is 100% turnkey—including false ceilings, electrical rewiring, lighting, wall treatments, glasswork, and custom furniture.',
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
    subtitle: 'Residential Interior',
    category: 'Residential Interior',
    parentSlug: 'residential-interior',
    icon: 'icon-architecture-and-city',
    cardImg: '/images/services/2.jpg',
    mainImg: '/images/services/service-single/single-service-1.jpg',
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
    ],
    advantages: [
      {
        icon: 'icon-architecture-and-city',
        title: 'Grand Scale\n Expertise',
        text: 'Specialized in proportioning double-height ceilings and multi-floor circulation.',
      },
      {
        icon: 'icon-guarantee-certificate',
        title: 'Bespoke\n Craftsmanship',
        text: 'Custom marble, stone, metal, and natural wood veneer detailing.',
      },
      {
        icon: 'icon-hr',
        title: 'Acoustic &\n MEP Zoning',
        text: 'Smart floor-by-floor HVAC, lighting automation, and sound insulation.',
      },
      {
        icon: 'icon-wallet',
        title: 'Phased\n Execution',
        text: 'Structured milestone billing and dedicated site engineers for large residences.',
      },
    ],
    processSteps: [
      'Architectural Volume & Structural Assessment',
      'Multi-Level Zoning & Vertical Circulation Design',
      'Bespoke 3D Renders for Double-Height & Private Zones',
      'Custom Metal, Stone, Glass & Millwork Fabrication',
      'White-Glove Installation & Final Commissioning',
    ],
    faqs: [
      {
        q: 'Can you redesign the internal staircase of a duplex?',
        a: 'Yes. We engineer and fabricate custom structural and decorative staircases using mild steel, solid timber treads, tempered glass balustrades, and wrought iron.',
      },
      {
        q: 'Do you travel outside Dhaka for villa and country home projects?',
        a: 'Absolutely. We undertake duplex, villa, and country house projects across Bangladesh with dedicated on-site supervision.',
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
    subtitle: 'Residential Interior',
    category: 'Residential Interior',
    parentSlug: 'residential-interior',
    icon: 'icon-kitchen',
    cardImg: '/images/services/3.jpg',
    mainImg: '/images/services/service-single/single-service-1.jpg',
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
    ],
    advantages: [
      {
        icon: 'icon-kitchen',
        title: 'Ergonomic\n Workflow',
        text: 'Designed around the cooking triangle for effortless prep, cooking, and cleaning.',
      },
      {
        icon: 'icon-guarantee-certificate',
        title: 'Heat & Water\n Resistant',
        text: 'Built specifically to withstand high humidity, oil, and heavy daily cooking.',
      },
      {
        icon: 'icon-cupboard',
        title: 'Smart\n Organizers',
        text: 'Dedicated cutlery trays, spice pull-outs, dish drainers, and tall units.',
      },
      {
        icon: 'icon-wallet',
        title: 'Precision\n Factory Finish',
        text: 'Edge-banded cabinetry with durable hinges and transparent per-sqft/unit pricing.',
      },
    ],
    processSteps: [
      'Kitchen Measurement & Appliance Inventory Check',
      'Ergonomic Work-Triangle & Storage Zoning Plan',
      '3D Kitchen Visualization, Finish & Hardware Selection',
      'Precision Cabinetry Fabrication & Plumbing/Ducting Prep',
      'On-Site Installation, Countertop Fitting & Testing',
    ],
    faqs: [
      {
        q: 'Which board material is best for kitchens in Bangladesh?',
        a: 'For sink and wet zones, we recommend waterproof PVC board or Marine Grade Plywood, paired with high-density moisture-resistant boards and Acrylic or HPL laminates for upper cabinets.',
      },
      {
        q: 'Can you upgrade my existing old kitchen into a modular kitchen?',
        a: 'Yes! We handle complete kitchen remodeling—including dismantling old cabinets, updating plumbing/electrical points, retiling backsplashes, and installing your new modular system.',
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
    subtitle: 'Residential Interior',
    category: 'Residential Interior',
    parentSlug: 'residential-interior',
    icon: 'icon-furniture-and-household',
    cardImg: '/images/services/4.jpg',
    mainImg: '/images/services/service-single/single-service-1.jpg',
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
    ],
    advantages: [
      {
        icon: 'icon-furniture-and-household',
        title: 'Restful\n Ambiance',
        text: 'Calming acoustics, warm color psychology, and glare-free layered lighting.',
      },
      {
        icon: 'icon-cupboard',
        title: 'Maximum\n Wardrobe Space',
        text: 'Custom internal compartments for sarees, suits, luggage, and daily wear.',
      },
      {
        icon: 'icon-guarantee-certificate',
        title: 'Tailored to\n Every Age',
        text: 'Specialized layouts for master suites, growing kids, and elderly comfort.',
      },
      {
        icon: 'icon-wallet',
        title: 'Quick Room\n Turnaround',
        text: 'Fast, clean installation whether designing one bedroom or an entire home.',
      },
    ],
    processSteps: [
      'Room Measurement & Storage Needs Assessment',
      'Bed Placement, Wardrobe & Circulation Layout',
      '3D Bedroom Rendering, Fabric & Laminate Selection',
      'Wardrobe, Headboard & False Ceiling Fabrication',
      'Lighting Setup, Hardware Tuning & Final Handover',
    ],
    faqs: [
      {
        q: 'Can I hire Plastid for just one or two bedrooms?',
        a: 'Yes, we take on standalone master bedroom, kids’ room, and custom wall-to-wall wardrobe projects in addition to full-apartment interiors.',
      },
      {
        q: 'Should I choose sliding or hinged doors for my bedroom wardrobe?',
        a: 'Sliding wardrobes are ideal when clearance between the bed and closet is tight, while hinged doors offer 100% full-width visibility when space permits. We help you choose based on your exact room dimensions.',
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
    subtitle: 'Residential Interior',
    category: 'Residential Interior',
    parentSlug: 'residential-interior',
    icon: 'icon-paint',
    cardImg: '/images/services/v2-2.jpg',
    mainImg: '/images/services/service-single/single-service-1.jpg',
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
    ],
    advantages: [
      {
        icon: 'icon-paint',
        title: 'Total\n Transformation',
        text: 'Turn a 10–20 year old flat into a bright, contemporary luxury residence.',
      },
      {
        icon: 'icon-hr',
        title: 'Minimal\n Disruption',
        text: 'Phased room-by-room execution options for families renovating lived-in homes.',
      },
      {
        icon: 'icon-guarantee-certificate',
        title: 'Structural &\n Damp Safety',
        text: 'Proper waterproofing, damp treatment, and safe load-aware civil modifications.',
      },
      {
        icon: 'icon-wallet',
        title: 'High Property\n Value ROI',
        text: 'Dramatically increases both daily living comfort and apartment resale/rental value.',
      },
    ],
    processSteps: [
      'Structural, Plumbing, Dampness & Electrical Site Audit',
      'Redesign Proposal, 3D Makeover Visuals & Itemized BOQ',
      'Controlled Demolition, Civil Work & Concealed MEP Upgrades',
      'Tiling, False Ceiling, Custom Woodwork & Premium Painting',
      'Thorough Post-Renovation Deep Cleaning & Handover',
    ],
    faqs: [
      {
        q: 'Can you fix wall dampness and old electrical wiring during renovation?',
        a: 'Yes. Before installing any new paneling or paint, we treat root causes of dampness, upgrade old electrical wiring for safety, and pressure-test plumbing lines.',
      },
      {
        q: 'Can we stay in the apartment while renovation is going on?',
        a: 'For partial makeovers, we can work in phases (room by room) with dust barriers. For full gut-renovations involving floor tiling and bathrooms, temporary relocation is faster and cleaner.',
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
    subtitle: 'High-Performance Business Environments',
    category: 'Commercial Interior',
    parentSlug: null,
    icon: 'icon-company',
    cardImg: '/images/services/v2-3.jpg',
    mainImg: '/images/services/service-single/single-service-1.jpg',
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
    ],
    advantages: [
      {
        icon: 'icon-company',
        title: 'Brand-Aligned\n Identity',
        text: 'Spatial design that translates your brand colors, culture, and ethos into architecture.',
      },
      {
        icon: 'icon-productive',
        title: 'Fast-Track\n Delivery',
        text: 'Accelerated site shifts so you save on commercial rent and launch on schedule.',
      },
      {
        icon: 'icon-guarantee-certificate',
        title: 'Commercial\n Durability',
        text: 'Heavy-duty flooring, acoustic glass, and commercial-grade hardware built for high footfall.',
      },
      {
        icon: 'icon-wallet',
        title: 'Turnkey\n Corporate BOQ',
        text: 'Complete civil, glass, furniture, electrical, networking, and HVAC coordination.',
      },
    ],
    processSteps: [
      'Operational Workflow, Headcount & Brand Audit',
      'Space Planning, Seat Density & MEP/IT Layout',
      '3D Commercial Visualization & Material Specification',
      'Fast-Track Site Execution, Glass, Furniture & Branding',
      'Systems Testing, Snag Clearance & Operational Handover',
    ],
    faqs: [
      {
        q: 'Do you handle IT networking, server rooms, and AC ducting in commercial projects?',
        a: 'Yes. Our commercial turnkey scope includes structured LAN cabling, floor boxes, server rack enclosures, acoustic partitions, and cassette/ducted HVAC integration.',
      },
      {
        q: 'Can you work night shifts in commercial buildings with daytime restrictions?',
        a: 'Yes, our site teams regularly work evening and weekend schedules to comply with commercial tower management rules in Banani, Gulshan, Motijheel, and Tejgaon.',
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
    subtitle: 'Commercial Interior',
    category: 'Commercial Interior',
    parentSlug: 'commercial-interior',
    icon: 'icon-productive',
    cardImg: '/images/services/v2-4.jpg',
    mainImg: '/images/services/service-single/single-service-1.jpg',
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
    ],
    advantages: [
      {
        icon: 'icon-productive',
        title: 'Employee\n Productivity',
        text: 'Ergonomic seating, task lighting (400–500 lux), and acoustic noise control.',
      },
      {
        icon: 'icon-scheme',
        title: 'Smart Space\n Density',
        text: 'Maximized workstation capacity without making the floor feel cramped.',
      },
      {
        icon: 'icon-guarantee-certificate',
        title: 'Tech-Ready\n Infrastructure',
        text: 'Integrated video-conferencing walls, floor pop-up boxes, and server rooms.',
      },
      {
        icon: 'icon-wallet',
        title: 'On-Time\n Move-In',
        text: 'Parallel factory workstation manufacturing and site ceiling/MEP work to cut timelines.',
      },
    ],
    processSteps: [
      'Departmental Headcount & Workflow Mapping',
      '2D Workstation Layout, Cabin Zoning & MEP Plan',
      '3D Corporate Interior Rendering & Finishes Approval',
      'Glass Partitions, Ceiling, Networking & Workstation Fit-Out',
      'AV/IT Testing, Ergonomic Check & Office Handover',
    ],
    faqs: [
      {
        q: 'How much space is needed per employee in a modern office layout?',
        a: 'Typically 60–90 sq.ft per person including circulation, meeting rooms, and common areas. We create test-fit layouts before you even sign your office lease if needed.',
      },
      {
        q: 'Do you supply office chairs and modular workstation desks?',
        a: 'Yes, we both custom-manufacture executive furniture and supply commercial-grade modular workstations and ergonomic mesh/leather seating.',
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
    subtitle: 'Commercial Interior',
    category: 'Commercial Interior',
    parentSlug: 'commercial-interior',
    icon: 'icon-lamp',
    cardImg: '/images/services/v2-5.jpg',
    mainImg: '/images/services/service-single/single-service-1.jpg',
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
    ],
    advantages: [
      {
        icon: 'icon-lamp',
        title: 'Creative\n Atmosphere',
        text: 'Distinctive industrial, minimalist, or biophilic aesthetics that inspire teams.',
      },
      {
        icon: 'icon-music',
        title: 'Acoustic &\n Lighting Precision',
        text: 'Echo-free recording zones and high-CRI studio lighting setups.',
      },
      {
        icon: 'icon-floor',
        title: 'Agile &\n Modular',
        text: 'Flexible layouts that easily scale and reconfigure as your team grows.',
      },
      {
        icon: 'icon-wallet',
        title: 'Startup-Friendly\n Budgeting',
        text: 'High visual impact achieved through smart material choices and focal-point design.',
      },
    ],
    processSteps: [
      'Creative Workflow, Equipment & Acoustic Discovery',
      'Flexible Zoning & Lighting/Sound Layout',
      '3D Studio Concept Renders & Texture Curation',
      'Acoustic Treatment, Custom Desks & Track Lighting Fit-Out',
      'Sound/Light Calibration & Studio Handover',
    ],
    faqs: [
      {
        q: 'Can you soundproof a room inside an office for video or podcast recording?',
        a: 'Yes! We build acoustic rooms using high-density rockwool insulation, double-glazed glass, acoustic door seals, and decorative slatted wood/fabric diffuser panels.',
      },
      {
        q: 'How can we make a small studio office look spacious and premium?',
        a: 'By using exposed or high ceilings with track lighting, clear glass partitions, multi-purpose built-in storage, and one bold architectural focal wall.',
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
    subtitle: 'Commercial Interior',
    category: 'Commercial Interior',
    parentSlug: 'commercial-interior',
    icon: 'icon-shop',
    cardImg: '/images/services/v2-6.jpg',
    mainImg: '/images/services/service-single/single-service-1.jpg',
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
    ],
    advantages: [
      {
        icon: 'icon-shop',
        title: 'Sales-Driven\n Merchandising',
        text: 'Customer flow and sightlines engineered to spotlight high-margin products.',
      },
      {
        icon: 'icon-lamp',
        title: 'True-Color\n Retail Lighting',
        text: 'Precision CRI 90+ lighting that enhances fabrics, jewelry, and product finishes.',
      },
      {
        icon: 'icon-guarantee-certificate',
        title: 'Rapid Mall &\n Street Fit-Out',
        text: 'Fast execution so you make the most of rent-free fit-out periods.',
      },
      {
        icon: 'icon-wallet',
        title: 'Modular\n Display Systems',
        text: 'Adaptable shelving and racks that evolve with your seasonal collections.',
      },
    ],
    processSteps: [
      'Brand Identity, SKU Volume & Customer Journey Audit',
      'Store Circulation, Display Fixture & Lighting Plan',
      '3D Storefront & Interior Merchandising Visualization',
      'Custom Fixture Fabrication, Glass, Lighting & Signage Installation',
      'Final Display Styling & Grand Opening Handover',
    ],
    faqs: [
      {
        q: 'Can you match the strict brand guidelines of a franchise or multi-outlet brand?',
        a: 'Yes. We regularly execute standardized brand rollouts with exact Pantone colors, custom metal/wood fixtures, and consistent lighting specs across multiple locations.',
      },
      {
        q: 'How fast can you complete a retail showroom interior?',
        a: 'Depending on square footage, most retail store fit-outs are completed within 3–6 weeks by fabricating display units off-site while civil and ceiling work happens on-site.',
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
    subtitle: 'Commercial Interior',
    category: 'Commercial Interior',
    parentSlug: 'commercial-interior',
    icon: 'icon-heart',
    cardImg: '/images/services/1.jpg',
    mainImg: '/images/services/service-single/single-service-1.jpg',
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
    ],
    advantages: [
      {
        icon: 'icon-heart',
        title: 'Anxiety-Free\n Patient Comfort',
        text: 'Biophilic touches and warm lighting that replace cold clinical sterility.',
      },
      {
        icon: 'icon-guarantee-certificate',
        title: 'Hygiene &\n Code Compliant',
        text: 'Stain-resistant, antibacterial surfaces, proper ventilation, and easy sanitization.',
      },
      {
        icon: 'icon-floor',
        title: 'Smart Clinical\n Flow',
        text: 'Clear separation between public waiting zones, procedure rooms, and sterilization areas.',
      },
      {
        icon: 'icon-wallet',
        title: 'Durable High-\n Traffic Finishes',
        text: 'Engineered to look pristine after years of heavy daily patient and guest turnover.',
      },
    ],
    processSteps: [
      'Clinical Equipment, Hygiene & Guest Flow Assessment',
      'Zoning Layout for Waiting, Treatment & Back-of-House Areas',
      '3D Hospitality/Healthcare Renders & Material Approval',
      'Specialized Plumbing, Medical Lighting, Partition & Millwork Fit-Out',
      'Sanitization Check, Equipment Integration & Handover',
    ],
    faqs: [
      {
        q: 'Do you coordinate plumbing and electrical points for dental chairs or salon stations?',
        a: 'Yes. We work directly from your medical or salon equipment specifications to pre-route concealed water, drainage, suction, and power lines before flooring and carpentry.',
      },
      {
        q: 'What materials do you use for clinic interiors?',
        a: 'We prioritize non-porous Corian/quartz countertops, antimicrobial wall paints, commercial vinyl or large-format vitrified flooring, and moisture-resistant cabinetry.',
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
    subtitle: 'Culinary & Social Destinations',
    category: 'Restaurant Interior',
    parentSlug: null,
    icon: 'icon-star',
    cardImg: '/images/services/2.jpg',
    mainImg: '/images/services/service-single/single-service-1.jpg',
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
      'Mood Lighting, Acoustic Echo Control & HVAC/Exhaust Coordination',
    ],
    advantages: [
      {
        icon: 'icon-star',
        title: 'Instagrammable\n Ambiance',
        text: 'Photogenic corners and signature lighting that generate organic social media buzz.',
      },
      {
        icon: 'icon-floor',
        title: 'Optimal Seat\n Turnover',
        text: 'Smart table spacing and service aisles that maximize covers without crowding guests.',
      },
      {
        icon: 'icon-guarantee-certificate',
        title: 'Spill & Stain\n Proof Finishes',
        text: 'Commercial-grade upholstery, stone/solid-wood tabletops, and washable wall finishes.',
      },
      {
        icon: 'icon-wallet',
        title: 'Fast Launch\n Execution',
        text: 'Streamlined turnkey buildout so you can start serving guests and generating revenue.',
      },
    ],
    processSteps: [
      'Cuisine Concept, Target Audience & Cover Capacity Brief',
      'Seating Layout, Service Flow & Kitchen/Bar Zoning',
      '3D Thematic Visualization, Lighting & Furniture Design',
      'Civil, HVAC/Exhaust, Custom Booths, Bar & Decor Execution',
      'Lighting Dimming Calibration, Styling & Opening Handover',
    ],
    faqs: [
      {
        q: 'Do you custom-build restaurant tables, chairs, and sofa booths?',
        a: 'Yes. We design and fabricate custom commercial-grade banquette booths, solid wood/metal dining tables, and bar counters tailored to your restaurant theme.',
      },
      {
        q: 'Can you design rooftop or semi-outdoor restaurants?',
        a: 'Absolutely. We specialize in weather-resistant rooftop cafes and lounges with steel/glass pergolas, outdoor decking, ambient landscape lighting, and mist/cooling setups.',
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
    subtitle: 'Architecture & Outdoor Living',
    category: 'Exterior Design',
    parentSlug: null,
    icon: 'icon-architecture-and-city',
    cardImg: '/images/services/3.jpg',
    mainImg: '/images/services/service-single/single-service-1.jpg',
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
    ],
    advantages: [
      {
        icon: 'icon-architecture-and-city',
        title: 'Iconic Curb\n Appeal',
        text: 'Timeless architectural facades that make your building a neighborhood landmark.',
      },
      {
        icon: 'icon-guarantee-certificate',
        title: 'Weatherproof\n Engineering',
        text: 'UV-stable, monsoon-proof materials, proper roof drainage, and waterproof membranes.',
      },
      {
        icon: 'icon-lamp',
        title: 'Nighttime\n Drama',
        text: 'IP65-rated architectural facade and garden lighting that transforms the building after dusk.',
      },
      {
        icon: 'icon-wallet',
        title: 'Thermal &\n Green Value',
        text: 'Rooftop greenery and sun-shading louvers that naturally cool top floors.',
      },
    ],
    processSteps: [
      'Site Orientation, Sun-Path & Structural Assessment',
      'Architectural Facade / Landscape Concept & 2D Plans',
      'Day & Night Photorealistic 3D Exterior Visualizations',
      'Waterproofing, Steel/Glass/Cladding & Hardscape Execution',
      'Softscape Planting, Exterior Lighting & Final Handover',
    ],
    faqs: [
      {
        q: 'Will a rooftop garden cause water leakage on the top floor?',
        a: 'Not when engineered properly. We install multi-layer elastomeric waterproofing, root-barrier membranes, and dedicated drainage cells before adding any soil or planters.',
      },
      {
        q: 'Can you redesign the front facade of an existing commercial or residential building?',
        a: 'Yes! Facade face-lifts using louvers, cladding, glass, and architectural lighting are one of the fastest ways to modernize and revalue an older building.',
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
    subtitle: 'Artisanal Craftsmanship & Styling',
    category: 'Furniture and Decor',
    parentSlug: null,
    icon: 'icon-cupboard',
    cardImg: '/images/services/4.jpg',
    mainImg: '/images/services/service-single/single-service-1.jpg',
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
    ],
    advantages: [
      {
        icon: 'icon-cupboard',
        title: 'Made-to-\n Measure Fit',
        text: 'Built to the exact millimeter of your room—no awkward gaps or oversized pieces.',
      },
      {
        icon: 'icon-guarantee-certificate',
        title: 'Master\n Artisans',
        text: 'Seasoned timber, high-density foam, premium fabrics, and precision metalwork.',
      },
      {
        icon: 'icon-paint',
        title: '100% Custom\n Finishes',
        text: 'Choose your exact upholstery fabric, wood stain, lacquer shade, and metal finish.',
      },
      {
        icon: 'icon-wallet',
        title: 'Direct Studio\n Value',
        text: 'Workshop-direct fabrication delivering boutique luxury without retail markups.',
      },
    ],
    processSteps: [
      'Space Measurement, Style & Ergonomic Requirement Brief',
      'Furniture/Decor Sketches, 3D Models & Shop Drawings',
      'Fabric Swatch, Wood Veneer, Glass & Metal Finish Selection',
      'In-House Carpentry, Upholstery & Metal/Glass Fabrication',
      'White-Glove Delivery, On-Site Placement & Final Styling',
    ],
    faqs: [
      {
        q: 'Can you replicate or customize a furniture design I saw on Pinterest or Instagram?',
        a: 'Yes! Bring us your reference photos and our designers will produce technical shop drawings, adjust the dimensions to fit your room, and craft it in our workshop.',
      },
      {
        q: 'Do you make custom glass partitions and metal dividers?',
        a: 'Yes, we specialize in slim-profile aluminum/MS framed fluted glass partitions, brass-finish room dividers, and custom wrought-iron features.',
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
    subtitle: 'Architectural Planning & Engineering',
    category: '3D & Design Consultancy',
    parentSlug: null,
    icon: 'icon-concept',
    cardImg: '/images/services/v2-1.jpg',
    mainImg: '/images/services/service-single/single-service-1.jpg',
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
    ],
    advantages: [
      {
        icon: 'icon-concept',
        title: 'See Before\n You Build',
        text: 'Photorealistic 3D renders eliminate guesswork and costly on-site design changes.',
      },
      {
        icon: 'icon-document',
        title: 'Contractor-Ready\n Drawings',
        text: 'Millimeter-accurate technical CAD drawings for flawless execution anywhere.',
      },
      {
        icon: 'icon-wallet',
        title: 'BDT 40/sqft +\n 50% Refund',
        text: 'Accessible BDT 40/sqft 3D design fee with 50% rebated when we build your project.',
      },
      {
        icon: 'icon-hr',
        title: 'Expert Site\n Advisory',
        text: 'Optional milestone site visits and material shopping guidance with our architects.',
      },
    ],
    processSteps: [
      'Consultation, Floor Plan Review & Requirement Briefing',
      '2D Space Planning, Zoning & Ergonomic Layout Approval',
      'Moodboard Curation & Photorealistic 3D Visualization',
      'Detailed Engineering CAD Drawings & Material/BOQ Documentation',
      'Handover of Full Design Package (or Transition to Turnkey Build)',
    ],
    faqs: [
      {
        q: 'How does the BDT 40/sqft 3D design fee and 50% refund policy work?',
        a: 'Our 3D design fee is BDT 40 per sq.ft, which covers space planning and photorealistic 3D visualizations. If you appoint Plastid for the full turnkey execution of your project, we refund 50% of that design fee at project completion.',
      },
      {
        q: 'Can I hire Plastid for design and drawings only if my project is outside Dhaka?',
        a: 'Yes! Clients across Bangladesh (and NRBs living abroad) regularly use our 3D & Design Consultancy package to get complete 3D renders, working CAD drawings, and BOQs.',
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
