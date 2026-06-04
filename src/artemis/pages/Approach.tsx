"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Plus, Minus, ArrowRight, ChevronDown, Building2, Rocket, Coins, Users } from "lucide-react";
import { Link } from "@/artemis/router";
import { ReviewSection } from "@/artemis/components/ReviewSection";

/* ── Hero metric cards (right column) ── */
const heroMetrics = [
  { value: "500+", label: "Companies Backed" },
  { value: "3-5 hrs", label: "Per Deep Diligence" },
  { value: "$1-7M", label: "Initial Investment Range" },
];

/* ── The 4 Engines ── */
const engines = [
  {
    num: "01",
    title: "Infrastructure",
    icon: Building2,
    desc: "A distributed constellation of 190 XHansa Hubs spanning every African nation and 19 global cities. M1 Cores, XEmbassies, and living labs for real-world testing: the physical and digital operating system for civilization-building.",
    link: "/platform",
  },
  {
    num: "02",
    title: "Ventures",
    icon: Rocket,
    desc: "Convening industry, government, and entrepreneurs to run real-world pilots. Structured commercialization programs, from the Quest Fellowship to industry sprints, transforming ideas into tangible change at civilizational scale.",
    link: "/programs",
  },
  {
    num: "03",
    title: "Capital",
    icon: Coins,
    desc: "Mobilizing capital through dedicated funds and SPVs. Blending grants, risk capital, and project finance to ensure transformative tech scales. Solidarity pricing so founders in early-stage markets access the same quality at a fraction of Silicon Valley costs.",
    link: "/capital",
  },
  {
    num: "04",
    title: "Community",
    icon: Users,
    desc: "The XCitizens network, operators, founders, investors, and mentors creating compound network effects across the Route. Every hub, every cohort, every deal strengthens the connective tissue that turns individual efforts into collective momentum.",
    link: "/join",
  },
];

/* ── The 13 Critical Domains ── */
const criticalDomains = [
  { name: "Energy (Generation & Transmission)", desc: "Microgrids, non-lithium storage, low-temp geothermal, small modular nuclear / fusion pathways." },
  { name: "Water & Aquatic Systems", desc: "Distributed desalination, atmospheric H₂O harvesting, aquaculture optimization, open-source water grids." },
  { name: "Food & Algorithmic Agriculture", desc: "Climate resilient crop genetics, vertical protein farming, algorithmic harvest optimization." },
  { name: "Materials & Computation", desc: "Ethical refining architectures, bio-plastics, mycelium composites, semi-conductor material independence." },
  { name: "Mobility & Logistics", desc: "Electric mass transit retrofits, heavy-lift drone logistics for remote delivery, autonomous port management." },
  { name: "Cognitive Systems & Data Independence", desc: "Edge AI, decentralized identity, indigenous language LLMs, private locally-controlled clouds." },
  { name: "Built Environments & Circularity", desc: "Algorithmic urban planning, cooling architectures, waste-to-energy syndicates." },
  { name: "Earth Systems & Biometrics", desc: "Real-time planetary monitoring, early warning sensors, programmable conservation efforts." },
  { name: "Space & Deep Sea Tech", desc: "Micro-satellite constellations for climate tracking, deep sea non-extractive resource mapping." },
  { name: "Industrial Biotech", desc: "Programmable biology, synthetic enzymes, and microbial factories." },
  { name: "Hypersonics", desc: "Next-generation high-speed atmospheric transit." },
  { name: "Quantum Technologies", desc: "Quantum sensing and unbreakable independent encryption architectures." },
  { name: "Semiconductors", desc: "Independent fabrication capabilities and novel chip design." },
];

