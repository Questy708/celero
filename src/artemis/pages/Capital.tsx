"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Link } from "@/artemis/router";
import { venturesData } from "@/artemis/data/ventures";
import {
  ArrowRight,
  ChevronDown,
  Shield,
  Check,
  X,
  Loader2,
  Zap,
  Building2,
  HandCoins,
  Landmark,
  Mail,
  PiggyBank,
  Banknote,
  CircleDollarSign,
  Layers,
} from "lucide-react";

/* ── Derived Data ── */

const totalVentures = venturesData.length;
const totalCountries = 39;
const totalHubs = 190;
const capitalTarget = "$4B";

/* ── Investment Vehicles ── */
const investmentVehicles = [
  {
    id: "xcelero-fund",
    name: "xCelero Fund",
    shortName: "The Fund",
    icon: CircleDollarSign,
    tagline: "Continuous capital. Broad exposure. Open access.",
    description:
      "An open-ended, evergreen commingled fund that deploys across the full xCelero venture portfolio. The Fund offers quarterly liquidity windows, transparent NAV reporting, and entry from $500: making institutional-grade venture accessible to everyone.",
    details: [
      { label: "Structure", value: "Open-ended evergreen fund" },
      { label: "Min entry", value: "$500" },
      { label: "Mgmt fee", value: "1.0%" },
      { label: "Carry", value: "None" },
      { label: "Liquidity", value: "Quarterly (up to 5% NAV)" },
      { label: "Reporting", value: "Quarterly NAV + updates" },
    ],
    bestFor: "First-time venture investors, portfolio diversification, passive exposure to critical tech",
    color: "#FF4D00",
    howItWorks: [
      "Open your account online with $500 minimum and complete KYC verification",
      "Capital is deployed across the full xCelero venture portfolio automatically",
      "Receive quarterly NAV reports, portfolio updates, and capital call notices",
      "Request redemptions during quarterly liquidity windows (up to 5% of NAV)",
      "Reinvest returns or withdraw as your strategy evolves",
    ],
    keyFeatures: [
      "Zero carry: investors keep 100% of returns above management fee",
      "Quarterly liquidity windows provide regular redemption access",
      "Broad diversification across energy, food, defense, manufacturing, digital finance",
      "Transparent NAV reporting with independent annual audit",
      "Mobile money and local agent deposit options in select African jurisdictions",
    ],
    riskNote: "Venture investments are illiquid and involve substantial risk of loss. The Fund's quarterly liquidity windows are subject to gate provisions and may be suspended in market stress events.",
  },
  {
    id: "spv-syndicates",
    name: "SPV Syndicates",
    shortName: "SPV",
    icon: Layers,
    tagline: "Co-invest alongside institutions on breakout deals.",
    description:
      "Purpose-built Special Purpose Vehicles for individual follow-on investments in high-conviction ventures. Each SPV is a single-asset vehicle with defined economics: you know exactly what you're investing in, with side-by-side GP economics and institutional-grade deal terms.",
    details: [
      { label: "Structure", value: "Single-asset SPV per deal" },
      { label: "Min entry", value: "$5,000" },
      { label: "Mgmt fee", value: "1.0%" },
      { label: "Carry", value: "10% above hurdle" },
      { label: "Liquidity", value: "Illiquid until exit" },
      { label: "Reporting", value: "Quarterly + ad-hoc" },
    ],
    bestFor: "Experienced investors seeking deal-level selection, co-investment rights with institutional partners",
    color: "#FF4D00",
    howItWorks: [
      "Review deal memos for breakout ventures in the xCelero portfolio",
      "Select individual SPV opportunities aligned with your conviction",
      "Invest with full transparency: valuation, cap table, use of proceeds disclosed upfront",
      "Hold alongside institutional co-investors with identical economic terms",
      "Receive proceeds at exit event (acquisition, IPO, secondary sale)",
    ],
    keyFeatures: [
      "Single-asset transparency: know exactly where every dollar is deployed",
      "Side-by-side economics with institutional lead investors",
      "Deal-level selection: invest only in ventures that match your thesis",
      "Defined carry structure with hurdle rate protection",
      "Access to xCelero deal flow typically reserved for institutional allocators",
    ],
    riskNote: "SPV investments are illiquid until exit event. Single-asset concentration increases idiosyncratic risk. Carry applies to returns above the preferred return hurdle.",
  },
  {
    id: "thematic-funds",
    name: "Thematic Funds",
    shortName: "Thematic",
    icon: PiggyBank,
    tagline: "Concentrated bets on critical technology verticals.",
    description:
      "Commingled closed-end funds targeting specific verticals: Energy, Food Systems, Critical Tech, Digital Finance. Each fund concentrates capital in 8 to 15 ventures within a single domain, giving investors targeted exposure to the sectors they believe in most.",
    details: [
      { label: "Structure", value: "7-year closed-end fund" },
      { label: "Min entry", value: "$50,000" },
      { label: "Mgmt fee", value: "1.5%" },
      { label: "Carry", value: "20% above 8% hurdle" },
      { label: "Liquidity", value: "Semi-annual tender offers" },
      { label: "Reporting", value: "Monthly + custom" },
    ],
    bestFor: "Institutional allocators, family offices, sector-conviction investors, impact-mandated capital",
    color: "#FF4D00",
    howItWorks: [
      "Select your vertical: Energy, Food Systems, Critical Tech, or Digital Finance",
      "Capital is deployed across 8 to 15 ventures within that single domain",
      "Monthly reporting with custom data room access for deeper due diligence",
      "Semi-annual tender offers provide structured liquidity opportunities",
      "At fund maturity (7 years), remaining positions are distributed or liquidated",
    ],
    keyFeatures: [
      "Concentrated portfolio: 8 to 15 ventures per fund for high-conviction exposure",
      "Four verticals aligned with xCelero's core thesis of critical technology",
      "20% carry above 8% hurdle aligns GP and LP incentives",
      "Impact reporting meets institutional mandates for measurable outcomes",
      "Board observer seats available for Anchor-tier allocations",
    ],
    riskNote: "Closed-end funds are subject to J-curve dynamics with early negative returns typical. Sector concentration amplifies market-specific risks. Semi-annual tender offers are at Board discretion and not guaranteed.",
  },
  {
    id: "catalyst-notes",
    name: "Catalyst Notes",
    shortName: "Catalyst",
    icon: Banknote,
    tagline: "Revenue-linked returns. Venture velocity without equity dilution.",
    description:
      "Revenue-based financing instruments for portfolio ventures that have reached revenue milestones. Investors receive a fixed return multiple tied to venture revenue performance: no equity dilution, no valuation negotiations. Capital that moves at the speed of the business.",
    details: [
      { label: "Structure", value: "Revenue-linked note" },
      { label: "Min entry", value: "$10,000" },
      { label: "Return target", value: "1.5 to 2.5x multiple" },
      { label: "Duration", value: "24 to 48 months" },
      { label: "Security", value: "Revenue assignment" },
      { label: "Reporting", value: "Monthly revenue reports" },
    ],
    bestFor: "Yield-oriented investors, revenue-stage venture exposure, non-dilutive capital supporters",
    color: "#111111",
    howItWorks: [
      "Select revenue-stage ventures from the xCelero portfolio with proven traction",
      "Invest via a revenue-linked note with a defined return multiple (1.5 to 2.5x)",
      "Venture remits a percentage of monthly revenue until the return cap is reached",
      "Monthly revenue reports provide real-time visibility into repayment progress",
      "At maturity, note is retired regardless of whether the return cap was achieved",
    ],
    keyFeatures: [
      "No equity dilution for founders: capital that preserves ownership",
      "Defined return target: no valuation negotiations or exit dependency",
      "Revenue-linked: returns accelerate when the venture grows faster",
      "Monthly reporting with real-time repayment tracking",
      "Shorter duration (24 to 48 months) vs. traditional venture timelines",
    ],
    riskNote: "Revenue-linked notes depend on venture revenue performance. If the venture's revenue declines, repayment slows and the full return target may not be achieved. No equity upside beyond the defined return multiple.",
  },
  {
    id: "non-dilutive-desk",
    name: "Non-Dilutive Desk",
    shortName: "Non-Dilutive",
    icon: Shield,
    tagline: "Unlock grants, prizes, and government incentives across 39 countries.",
    description:
      "Not a fund: a service. Our Non-Dilutive Capital Desk matches ventures with grants, prizes, government incentives, and development finance across every country on the Route. Average non-dilutive raise per venture: $180K. This is capital that doesn't cost equity.",
    details: [
      { label: "Structure", value: "Advisory + placement" },
      { label: "Min entry", value: "N/A (venture-side)" },
      { label: "Fee", value: "8 to 12% success fee" },
      { label: "Avg raise", value: "$180K per venture" },
      { label: "Pipeline", value: "2,400+ active programs" },
      { label: "Geographies", value: "39 countries" },
    ],
    bestFor: "Ventures seeking working capital without dilution; grant-mandated organizations seeking pipeline",
    color: "#111111",
    howItWorks: [
      "xcelero assesses your venture against 2,400+ active grant and incentive programs",
      "We match your technology, geography, and stage to the highest-probability opportunities",
      "Our team writes and submits applications on your behalf",
      "We manage compliance, reporting, and milestone documentation post-award",
      "Success fee is charged only on capital secured: no win, no fee",
    ],
    keyFeatures: [
      "2,400+ active programs across 39 countries on the Route",
      "Average $180K raised per venture with zero equity cost",
      "Full-service: application, compliance, and post-award management",
      "Success-fee only model: aligned incentives with founders",
      "Deep relationships with DFIs, government agencies, and development finance institutions",
    ],
    riskNote: "Grant timelines are subject to government and institutional review cycles. Success fees apply only to awarded capital. This is an advisory service, not an investment vehicle.",
  },
  {
    id: "anchor-mandate",
    name: "Anchor Mandate",
    shortName: "Anchor",
    icon: Landmark,
    tagline: "Custom portfolio construction for institutional-scale allocators.",
    description:
      "For investors deploying $250K+, Anchor Mandates offer bespoke portfolio construction with advisory board participation, direct venture selection input, custom SPV formation, GP carry participation, and real-time dashboard access. This is venture investing on your terms.",
    details: [
      { label: "Structure", value: "Custom mandate / SMA" },
      { label: "Min entry", value: "$250,000" },
      { label: "Mgmt fee", value: "Negotiated" },
      { label: "Carry", value: "Negotiated carry participation" },
      { label: "Liquidity", value: "Custom terms" },
      { label: "Reporting", value: "Real-time dashboard" },
    ],
    bestFor: "National development funds, DFIs, endowments, ultra-high-net-worth, family offices with strategic mandates",
    color: "#111111",
    howItWorks: [
      "Collaborate with xCelero's investment team to define your strategic priorities and constraints",
      "We construct a bespoke portfolio across vehicles, sectors, and geographies",
      "Advisory board participation gives you direct input on venture selection",
      "Custom SPVs are formed for your targeted co-investment opportunities",
      "Real-time dashboard provides live portfolio analytics and reporting",
    ],
    keyFeatures: [
      "Bespoke portfolio construction with sector, geography, and stage allocation",
      "Advisory board seat with direct venture selection input",
      "Custom SPV formation for targeted co-investment",
      "GP carry participation: share in the economics of the fund management",
      "Real-time dashboard with live NAV, cash flow projections, and impact metrics",
    ],
    riskNote: "Anchor Mandates are fully customizable and subject to negotiated terms. Minimum commitment of $250K. Investment terms, fees, and carry are determined through direct negotiation.",
  },
];

