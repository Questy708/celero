"use client";

import { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Link } from "@/artemis/router";
import { Search, ChevronDown, X, MapPin, Scale, Rocket, DollarSign, Users, ArrowRight } from "lucide-react";
import { venturesData, Venture } from "@/artemis/data/ventures";
import { caseStudiesData, CaseStudy } from "@/artemis/data/caseStudies";
import { ReviewSection } from "@/artemis/components/ReviewSection";

const ITEMS_PER_PAGE = 25;

/* ── Origin stories by vertical ── */
const originStories: Record<string, string> = {
  Energy: "The mobile money revolution proved that infrastructure-poor environments can leapfrog centralized systems. M-Pesa processed $30 billion in transactions before most African households had a bank account. The same architecture, decentralized nodes, mobile billing, peer-to-peer settlement, can be applied to energy. Microgrid pilots in Tanzania and Rwanda have demonstrated 40% cost reductions versus diesel generation. Energy poverty is not a technology problem, it is an orchestration failure.",
  Water: "The economics of atmospheric water generation have shifted dramatically. Early AWG systems consumed 0.8 kWh/L; modern solar-powered units achieve 0.15 kWh/L. Solar panel costs have fallen 90% since 2010. The capital cost of a 500 L/day AWG kiosk is now under $5,000, within reach of community microfinance. Water scarcity is a distribution and pricing problem, not a supply problem.",
  "Food & Agriculture": "Africa's agricultural failure is an information and market-access failure, not a land or labor failure. Idle land and idle capital exist in the same geographies but cannot find each other. The missing layer is digital infrastructure that matches supply to demand, facilitates trust, and handles settlement. The continent that holds the world's most uncultivated arable land should not be its most food-insecure.",
  "Materials & Manufacturing": "Raw material wealth without processing capability is not wealth, it is dependency. The same minerals that leave African ports as unrefined ore return as batteries, electronics, and vehicles at 10-50x the export price. Local value addition can be 10x more capital-efficient than raw export because it eliminates shipping, handling, and intermediary margins.",
  "Mobility & Logistics": "Movement is the circulatory system of economies, and Africa's is critically blocked. The informal transport sector moves 60% of all cross-border freight but operates without digital coordination. The missing infrastructure is not roads or ports, it is information and settlement rails. If the informal transport sector can be digitized without displacing its operators, a seamless mobility fabric becomes possible.",
  "Data & Intelligence": "Independent intelligence infrastructure is the prerequisite for independent decision-making. The same data that African governments, hospitals, and farms generate daily is being processed by foreign AI systems and sold back at premium prices. Federated learning architectures now allow AI models to be trained on data that never leaves its source country. Data independence and AI capability are inseparable.",
  "Built Environments": "The housing crisis is a manufacturing crisis in disguise. Housing can be manufactured the way cars are, at scale, on assembly lines, with radical cost reduction. The same lean manufacturing principles that reduced automobile costs by 90% between 1900 and 1930 have never been applied to construction at scale. China's prefabricated housing industry produces apartments at $15,000/unit in 14 days.",
  "Life Sciences": "Life-saving innovation should not be geographically bound to the global north. Africa's disease burden is known, its genetic diversity is unmatched, and its biodiversity is largely unexplored. The convergence of CRISPR diagnostics, microfluidic point-of-care testing, and AI-driven drug discovery creates an opportunity to build a life sciences industry that serves the global south first and the world second.",
  "Digital Finance": "Capital must flow as freely as information, and the infrastructure to enable it already exists in pockets. Mobile money rails can carry far more than payments; they can carry equity, savings, and ownership. The same USSD infrastructure that handles $50 billion in annual M-Pesa transactions can be extended to fractional investment, portable pensions, and cross-border settlement.",
  "Education & Cognitive Infrastructure": "Cognitive infrastructure is the most leveraged investment any civilization can make. Education systems designed for the industrial age can be replaced by adaptive, project-based, culturally grounded learning. AI enables the personal computer of education: one-to-one tutoring at $1/month. Benjamin Bloom's 1984 study demonstrated that 1-to-1 tutoring produces 2-sigma improvement in learning outcomes.",
  "Space & Off-World Industrialization": "Orbital independence is the next frontier of national independence. A continent of 54 nations can pool orbital ambition into a single independent capability. The cost of access to space has fallen 95% since 2010. The barrier is no longer physics, it is institutional coordination and capital allocation. Rwanda launched its first satellite for $1.5 million via rideshare.",
  "Quantum Computing": "Quantum advantage should not be the exclusive domain of three labs on one continent. Quantum computing can be demystified, decentralized, and deployed as independent infrastructure. Room-temperature topological qubits have been demonstrated in laboratory settings. Cloud quantum APIs have proven that remote access to quantum hardware is viable.",
  "Robotics & Autonomous Systems": "Automation should augment human labor, not replace it, especially where labor is most scarce. Robotics designed for the world's harshest environments will work everywhere. The same autonomous navigation, swarm coordination, and adaptive manipulation that works in a DRC mine or a Sahelian farm will work in a European warehouse, but the reverse is not true.",
  "Longevity & Human Augmentation": "Longer, healthier lives should not be a luxury of geography or GDP. Aging is a biological engineering problem, and biology is an engineering platform. The 12 hallmarks of aging are not mysteries, they are engineering specifications for intervention. Senolytic drugs have extended healthy lifespan by 25% in mouse models at the Mayo Clinic.",
  "Ocean & Blue Economy": "The blue economy is Africa's second continent, vast, untapped, and essential to survival. The ocean can be farmed, monitored, and harvested autonomously and regeneratively. Autonomous fish farming platforms in Norway have achieved 10x the yield per hectare of traditional aquaculture. AI vessel monitoring has detected 90% of illegal fishing in West African pilot programs.",
  "Defense & Self-Reliance": "No nation is truly independent when its security infrastructure is imported. Independent defense requires independent technology, built locally, controlled locally. The asymmetric nature of modern threats favors distributed, AI-driven, software-defined defense over the traditional hardware-heavy approach. AI-powered sensor fusion systems have demonstrated 95% border incursion detection.",
  "Frontier Computing": "The next era of computation must be co-designed by the continent with the most to gain. Neuromorphic, photonic, and biological computing represent fundamentally different paradigms that do not depend on silicon miniaturization. The continent that was bypassed by the silicon revolution has the opportunity to leapfrog directly to post-silicon computing.",
  "Climate & Regeneration": "The communities least responsible for climate change must lead its reversal. Climate reversal can be an economic engine, not a cost center. Satellite-monitored carbon credits in Kenya have generated $25/tonne for pastoralist communities, 5x the global average carbon credit price. Bio-acoustic forest monitoring has reduced illegal logging by 70% in monitored concessions.",
  "Communication & Culture": "Language is the operating system of civilization, and 2,000+ African languages are running on legacy code. Every language deserves real-time digital presence, and the AI to make it possible exists now. Meta's NLLB-200 model demonstrated translation for 200 languages with greater than 90% BLEU scores. Few-shot learning has reduced training data required by 95%.",
  "Consumer & e-Commerce": "African consumers are the world's largest untapped market, and they want products designed for them, not adapted from elsewhere. On-demand textile printing has reduced fashion waste to near-zero in European micro-factory models. Cross-border cold-chain logistics have enabled African specialty food exports at 40% margin.",
  "Industrial Biotech": "Biology is the most advanced manufacturing technology ever devised, and Africa has the biodiversity to prove it. Engineered biology can replace petrochemistry, cement, and synthetic fertilizer simultaneously. Engineered yeast producing spider silk protein has achieved industrial-scale fermentation at Bolt Threads.",
  "Rare Earth & Mineral Independence": "The ground beneath Africa's feet should build Africa's future, not just fill foreign supply chains. Refining at source captures 10x more value than exporting raw ore. Containerized cobalt refining units deployed at DRC mine sites have demonstrated 30% higher value capture versus export-to-China models. Hydrometallurgical battery recycling recovers 95%+ of critical minerals.",
  "Circular Economy": "Waste is a design failure, and Africa has the chance to build the first circular industrial economy from scratch. AI-powered waste sorting in Europe has achieved 95% material recovery rates. Digital waste marketplace platforms in India have connected 100,000 waste pickers to industrial buyers, increasing picker income by 40%.",
  "Biotechnology Tools": "The tools of life itself should not be locked behind patents and paywalls. CRISPR, automated cell manufacturing, and gene drive are the platform technologies whose impact depends entirely on who has access. Automated cell manufacturing foundries have reduced CAR-T cell production costs from $500,000 to $50,000 per patient.",
  "AI Safety & Alignment": "AI aligned only to Western values is not aligned, it is colonized. The philosophical frameworks of Ubuntu, Maat, and Harambee offer alignment principles fundamentally different from individualistic, utilitarian frameworks. Red-teaming of major AI systems has revealed systematic failures in African contexts.",
  "Synthetic Biology": "Biology can manufacture anything, and Africa has the biological diversity to manufacture everything. Engineered yeast producing spider silk proteins has achieved gram-scale fermentation. Nitrogen-fixing microbes colonizing cereal crop roots have shown 50% fertilizer reduction in field trials.",
};