/* ── Traits ── */
const traits = [
  {
    title: "Believe in the art of the pick",
    desc: "There's a popular narrative that a startup's first few years are for moving fast and finding ways out of tough problems later. We're firm believers in taking beginnings seriously, in slowing down to speed up. A high degree of startup mortality is baked in at the beginning, so being a good picker of technology, market, and architecture is vastly underrated.",
    image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Embrace their extremes",
    desc: "We don't back well-rounded founders. We seek people who have one or two outlier abilities, areas where they have a shot at being the best in the world. This is what allows them to see opportunities others miss, solve problems others can't crack, and work with a drive that others don't match.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Go unreasonably deep",
    desc: "There's a particular kind of intensity we look for, a relentless drive that goes far beyond surface insights or hard work. It's curiosity that crosses over into obsession but reads more \"learn-it-all\" than \"know-it-all.\" It means full immersion in materials science when starting an energy company or working on the factory floor to live the pain of industrial bottlenecks.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80"
  }
];

const howWeWork = [
  {
    step: "01",
    title: "Deep Diligence",
    desc: "We spend three to five hours with every team before making a decision. Not slideshows, real conversations about your core technical insight, the specific bottleneck you're addressing, and the architecture you've chosen to solve it."
  },
  {
    step: "02",
    title: "Conviction-Led Investment",
    desc: "We invest based on conviction in the founding team and their thesis, not momentum or social proof. Our decisions are made by the people who'll work closest with you, no investment committees, no off-site partners weighing in."
  },
  {
    step: "03",
    title: "Hands-On Foundation Building",
    desc: "After investing, we embed. From your first hire to your first revenue milestone, we operate alongside you, not as consultants, but as co-builders who've been in the trenches of early-stage company construction before."
  }
];

const faqs = [
  { category: "Timing", q: "Is it ever too early to approach xCelero about investing?", a: "No, it's never too early to reach out. We don't see divisions between angel, pre-seed and seed, we're interested across the board." },
  { category: "Timing", q: "What if I'm still employed elsewhere?", a: "Absolutely reach out. We regularly meet with future proto-citizens who are in exactly this position, months away from making the official leap." },
  { category: "Timing", q: "What if I've already raised from angels or a pre-seed fund, is it too late?", a: "Of course not. While we're usually the first money in, we've worked with a number of teams that raised a small round before coming to us." },
  { category: "Timing", q: "Do I need customers and revenue?", a: "Nope. Many of our 500+ companies came to us when they were a couple of people with an idea and a lab." },
  { category: "Timing", q: "I'm raising my Series B or Series C, should I contact you?", a: "Nope. We're explicitly focused on the foundation phase." },
  { category: "Decision making", q: "What does xCelero look for in a thesis?", a: "Above all, we look for compelling and contrarian insight into how infrastructure works." },
  { category: "Decision making", q: "How do you weigh different criteria in your decision-making process?", a: "The biggest factor in our decision-making is always the founding team. How innovative, resourceful and resilient are you?" },
  { category: "Where we invest", q: "Does xCelero only invest in particular areas or industries?", a: "We focus heavily on the 13 Critical Domains, from energy generation and biotech to cognitive systems and hypersonics." },
  { category: "Where we invest", q: "Do you invest in companies located outside of major tech hubs?", a: "Yes! Our flexible constellation spans 190 XHansa Hubs across the globe." },
  { category: "Where we invest", q: "Do you invest outside of the United States?", a: "We tend to focus on companies based in the U.S. or allied zones." },
  { category: "Process", q: "What does your investment process look like?", a: "Our process is rigorous but fast. We like to spend at least three to five hours on any company before we make a final decision." },
  { category: "Process", q: "What's the best way to get on your radar?", a: "A direct referral from someone within the XEmbassy network works best, but cold outreach with a strong technical whitepaper is highly welcome." },
  { category: "Process", q: "How should I prep for your partner meeting?", a: "We recommend focusing on your core technical insight, the specific civilizational bottleneck you are addressing." },
  { category: "Terms", q: "How much do you usually invest in a new company?", a: "Our initial investments typically range from $1 million to $7 million." },
  { category: "Terms", q: "Do you have strict ownership requirements?", a: "Unlike some traditional funds that require 20 to 25% ownership, we don't." },
  { category: "Terms", q: "Will xCelero only invest if you can lead the round?", a: "No. We don't care about terms like lead, co-lead or follow." }
];

