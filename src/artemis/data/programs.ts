import { Users, Globe, Zap, Target, Search, LucideIcon } from "lucide-react";

export interface ProgramDetail {
  id: string;
  title: string;
  tagline: string;
  desc: string;
  longDesc?: string;
  details: { label: string; value: string }[];
  icon: LucideIcon;
  color: string;
  link: string;
  image: string;
  stats?: { label: string; value: string }[];
  process?: { title: string; desc: string; extended?: string }[];
  howWeHelpIntro?: string;
  features?: { title: string; desc: string; icon?: string }[];
  unfairAdvantageTitle?: string;
  unfairAdvantageImages?: { left: string; right: string };
  companies?: { name: string; desc: string; focus: string; field: string; funding: string; teamSize: string; categories: string; location: string }[];
  isForYouIf?: string[];
  faqs?: { q: string; a: string }[];
  trackRecord?: { label: string; value: string }[];
  testimonial?: { quote: string; author: string; role: string; image: string };
  ideas?: { partner: string; title: string; desc: string; image?: string; partnerImage?: string }[];
}

export const programsData: ProgramDetail[] = [
  {
    id: "xhansa-fellowship",
    title: "xHansa Fellowship",
    tagline: "The Pioneering Enterprises Engine.",
    desc: "Our flagship 24-month human capital deployment engine. We intake 1,000 Xcitizens per cohort, embedding them into ten-person 'Pods' (Stacks) to build ProtoCos across nine civilizational fields.",
    longDesc: "The xHansa Program is the human capital engine of the Hanseatic League. It is fundamentally a military-grade knowledge-deployment pipeline, not an educational initiative or accelerator. The program intakes 1,000 Xcitizens per cohort and deploys them as 100 ten-person Stacks against 100 commissioned ProtoCos operating across the Nine Civilizational Fields. Every element, from archetype typing to pod formation to the quarterly Gate system, is engineered for one outcome: operational ventures that survive the 24-month cliff and scale independently.",
    details: [
      { label: "Duration", value: "24 Months" },
      { label: "Deployment", value: "100 Pods" },
      { label: "Focus", value: "9 Civ Fields" },
      { label: "Cadence", value: "Quarterly Gates" }
    ],
    stats: [
      { label: "Xcitizens Per Cohort", value: "1,000" },
      { label: "Stipend", value: "$500-$1,200/mo" },
      { label: "Equity Cliff", value: "23 Months" },
      { label: "Capital Target", value: "5x Multiplication" }
    ],
    process: [
      {
        title: "The 8-Week Crucible",
        desc: "Neural reprogramming involving 'The Shock' and 'The Wall' to certify OS installation under cognitive exhaustion. Candidates are systematically stripped of compliance conditioning and rebuilt with execution-first cognitive architecture.",
        extended: "During the Crucible, candidates undergo the Civilizational Field Typing Assessment, where they are sorted into the six Xcitizen Archetypes: Pilot, Builder, Hustler, Operator, Tracker, and Comms. The typing is not based on stated preference but observed behavior under stress, who leads when the plan fails, who stabilizes the group, who identifies the exit. This behavioral ground-truth determines pod composition for the entire 24-month deployment."
      },
      {
        title: "Q1: 0-to-1 Pilot (Months 1-6)",
        desc: "Build the Minimal Version; secure Anchor Partner LOI; deploy physical/digital asset. The first six months are a race from concept to working prototype with real-world deployment.",
        extended: "The focus is on achieving a working version and securing legitimacy through anchor partnerships. Each Pod must deliver a Minimal Version, not a slide deck, not a business plan, but a functioning asset deployed in the field. Securing an Anchor Partner LOI is a non-negotiable Gate requirement; without it, the Pod does not advance. This phase separates operators from theoreticians."
      },
      {
        title: "Q2: First Revenue (Months 7-12)",
        desc: "Hit exact mathematical metrics; debug all technical and operational failures. Revenue is the sole proof of product-market fit, no substitutes accepted.",
        extended: "Months 7-12 are dedicated to proving unit economics at baseline. Every metric, CAC, LTV, churn, throughput, must hit precise mathematical thresholds. Technical failures are debugged in real-time. Operational gaps are patched. This quarter is where romantic visions die and operational reality takes hold. Pods that cannot demonstrate sustainable unit economics by Gate 2 face the Kill Switch."
      },
      {
        title: "Q3: Expansion (Months 13-18)",
        desc: "Replicate pilot in 3-5 new geographies; author the permanent Playbook. Scaling is not optional. It is the proof that the model transfers across contexts.",
        extended: "Months 13-18 focus on scaling nodes to 3-5 locations. The pilot must be replicated in diverse geographies with different constraints, different regulatory environments, different supply chains, different customer behaviors. Simultaneously, the Pod authors the permanent Playbook: a codified, step-by-step operational manual that any future operator can execute without the original team. The Playbook is a Gate 3 deliverable."
      },
      {
        title: "Q4: Institutionalization (Months 19-24)",
        desc: "Replace the temporary Xcitizen stack with local permanent operators. Ensure the venture is operationally efficient (>80%) and ready for spin-out. Month 24 is a hard cliff: the stipend stops instantly.",
        extended: "The final phase ensures the venture can survive without its original builders. Local permanent operators are recruited and trained. Operational efficiency must exceed 80% across all KPIs. Month 24 is a hard cliff: the stipend stops instantly and there is no grace period. The top 3% of Xcitizens: the 'Keepers', transition to permanent payrolls within the spun-out entity. The remaining 97%, 'The Cycled', are severed with performance equity grants carrying 36-month vesting schedules. This is by design: the League builds ventures, not lifetime employment."
      }
    ],
    howWeHelpIntro: "We deploy you into a ten-person Pod with five complementary archetypes and arm you with the League's full infrastructure, from XEmbassy workspaces to anchor partner networks. In 24 months you will...",
    features: [
      { title: "The Supremacy Clause", desc: "Mandates absolute supersederation of individual interests by the League. Breakthroughs are shared across the network, no Pod hoards an advantage. When one Stack discovers a solution, every Stack benefits. Individual IP claims are subordinate to the League Commons.", icon: "Shield" },
      { title: "The Kill Switch", desc: "Immediate termination for failure to meet quarterly Gate thresholds. Zero margin for error. A Pod that misses Gate metrics is dissolved within 48 hours, assets redistributed, Xcitizens reassigned. There is no appeals process and no extension.", icon: "Zap" },
      { title: "Six Archetypes", desc: "Pods matched using Pilot, Builder, Hustler, Operator, Tracker, and Comms archetypes. Each archetype fills a precise operational role: Pilots set direction, Builders construct, Hustlers close, Operators maintain, Trackers surveil, and Comms translate. No Pod is complete without all six.", icon: "Users" },
      { title: "Neural Link Protocol", desc: "Real-time biometric and cognitive monitoring for optimal pod performance. Heart rate variability, sleep patterns, stress indicators, and cognitive load are tracked continuously. The system flags performance degradation before the Pod is aware of it, enabling preemptive intervention.", icon: "Activity" },
      { title: "Gate System", desc: "Quarterly performance gates with binary pass/fail outcomes. Each Gate has precise mathematical thresholds, no subjective evaluation, no committee votes. Either your Pod hits the numbers or it doesn't. The clarity of the Gate system eliminates politics and focuses every Pod on measurable execution.", icon: "Target" },
      { title: "League Commons", desc: "Shared IP, infrastructure, and intelligence across the entire Hansa network. When one Pod cracks a supply chain problem in Lagos, every Pod in Accra, Nairobi, and Cairo benefits immediately. The Commons accelerates every venture by eliminating redundant problem-solving.", icon: "Globe" }
    ],
    unfairAdvantageTitle: "The xHansa Unfair Advantage",
    unfairAdvantageImages: {
      left: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
      right: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=800&q=80"
    },
    isForYouIf: [
      "You are an informal economy operator, grassroots worker, or self-taught engineer.",
      "You thrive under extreme resource constraint and cognitive exhaustion.",
      "You are willing to surrender individual IP for the League Commons.",
      "You want to build backbone infrastructure for the Global South.",
      "You can commit to a 24-month deployment with no exit option before the cliff.",
      "You believe in collective intelligence over individual heroism."
    ],
    faqs: [
      { q: "What is an Xcitizen?", a: "Xcitizens are neither employees nor students; they are deployed operators who receive a flat, needs-based stipend ($500-$1,200/mo). They do not clock in, they do not receive benefits, and they are not guaranteed employment after 24 months. They are mission-deployed personnel whose compensation is tied to operational outcomes, not time served." },
      { q: "What happens after 24 months?", a: "Month 24 is a hard cliff. The top 3% of Xcitizens: the 'Keepers', transition to permanent payrolls within the spun-out entity. The remaining 97%, 'The Cycled', are severed with performance equity grants carrying 36-month vesting schedules. This is not a failure; it is the design. The League builds ventures, not careers." },
      { q: "How are pods formed?", a: "Pods are formed via a deterministic algorithm that weighs Deployment Classification and Archetype compatibility. The Civilizational Field Typing Assessment observes behavior under stress, not stated preference, to assign one of six Archetypes: Pilot, Builder, Hustler, Operator, Tracker, or Comms. The algorithm then composes Pods to maximize complementary strengths within the assigned field." },
      { q: "What is the Crucible?", a: "The Crucible is an 8-week psychological demolition and reconstruction process that overwrites compliance conditioning with execution capability. It consists of 'The Shock' (systematic destabilization of habitual thought patterns) and 'The Wall' (sustained cognitive exhaustion that strips away social performance). Those who survive emerge with an operational architecture, a new cognitive OS, optimized for high-stakes deployment under uncertainty." },
      { q: "What are the Nine Civilizational Fields?", a: "The Nine Civilizational Fields are the operational domains the League has identified as essential infrastructure for the Global South: Water Systems, Energy Systems, Food & Agriculture, Health & Mobility, Built Environment, Data & Intelligence, Logistics & Trade, Governance & Identity, and Education & Human Capital. Every ProtoCo is commissioned against one of these fields." },
      { q: "Can I leave the program early?", a: "Technically yes, but the cost is total forfeiture of all equity and performance grants. The program is designed as a commitment device: the 24-month cliff exists precisely because infrastructure cannot be built by people who have an easy exit. Early departures are rare and economically punitive." }
    ],
    trackRecord: [
      { label: "Xcitizens Per Cohort", value: "1,000" },
      { label: "Strike Zones (XEmbassies)", value: "190" },
      { label: "Civilizational Fields", value: "09" },
      { label: "Success Rate", value: "75%" }
    ],
    ideas: [
      { partner: "Director Hansa", title: "WaterX", desc: "Decentralized atmospheric water generation for arid zones using modular thermal units. Deployed across the Sahel with 99.7% uptime. [Water Systems]", partnerImage: "https://i.pravatar.cc/100?img=10" },
      { partner: "Strategic Lead", title: "PowerGrid", desc: "Peer-to-peer energy sharing for micro-grids in sub-Saharan Africa. Enables surplus solar redistribution between adjacent settlements. [Energy Systems]", partnerImage: "https://i.pravatar.cc/100?img=11" },
      { partner: "Command Tech", title: "MediLink", desc: "Cold-chain infrastructure for last-mile pharmaceutical delivery via autonomous ground vehicles. Active in 12 rural districts. [Health/Mobility]", partnerImage: "https://i.pravatar.cc/100?img=12" },
      { partner: "Field Ops Lead", title: "AgriVault", desc: "Blockchain-verified seed bank and crop insurance for smallholder farmers. Micro-premiums auto-deducted at harvest. [Food & Agriculture]", partnerImage: "https://i.pravatar.cc/100?img=19" },
      { partner: "Infrastructure Dir.", title: "CivicMesh", desc: "Decentralized mesh networking for off-grid communication in disaster zones. Zero internet dependency. [Data & Intelligence]", partnerImage: "https://i.pravatar.cc/100?img=20" },
      { partner: "Ops Commander", title: "EduForge", desc: "Deployable maker-space containers with CNC, 3D printing, and electronics labs for rapid prototyping in underserved regions. 90-day deployment cycle. [Education & Human Capital]", partnerImage: "https://i.pravatar.cc/100?img=27" }
    ],
    testimonial: {
      quote: "The Hansa model is fundamentally a military-grade knowledge-deployment pipeline. It's the only way to build infrastructure at the scale required for 171 African nations.",
      author: "XHansa Director",
      role: "Strategic Command",
      image: "https://i.pravatar.cc/100?img=1"
    },
    companies: [
      { name: "Nebula", desc: "the decentralized protocol for planetary-scale logistics.", focus: "Logistics Protocol", field: "Mobility", funding: "$2M Pre-Seed", teamSize: "10-25", categories: "Logistics / Protocol", location: "Lagos" },
      { name: "TerraHash", desc: "the blockchain layer for managing independent land registries.", focus: "Land Registry", field: "Built Env", funding: "$3M Seed", teamSize: "15-30", categories: "Blockchain / GovTech", location: "Accra" }
    ],
    icon: Globe,
    color: "bg-[#111111]",
    image: "/programs/xhansa-hero.png",
    link: "/programs/the-routes"
  },
  {
    id: "xcelero-accelerator",
    title: "xCelero Accelerator",
    tagline: "High-velocity launchpad.",
    desc: "A 4-month immersive experience for exceptional founders. We provide an elite mentorship syndicate and a funding package that breaks conventional boundaries.",
    longDesc: "xCelero Labs is a high-velocity launchpad for exceptional founders looking to redefine the future of innovation. Our program offers a unique blend of immersive experiences, top-tier mentorship from the Hanseatic Syndicate, and unparalleled funding opportunities. The accelerator is not a classroom. It is a crucible where ventures are stress-tested, refined, and launched with institutional-grade preparation and capital behind them.",
    details: [
      { label: "Funding", value: "$620k Package" },
      { label: "Equity", value: "3% Fixed" },
      { label: "Batch Size", value: "20 Companies" },
      { label: "Residency", value: "19 Cities" }
    ],
    stats: [
      { label: "Initial Capital", value: "$120,000" },
      { label: "Uncapped SAFE", value: "$500,000" },
      { label: "Funding Rate", value: "75% Success" },
      { label: "Mentor Ratio", value: "3:1" }
    ],
    process: [
      {
        title: "Deep Dive Audit",
        desc: "Initial 2-week technical and market analysis to identify leverage points. Every aspect of the venture, technology stack, competitive landscape, unit economics, team dynamics, go-to-market strategy, is dissected to surface high-multiplication leverage points.",
        extended: "We analyze every aspect of your venture to identify the high-multiplication leverage points. This is not a superficial review, partners embed with your team for two weeks, attending standups, reviewing code, interviewing customers, and stress-testing assumptions. The output is a leverage map that dictates the entire program strategy for your company."
      },
      {
        title: "Office Hours",
        desc: "Weekly one-on-one sessions with partners, akin to a doctoral journey. Each session targets a specific domain: product development, marketing, sales, financial planning, recruitment, or management.",
        extended: "We address product development, marketing, sales, financial planning, recruitment, and management dilemmas. These are not generic advisory sessions, partners prepare for each meeting as if defending a thesis. Founders leave every Office Hour with a specific, time-boxed action plan. The relationship is closer to a doctoral advisor than a consultant: partners are personally invested in your outcome."
      },
      {
        title: "Group Office Hours",
        desc: "Collaborative platform to exchange ideas with peers from similar industries. Knowledge sharing, feedback, and vibrant discussions across the entire cohort.",
        extended: "Find a community of confident founders who share your journey. Group Office Hours create a structured forum where founders from similar industries exchange hard-won insights, challenge each other's assumptions, and surface blind spots that individual sessions miss. The cohort becomes a peer review board, and often, the most valuable feedback comes not from partners but from other founders who are solving adjacent problems."
      },
      {
        title: "The Pitch Matrix",
        desc: "Intensive training in narrative construction for institutional capital. Founders learn to frame their venture as a high-conviction investment thesis, not a product demo.",
        extended: "Equip yourself with the skills and support necessary to soar when you face investors. The Pitch Matrix goes beyond slide design. It teaches the psychology of institutional capital allocation. Founders learn to anticipate objection patterns, structure information asymmetries, and construct narratives that survive hostile questioning. Every founder presents to a mock investment committee of former VC partners before Demo Day."
      },
      {
        title: "Demo Day",
        desc: "Presentations to thousands of VC firms, angel investors, and institutional directors. A launchpad for the future where you showcase your vision to the capital markets.",
        extended: "A launchpad for the future where you showcase your vision. Demo Day is not a rehearsed performance. It is a live-fire exercise. Founders present to a curated audience of thousands of VC firms, angel investors, and strategic partners who have been pre-briefed on each company. The format is designed to create competitive tension and accelerate due diligence timelines from months to weeks."
      }
    ],
    howWeHelpIntro: "We embed with your company for 4 months across 19 cities, pairing you with dedicated partners who treat your success like a doctoral thesis, and back it with $620k in institutional-grade capital. In 4 months you will...",
    features: [
      { title: "Hyper-Localized Global Immersion", desc: "Immersion takes startups through diverse innovation ecosystems in multiple global cities for unique market insights. Each city is selected to stress-test a different assumption about your business model, regulatory risk in one, customer behavior in another, supply chain resilience in a third. Across 19 cities, you build a global mental model that local-only founders cannot match.", icon: "Globe" },
      { title: "Elite Mentorship Syndicate", desc: "A curated group of serial entrepreneurs, tech titans, and industry disruptors committed to your success. Mentors are not figureheads, they commit to a minimum of 10 hours per month per company and are evaluated on founder outcomes, not attendance.", icon: "Users" },
      { title: "Elite Funding Package", desc: "$120,000 for 3% equity at $5M valuation cap + $500,000 uncapped SAFE. The structure is designed to align incentives: the fixed equity prevents dilution anxiety, while the uncapped SAFE provides follow-on capital without renegotiation.", icon: "Zap" },
      { title: "Alumni Economic Carry", desc: "Economic participation in the fund's carry equivalent to profit from $10,000 of 'money at work,' vesting after 1 year. Alumni are not just graduates, they become economic stakeholders in every future cohort's success.", icon: "Activity" },
      { title: "Pitch Matrix Training", desc: "Institutional-grade narrative construction that goes beyond slide design. Founders learn the psychology of capital allocation, anticipate objection patterns, and construct investment theses that survive hostile questioning. Every founder presents to a mock investment committee of former VC partners before Demo Day.", icon: "Target" },
      { title: "Cohort Peer Network", desc: "Structured forums where founders from similar industries exchange hard-won insights, challenge assumptions, and surface blind spots. The cohort becomes a peer review board, often the most valuable feedback comes not from partners but from other founders solving adjacent problems.", icon: "Workflow" }
    ],
    unfairAdvantageTitle: "The Accelerator Unfair Advantage",
    unfairAdvantageImages: {
      left: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=800&q=80",
      right: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=800&q=80"
    },
    isForYouIf: [
      "You are an exceptional founder looking to redefine the future of innovation.",
      "You want to think bigger, execute faster, and 10x your odds.",
      "You value individualized support over one-size-fits-all playbooks.",
      "You are ready for a transformative 4-month journey.",
      "You want access to institutional capital networks that are otherwise closed.",
      "You are building in a domain that requires global market understanding from Day 1."
    ],
    faqs: [
      { q: "What is the investment deal?", a: "We offer $120,000 for 3% equity at a $5M post-money valuation cap, plus a $500,000 uncapped SAFE. The equity portion provides initial runway; the uncapped SAFE ensures follow-on capital is available without the friction of a new negotiation." },
      { q: "What is the success rate?", a: "We have a 75% success rate in securing follow-on funding within 6 months post-program. This is not aspirational. It is audited and verified across every cohort since inception." },
      { q: "Where does the program take place?", a: "Immersion takes startups through multiple global innovation ecosystems across 19 cities. Each city is selected to expose founders to different market dynamics, regulatory environments, and customer behaviors. The geographic diversity is not a perk. It is a core component of the program design." },
      { q: "How are mentors matched to companies?", a: "Mentors are matched based on domain expertise, stage experience, and complementary skill gaps identified during the Deep Dive Audit. Each company receives a minimum of three dedicated mentors, and the matching is reviewed bi-weekly to ensure relevance as the company evolves." },
      { q: "What happens after Demo Day?", a: "Demo Day is the beginning, not the end. Alumni receive ongoing access to the Syndicate network, quarterly check-ins with partners, and the Alumni Economic Carry, a financial stake in every future cohort's success. The average alumnus closes their next round within 6 weeks of Demo Day." }
    ],
    trackRecord: [
      { label: "Batch Size", value: "20" },
      { label: "Funding Package", value: "$620k" },
      { label: "Success Rate", value: "75%" },
      { label: "Total Mult", value: "10x" }
    ],
    ideas: [
      { partner: "Venture Partner", title: "FinFlow", desc: "Cross-border settlement layer for SMEs using liquidity pools and AI risk modeling. Reduces settlement time from 5 days to 4 hours.", partnerImage: "https://i.pravatar.cc/100?img=13" },
      { partner: "Investment Director", title: "HealthSync", desc: "Remote diagnostics platform connecting rural clinics to specialist hubs via satellite link. Active in 3 countries, 200+ clinics.", partnerImage: "https://i.pravatar.cc/100?img=14" },
      { partner: "Syndicate Lead", title: "EduBridge", desc: "Adaptive learning infrastructure for refugee and displaced populations. Offline-first with mesh sync capabilities.", partnerImage: "https://i.pravatar.cc/100?img=21" },
      { partner: "Portfolio Lead", title: "LogiChain", desc: "Predictive logistics orchestration for emerging market supply chains. AI-driven route optimization reducing spoilage by 40%.", partnerImage: "https://i.pravatar.cc/100?img=22" },
      { partner: "Capital Partner", title: "GreenLedger", desc: "Carbon credit verification platform using satellite imagery and IoT sensors for emerging market offset projects. Real-time MRV at 80% lower cost.", partnerImage: "https://i.pravatar.cc/100?img=28" }
    ],
    testimonial: {
      quote: "xCelero isn't just an accelerator; it's a partnership. They provided the capital and mentorship we needed to go from a prototype to a category leader in record time.",
      author: "Alumni Founder",
      role: "Class of '25",
      image: "https://i.pravatar.cc/100?img=2"
    },
    companies: [
      { name: "EkoHeat", desc: "the next-gen geothermal system for sustainable urban heating.", focus: "Geothermal", field: "Energy", funding: "$5M Series A", teamSize: "30-60", categories: "Energy / Infra", location: "Cairo" },
      { name: "AgriDrone", desc: "the automated drone solution for precision nutrient application.", focus: "AgriTech", field: "Food & Ag", funding: "$2M Seed", teamSize: "20-45", categories: "AgTech / Drones", location: "Nairobi" }
    ],
    icon: Zap,
    color: "bg-[#FFD700]",
    image: "/programs/xcelero-hero.png",
    link: "/programs/xcelero-accelerator"
  },
  {
    id: "inception-studios",
    title: "The Inception Studios",
    tagline: "Co-creation with the world's giants.",
    desc: "At the intersection of entrepreneurship and governance. We partner with Fortune 500s, governments, and foundations to identify systemic bottlenecks and build market-defining companies from scratch.",
    longDesc: "Our Studio model, inspired by Thomas Edison's Menlo Park, encompasses labs where seasoned scientists and operational executives collaborate to fuel the creation of companies from scratch. The Studio Process begins with a strategic kickoff defining clear success criteria, followed by research that creates a technology blueprint. A cohort of vetted startup teams then addresses identified needs, and Pilot Partnerships validate technologies and assess investment potential. The result: high-velocity company creation that thrives on speed, agility, and institutional-grade resources.",
    details: [
      { label: "Model", value: "Venture Studio" },
      { label: "Partners", value: "Fortune 500 / GOV" },
      { label: "Outcome", value: "Market-Defining NewCos" },
      { label: "IP Ownership", value: "Studio Model" }
    ],
    process: [
      {
        title: "Ideation & Inception",
        desc: "Extensive market research to identify key challenges and disruptive potential. A team of scientists and industry experts brainstorm 'what if' hypotheses that target systemic bottlenecks, not incremental improvements.",
        extended: "The Studio Process begins with a strategic kickoff, defining clear success criteria and investment thesis parameters. Research creates a technology blueprint, a detailed map of the technical landscape, competitive dynamics, and regulatory environment. This is not whiteboard speculation; it is evidence-grounded hypothesis generation backed by interdisciplinary teams with deep domain expertise."
      },
      {
        title: "Prototype Companies (ProtoCos)",
        desc: "Embryonic versions of potential businesses with clear objectives and resources. ProtoCos undergo numerous iterations based on feedback, market signals, and operational learning, each cycle sharpening the value proposition.",
        extended: "A cohort of vetted startup teams addresses identified needs through ProtoCos, lightweight, resource-constrained experiments designed to validate or invalidate core assumptions rapidly. ProtoCos are not permanent; they are disposable vehicles for learning. Those that survive iteration graduate to the NewCo stage. Those that don't are cleanly wound down with lessons absorbed into the next cycle."
      },
      {
        title: "NewCo Stage",
        desc: "Substantial capital from xCelero Labs enables the development of platforms and teams. Building full teams, selecting board of directors and CEO, and working toward product development and market readiness.",
        extended: "Surviving ProtoCos receive substantial capital and transition into NewCos, formal venture entities with independent governance. This stage involves recruiting a full executive team, selecting a board of directors and CEO, and transitioning from experimental iteration to deliberate product development and go-to-market execution. The Studio provides operational infrastructure, legal, finance, HR, so the NewCo team can focus exclusively on building and selling."
      },
      {
        title: "Spinout & Scale-Up",
        desc: "NewCo spun out as an independent entity. Seeking external investment, forming strategic partnerships, and scaling operations beyond the Studio's initial framework.",
        extended: "Pilot Partnerships validate technologies and assess investment potential. Once validated, the NewCo is spun out as an independent entity with its own cap table, governance, and strategic direction. The Studio's involvement transitions from operator to shareholder. The NewCo seeks external investment, forms strategic partnerships, and scales operations using the Playbook and infrastructure built during the Studio phase."
      }
    ],
    howWeHelpIntro: "We co-create ventures with Fortune 500 partners and government agencies, providing the full Studio infrastructure, from technology blueprinting to IP powerhouses to first-customer contracts. From ideation to spinout you will...",
    features: [
      { title: "High-Velocity Creation", desc: "A journey designed to accelerate startups with unparalleled speed. The Studio compresses years of validation into months by eliminating the friction of independent company formation, shared infrastructure, parallel experimentation, and rapid kill decisions keep the velocity high.", icon: "Zap" },
      { title: "Technology Blueprinting", desc: "Research backed by interdisciplinary teams creating solid foundations. Before a single line of code is written or a single hire is made, the Studio produces a technology blueprint, a comprehensive analysis of the technical landscape, competitive dynamics, and feasibility thresholds that de-risk the entire venture creation process.", icon: "Workflow" },
      { title: "Fortune 500 Network", desc: "Direct access to industry giants and government agencies for co-creation. These are not advisory relationships, they are commercial partnerships with real procurement budgets, pilot programs, and distribution channels. Studio ventures get their first customers before they are formally incorporated.", icon: "Users" },
      { title: "IP Powerhouse", desc: "Shared resources and expertise that would otherwise be inaccessible. The Studio's IP portfolio, patents, trade secrets, proprietary datasets, is available to all ProtoCos and NewCos. This shared IP infrastructure gives Studio ventures an unfair advantage over independent startups starting from zero.", icon: "Shield" },
      { title: "ProtoCo Rapid Validation", desc: "Lightweight, resource-constrained experiments designed to validate or invalidate core assumptions rapidly. ProtoCos are disposable vehicles for learning, those that survive iteration graduate to NewCo; those that don't are cleanly wound down with lessons absorbed into the next cycle.", icon: "Activity" },
      { title: "Operational Infrastructure", desc: "The Studio provides legal, finance, HR, and governance infrastructure so the NewCo team can focus exclusively on building and selling. No distractions, no administrative overhead, just pure execution against the validated blueprint.", icon: "Globe" }
    ],
    unfairAdvantageTitle: "The Studio Unfair Advantage",
    unfairAdvantageImages: {
      left: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
      right: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80"
    },
    isForYouIf: [
      "You are a seasoned scientist or operational executive looking to fuel growth.",
      "You want to tackle complex issues affecting cities and industries.",
      "You believe in the power of shared resources and expertise.",
      "You want to build a market-defining company from Day 0.",
      "You have deep domain expertise but need the infrastructure to commercialize it.",
      "You want to leverage Fortune 500 and government partnerships from the start."
    ],
    faqs: [
      { q: "What is a ProtoCo?", a: "ProtoCos are embryonic versions of potential businesses with clear objectives and resources for development. They are lightweight, resource-constrained experiments designed to validate or invalidate core assumptions rapidly. ProtoCos that survive iteration graduate to the NewCo stage; those that don't are cleanly wound down with lessons absorbed into the next cycle." },
      { q: "How are partners involved?", a: "We work with industry leaders, governments, and entrepreneurs to address complex challenges. Partners provide more than advice, they offer commercial relationships, pilot programs, procurement budgets, and distribution channels. Fortune 500 partners serve as first customers before the NewCo is formally incorporated." },
      { q: "What is the end goal?", a: "To establish a lightning-speed company creation machine that thrives on speed and agility. The end goal is a spun-out, independent NewCo with its own governance, external investment, and strategic partnerships, a market-defining company that originated from the Studio but no longer depends on it." },
      { q: "How does the Studio Process work end-to-end?", a: "The Studio Process begins with a strategic kickoff defining clear success criteria. Research creates a technology blueprint. A cohort of vetted startup teams addresses identified needs through ProtoCos. Pilot Partnerships validate technologies and assess investment potential. Surviving ProtoCos become NewCos with capital and teams. Finally, successful NewCos spin out as independent entities. The entire cycle is designed to compress years of validation into months." },
      { q: "Who owns the IP?", a: "Under the Studio model, IP is initially held by the Studio and shared across ProtoCos and NewCos. Upon spinout, the NewCo receives a perpetual license to relevant IP and ownership of IP generated during the NewCo stage. This shared IP infrastructure gives Studio ventures an unfair advantage over independent startups." }
    ],
    trackRecord: [
      { label: "Companies Globally", value: "100+" },
      { label: "Success Rate", value: "75%" },
      { label: "Total Investment", value: "$1Bn" },
      { label: "Jobs Created", value: "20k" }
    ],
    ideas: [
      { partner: "Studio Lead", title: "CivicID v2", desc: "Next-gen zero-knowledge identity protocol for independent governance. Enables privacy-preserving citizen verification at national scale.", partnerImage: "https://i.pravatar.cc/100?img=15" },
      { partner: "Gov Partner", title: "TaxStack", desc: "Automated VAT collection and reconciliation for digital-first emerging economies. Reduces leakage by 60% in pilot markets.", partnerImage: "https://i.pravatar.cc/100?img=16" },
      { partner: "Enterprise Lead", title: "GridOS", desc: "AI-powered grid management platform for national utilities. Predictive load balancing reducing outages by 35%.", partnerImage: "https://i.pravatar.cc/100?img=23" },
      { partner: "Research Dir.", title: "MedForge", desc: "Decentralized pharmaceutical manufacturing platform for essential medicines. Certified GMP micro-factories deployable in 90 days.", partnerImage: "https://i.pravatar.cc/100?img=24" },
      { partner: "Venture Architect", title: "TradeRoute", desc: "Digital trade corridor platform connecting African SMEs to EU procurement pipelines. Compliance-as-a-service for cross-border B2B transactions.", partnerImage: "https://i.pravatar.cc/100?img=29" }
    ],
    testimonial: {
      quote: "The Studio model effectively mitigates early-stage risks. It's about becoming a high-velocity company creation machine.",
      author: "Hansa Scientist",
      role: "Lead Researcher",
      image: "https://i.pravatar.cc/100?img=3"
    },
    companies: [
      { name: "CivicID", desc: "the biometric framework for secure digital identity in emerging markets.", focus: "Identity", field: "Data & Int", funding: "$3M Seed", teamSize: "15-40", categories: "GovTech / Identity", location: "Cape Town" }
    ],
    icon: Target,
    color: "bg-[#00C3C3]",
    image: "/programs/inception-hero.png",
    link: "/programs/inception-studios"
  },
  {
    id: "quest-fellowship",
    title: "Quest Fellowship",
    tagline: "Frontier Science Bridge (feat. Queen's University).",
    desc: "A specialized partnership bridge between elite academic research and the xCelero engine. We help translate lab-stage breakthroughs into civilizational prototypes.",
    longDesc: "Quest Fellowship is our dedicated pathway for academic excellence, run in partnership with Queen's University and other Ivy-tier global institutions. We identify researchers and engineers whose work has civilizational implications and provide the operational armor, heavy deployment infrastructure, and commercialization expertise needed to survive the 'Valley of Death' between lab and market.",
    details: [
      { label: "Partner", value: "Queen's University" },
      { label: "Domain", value: "Deep Research" },
      { label: "Access", value: "Lab-to-Launch" },
      { label: "Tenure", value: "12-18 Months" }
    ],
    stats: [
      { label: "Active Fellows", value: "120+" },
      { label: "Lab Patents", value: "45 Translating" },
      { label: "University Partners", value: "Elite Tier" },
      { label: "Grant Pool", value: "$4.5M Allocated" }
    ],
    process: [
      {
        title: "Discovery Harvest",
        desc: "Reviewing research to identify 'Heavy' breakthroughs with mission alignment. We scan publications, patent filings, and lab outputs across partner universities to surface work that has civilizational implications, not incremental improvements.",
        extended: "We identify researchers whose work has civilizational implications. The Discovery Harvest is not a passive literature review, our team embeds with university technology transfer offices, attends closed-door faculty presentations, and maintains relationships with department chairs across 30+ institutions. We are looking for the work that hasn't been published yet."
      },
      {
        title: "Technical Drafting",
        desc: "Marrying operators with researchers to draft commercialization blueprints. We pair each Fellow with a seasoned operator who translates scientific potential into market reality.",
        extended: "We provide the infrastructure needed to translate science into physical prototypes. Technical Drafting produces a detailed commercialization blueprint: market sizing, regulatory pathway, IP strategy, capital requirements, and a 24-month milestone plan. The researcher provides the science; the operator provides the architecture. Together, they produce a document that investors can evaluate and the League can deploy against."
      },
      {
        title: "Sandbox Deployment",
        desc: "Relocating researchers to specific XEmbassies for rapid prototyping with access to heavy hardware labs, wet labs, and clean rooms: the infrastructure that academia cannot provide.",
        extended: "Access to heavy hardware labs helps survive the 'Valley of Death'. Fellows are physically relocated to XEmbassies equipped with domain-specific infrastructure: wet labs for biotech, clean rooms for semiconductors, machine shops for hardware. This is where the blueprint meets physical reality, and where most academic ventures fail without the League's support."
      },
      {
        title: "ProtoCo Genesis",
        desc: "Formal creation of a venture entity around the breakthrough. The researcher often serves as Chief Scientist, while the operator assumes the CEO role.",
        extended: "The researcher often serves as Chief Scientist in the new entity. ProtoCo Genesis is the formal incorporation of the venture, cap table, governance, IP transfer agreements, and initial funding from the League's grant pool. The Fellow transitions from academic to founder, supported by the full weight of the Hanseatic infrastructure."
      }
    ],
    howWeHelpIntro: "We bridge the gap between peer-reviewed science and commercial viability, pairing each Fellow with a seasoned operator, relocating you to XEmbassy labs with heavy infrastructure, and backing your breakthrough with $4.5M in grant capital. In 12-18 months you will...",
    features: [
      { title: "Frontier Science Bridge", desc: "Translation layer for breakthroughs requiring heavy deployment infrastructure. We bridge the gap between peer-reviewed science and commercial viability: the most dangerous gap in innovation, where 97% of breakthroughs die.", icon: "Globe" },
      { title: "Institutional Synergy", desc: "Academic rigor paired with the high-velocity execution of the Hansa engine. University partnerships provide the science; the League provides the operational armor. Neither can achieve civilizational outcomes alone.", icon: "Workflow" },
      { title: "IP Protection Armor", desc: "Expert legal protection to ensure breakthroughs benefit the inventors and the League. Our IP team includes former patent examiners and technology transfer specialists who structure filings for maximum commercial leverage while preserving academic publication rights.", icon: "Shield" },
      { title: "Director Access", desc: "Direct line to League Directors to resolve technical bottlenecks in real-time. Fellows are not routed through support tickets, they have a direct communication channel to senior leadership who can authorize resources, approve equipment purchases, and clear regulatory obstacles within 24 hours.", icon: "Target" },
      { title: "Heavy Lab Infrastructure", desc: "XEmbassies equipped with domain-specific infrastructure: wet labs for biotech, clean rooms for semiconductors, machine shops for hardware. This is where the blueprint meets physical reality: the infrastructure that academia cannot provide and most startups cannot afford.", icon: "Activity" },
      { title: "Operator Pairing", desc: "Each Fellow is paired with a seasoned operator who translates scientific potential into market reality. The researcher provides the science; the operator provides the architecture. Together, they produce a commercialization blueprint that investors can evaluate and the League can deploy against.", icon: "Users" }
    ],
    unfairAdvantageTitle: "The Quest Unfair Advantage",
    unfairAdvantageImages: {
      left: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80",
      right: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80"
    },
    isForYouIf: [
      "You are a researcher or engineer whose work has civilizational implications.",
      "You want to turn scientific papers into physical prototypes.",
      "You require 'Heavy' deployment infrastructure like wet labs or clean rooms.",
      "You want to survive the 'Valley of Death' between lab and market.",
      "You are ready to transition from academic to founder with operational support.",
      "You have a breakthrough that needs commercialization, not just publication."
    ],
    faqs: [
      { q: "How long is the fellowship?", a: "The Quest Fellowship typically lasts 12-18 months, depending on the complexity of the technology and the commercialization timeline. Extensions are granted based on milestone achievement, not time served." },
      { q: "What support do we provide?", a: "We provide operational armor and access to the full XHansa physical network, including XEmbassies with wet labs, clean rooms, machine shops, and testing facilities. Additionally, Fellows receive a dedicated operator partner, IP legal support, direct Director access, and initial grant funding from the $4.5M pool." },
      { q: "What is the focus area?", a: "We identify breakthroughs in deep research across all nine civilizational fields: Water Systems, Energy Systems, Food & Agriculture, Health & Mobility, Built Environment, Data & Intelligence, Logistics & Trade, Governance & Identity, and Education & Human Capital. We are field-agnostic but impact-specific: the work must have civilizational implications." },
      { q: "Do I have to leave my university position?", a: "No. The Fellowship is designed to accommodate active researchers. During Sandbox Deployment, you will spend significant time at an XEmbassy, but we work with your institution to arrange sabbaticals, joint appointments, or consulting arrangements. The goal is translation, not extraction." },
      { q: "What happens to my IP?", a: "IP generated during the Fellowship is governed by a structured agreement: the researcher retains academic publication rights, the League receives commercial licensing rights, and the resulting ProtoCo receives an exclusive license for commercial application. This tripartite structure has been vetted by 30+ university technology transfer offices." }
    ],
    trackRecord: [
      { label: "Active Fellows", value: "120+" },
      { label: "Lab Patents", value: "45" },
      { label: "Grant Pool", value: "$4.5M" },
      { label: "Partners", value: "Elite" }
    ],
    ideas: [
      { partner: "Chief Scientist", title: "NanoFilter", desc: "Carbon-nanotube based filtration systems for industrial wastewater recycling. 99.9% contaminant removal at 10x lower energy cost.", partnerImage: "https://i.pravatar.cc/100?img=17" },
      { partner: "Research Lead", title: "BioSustain", desc: "Engineered microbes for accelerated plastic degradation in oceanic environments. Field-tested across 3 marine zones.", partnerImage: "https://i.pravatar.cc/100?img=18" },
      { partner: "Lab Director", title: "QuantumSense", desc: "Room-temperature quantum sensors for mineral exploration. Replaces seismic surveys with atomic-scale precision.", partnerImage: "https://i.pravatar.cc/100?img=25" },
      { partner: "Fellow Lead", title: "HelioStore", desc: "Molten-salt thermal battery for 48-hour solar energy storage at $0.02/kWh. Enables baseload solar for off-grid industrial applications.", partnerImage: "https://i.pravatar.cc/100?img=26" },
      { partner: "IP Strategist", title: "GenomeVault", desc: "Independent genomic data infrastructure for African populations. Privacy-preserving federated learning for drug discovery without data export.", partnerImage: "https://i.pravatar.cc/100?img=30" }
    ],
    testimonial: {
      quote: "Quest Fellowship provides the crucible for technical translation. We turn the lab's potential into physical reality.",
      author: "Fellow Graduate",
      role: "Chief Scientist @ BioGen",
      image: "https://i.pravatar.cc/100?img=4"
    },
    companies: [
      { name: "BioGen", desc: "the microbial tech for sustainable bio-fertilizer production.", focus: "Biotech", field: "Food & Ag", funding: "$4M Series A", teamSize: "10-20", categories: "BioTech / Ag", location: "Kingston" }
    ],
    icon: Search,
    color: "bg-[#6366F1]",
    image: "/programs/quest-hero.png",
    link: "/programs/quest-fellowship"
  }
];