/* ── Key metrics per vertical ── */
function getVentureMetrics(venture: Venture) {
  return [
    { icon: MapPin, label: "Pilot Locations", value: venture.pilotLocations },
    { icon: Scale, label: "Jurisdiction", value: venture.jurisdiction },
    { icon: Rocket, label: "Launch Model", value: venture.launchModel },
    { icon: DollarSign, label: "Cost to Launch", value: venture.costToLaunch ? `$${(venture.costToLaunch / 1000).toFixed(0)}K` : "TBD" },
  ];
}

/* ══════════════════════════════════════════════════════════════════════════
   VENTURE CARD (button, not Link)
   ══════════════════════════════════════════════════════════════════════════ */
function VentureCard({ venture, isSelected, onSelect }: { venture: Venture; isSelected: boolean; onSelect: () => void }) {
  return (
    <button
      onClick={onSelect}
      className="group block text-left w-full"
    >
      <div className={`relative bg-[#111111] text-white overflow-hidden transition-all duration-200 group-hover:scale-[1.02] group-hover:brightness-110 ${
        isSelected ? "ring-2 ring-[#FF4D00] ring-offset-2 ring-offset-[#FAFAFA]" : "group-hover:ring-1 group-hover:ring-[#FF4D00]"
      }`}>
        {/* Top section: name + code */}
        <div className="p-4 pb-3">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-display font-bold text-white leading-tight truncate">
                {venture.name}
              </h3>
              <span className="text-[10px] font-mono text-white/50 tracking-wider mt-1 block">
                {venture.code}
              </span>
            </div>
          </div>

          {/* Vertical badge */}
          <div className="mt-2.5">
            <span className="inline-block px-2 py-0.5 bg-white/10 text-[9px] font-mono uppercase tracking-widest text-white/70">
              {venture.vertical}
            </span>
          </div>
        </div>

        {/* Middle section: solution excerpt */}
        <div className="px-4 pb-3">
          <p className="text-[11px] text-white/70 leading-relaxed line-clamp-2">
            {venture.solution}
          </p>
        </div>

        {/* Bottom section: anchor partners */}
        <div className="px-4 pb-4 pt-1">
          <span className="text-[9px] font-mono uppercase tracking-widest text-white/30 block mb-0.5">
            Anchor Partners
          </span>
          <span className="text-[11px] text-white/60 leading-snug line-clamp-1 block">
            {venture.anchorPartners}
          </span>
        </div>

        {/* Bottom-right orange square with first letter */}
        <div className="absolute bottom-3 right-3 w-8 h-8 bg-[#FF4D00] flex items-center justify-center font-display font-bold text-sm text-white">
          {venture.name.charAt(0)}
        </div>
      </div>
    </button>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   EXPANDED VENTURE DETAIL
   ══════════════════════════════════════════════════════════════════════════ */
function VentureExpanded({ venture, onClose }: { venture: Venture; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const metrics = getVentureMetrics(venture);
  const origin = originStories[venture.vertical] || "This venture emerges from xCelero's systematic approach to identifying and solving the most critical infrastructure gaps in emerging markets.";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-hidden"
    >
      <div className="bg-white border-2 border-[#FF4D00] mt-8 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center border border-[#111111]/10 hover:border-[#FF4D00] hover:text-[#FF4D00] transition-colors text-[#111111]/40"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 md:p-10 lg:p-12">
          {/* Header */}
          <div className="mb-8 pr-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-[#FF4D00]/10 text-[10px] font-mono font-bold tracking-widest uppercase text-[#FF4D00]">
                {venture.code}
              </span>
              <span className="px-3 py-1 bg-[#111111]/5 text-[10px] font-mono font-bold tracking-widest uppercase text-[#111111]/40">
                {venture.vertical}
              </span>
            </div>
            <h2 className="text-[32px] md:text-[44px] lg:text-[56px] font-display font-medium tracking-tight leading-[1.05] mb-4">
              {venture.name}
            </h2>
            <p className="text-[16px] md:text-[18px] text-[#111111]/55 font-medium leading-[1.7] max-w-3xl">
              {venture.solution}
            </p>
          </div>

          {/* Problem */}
          <div className="mb-10 border-t border-[#111111]/10 pt-8">
            <div className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#FF4D00] mb-4">The Problem</div>
            <p className="text-[15px] md:text-[17px] text-[#111111]/70 font-medium leading-[1.7]">
              {venture.problem}
            </p>
          </div>

          {/* Key Metrics Grid */}
          <div className="mb-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((metric) => {
              const Icon = metric.icon;
              return (
                <div key={metric.label} className="border border-[#111111]/10 p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Icon className="w-4 h-4 text-[#FF4D00]" strokeWidth={1.5} />
                    <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#111111]/40">
                      {metric.label}
                    </span>
                  </div>
                  <div className="text-[14px] md:text-[15px] font-display font-medium leading-snug">
                    {metric.value}
                  </div>
                </div>
              );
            })}
          </div>

          {/* MVV (Minimum Viable Venture) */}
          <div className="mb-10 border-t border-[#111111]/10 pt-8">
            <div className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#FF4D00] mb-4">Minimum Viable Venture</div>
            <p className="text-[15px] md:text-[17px] text-[#111111]/70 font-medium leading-[1.7]">
              {venture.mvv}
            </p>
          </div>

          {/* Origin Story */}
          <div className="mb-10 border-t border-[#111111]/10 pt-8">
            <div className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#FF4D00] mb-4">Origin Thesis</div>
            <p className="text-[15px] md:text-[17px] text-[#111111]/70 font-medium leading-[1.7]">
              {origin}
            </p>
          </div>

          {/* Anchor Partners */}
          <div className="mb-10 border-t border-[#111111]/10 pt-8">
            <div className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#FF4D00] mb-4">Anchor Partners</div>
            <div className="flex flex-wrap gap-2">
              {venture.anchorPartners.split(", ").map((partner) => (
                <span
                  key={partner}
                  className="px-4 py-2 border border-[#111111]/10 text-[12px] font-medium text-[#111111]/60"
                >
                  {partner}
                </span>
              ))}
            </div>
          </div>

          {/* CTA: Request Data Room Access */}
          <div className="border-t border-[#111111]/10 pt-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <button className="group inline-flex items-center gap-3 px-8 py-4 bg-[#111111] text-white text-[11px] font-mono font-bold tracking-[0.2em] uppercase hover:bg-[#FF4D00] transition-colors">
              <Users className="w-4 h-4" />
              Request Data Room Access
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <span className="text-[12px] text-[#111111]/40 font-medium">
              Due diligence materials available upon executed NDA
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   CASE STUDIES SECTION (Expandable cards)
   ══════════════════════════════════════════════════════════════════════════ */
function CaseStudiesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const selectedStudy = expandedId
    ? caseStudiesData.find((cs) => cs.id === expandedId) || null
    : null;

  return (
    <section className="bg-white border-t border-[#111111]/10">
      <div ref={sectionRef} className="px-6 md:px-12 w-full max-w-7xl mx-auto py-20 md:py-28">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 md:mb-16"
        >
          <div className="text-[10px] font-mono font-bold tracking-[0.4em] uppercase text-[#FF4D00] mb-4">
            Case Studies
          </div>
          <h2 className="text-[32px] md:text-[44px] lg:text-[56px] font-display font-medium tracking-tight leading-[1.05] mb-4">
            Proof that critical technology <em className="font-serif italic text-[#FF4D00]">works</em>
          </h2>
          <p className="text-[15px] md:text-[17px] text-[#111111]/50 font-medium leading-[1.7] max-w-2xl">
            Four ventures. Four verticals. Real revenue, real jobs, real impact. Click any card to explore.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {caseStudiesData.map((cs, i) => {
            const isSelected = expandedId === cs.id;
            return (
              <motion.div
                key={cs.id}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <button
                  onClick={() => setExpandedId(isSelected ? null : cs.id)}
                  className="group block relative aspect-[4/3] overflow-hidden w-full text-left"
                >
                  {/* Background Image */}
                  <img
                    src={cs.image}
                    alt={cs.ventureName}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                  />

                  {/* Dark Gradient Overlay */}
                  <div className={`absolute inset-0 transition-opacity duration-300 ${isSelected ? "bg-gradient-to-t from-[#FF4D00]/80 via-[#FF4D00]/40 to-[#FF4D00]/20" : "bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:from-black/70 group-hover:via-black/20"}`} />

                  {/* Vertical Tag Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 bg-[#FF4D00] text-[8px] font-mono font-bold tracking-widest uppercase text-white">
                      {cs.vertical}
                    </span>
                  </div>

                  {/* Expand/Collapse indicator */}
                  <div className="absolute top-3 right-3">
                    <span className={`w-6 h-6 flex items-center justify-center transition-colors ${isSelected ? "bg-white text-[#FF4D00]" : "bg-black/30 text-white/60 group-hover:bg-black/50"}`}>
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isSelected ? "rotate-180" : ""}`} />
                    </span>
                  </div>

                  {/* Bottom Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-[15px] md:text-[17px] font-display font-bold text-white leading-tight mb-1">
                      {cs.ventureName}
                    </h3>
                    <span className="text-[12px] md:text-[13px] font-display font-medium text-[#FF4D00]">
                      {cs.results.revenue}
                    </span>
                  </div>
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Expanded Case Study Detail */}
        <AnimatePresence>
          {selectedStudy && (
            <CaseStudyExpanded
              study={selectedStudy}
              onClose={() => setExpandedId(null)}
            />
          )}
        </AnimatePresence>

        {/* Redirect to full Case Studies page */}
        <div className="mt-12 md:mt-16 text-center">
          <Link
            to="/case-studies"
            className="group inline-flex items-center gap-3 px-8 py-4 border border-[#111111] text-[11px] font-mono font-bold tracking-[0.2em] uppercase text-[#111111] hover:bg-[#111111] hover:text-white transition-colors"
          >
            View All Case Studies
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ── Case Study Expanded Detail (inline on Ventures page) ── */
function CaseStudyExpanded({
  study,
  onClose,
}: {
  study: CaseStudy;
  onClose: () => void;
}) {
  const detailRef = useRef<HTMLDivElement>(null);

  const metricItems = [
    { key: "revenue" as const, label: "Annual Revenue", icon: DollarSign },
    { key: "jobsCreated" as const, label: "Jobs Created", icon: Users },
    { key: "capitalRaised" as const, label: "Capital Raised", icon: Rocket },
    { key: "countriesReached" as const, label: "Countries", icon: MapPin },
  ];

  return (
    <motion.div
      ref={detailRef}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="mt-8 md:mt-12 border-2 border-[#FF4D00] bg-white relative"
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center border border-[#111111]/10 hover:border-[#FF4D00] hover:text-[#FF4D00] transition-colors text-[#111111]/40"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Header with image */}
      <div className="relative h-[200px] md:h-[280px] overflow-hidden">
        <img
          src={study.image}
          alt={study.ventureName}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <span className="inline-block px-2.5 py-1 bg-[#FF4D00] text-[10px] font-mono font-bold tracking-widest uppercase text-white mb-3">
            {study.vertical}
          </span>
          <h3 className="text-[24px] md:text-[36px] font-display font-medium tracking-tight text-white">
            {study.ventureName}
          </h3>
          <p className="text-[14px] md:text-[16px] text-[#FF4D00] font-medium mt-1">
            {study.title}
          </p>
        </div>
      </div>

      <div className="p-6 md:p-10 lg:p-12">
        {/* Summary */}
        <p className="text-[15px] md:text-[17px] text-[#111111]/60 font-medium leading-[1.7] mb-8">
          {study.summary}
        </p>

        {/* Metrics grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {metricItems.map((m) => {
            const Icon = m.icon;
            return (
              <div key={m.key} className="border border-[#111111]/10 p-4 hover:border-[#FF4D00]/30 transition-colors group">
                <Icon className="w-4 h-4 text-[#111111]/20 group-hover:text-[#FF4D00] transition-colors mb-2" strokeWidth={1.5} />
                <div className="text-[24px] md:text-[32px] font-display font-medium tracking-[-0.02em] leading-none mb-1 text-[#111111] group-hover:text-[#FF4D00] transition-colors">
                  {m.key === "jobsCreated"
                    ? study.results[m.key].toLocaleString()
                    : m.key === "countriesReached"
                    ? String(study.results[m.key])
                    : study.results[m.key]}
                </div>
                <span className="text-[9px] font-mono font-bold tracking-widest uppercase text-[#111111]/40">
                  {m.label}
                </span>
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Challenge + Approach */}
          <div>
            <div className="mb-8">
              <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#FF4D00] block mb-3">The Challenge</span>
              <p className="text-[14px] md:text-[15px] text-[#111111]/60 font-medium leading-[1.7]">{study.challenge}</p>
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#FF4D00] block mb-3">The Approach</span>
              <p className="text-[14px] md:text-[15px] text-[#111111]/60 font-medium leading-[1.7]">{study.approach}</p>
            </div>
            <div className="mt-6 border-t border-[#111111]/10 pt-4">
              <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#111111]/30 block mb-1">Timeline</span>
              <p className="text-[15px] font-display font-medium tracking-tight">{study.timeline}</p>
            </div>
          </div>

          {/* Quotes */}
          <div>
            <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#FF4D00] block mb-4">What They Said</span>
            {study.quotes.map((quote, i) => (
              <div key={i} className="border-l-2 border-[#FF4D00]/20 pl-5 mb-6 last:mb-0">
                <p className="text-[14px] md:text-[15px] text-[#111111]/60 font-medium leading-[1.7] italic mb-3">
                  &ldquo;{quote.text}&rdquo;
                </p>
                <div className="text-[12px] font-bold text-[#111111]/70">{quote.author}</div>
                <div className="text-[11px] text-[#111111]/40">{quote.role}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   VENTURES PAGE
   ══════════════════════════════════════════════════════════════════════════ */
export function Ventures() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [selectedVentureId, setSelectedVentureId] = useState<string | null>(null);

  // Dynamically derive unique verticals from data
  const verticals = useMemo(() => {
    const unique = Array.from(new Set(venturesData.map((v) => v.vertical)));
    unique.sort();
    return unique;
  }, []);

  const categories = useMemo(() => ["All", ...verticals], [verticals]);

  const filteredVentures = useMemo(() => {
    return venturesData.filter((v) => {
      const matchesCategory =
        activeCategory === "All" || v.vertical === activeCategory;
      const matchesSearch =
        v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.solution.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.code.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const visibleVentures = filteredVentures.slice(0, visibleCount);
  const hasMore = visibleCount < filteredVentures.length;

  const selectedVenture = selectedVentureId
    ? venturesData.find((v) => v.id === selectedVentureId) || null
    : null;

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  // Reset visible count when filters change
  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setVisibleCount(ITEMS_PER_PAGE);
    setSelectedVentureId(null);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setVisibleCount(ITEMS_PER_PAGE);
    setSelectedVentureId(null);
  };

  const handleSelectVenture = (id: string) => {
    setSelectedVentureId(selectedVentureId === id ? null : id);
  };

  return (
    <div className="bg-[#FAFAFA] text-[#111111] min-h-screen pb-32">
      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 md:px-12 w-full max-w-7xl mx-auto">
        <h1 className="text-[50px] md:text-[80px] lg:text-[100px] leading-[0.9] font-display font-medium tracking-tight mb-8">
          We invest in companies long before anyone knows their name.
        </h1>
        <div className="text-xl md:text-2xl text-[#111111]/50 font-medium mb-20">
          <p>(Often before they even have one.)</p>
        </div>

        {/* Search + Filter */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-16">
          <div className="relative w-full lg:w-[400px] group border-b border-[#111111]/20 hover:border-[#111111] focus-within:!border-[#FF4D00] transition-colors pb-4 flex items-center">
            <Search className="w-5 h-5 text-[#111111]/40 group-focus-within:text-[#FF4D00] mr-4 transition-colors" />
            <input
              type="text"
              placeholder="Search ventures"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="bg-transparent text-lg font-medium outline-none w-full placeholder:text-[#111111]/30"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#111111]/40 mr-2 border-r border-[#111111]/10 pr-4">
              Verticals
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-4 py-2 rounded-full text-[13px] font-medium transition-colors ${
                  activeCategory === cat
                    ? "bg-[#111111] text-white"
                    : "bg-white border border-[#111111]/10 text-[#111111]/60 hover:bg-[#111111]/5 hover:text-[#111111]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Ventures Grid */}
      <section className="px-6 md:px-12 w-full max-w-7xl mx-auto">
        {/* Count display */}
        <div className="mb-6 flex items-center justify-between">
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#111111]/40">
            {filteredVentures.length} venture{filteredVentures.length !== 1 ? "s" : ""}
            {activeCategory !== "All" && ` in ${activeCategory}`}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {visibleVentures.map((venture) => (
            <VentureCard
              key={venture.id}
              venture={venture}
              isSelected={selectedVentureId === venture.id}
              onSelect={() => handleSelectVenture(venture.id)}
            />
          ))}
        </div>

        {/* Expanded Detail Panel */}
        <AnimatePresence>
          {selectedVenture && (
            <VentureExpanded
              venture={selectedVenture}
              onClose={() => setSelectedVentureId(null)}
            />
          )}
        </AnimatePresence>

        {filteredVentures.length === 0 && (
          <div className="py-32 text-center text-xl text-[#111111]/50 font-medium">
            No ventures found matching your criteria.
          </div>
        )}

        {/* Load More */}
        {hasMore && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={handleLoadMore}
              className="group flex items-center gap-3 px-8 py-4 border border-[#111111]/10 text-[11px] font-mono uppercase tracking-widest font-bold text-[#111111]/60 hover:border-[#FF4D00] hover:text-[#FF4D00] transition-colors"
            >
              Load More
              <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            </button>
          </div>
        )}
      </section>

      <CaseStudiesSection />

      <ReviewSection title="Dispatches from the field" />
    </div>
  );
}