const categories = ["Timing", "Decision making", "Where we invest", "Process", "Terms"];

/* ══════════════════════════════════════════════════════════════════════════
   APPROACH PAGE
   ══════════════════════════════════════════════════════════════════════════ */
export function Approach() {
  return (
    <div className="bg-white text-[#111111]">
      <HeroSection />
      <ThreeEnginesSection />
      <WhoWeBackSection />
      <HowWeWorkSection />
      <CriticalDomainsSection />
      <FaqSection />
      <ReviewSection title="Hard-won wisdom from xCelero founders:" />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   HERO, Light bg, 7+5 grid (NEWLAB style, matching Programs)
   ══════════════════════════════════════════════════════════════════════════ */
function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="bg-[#FAFAFA] py-16 md:py-24 px-6 md:px-12 lg:px-20 border-b border-[#111111]/10"
    >
      <div className="w-full max-w-[1400px] mx-auto grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left: label + heading + para */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:col-span-7"
        >
          <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#FF4D00] mb-6 block">
            Our Approach
          </span>

          <h1 className="text-[36px] sm:text-[48px] md:text-[64px] lg:text-[80px] font-display font-medium tracking-[-0.03em] leading-[0.9] mb-6">
            You&apos;re not for everyone.
            <br />
            <span className="text-[#111111]/40">Neither are we.</span>
          </h1>

          <p className="text-[16px] md:text-[18px] leading-[1.7] text-[#111111]/60 font-medium max-w-lg">
            We back founders who go unreasonably deep to get their beginnings right, and we provide the infrastructure, ventures, capital, and community to make it work.
          </p>
        </motion.div>

        {/* Right: metric cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          className="lg:col-span-5 flex flex-col"
        >
          {heroMetrics.map((metric, i) => (
            <div
              key={i}
              className={`py-6 ${
                i > 0 ? "border-t border-[#111111]/10" : ""
              }`}
            >
              <div className="text-[40px] sm:text-[48px] md:text-[56px] font-display font-medium tracking-[-0.03em] leading-[1] mb-2">
                {metric.value}
              </div>
              <div className="text-[13px] md:text-[15px] text-[#111111]/50 font-medium leading-[1.5]">
                {metric.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ── Engine taglines ── */
const engineTaglines: Record<string, string> = {
  Infrastructure: "The physical OS",
  Ventures: "Commercialization at scale",
  Capital: "Patient, blended, non-dilutive",
  Community: "Compound network effects",
};

/* ── Connection pairs (each engine connects to every other) ── */
const connections: [number, number][] = [
  [0, 1], [0, 2], [0, 3],
  [1, 2], [1, 3],
  [2, 3],
];

/* ══════════════════════════════════════════════════════════════════════════
   4 ENGINES, Interactive Node Diagram
   ══════════════════════════════════════════════════════════════════════════ */
function ThreeEnginesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState<number | null>(null);

  /* Diamond positions: top, right, bottom, left (as % of container) */
  const nodePositions = [
    { top: "0%", left: "50%" },   // Infrastructure (top)
    { top: "50%", left: "100%" },  // Ventures (right)
    { top: "100%", left: "50%" },  // Capital (bottom)
    { top: "50%", left: "0%" },    // Community (left)
  ];

  const activeEngine = active !== null ? engines[active] : null;

  return (
    <section
      ref={ref}
      className="py-16 md:py-24 px-6 md:px-12 lg:px-20 border-b border-[#111111]/10"
    >
      <div className="w-full max-w-[1400px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl mb-16 md:mb-24"
        >
          <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#FF4D00] mb-6 block">
            The 4 Engines
          </span>
          <h2 className="text-[32px] md:text-[48px] lg:text-[60px] font-display font-medium tracking-tight leading-[1.05] mb-6">
            Four engines, <span className="text-[#111111]/40">one machine.</span>
          </h2>
          <p className="text-[17px] md:text-[19px] text-[#111111]/50 font-medium leading-relaxed">
            xCelero operates through four integrated engines, Infrastructure, Ventures, Capital, and Community, each reinforcing the others to unblock commercialization at civilizational scale.
          </p>
        </motion.div>

        {/* Interactive Diagram */}
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16">
          {/* Diagram container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="w-full lg:w-1/2 flex justify-center"
          >
            {/* Desktop: Diamond layout */}
            <div className="hidden md:block relative w-full max-w-[480px] aspect-square">
              {/* Connection lines */}
              {connections.map(([from, to], i) => {
                const fromPos = nodePositions[from];
                const toPos = nodePositions[to];
                const isActiveLine = active !== null && (from === active || to === active);
                return (
                  <div
                    key={i}
                    className="absolute h-px transition-all duration-500"
                    style={{
                      left: fromPos.left,
                      top: fromPos.top,
                      width: "0px",
                      transformOrigin: "0 0",
                      backgroundColor: isActiveLine ? "#FF4D00" : "rgba(17,17,17,0.1)",
                      boxShadow: isActiveLine ? "0 0 8px rgba(255,77,0,0.4)" : "none",
                      /* We use a CSS trick: position at from, rotate toward to, width = distance */
                    }}
                    ref={(el) => {
                      if (!el) return;
                      const container = el.parentElement;
                      if (!container) return;
                      const w = container.offsetWidth;
                      const h = container.offsetHeight;
                      const fx = parseFloat(fromPos.left) / 100 * w;
                      const fy = parseFloat(fromPos.top) / 100 * h;
                      const tx = parseFloat(toPos.left) / 100 * w;
                      const ty = parseFloat(toPos.top) / 100 * h;
                      const dx = tx - fx;
                      const dy = ty - fy;
                      const length = Math.sqrt(dx * dx + dy * dy);
                      const angle = Math.atan2(dy, dx) * 180 / Math.PI;
                      el.style.left = `${fx}px`;
                      el.style.top = `${fy}px`;
                      el.style.width = `${length}px`;
                      el.style.transform = `rotate(${angle}deg)`;
                    }}
                  />
                );
              })}

              {/* Nodes */}
              {engines.map((engine, i) => {
                const Icon = engine.icon;
                const pos = nodePositions[i];
                const isActive = active === i;
                return (
                  <motion.button
                    key={i}
                    suppressHydrationWarning
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 + i * 0.1, ease: "easeOut" }}
                    onClick={() => setActive(active === i ? null : i)}
                    onMouseEnter={() => setActive(i)}
                    className={`absolute z-10 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2 cursor-pointer group transition-all duration-300`}
                    style={{ top: pos.top, left: pos.left }}
                  >
                    <div
                      className={`w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                        isActive
                          ? "border-[#FF4D00] bg-[#FF4D00]/10 shadow-lg shadow-[#FF4D00]/20"
                          : "border-[#111111]/15 bg-white group-hover:border-[#FF4D00]/50 group-hover:bg-[#FF4D00]/5"
                      }`}
                    >
                      <Icon
                        className={`w-7 h-7 md:w-8 md:h-8 transition-colors duration-300 ${
                          isActive ? "text-[#FF4D00]" : "text-[#111111]/40 group-hover:text-[#FF4D00]"
                        }`}
                        strokeWidth={1.5}
                      />
                    </div>
                    <div className="text-center">
                      <div className={`text-[13px] md:text-[15px] font-display font-medium transition-colors duration-300 ${
                        isActive ? "text-[#FF4D00]" : "text-[#111111]"
                      }`}>
                        {engine.title}
                      </div>
                      <div className="text-[10px] md:text-[11px] font-mono tracking-wider uppercase text-[#111111]/40 mt-0.5">
                        {engineTaglines[engine.title]}
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Mobile: Vertical stack */}
            <div className="md:hidden w-full flex flex-col gap-4">
              {engines.map((engine, i) => {
                const Icon = engine.icon;
                const isActive = active === i;
                return (
                  <motion.button
                    key={i}
                    suppressHydrationWarning
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                    onClick={() => setActive(active === i ? null : i)}
                    className={`flex items-center gap-4 p-4 border transition-all duration-300 text-left w-full ${
                      isActive
                        ? "border-[#FF4D00] bg-[#FF4D00]/5"
                        : "border-[#111111]/10 bg-white hover:border-[#FF4D00]/30"
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center border-2 shrink-0 transition-all duration-300 ${
                        isActive
                          ? "border-[#FF4D00] bg-[#FF4D00]/10"
                          : "border-[#111111]/15 bg-white"
                      }`}
                    >
                      <Icon
                        className={`w-5 h-5 transition-colors duration-300 ${
                          isActive ? "text-[#FF4D00]" : "text-[#111111]/40"
                        }`}
                        strokeWidth={1.5}
                      />
                    </div>
                    <div>
                      <div className={`text-[15px] font-display font-medium transition-colors ${
                        isActive ? "text-[#FF4D00]" : "text-[#111111]"
                      }`}>
                        {engine.title}
                      </div>
                      <div className="text-[10px] font-mono tracking-wider uppercase text-[#111111]/40">
                        {engineTaglines[engine.title]}
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* Description panel */}
          <div className="w-full lg:w-1/2 min-h-[280px]">
            <AnimatePresence mode="wait">
              {activeEngine ? (
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="border-l-4 border-[#FF4D00] pl-8 py-2"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-[#FF4D00]/10 flex items-center justify-center">
                      <activeEngine.icon className="w-5 h-5 text-[#FF4D00]" strokeWidth={1.5} />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono font-bold text-[#FF4D00]">Engine {activeEngine.num}</span>
                      <h3 className="text-[28px] md:text-[36px] font-display font-medium tracking-tight leading-[1.1]">
                        {activeEngine.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-[16px] md:text-[18px] text-[#111111]/60 font-medium leading-[1.7] mb-8">
                    {activeEngine.desc}
                  </p>

                  <Link
                    to={activeEngine.link}
                    className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-[#FF4D00] hover:text-[#111111] transition-colors group/link"
                  >
                    Explore {activeEngine.title}
                    <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center justify-center h-full min-h-[280px] text-[#111111]/25"
                >
                  <div className="text-center">
                    <div className="text-[16px] font-display font-medium mb-2">Select an engine</div>
                    <div className="text-[13px] font-mono tracking-wider">Hover or tap a node to explore</div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   WHO WE BACK, Split Screen Layout
   ══════════════════════════════════════════════════════════════════════════ */
function WhoWeBackSection() {
  const [activeTrait, setActiveTrait] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="py-16 md:py-24 px-6 md:px-12 lg:px-20 border-b border-[#111111]/10"
    >
      <div className="w-full max-w-[1400px] mx-auto">
        {/* Centered intro */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-16 md:mb-24"
        >
          <div className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#FF4D00] mb-6">
            Who We Back
          </div>
          <h2 className="text-[32px] md:text-[48px] lg:text-[60px] font-display font-medium tracking-tight leading-[1.05] mb-6">
            The best founders have a few things <span className="text-[#111111]/40">in common</span>.
          </h2>
          <p className="text-[17px] md:text-[19px] text-[#111111]/50 font-medium leading-relaxed">
            We don&apos;t look for well-rounded resumes. We look for people with one or two outlier abilities and the conviction to go all the way.
          </p>
        </motion.div>

        {/* Split Screen Layout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="grid lg:grid-cols-12 gap-12 lg:gap-16"
        >
          {/* Left Column, Number Indicators */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32 flex lg:flex-col flex-row gap-4 lg:gap-0 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 scrollbar-hide">
              {traits.map((trait, i) => (
                <button
                  key={i}
                  suppressHydrationWarning
                  onClick={() => setActiveTrait(i)}
                  className={`flex items-center lg:items-center gap-4 lg:gap-6 shrink-0 lg:shrink group transition-all duration-300 cursor-pointer ${
                    i > 0 ? "lg:mt-2" : ""
                  }`}
                >
                  {/* Orange vertical bar indicator */}
                  <div className="relative flex items-center">
                    <div
                      className={`w-1 rounded-full transition-all duration-300 ${
                        activeTrait === i
                          ? "h-[60px] md:h-[80px] bg-[#FF4D00]"
                          : "h-[60px] md:h-[80px] bg-[#111111]/10 group-hover:bg-[#111111]/20"
                      }`}
                    />
                  </div>
                  {/* Number */}
                  <span
                    className={`text-[60px] md:text-[80px] lg:text-[120px] font-display font-medium leading-none transition-all duration-300 ${
                      activeTrait === i
                        ? "text-[#111111]"
                        : "text-[#111111]/15 group-hover:text-[#111111]/30"
                    }`}
                  >
                    0{i + 1}
                  </span>
                  {/* Title, only visible on mobile/tablet inline */}
                  <span
                    className={`lg:hidden text-[14px] md:text-[16px] font-display font-medium transition-colors whitespace-nowrap ${
                      activeTrait === i
                        ? "text-[#111111]"
                        : "text-[#111111]/40"
                    }`}
                  >
                    {trait.title}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column, Active Trait Content */}
          <div className="lg:col-span-8 min-h-[320px] md:min-h-[400px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTrait}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="grid md:grid-cols-2 gap-8 md:gap-12 items-start"
              >
                {/* Text content */}
                <div className="flex flex-col justify-center">
                  <h3 className="text-[28px] md:text-[36px] lg:text-[44px] font-display font-medium tracking-tight leading-[1.1] mb-6 text-[#111111]">
                    {traits[activeTrait].title}
                  </h3>
                  <p className="text-[17px] md:text-[19px] text-[#111111]/60 font-medium leading-[1.7]">
                    {traits[activeTrait].desc}
                  </p>
                  {activeTrait === traits.length - 1 && (
                    <div className="mt-8 text-[#FF4D00]">
                      <svg width="26" height="53" viewBox="0 0 26 53" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.02421 0.5L0 14.1035H8.64923V52.5H26V0.5H3.02421Z" fill="currentColor"></path>
                      </svg>
                    </div>
                  )}
                </div>
                {/* Image */}
                <div className="relative overflow-hidden rounded-sm">
                  <img
                    src={traits[activeTrait].image}
                    alt={traits[activeTrait].title}
                    className="w-full aspect-[3/4] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/10 to-transparent" />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   HOW WE WORK, Card Carousel Layout
   ══════════════════════════════════════════════════════════════════════════ */
function HowWeWorkSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="py-16 md:py-24 px-6 md:px-12 lg:px-20 bg-[#FAFAFA] border-b border-[#111111]/10"
    >
      <div className="w-full max-w-[1400px] mx-auto">
        {/* Centered header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-16 md:mb-24"
        >
          <div className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#FF4D00] mb-6">
            How We Work
          </div>
          <h2 className="text-[32px] md:text-[48px] lg:text-[60px] font-display font-medium tracking-tight leading-[1.05] mb-6">
            Rigorous, fast, <span className="text-[#111111]/40">and on your side</span>.
          </h2>
          <p className="text-[17px] md:text-[19px] text-[#111111]/50 font-medium leading-relaxed">
            Our process is designed to respect your time and get to conviction quickly, because the best founders don&apos;t wait.
          </p>
        </motion.div>

        {/* Connector line with dots */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="max-w-6xl mx-auto mb-0"
        >
          <div className="hidden md:flex items-center px-8 md:px-12 relative">
            {/* Horizontal line */}
            <div className="absolute top-1/2 left-[calc(16.66%)] right-[calc(16.66%)] h-px bg-[#111111]/10 -translate-y-1/2" />
            {/* Dots at each card position */}
            {howWeWork.map((_, i) => (
              <div
                key={i}
                className="flex-1 flex justify-center relative z-10"
              >
                <div className="w-3 h-3 rounded-full bg-[#FF4D00] border-2 border-white shadow-sm" />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Card carousel */}
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {howWeWork.map((step, i) => (
              <HowWeWorkCard key={i} step={step} index={i} />
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="text-center mt-16 md:mt-24"
        >
          <Link
            to="/programs"
            className="group inline-flex items-center gap-6 px-10 py-5 bg-[#111111] text-white text-[12px] font-bold tracking-[0.2em] uppercase hover:bg-[#FF4D00] transition-all"
          >
            Start an Application <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function HowWeWorkCard({ step, index }: { step: typeof howWeWork[number]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: "easeOut" }}
      className="group"
    >
      <div className="border-l-4 border-[#FF4D00] pt-8 pb-8 px-6 md:px-8 bg-white shadow-sm hover:shadow-md transition-all duration-300 min-h-[280px] flex flex-col justify-between hover:-translate-y-1">
        {/* Top content */}
        <div>
          <div className="text-[48px] md:text-[56px] font-display font-medium tracking-[-0.03em] leading-none text-[#FF4D00] mb-6">
            {step.step}
          </div>
          <h3 className="text-[22px] md:text-[26px] font-display font-medium tracking-tight leading-[1.15] mb-5 text-[#111111]">
            {step.title}
          </h3>
          <p className="text-[15px] md:text-[16px] text-[#111111]/55 font-medium leading-[1.7]">
            {step.desc}
          </p>
        </div>

        {/* Bottom bar */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#111111]/5">
          <span className="text-[11px] font-mono font-bold tracking-[0.2em] uppercase text-[#111111]/30">
            Step {step.step}
          </span>
          <span className="w-8 h-8 rounded-full border border-[#111111]/10 flex items-center justify-center text-[#111111]/30 group-hover:border-[#FF4D00] group-hover:text-[#FF4D00] transition-all">
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   13 CRITICAL DOMAINS, Moved from Infrastructure page
   ══════════════════════════════════════════════════════════════════════════ */
function CriticalDomainsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="py-16 md:py-24 px-6 md:px-12 lg:px-20 border-b border-[#111111]/10"
    >
      <div className="w-full max-w-[1400px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl mb-16 md:mb-24"
        >
          <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#FF4D00] mb-6 block">
            The 13 Critical Domains
          </span>
          <h2 className="text-[32px] md:text-[48px] lg:text-[60px] font-display font-medium tracking-tight leading-[1.05] mb-6">
            Where we focus <span className="text-[#111111]/40">our conviction.</span>
          </h2>
          <p className="text-[17px] md:text-[19px] text-[#111111]/50 font-medium leading-relaxed">
            These are the domains where self-reliance is technological: the ability to generate electricity, secure food, purify water, and defend networks on one&apos;s own terms.
          </p>
        </motion.div>

        {/* Domain grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10">
          {criticalDomains.map((field, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.05, ease: "easeOut" }}
              className="border-t border-[#111111]/10 pt-6 group"
            >
              <div className="text-[11px] font-mono font-bold text-[#FF4D00] mb-4">{(i + 1).toString().padStart(2, '0')}</div>
              <h3 className="text-[17px] md:text-[18px] font-bold tracking-tight mb-3 text-[#111111] group-hover:text-[#FF4D00] transition-colors">{field.name}</h3>
              <p className="text-[13px] md:text-[14px] leading-[1.6] text-[#111111]/55 font-medium">{field.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   FAQ, Centered layout with horizontal category tabs
   ══════════════════════════════════════════════════════════════════════════ */
function FaqSection() {
  const [activeCategory, setActiveCategory] = useState("Timing");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const filteredFaqs = faqs.filter(f => f.category === activeCategory);

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="py-16 md:py-24 px-6 md:px-12 lg:px-20 border-b border-[#111111]/10"
    >
      <div className="w-full max-w-[1400px] mx-auto">
        {/* Centered header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
        >
          <div className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#FF4D00] mb-6">
            Frequently Asked
          </div>
          <h2 className="text-[32px] md:text-[48px] lg:text-[56px] font-display font-medium tracking-tight leading-[1.05]">
            If this sounds like you, you likely have <span className="text-[#111111]/40">these questions</span>.
          </h2>
        </motion.div>

        {/* Desktop category tabs, horizontal, centered */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="hidden md:flex justify-center gap-2 mb-16"
        >
          {categories.map(c => (
            <button
              key={c}
              suppressHydrationWarning
              onClick={() => { setActiveCategory(c); setOpenFaq(null); }}
              className={`px-6 py-3 text-[11px] font-mono font-bold tracking-[0.15em] uppercase transition-all border ${
                activeCategory === c
                  ? "bg-[#111111] text-white border-[#111111]"
                  : "bg-white text-[#111111]/40 border-[#111111]/10 hover:border-[#111111]/30 hover:text-[#111111]/70"
              }`}
            >
              {c}
            </button>
          ))}
        </motion.div>

        {/* Mobile category dropdown */}
        <div className="md:hidden relative mb-10">
          <button
            suppressHydrationWarning
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-full flex items-center justify-between border border-[#111111]/10 px-6 py-4 bg-white"
          >
            <span className="text-[12px] font-mono font-bold tracking-[0.15em] uppercase">
              {activeCategory}
            </span>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${mobileMenuOpen ? "rotate-180" : ""}`}
            />
          </button>
          {mobileMenuOpen && (
            <div className="absolute top-full left-0 right-0 bg-white border border-[#111111]/10 border-t-0 shadow-lg z-50 flex flex-col">
              {categories.map(c => (
                <button
                  key={c}
                  suppressHydrationWarning
                  onClick={() => {
                    setActiveCategory(c);
                    setOpenFaq(null);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left px-6 py-4 text-[12px] font-mono font-bold tracking-[0.15em] uppercase border-b border-[#111111]/5 last:border-0 transition-colors ${
                    activeCategory === c
                      ? "bg-[#FAFAFA] text-[#FF4D00]"
                      : "text-[#111111]/50 hover:text-[#111111]/80"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* FAQ items, centered */}
        <div className="max-w-4xl mx-auto">
          {filteredFaqs.map((faq, index) => (
            <FaqItem
              key={index}
              faq={faq}
              index={index}
              isOpen={openFaq === index}
              onToggle={() => setOpenFaq(openFaq === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqItem({
  faq,
  index,
  isOpen,
  onToggle,
}: {
  faq: { q: string; a: string };
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 15 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.06, ease: "easeOut" }}
      className="border-b border-[#111111]/10"
    >
      <button
        suppressHydrationWarning
        onClick={onToggle}
        className="w-full py-6 md:py-8 flex items-start justify-between text-left group gap-6"
      >
        <span className="text-[18px] md:text-[22px] font-display font-medium tracking-tight leading-[1.3] group-hover:text-[#FF4D00] transition-colors">
          {faq.q}
        </span>
        <span
          className={`shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all mt-0.5 ${
            isOpen
              ? "bg-[#FF4D00] text-white border-[#FF4D00]"
              : "border-[#111111]/10 group-hover:border-[#FF4D00] group-hover:text-[#FF4D00]"
          }`}
        >
          {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="pb-6 md:pb-8 text-[16px] md:text-[17px] text-[#111111]/55 font-medium leading-[1.7] max-w-2xl">
          {faq.a}
        </p>
      </div>
    </motion.div>
  );
}