/* ── Investment Tiers ── */
const investmentTiers = [
  {
    id: "scout",
    name: "Scout",
    min: 500,
    max: 4999,
    icon: Zap,
    color: "#FF4D00",
    tagline: "Start building your position",
    benefits: [
      "Access to xCelero Fund (Continuous Capital Flow)",
      "Quarterly portfolio updates & NAV reports",
      "Route Deal Flow pipeline visibility",
      "Community investor network access",
    ],
    vehicle: "xCelero Fund",
    holdPeriod: "Open-ended",
    reporting: "Quarterly",
  },
  {
    id: "syndicate",
    name: "Syndicate",
    min: 5000,
    max: 49999,
    icon: HandCoins,
    color: "#FF4D00",
    tagline: "Co-invest alongside institutions",
    benefits: [
      "All Scout benefits",
      "SPV co-investment rights",
      "Side-by-side GP economics",
      "Annual LP meeting invitation",
      "Dedicated investor relations contact",
    ],
    vehicle: "SPV Syndicates",
    holdPeriod: "3\u20135 years",
    reporting: "Quarterly + ad-hoc",
  },
  {
    id: "partner",
    name: "Partner",
    min: 50000,
    max: 249999,
    icon: Building2,
    color: "#FF4D00",
    tagline: "Institutional-grade allocation",
    benefits: [
      "All Syndicate benefits",
      "Thematic Fund allocation",
      "Board observer seats (select ventures)",
      "Co-investment first-look rights",
      "Custom reporting & data room access",
      "Annual strategy summit attendance",
    ],
    vehicle: "Thematic Funds",
    holdPeriod: "7-year fund life",
    reporting: "Monthly + custom",
  },
  {
    id: "anchor",
    name: "Anchor",
    min: 250000,
    max: null,
    icon: Landmark,
    color: "#111111",
    tagline: "Shape the portfolio",
    benefits: [
      "All Partner benefits",
      "Advisory board participation",
      "Direct venture selection input",
      "Custom SPV formation",
      "GP carry participation",
      "Portfolio construction rights",
    ],
    vehicle: "Anchor Mandate",
    holdPeriod: "Custom",
    reporting: "Real-time dashboard",
  },
];

