"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "@/artemis/router";
import { ArrowRight } from "lucide-react";
import { programsData } from "@/artemis/data/programs";
import { ReviewSection } from "@/artemis/components/ReviewSection";

/* ── Hero metric cards (right column) ── */
const heroMetrics = [
  { value: "4", label: "Active Programs" },
  { value: "1,000+", label: "Operators Deployed" },
  { value: "9", label: "Civilizational Fields" },
];

/* ── Program Impact metrics ── */
const impactMetrics = [
  {
    value: "127",
    label: "Companies Launched",
    description: "Ventures that moved from program to active operations with revenue or pilot customers.",
  },
  {
    value: "$340M",
    label: "Follow-on Capital Raised",
    description: "Total capital raised by program alumni after completing xCelero programs.",
  },
  {
    value: "4,200+",
    label: "Jobs Created",
    description: "Direct employment generated across portfolio companies in 39 countries.",
  },
  {
    value: "75%",
    label: "Survival Rate",
    description: "Program graduates still operating after 3 years: 3x the regional average.",
  },
  {
    value: "39",
    label: "Countries Reached",
    description: "Founders and operators deployed across the entire Route network.",
  },
  {
    value: "$620K",
    label: "Max Funding Package",
    description: "Largest single-company funding package through the xCelero Accelerator.",
  },
];

/* ══════════════════════════════════════════════════════════════════════════
   PROGRAMS PAGE
   ══════════════════════════════════════════════════════════════════════════ */