/* ── FAQ ── */
const faqItems = [
  {
    q: "Who can invest?",
    a: "Individual investors from $500 via the xCelero Fund. No accreditation required. SPV Syndicates and Thematic Funds require qualified investor status depending on jurisdiction. Anchor Mandates are for institutional investors and family offices.",
  },
  {
    q: "How does xCelero deploy capital?",
    a: "We deploy across five vehicles: (1) xCelero Fund, broad exposure across the full portfolio; (2) SPV Syndicates, single-deal co-investments alongside institutions; (3) Thematic Funds, concentrated sector bets in energy, food, independent tech; (4) Catalyst Notes, revenue-linked returns for revenue-stage ventures; (5) Non-Dilutive Desk, grants and incentives matching across 39 countries.",
  },
  {
    q: "What are the fees?",
    a: "xCelero Fund: 1% management fee, no carry. SPV Syndicates: 1% management + 10% carry above hurdle. Thematic Funds: 1.5% management + 20% carry above 8% hurdle. Catalyst Notes: no management fee, return target 1.5–2.5x. No sales load on any vehicle. See offering documents for full expense ratios.",
  },
  {
    q: "How does liquidity work?",
    a: "The xCelero Fund offers quarterly redemption windows (up to 5% of NAV per quarter). SPV positions are illiquid until exit event. Thematic Funds may offer semi-annual tender offers at Board discretion. Catalyst Notes have a defined 24–48 month duration. Consider all positions illiquid and invest only capital you can commit.",
  },
  {
    q: "Is this a fund-of-funds?",
    a: "No. xCelero Capital originates and builds ventures directly. We are a venture studio that deploys capital into our own creations, not a passive allocator. When we co-invest through SPVs, it's alongside institutional partners we've selected, not into blind pools.",
  },
  {
    q: "What's the investment thesis?",
    a: "Critical technology, energy, food, water, defense, manufacturing, not SaaS arbitrage. Global South-first markets where infrastructure gaps are the opportunity. Revenue-adjacent ventures with working prototypes and pilot customers, not slide decks. Route-connected companies that leverage the 190-hub network for scale. Self-sustaining by design technology that enables self-determination, not dependency.",
  },
  {
    q: "Can international investors participate?",
    a: "Yes. xCelero Capital structures investments through Mauritius HoldCos and UAE Free Zone entities to accept global capital. US investors access vehicles via Reg D offerings. African investors can participate through mobile money rails and local agent networks in select jurisdictions.",
  },
  {
    q: "How is NAV calculated?",
    a: "Portfolio valuations follow ASC 820 fair value measurement. Early-stage ventures are valued at cost until a material financing event. Revenue-generating ventures use a mix of revenue multiples, comparable transactions, and discounted cash flows. The fund is audited annually by an independent registered public accounting firm.",
  },
];

/* ══════════════════════════════════════════════════════════════════════════
   CAPITAL PAGE
   ══════════════════════════════════════════════════════════════════════════ */