export function Programs() {
  return (
    <div className="bg-white text-[#111111]">
      <HeroSection />
      <ProgramShowcase />
      <ProgramImpact />
      <CTASection />
      <ReviewSection title="Tactical 0-1 breakdowns to help you assemble a better timeline" />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   HERO, Light bg, left heading + right stat cards (KEPT AS-IS)
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
        {/* Left: label + heading + paragraph */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:col-span-7"
        >
          <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#FF4D00] mb-6 block">
            Programs
          </span>

          <h1 className="text-[36px] sm:text-[48px] md:text-[64px] lg:text-[80px] font-display font-medium tracking-[-0.03em] leading-[0.9] mb-6">
            The engine of
            <br />
            transformation
          </h1>

          <p className="text-[16px] md:text-[18px] leading-[1.7] text-[#111111]/60 font-medium max-w-lg">
            We operate as a Civilizational Venturing Platform, not a fund. Our
            programs are high-intensity pathways designed for different stages of
            the beginnings of progress.
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

/* ══════════════════════════════════════════════════════════════════════════
   PROGRAM SHOWCASE, BENTO GRID LAYOUT
   ══════════════════════════════════════════════════════════════════════════ */
function ProgramShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section
      ref={ref}
      className="py-16 md:py-24 px-6 md:px-12 lg:px-20"
    >
      <div className="w-full max-w-[1400px] mx-auto">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12 md:mb-16"
        >
          <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#FF4D00]">
            The Strata
          </span>
        </motion.div>

        {/* Bento grid */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
          {programsData.map((program, idx) => (
            <BentoCard
              key={program.id}
              program={program}
              index={idx}
              isInView={isInView}
              isFeatured={idx === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Bento Card, full background image with dark overlay ── */
function BentoCard({
  program,
  index,
  isInView,
  isFeatured,
}: {
  program: (typeof programsData)[number];
  index: number;
  isInView: boolean;
  isFeatured: boolean;
}) {
  const Icon = program.icon;
  const stats = program.stats?.slice(0, 3) ?? program.details.slice(0, 3);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`${isFeatured ? "md:col-span-2" : ""}`}
    >
      <Link
        to={`/programs/${program.id}`}
        className="group relative block w-full overflow-hidden rounded-lg"
      >
        {/* Card container with aspect ratio */}
        <div
          className={`relative w-full ${
            isFeatured ? "aspect-[16/9]" : "aspect-[4/3]"
          }`}
        >
          {/* Background image */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
            style={{ backgroundImage: `url(${program.image})` }}
          />

          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 transition-opacity duration-500 group-hover:opacity-80" />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-8">
            {/* Top: Icon in colored circle */}
            <div className="flex items-start justify-between">
              <div
                className={`w-12 h-12 md:w-14 md:h-14 rounded-full ${program.color} flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform duration-300`}
              >
                <Icon className="w-5 h-5 md:w-6 md:h-6" />
              </div>

              {/* Step number */}
              <span className="text-white/20 text-[10px] font-mono font-bold tracking-widest">
                0{index + 1}
              </span>
            </div>

            {/* Bottom: Title, tagline, stats, explore */}
            <div>
              {/* Title */}
              <h3
                className={`font-display font-medium tracking-[-0.02em] leading-[1.1] text-white mb-2 ${
                  isFeatured
                    ? "text-[28px] md:text-[40px] lg:text-[48px]"
                    : "text-[22px] md:text-[32px]"
                }`}
              >
                {program.title}
              </h3>

              {/* Tagline */}
              <p className="text-white/50 text-[13px] md:text-[15px] font-medium mb-5 max-w-md">
                {program.tagline}
              </p>

              {/* Stats pills */}
              <div className="flex flex-wrap gap-2 mb-5">
                {stats.map((stat, i) => (
                  <span
                    key={i}
                    className="bg-white/10 backdrop-blur-sm px-3 py-1 text-[10px] font-mono tracking-widest uppercase text-white/70"
                  >
                    {stat.value}
                  </span>
                ))}
              </div>

              {/* Explore link */}
              <div className="flex items-center gap-2 text-white/60 group-hover:text-white transition-colors duration-300">
                <span className="text-[11px] font-mono font-bold tracking-widest uppercase">
                  Explore
                </span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   PROGRAM IMPACT, Key outcomes and metrics
   ══════════════════════════════════════════════════════════════════════════ */
function ProgramImpact() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      className="py-16 md:py-24 px-6 md:px-12 lg:px-20 bg-[#FAFAFA] border-t border-b border-[#111111]/10"
    >
      <div className="w-full max-w-[1400px] mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12 md:mb-16"
        >
          <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#FF4D00]">
            Program Impact
          </span>
          <h2 className="text-[32px] md:text-[48px] lg:text-[56px] font-display font-medium tracking-[-0.03em] leading-[0.95] mt-3">
            What our founders{" "}
            <em className="font-serif italic text-[#FF4D00]">achieve</em>
          </h2>
          <p className="text-[15px] md:text-[17px] text-[#111111]/50 font-medium leading-[1.7] max-w-xl mt-4">
            The numbers speak for themselves. Our programs don't just educate, they
            build enduring companies, create jobs, and generate real returns.
          </p>
        </motion.div>

        {/* Metrics grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {impactMetrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="border border-[#111111]/10 bg-white p-6 md:p-8 hover:border-[#FF4D00]/30 transition-colors group"
            >
              {/* Metric value */}
              <div className="text-[40px] md:text-[48px] font-display font-medium tracking-[-0.03em] leading-[1] mb-3 text-[#111111] group-hover:text-[#FF4D00] transition-colors">
                {metric.value}
              </div>

              {/* Label */}
              <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#FF4D00] block mb-3">
                {metric.label}
              </span>

              {/* Description */}
              <p className="text-[13px] md:text-[14px] text-[#111111]/50 font-medium leading-[1.6]">
                {metric.description}
              </p>

              {/* Bottom accent line */}
              <div className="mt-6 h-[2px] bg-[#111111]/5 group-hover:bg-[#FF4D00]/30 transition-colors" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   CTA SECTION, Dark bg, application deadline (KEPT AS-IS)
   ══════════════════════════════════════════════════════════════════════════ */
function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="bg-[#111111] text-white py-16 md:py-24 px-6 md:px-12 lg:px-20"
    >
      <div className="w-full max-w-[1400px] mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left: CTA heading + buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-[28px] sm:text-[40px] md:text-[56px] font-display font-medium tracking-[-0.03em] leading-[0.95] mb-6">
            Ready to take the
            <br />
            beginning seriously?
          </h2>
          <p className="text-[15px] md:text-[17px] text-white/50 font-medium leading-[1.6] max-w-md mb-10">
            Applications are currently open for the xHansa Fellowship and the
            xCelero Accelerator. Cohort 2026 is forming now.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/programs"
              className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-[#FF4D00] text-white text-[12px] font-bold tracking-widest uppercase hover:bg-white hover:text-[#111111] transition-colors"
            >
              Apply for Cohort 2026
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/approach"
              className="inline-flex items-center justify-center px-10 py-5 border border-white/20 text-white text-[12px] font-bold tracking-widest uppercase hover:bg-white hover:text-[#111111] transition-colors"
            >
              Review Program Directives
            </Link>
          </div>
        </motion.div>

        {/* Right: Deadline card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          className="border border-white/10 p-8 md:p-12 bg-white/5 backdrop-blur-sm"
        >
          <div className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#FF4D00] mb-8">
            Next Deadline
          </div>
          <div className="text-3xl md:text-4xl font-display font-medium mb-4 tracking-tight uppercase">
            May 15th, 2026
          </div>
          <p className="text-white/40 font-medium leading-relaxed mb-8 text-[15px]">
            Applications are currently open for the xHansa Fellowship and the
            xCelero Accelerator.
          </p>
          <div className="pt-8 border-t border-white/10 flex justify-between items-center">
            <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-white/30">
              Positions available
            </span>
            <span className="text-xl md:text-2xl font-display font-medium">
              1,000 Seats
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