export function Capital() {
  const [showSubscribe, setShowSubscribe] = useState(false);

  return (
    <div className="bg-white text-[#111111]">
      <Hero onSubscribe={() => setShowSubscribe(true)} />
      <CapitalBridge />
      <InvestmentVehicles />
      <InvestmentTiers />
      <FAQSection />
      <SubscribeModal
        isOpen={showSubscribe}
        onClose={() => setShowSubscribe(false)}
      />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   HERO, Editorial centered with serif accent
   ══════════════════════════════════════════════════════════════════════════ */
function Hero({ onSubscribe }: { onSubscribe: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const heroStats = [
    { value: capitalTarget, label: "Capital target" },
    { value: String(totalVentures), label: "Active ventures" },
    { value: `${totalCountries}+`, label: "Countries" },
    { value: "6", label: "Investment vehicles" },
    { value: String(totalHubs), label: "Route hubs" },
  ];

  return (
    <section className="relative bg-white text-[#111111] pt-24 pb-16 sm:pt-32 sm:pb-20 md:pt-44 md:pb-28 px-5 sm:px-6 md:px-12 lg:px-20 border-b border-[#111111]/10">
      <div ref={ref} className="w-full max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center"
        >
          {/* Small label */}
          <span className="text-[10px] font-mono font-bold tracking-[0.25em] uppercase text-[#FF4D00] mb-8 md:mb-12">
            xCelero Capital
          </span>

          <h1 className="text-[36px] sm:text-[48px] md:text-[60px] lg:text-[72px] leading-[1.05] font-display font-medium tracking-[-0.02em] mb-8 md:mb-10">
            Invest in{" "}
            <em className="italic font-serif text-[#FF4D00]">critical</em>{" "}
            technology from $500
          </h1>

          <p className="text-base sm:text-lg md:text-xl lg:text-[22px] leading-[1.6] text-[#111111]/50 font-medium max-w-2xl mb-10 sm:mb-14 md:mb-20">
            Six investment vehicles. One thesis: the technology that defines
            the next century will be built in the markets that need it most.
            xCelero gives you access to that pipeline.
          </p>

          {/* Stats metrics row, matching Route page style */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-5 sm:gap-x-10 md:gap-x-16 mb-10 sm:mb-14 md:mb-20">
            {heroStats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.08, ease: "easeOut" }}
                className="text-center min-w-[60px]"
              >
                <div className="text-[26px] sm:text-[32px] md:text-[40px] font-display font-medium tracking-[-0.02em] text-[#111111]">
                  {stat.value}
                </div>
                <div className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#111111]/35 mt-1">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 items-center justify-center">
            <Link
              to="#invest-tiers"
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault();
                document
                  .getElementById("invest-tiers")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#111111] text-white text-[12px] font-bold uppercase tracking-[0.12em] hover:bg-[#FF4D00] transition-colors"
            >
              Invest Now
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              onClick={onSubscribe}
              className="inline-flex items-center gap-2 px-8 py-4 border border-[#111111]/20 text-[12px] font-bold uppercase tracking-[0.12em] hover:border-[#111111] hover:bg-[#111111] hover:text-white transition-all bg-white"
            >
              Get Updates
              <Mail className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   CAPITAL BRIDGE — Image strip + two-column capital thesis with dotted map
   ══════════════════════════════════════════════════════════════════════════ */

const capitalBridgeImages = [
  {
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    alt: "Financial analytics",
  },
  {
    src: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=800&q=80",
    alt: "Collaborative workspace",
  },
  {
    src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
    alt: "Global network",
  },
];

/* Dot-matrix world map for Capital page */
const capitalWorldDots = (() => {
  const rows = [
    ".......##..........###.............#####..####..............",
    "......####.........####............######.######............",
    ".....######........#####...........########.######..........",
    ".....#######.......#####..........#########..######.........",
    "....#########......######.........#########...######........",
    "....##########.....#######........#########....#####........",
    "...############....########.......########.....#####........",
    "...############....########.......########......####........",
    "....###########....#########......#######.......####........",
    "....##########.....##########.....######........###.........",
    ".....#########.....##########.....######........###.........",
    "......########.....###########....#####.........##..........",
    ".......#######.....###########....#####.........##..........",
    "........######.....############...######.........#..........",
    ".........#####.....####.#####....########...................",
    "..........####.....####..####...#########...................",
    "...........###.....####...####..#########...................",
    "............##.....####....###..########....................",
    ".............#......###....###..#######.....................",
    "....................###.....##...######.....................",
    ".....................##.....##...#####......................",
    "......................##.....#...####.......................",
    ".......................#.........###........................",
    "................................##.........................",
    "................................#..........................",
    "............................................................",
    "............................................................",
    "............................................................",
    "............................................................",
    "............................................................",
  ];
  const dots: { row: number; col: number }[] = [];
  rows.forEach((row, r) => {
    [...row].forEach((ch, c) => {
      if (ch === "#") dots.push({ row: r, col: c });
    });
  });
  return dots;
})();

function CapitalBridge() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="px-6 md:px-12 lg:px-20 pb-16 md:pb-24">
      <div className="w-full max-w-[1400px] mx-auto">
        {/* Image strip — three overlapping images */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex items-end justify-start gap-0 mb-16 md:mb-24"
        >
          {capitalBridgeImages.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className={`relative overflow-hidden bg-[#F5F5F5] shadow-lg ${
                i === 0
                  ? "w-[36%] md:w-[32%] aspect-[4/3] z-10"
                  : i === 1
                  ? "w-[44%] md:w-[40%] aspect-[4/3] z-30 -mt-3 -ml-[8%] md:-ml-[4%]"
                  : "w-[36%] md:w-[32%] aspect-[4/3] z-10 -ml-[8%] md:-ml-[4%]"
              }`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Two-column layout: text left, dotted map right */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: Capital thesis text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6"
          >
            <p className="text-[22px] sm:text-[28px] md:text-[34px] leading-[1.25] font-display font-medium tracking-[-0.02em] text-[#111111] mb-6 md:mb-8">
              Capital that understands the terrain — not just the <span className="text-[#FF4D00]">return profile</span>.
            </p>
            <p className="text-[15px] md:text-[17px] leading-[1.7] text-[#111111]/60 font-medium max-w-xl">
              Traditional venture capital flows where returns are proven. xCelero deploys capital where the technology is most needed — in the geographies building the next century&apos;s infrastructure. Six vehicles, one thesis: <span className="text-[#111111] font-semibold">critical technology in the markets that need it most</span>.
            </p>
          </motion.div>

          {/* Right: Dotted world map */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-6 flex items-center justify-center"
          >
            <div className="relative w-full max-w-lg">
              <svg
                viewBox="0 0 60 30"
                className="w-full h-auto"
                style={{ imageRendering: "auto" }}
              >
                {/* All land dots in dark color */}
                {capitalWorldDots.map((dot, i) => (
                  <circle
                    key={i}
                    cx={dot.col * 1}
                    cy={dot.row * 1}
                    r="0.35"
                    className="fill-[#111111]/70"
                  />
                ))}
                {/* Africa highlighted region — cols 23-33, rows 3-21 */}
                {capitalWorldDots
                  .filter(
                    (d) =>
                      d.col >= 23 && d.col <= 33 && d.row >= 3 && d.row <= 21
                  )
                  .map((dot, i) => (
                    <circle
                      key={`af-${i}`}
                      cx={dot.col * 1}
                      cy={dot.row * 1}
                      r="0.4"
                      className="fill-[#FF4D00]"
                    />
                  ))}
              </svg>
              {/* Label */}
              <div className="absolute bottom-2 right-4 text-[10px] font-mono font-bold tracking-[0.2em] uppercase text-[#FF4D00]">
                $4B Target · 6 Vehicles
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   STATS BAR, Horizontal ticker
   ══════════════════════════════════════════════════════════════════════════ */
function StatsBar() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const stats = [
    { value: capitalTarget, label: "Capital target" },
    { value: String(totalVentures), label: "Active ventures" },
    { value: `${totalCountries}+`, label: "Countries" },
    { value: "6", label: "Investment vehicles" },
    { value: String(totalHubs), label: "Route hubs" },
  ];

  return (
    <section
      ref={ref}
      className="py-8 md:py-10 px-6 md:px-12 lg:px-20 border-b border-[#111111]/10 bg-white"
    >
      <div className="w-full max-w-[1400px] mx-auto">
        <div className="flex flex-wrap justify-between gap-6 md:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="text-center flex-1 min-w-[100px]"
            >
              <span className="block text-[28px] md:text-[36px] font-display font-medium tracking-[-0.03em] leading-[1]">
                {stat.value}
              </span>
              <span className="block text-[11px] md:text-[12px] text-[#111111]/40 font-medium tracking-[0.05em] uppercase mt-1">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   INVESTMENT VEHICLES, Expandable detail cards with full-page expansion
   ══════════════════════════════════════════════════════════════════════════ */
function InvestmentVehicles() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [expanded, setExpanded] = useState<string | null>(null);
  const detailRef = useRef<HTMLDivElement>(null);

  const selectedVehicle = investmentVehicles.find((v) => v.id === expanded);

  return (
    <section
      ref={ref}
      id="investment-vehicles"
      className="py-16 md:py-24 px-6 md:px-12 lg:px-20 border-b border-[#111111]/10"
    >
      <div className="w-full max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12 md:mb-16"
        >
          <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#FF4D00]">
            Investment Vehicles
          </span>
          <h2 className="text-[32px] md:text-[48px] lg:text-[64px] font-display font-medium tracking-[-0.03em] leading-[0.9] mt-3">
            Six ways to deploy{" "}
            <em className="font-serif italic text-[#FF4D00]">capital</em>
          </h2>
          <p className="text-[15px] md:text-[17px] text-[#111111]/50 font-medium leading-[1.7] max-w-xl mt-4">
            From $500 in the xCelero Fund to custom Anchor Mandates at $250K+,
            every vehicle is built for the same thesis, critical technology in
            the markets that need it most.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {investmentVehicles.map((vehicle, i) => {
            const Icon = vehicle.icon;
            const isSelected = expanded === vehicle.id;
            return (
              <motion.div
                key={vehicle.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`border p-6 md:p-8 bg-white transition-all flex flex-col cursor-pointer group ${
                  isSelected
                    ? "border-[#FF4D00] ring-1 ring-[#FF4D00]/20"
                    : "border-[#111111]/10 hover:border-[#FF4D00]/30"
                }`}
                onClick={() => {
                  setExpanded(isSelected ? null : vehicle.id);
                  if (!isSelected) {
                    setTimeout(() => {
                      detailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }, 100);
                  }
                }}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                        isSelected
                          ? "bg-[#FF4D00]"
                          : "border border-[#111111]/10 group-hover:border-[#FF4D00]/30"
                      }`}
                    >
                      <Icon
                        className={`w-4 h-4 transition-colors ${
                          isSelected ? "text-white" : "text-[#FF4D00]"
                        }`}
                        strokeWidth={1.5}
                      />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#111111]/30 block">
                        {vehicle.shortName}
                      </span>
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-[#111111]/30 transition-transform duration-300 ${
                      isSelected ? "rotate-180" : ""
                    }`}
                  />
                </div>

                {/* Title + Tagline */}
                <h3 className="text-[20px] md:text-[24px] font-display font-medium tracking-tight mb-2">
                  {vehicle.name}
                </h3>
                <p className="text-[13px] text-[#FF4D00] font-medium leading-[1.5] mb-3">
                  {vehicle.tagline}
                </p>

                {/* Description */}
                <p className="text-[13px] md:text-[14px] text-[#111111]/50 font-medium leading-[1.7] mb-4">
                  {vehicle.description}
                </p>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4">
                  {vehicle.details.map((detail, di) => (
                    <div key={di} className="flex flex-col">
                      <span className="text-[9px] font-mono font-bold tracking-widest uppercase text-[#111111]/30">
                        {detail.label}
                      </span>
                      <span className="text-[12px] md:text-[13px] font-medium text-[#111111]/70 leading-[1.4]">
                        {detail.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Click hint */}
                <div className="mt-auto pt-4 border-t border-[#111111]/5 flex items-center gap-2 text-[11px] font-mono font-bold tracking-widest uppercase text-[#111111]/20 group-hover:text-[#FF4D00]/60 transition-colors">
                  <span>{isSelected ? "Close details" : "View details"}</span>
                  <ArrowRight className={`w-3 h-3 transition-transform ${isSelected ? "rotate-90" : ""}`} />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Full Detail Expansion */}
        <AnimatePresence>
          {selectedVehicle && (
            <motion.div
              ref={detailRef}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 md:mt-12 border border-[#111111]/10 bg-white"
            >
              {/* Detail Header */}
              <div className="p-8 md:p-12 lg:p-16 border-b border-[#111111]/10 bg-[#FAFAFA]">
                <div className="flex items-start justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-[#FF4D00] flex items-center justify-center">
                      <selectedVehicle.icon className="w-6 h-6 text-white" strokeWidth={1.5} />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#111111]/30 block">
                        {selectedVehicle.shortName}
                      </span>
                      <h3 className="text-[28px] md:text-[40px] font-display font-medium tracking-[-0.02em]">
                        {selectedVehicle.name}
                      </h3>
                    </div>
                  </div>
                  <button
                    onClick={() => setExpanded(null)}
                    className="p-3 border border-[#111111]/10 hover:border-[#111111] hover:bg-[#111111] hover:text-white transition-all"
                    aria-label="Close details"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-[17px] md:text-[20px] text-[#FF4D00] font-medium leading-[1.5] mb-4">
                  {selectedVehicle.tagline}
                </p>
                <p className="text-[15px] md:text-[17px] text-[#111111]/60 font-medium leading-[1.7] max-w-3xl">
                  {selectedVehicle.description}
                </p>
              </div>

              <div className="p-8 md:p-12 lg:p-16">
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
                  {/* Left Column: Details + Best For */}
                  <div className="lg:col-span-5">
                    {/* Details Table */}
                    <div className="mb-10">
                      <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#FF4D00] block mb-4">
                        Key Terms
                      </span>
                      <div className="space-y-0">
                        {selectedVehicle.details.map((detail, i) => (
                          <div
                            key={i}
                            className={`flex justify-between items-center py-3 ${
                              i > 0 ? "border-t border-[#111111]/5" : ""
                            }`}
                          >
                            <span className="text-[12px] font-mono font-bold tracking-widest uppercase text-[#111111]/40">
                              {detail.label}
                            </span>
                            <span className="text-[14px] font-medium text-[#111111]/80">
                              {detail.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Best For */}
                    <div>
                      <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#FF4D00] block mb-3">
                        Best For
                      </span>
                      <p className="text-[14px] md:text-[15px] text-[#111111]/60 font-medium leading-[1.7]">
                        {selectedVehicle.bestFor}
                      </p>
                    </div>
                  </div>

                  {/* Right Column: How It Works + Key Features */}
                  <div className="lg:col-span-7">
                    {/* How It Works */}
                    <div className="mb-10">
                      <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#FF4D00] block mb-5">
                        How It Works
                      </span>
                      <div className="space-y-4">
                        {selectedVehicle.howItWorks.map((step, i) => (
                          <div key={i} className="flex gap-4">
                            <div className="shrink-0 w-8 h-8 rounded-full border border-[#111111]/10 flex items-center justify-center text-[11px] font-mono font-bold text-[#111111]/30">
                              {String(i + 1).padStart(2, "0")}
                            </div>
                            <p className="text-[14px] md:text-[15px] text-[#111111]/60 font-medium leading-[1.6] pt-1">
                              {step}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Key Features */}
                    <div className="mb-10">
                      <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#FF4D00] block mb-5">
                        Key Features
                      </span>
                      <div className="space-y-3">
                        {selectedVehicle.keyFeatures.map((feature, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <Check className="w-4 h-4 text-[#FF4D00] shrink-0 mt-0.5" strokeWidth={2} />
                            <span className="text-[14px] md:text-[15px] text-[#111111]/60 font-medium leading-[1.6]">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Risk Note */}
                    <div className="border-l-2 border-[#FF4D00]/20 pl-4">
                      <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#111111]/30 block mb-2">
                        Risk Consideration
                      </span>
                      <p className="text-[13px] text-[#111111]/40 font-medium leading-[1.6] italic">
                        {selectedVehicle.riskNote}
                      </p>
                    </div>
                  </div>
                </div>

                {/* CTA Bar */}
                <div className="mt-12 pt-8 border-t border-[#111111]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-[13px] text-[#111111]/40 font-medium">
                    Ready to invest? Select your tier below or get updates on new opportunities.
                  </p>
                  <div className="flex gap-3">
                    <Link
                      to="#invest-tiers"
                      onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                        e.preventDefault();
                        document
                          .getElementById("invest-tiers")
                          ?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#111111] text-white text-[11px] font-bold uppercase tracking-[0.1em] hover:bg-[#FF4D00] transition-colors"
                    >
                      Invest Now
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   INVESTMENT TIERS, Interactive selection + inline form
   ══════════════════════════════════════════════════════════════════════════ */
function InvestmentTiers() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    amount: "",
    tier: "",
    accredited: false,
    consent: false,
  });

  const handleSelectTier = (tierId: string) => {
    setSelectedTier(tierId);
    const tier = investmentTiers.find((t) => t.id === tierId);
    if (tier) {
      setFormData((prev) => ({
        ...prev,
        tier: tierId,
        amount: tier.min.toString(),
      }));
    }
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitting");

    try {
      const res = await fetch("/api/capital/invest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Submission failed");

      setFormState("success");
    } catch {
      setFormState("error");
    }
  };

  return (
    <section
      ref={ref}
      id="invest-tiers"
      className="py-16 md:py-24 px-6 md:px-12 lg:px-20 bg-[#FAFAFA] border-t border-[#111111]/10"
    >
      <div className="w-full max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12 md:mb-16"
        >
          <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#FF4D00]">
            Invest Now
          </span>
          <h2 className="text-[32px] md:text-[48px] lg:text-[64px] font-display font-medium tracking-[-0.03em] leading-[0.9] mt-3">
            Pick your{" "}
            <em className="font-serif italic text-[#FF4D00]">entry</em>
          </h2>
          <p className="text-[15px] md:text-[17px] text-[#111111]/50 font-medium leading-[1.7] max-w-xl mt-4">
            Four tiers, each mapped to the investment vehicle that fits your
            capital and conviction. Select a tier to start your investment
            inquiry.
          </p>
        </motion.div>

        {/* Tier Cards, horizontal scroll on mobile */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
          {investmentTiers.map((tier, i) => {
            const Icon = tier.icon;
            const isSelected = selectedTier === tier.id;
            return (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                onClick={() => handleSelectTier(tier.id)}
                className={`border p-6 md:p-8 bg-white cursor-pointer transition-all flex flex-col ${
                  isSelected
                    ? "border-[#FF4D00] ring-1 ring-[#FF4D00]/20"
                    : "border-[#111111]/10 hover:border-[#FF4D00]/30"
                }`}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      isSelected ? "bg-[#FF4D00]" : "border border-[#111111]/10"
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 ${
                        isSelected ? "text-white" : "text-[#FF4D00]"
                      }`}
                      strokeWidth={1.5}
                    />
                  </div>
                  <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#111111]/30">
                    {tier.vehicle}
                  </span>
                </div>

                <h3 className="text-[24px] md:text-[28px] font-display font-medium tracking-tight mb-1">
                  {tier.name}
                </h3>
                <p className="text-[13px] text-[#111111]/40 font-medium mb-4">
                  {tier.tagline}
                </p>

                <div className="mb-5">
                  <span className="text-[32px] md:text-[40px] font-display font-medium tracking-[-0.03em] leading-[1]">
                    ${tier.min.toLocaleString()}
                  </span>
                  <span className="text-[13px] text-[#111111]/40 font-medium ml-1">
                    {tier.max ? `\u2013 $${tier.max.toLocaleString()}` : "+ "}
                    minimum
                  </span>
                </div>

                <ul className="space-y-2 mb-6 flex-grow">
                  {tier.benefits.map((benefit, bi) => (
                    <li key={bi} className="flex items-start gap-2">
                      <Check
                        className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${
                          isSelected ? "text-[#FF4D00]" : "text-[#111111]/20"
                        }`}
                        strokeWidth={2}
                      />
                      <span className="text-[12px] md:text-[13px] text-[#111111]/60 font-medium leading-[1.5]">
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="flex items-center justify-between text-[11px] font-mono text-[#111111]/30 border-t border-[#111111]/10 pt-4 mt-auto">
                  <span>{tier.holdPeriod}</span>
                  <span>{tier.reporting}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Inline Investment Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="border border-[#111111]/10 bg-white p-8 md:p-12 max-w-2xl mx-auto">
                {formState === "success" ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6">
                      <Check className="w-8 h-8 text-green-600" strokeWidth={2} />
                    </div>
                    <h3 className="text-[24px] font-display font-medium mb-3">
                      Investment inquiry submitted
                    </h3>
                    <p className="text-[14px] text-[#111111]/50 font-medium leading-[1.7] max-w-md mx-auto">
                      Our investor relations team will reach out within 24 hours
                      with next steps, offering documents, and wire instructions.
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between mb-8">
                      <div>
                        <h3 className="text-[20px] md:text-[24px] font-display font-medium tracking-tight">
                          Start your investment
                        </h3>
                        <p className="text-[13px] text-[#111111]/40 font-medium mt-1">
                          {investmentTiers.find((t) => t.id === selectedTier)?.name} tier
                          {" "}via{" "}
                          {investmentTiers.find((t) => t.id === selectedTier)?.vehicle}{" "}
                          &mdash; from $
                          {investmentTiers
                            .find((t) => t.id === selectedTier)
                            ?.min.toLocaleString()}
                        </p>
                      </div>
                      <button
                        onClick={() => setShowForm(false)}
                        className="p-2 hover:bg-[#111111]/5 transition-colors"
                        aria-label="Close form"
                      >
                        <X className="w-5 h-5 text-[#111111]/40" />
                      </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label className="text-[11px] font-mono font-bold tracking-widest uppercase text-[#111111]/40 block mb-2">
                            Full Name
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) =>
                              setFormData((p) => ({ ...p, name: e.target.value }))
                            }
                            className="w-full border border-[#111111]/10 px-4 py-3 text-[14px] font-medium focus:outline-none focus:border-[#FF4D00] transition-colors bg-white"
                            placeholder="Your name"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] font-mono font-bold tracking-widest uppercase text-[#111111]/40 block mb-2">
                            Email
                          </label>
                          <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) =>
                              setFormData((p) => ({ ...p, email: e.target.value }))
                            }
                            className="w-full border border-[#111111]/10 px-4 py-3 text-[14px] font-medium focus:outline-none focus:border-[#FF4D00] transition-colors bg-white"
                            placeholder="investor@xcelero.com"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[11px] font-mono font-bold tracking-widest uppercase text-[#111111]/40 block mb-2">
                          Investment Amount (USD)
                        </label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[14px] text-[#111111]/30 font-medium">
                            $
                          </span>
                          <input
                            type="number"
                            required
                            min={
                              investmentTiers.find(
                                (t) => t.id === selectedTier
                              )?.min
                            }
                            value={formData.amount}
                            onChange={(e) =>
                              setFormData((p) => ({
                                ...p,
                                amount: e.target.value,
                              }))
                            }
                            className="w-full border border-[#111111]/10 px-4 py-3 pl-8 text-[14px] font-medium focus:outline-none focus:border-[#FF4D00] transition-colors bg-white"
                            placeholder="5000"
                          />
                        </div>
                      </div>

                      <div className="flex items-start gap-3 py-2">
                        <input
                          type="checkbox"
                          id="accredited"
                          checked={formData.accredited}
                          onChange={(e) =>
                            setFormData((p) => ({
                              ...p,
                              accredited: e.target.checked,
                            }))
                          }
                          className="mt-1 accent-[#FF4D00]"
                        />
                        <label
                          htmlFor="accredited"
                          className="text-[12px] text-[#111111]/50 font-medium leading-[1.6]"
                        >
                          I am an accredited/qualified investor (required for
                          Syndicate tier and above)
                        </label>
                      </div>

                      <div className="flex items-start gap-3 py-2">
                        <input
                          type="checkbox"
                          id="consent"
                          required
                          checked={formData.consent}
                          onChange={(e) =>
                            setFormData((p) => ({
                              ...p,
                              consent: e.target.checked,
                            }))
                          }
                          className="mt-1 accent-[#FF4D00]"
                        />
                        <label
                          htmlFor="consent"
                          className="text-[12px] text-[#111111]/50 font-medium leading-[1.6]"
                        >
                          By selecting this I agree to receive communications
                          from xCelero Labs related to investments xCelero has or
                          intends to make. I understand this is an inquiry and not
                          a binding commitment.
                        </label>
                      </div>

                      {formState === "error" && (
                        <p className="text-red-600 text-[13px] font-medium">
                          Something went wrong. Please try again.
                        </p>
                      )}

                      <button
                        type="submit"
                        disabled={formState === "submitting" || !formData.consent}
                        className="w-full px-8 py-4 bg-[#111111] text-white text-[12px] font-bold uppercase tracking-[0.12em] hover:bg-[#FF4D00] transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {formState === "submitting" ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Processing&hellip;
                          </>
                        ) : (
                          <>
                            Submit Investment Inquiry
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>

                      <p className="text-[10px] text-[#111111]/30 font-medium text-center leading-[1.6]">
                        This is not an offer to sell securities. Investment
                        inquiries are subject to eligibility verification and
                        offering document review.
                      </p>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   FAQ, Accordion
   ══════════════════════════════════════════════════════════════════════════ */
function FAQSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      ref={ref}
      className="py-16 md:py-24 px-6 md:px-12 lg:px-20 border-t border-[#111111]/10"
    >
      <div className="w-full max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-5 lg:sticky lg:top-[120px] lg:self-start"
          >
            <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#FF4D00]">
              Questions, Answered
            </span>
            <h2 className="text-[32px] md:text-[48px] lg:text-[56px] font-display font-medium tracking-[-0.03em] leading-[0.95] mt-3">
              Questions,
              <br />
              <em className="font-serif italic text-[#FF4D00]">answered</em>
            </h2>
          </motion.div>

          <div className="lg:col-span-7">
            {faqItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="border-t border-[#111111]/10"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full flex items-center justify-between py-5 md:py-6 text-left group"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#111111]/30 shrink-0">
                      Q{String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-[15px] md:text-[17px] font-medium leading-[1.5] pr-4">
                      {item.q}
                    </h3>
                  </div>
                  <div className="text-[#111111]/30 group-hover:text-[#111111]/60 transition-colors shrink-0">
                    <ChevronDown
                      className={`w-5 h-5 transition-transform duration-300 ${
                        openIndex === i ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="text-[14px] md:text-[15px] text-[#111111]/60 font-medium leading-[1.7] pb-6 pl-0 md:pl-14">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   SUBSCRIBE MODAL
   ══════════════════════════════════════════════════════════════════════════ */
function SubscribeModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const res = await fetch("/api/capital/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, consent }),
      });

      if (!res.ok) throw new Error("Subscription failed");

      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-center justify-center p-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white border border-[#111111]/10 p-8 md:p-10 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            {status === "success" ? (
              <div className="text-center py-6">
                <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-5">
                  <Check className="w-7 h-7 text-green-600" strokeWidth={2} />
                </div>
                <h3 className="text-[20px] font-display font-medium mb-2">
                  You&apos;re on the list
                </h3>
                <p className="text-[13px] text-[#111111]/50 font-medium leading-[1.7]">
                  We&apos;ll send you portfolio updates, NAV reports, and new
                  investment opportunities.
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-[20px] font-display font-medium tracking-tight">
                      Get investor updates
                    </h3>
                    <p className="text-[12px] text-[#111111]/40 font-medium mt-1">
                      Portfolio news, NAV reports, and deal alerts
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-[#111111]/5 transition-colors"
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5 text-[#111111]/40" />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border border-[#111111]/10 px-4 py-3 text-[14px] font-medium focus:outline-none focus:border-[#FF4D00] transition-colors bg-white"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="modal-consent"
                      required
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="mt-1 accent-[#FF4D00]"
                    />
                    <label
                      htmlFor="modal-consent"
                      className="text-[11px] text-[#111111]/50 font-medium leading-[1.6]"
                    >
                      I agree to receive communications from xCelero Labs
                      related to investments. I understand I can unsubscribe at
                      any time.
                    </label>
                  </div>

                  {status === "error" && (
                    <p className="text-red-600 text-[12px] font-medium">
                      Something went wrong. Please try again.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "submitting" || !consent}
                    className="w-full px-8 py-4 bg-[#111111] text-white text-[12px] font-bold uppercase tracking-[0.12em] hover:bg-[#FF4D00] transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Subscribing&hellip;
                      </>
                    ) : (
                      "Subscribe"
                    )}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
