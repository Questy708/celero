import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database with hypothetical example data...\n");

  // ─── 10 Subscribers ───
  const subscribers = [
    { email: "amara.okonkwo@ventures.africa", consent: true, source: "capital_page" },
    { email: "kwame.asante@gmail.com", consent: true, source: "newsletter_footer" },
    { email: "fatima.mohammed@talaat.org", consent: true, source: "capital_page" },
    { email: "chidi.nwosu@hyperion.io", consent: false, source: "community_page" },
    { email: "nala.sereti@originlabs.co.ke", consent: true, source: "capital_page" },
    { email: "samuel.bekele@addisfund.et", consent: true, source: "newsletter_footer" },
    { email: "zainab.ibrahim@kanoventures.ng", consent: true, source: "approach_page" },
    { email: "david.mwangi@nairobitech.co.ke", consent: false, source: "community_page" },
    { email: "aisha.toure@bamakocapital.ml", consent: true, source: "capital_page" },
    { email: "emmanuel.osei@accrafund.gh", consent: true, source: "newsletter_footer" },
  ];

  for (const s of subscribers) {
    await prisma.subscriber.upsert({
      where: { email: s.email },
      update: {},
      create: s,
    });
  }
  console.log(`  ✅ Created ${subscribers.length} subscribers`);

  // ─── 10 Investment Inquiries ───
  const inquiries = [
    {
      name: "Amara Okonkwo",
      email: "amara.okonkwo@ventures.africa",
      amount: 25000,
      tier: "scout",
      accredited: true,
      consent: true,
      status: "pending",
    },
    {
      name: "Kwame Asante",
      email: "kwame.asante@gmail.com",
      amount: 100000,
      tier: "syndicate",
      accredited: true,
      consent: true,
      status: "reviewing",
    },
    {
      name: "Fatima Mohammed",
      email: "fatima.mohammed@talaat.org",
      amount: 500000,
      tier: "partner",
      accredited: true,
      consent: true,
      status: "contacted",
    },
    {
      name: "Chidi Nwosu",
      email: "chidi.nwosu@hyperion.io",
      amount: 50000,
      tier: "scout",
      accredited: false,
      consent: true,
      status: "pending",
    },
    {
      name: "Nala Sereti",
      email: "nala.sereti@originlabs.co.ke",
      amount: 250000,
      tier: "syndicate",
      accredited: true,
      consent: true,
      status: "invested",
    },
    {
      name: "Samuel Bekele",
      email: "samuel.bekele@addisfund.et",
      amount: 1000000,
      tier: "anchor",
      accredited: true,
      consent: true,
      status: "reviewing",
    },
    {
      name: "Zainab Ibrahim",
      email: "zainab.ibrahim@kanoventures.ng",
      amount: 75000,
      tier: "scout",
      accredited: false,
      consent: true,
      status: "pending",
    },
    {
      name: "David Mwangi",
      email: "david.mwangi@nairobitech.co.ke",
      amount: 150000,
      tier: "syndicate",
      accredited: true,
      consent: true,
      status: "contacted",
    },
    {
      name: "Aisha Toure",
      email: "aisha.toure@bamakocapital.ml",
      amount: 500000,
      tier: "partner",
      accredited: true,
      consent: true,
      status: "declined",
    },
    {
      name: "Emmanuel Osei",
      email: "emmanuel.osei@accrafund.gh",
      amount: 750000,
      tier: "anchor",
      accredited: true,
      consent: true,
      status: "pending",
    },
  ];

  for (const inq of inquiries) {
    await prisma.investmentInquiry.create({ data: inq });
  }
  console.log(`  ✅ Created ${inquiries.length} investment inquiries`);

  // ─── 10 Applications (mix of founder & partner) ───
  const applications = [
    {
      type: "founder",
      firstName: "Tariq",
      lastName: "Bello",
      email: "tariq@solargrid.ng",
      referral: "LinkedIn",
      linkedinUrl: "https://linkedin.com/in/tariqbello",
      companyName: "SolarGrid Nigeria",
      companyWebsite: "https://solargrid.ng",
      location: "Lagos, Nigeria",
      role: "CEO & Co-Founder",
      pitchDeckUrl: "https://docsend.com/solargrid-pitch",
      motivation: "Building distributed solar micro-grids for underserved communities in rural Nigeria. Our technology reduces installation costs by 60% and enables pay-as-you-go models through mobile money integration.",
      status: "pending",
    },
    {
      type: "partner",
      firstName: "Wanjiku",
      lastName: "Kamau",
      email: "wanjiku@kenyaic.org",
      referral: "xCellero website",
      orgName: "Kenya Innovation Centre",
      orgWebsite: "https://kenyaic.org",
      partnerRole: "Ecosystem Director",
      interest: "Co-investing in early-stage climate ventures across East Africa",
      description: "We run a 12,000 sq ft innovation hub in Nairobi with 40+ resident startups. Looking to partner on deal flow sharing, co-investment in climate-tech, and hosting xCelero Route events.",
      status: "reviewing",
    },
    {
      type: "founder",
      firstName: "Abena",
      lastName: "Mensah",
      email: "abena@agrismart.gh",
      referral: "Word of mouth",
      linkedinUrl: "https://linkedin.com/in/abenamensah",
      companyName: "AgriSmart Ghana",
      companyWebsite: "https://agrismart.gh",
      location: "Accra, Ghana",
      role: "CTO",
      pitchDeckUrl: "https://docsend.com/agrismart-deck",
      motivation: "Precision agriculture platform using satellite imagery and AI to help smallholder farmers increase yields by 40%. Currently serving 3,200 farmers across Ghana and expanding to Côte d'Ivoire.",
      status: "contacted",
    },
    {
      type: "partner",
      firstName: "Youssef",
      lastName: "El Fassi",
      email: "youssef@maghrebvc.ma",
      referral: "Conference introduction",
      orgName: "Maghreb Ventures Capital",
      orgWebsite: "https://maghrebvc.ma",
      partnerRole: "Managing Partner",
      interest: "Sourcing high-growth startups from the North Africa Route for Series A co-investment",
      description: "We manage a $30M fund focused on North African technology companies. Interested in establishing a formal deal-sharing relationship with xCelero for ventures in Morocco, Tunisia, and Algeria.",
      status: "pending",
    },
    {
      type: "founder",
      firstName: "Lindiwe",
      lastName: "Dlamini",
      email: "lindiwe@medlogistics.co.za",
      referral: "xCellero community",
      linkedinUrl: "https://linkedin.com/in/lindiwedlamini",
      companyName: "MedLogistics",
      companyWebsite: "https://medlogistics.co.za",
      location: "Johannesburg, South Africa",
      role: "Founder & CEO",
      pitchDeckUrl: "https://docsend.com/medlogistics-pitch",
      motivation: "Last-mile pharmaceutical delivery platform using drone technology to reach remote health facilities. Completed 2,400+ deliveries in pilot phase across KwaZulu-Natal province. Seeking $2M Series A to expand to 3 additional provinces.",
      status: "pending",
    },
    {
      type: "partner",
      firstName: "Olu",
      lastName: "Adebayo",
      email: "olu@lagosstateinnovates.gov.ng",
      referral: "Government liaison",
      orgName: "Lagos State Innovation Trust",
      orgWebsite: "https://lagosinnovates.gov.ng",
      partnerRole: "Head of Partnerships",
      interest: "Policy sandbox collaboration and startup subsidy programs for Route-based ventures",
      description: "Government-backed innovation trust with $5M annual budget for startup subsidies. We want to offer regulatory sandboxes for fintech and health-tech ventures on the West Africa Route.",
      status: "accepted",
    },
    {
      type: "founder",
      firstName: "Mekdi",
      lastName: "Haile",
      email: "mekdi@edtechet.com",
      referral: "Quest Fellowship",
      linkedinUrl: "https://linkedin.com/in/mekdihaile",
      companyName: "EdTech Ethiopia",
      companyWebsite: "https://edtechet.com",
      location: "Addis Ababa, Ethiopia",
      role: "Co-Founder & Product Lead",
      pitchDeckUrl: "https://docsend.com/edtechet-deck",
      motivation: "Mobile-first adaptive learning platform for secondary students in Ethiopia. 85,000 active users, 92% completion rate. Built offline-first for low-connectivity environments. Looking to expand to Kenya and Tanzania.",
      status: "reviewing",
    },
    {
      type: "partner",
      firstName: "Amina",
      lastName: "Diallo",
      email: "amina@terraventures.sn",
      referral: "xCellero Capital page",
      orgName: "Terre Ventures Dakar",
      orgWebsite: "https://terraventures.sn",
      partnerRole: "Investment Analyst",
      interest: "Joining as a Route anchor partner for the West Africa leg with co-investment rights",
      description: "Dakar-based impact investment firm managing a $15M climate adaptation fund. Interested in becoming an anchor partner on the West Africa Route to access pre-vetted deal flow and co-invest alongside xCelero vehicles.",
      status: "pending",
    },
    {
      type: "founder",
      firstName: "Kofi",
      lastName: "Boateng",
      email: "kofi@payroute.gh",
      referral: "Twitter/X",
      linkedinUrl: "https://linkedin.com/in/kofiboateng",
      companyName: "PayRoute",
      companyWebsite: "https://payroute.gh",
      location: "Kumasi, Ghana",
      role: "Founder",
      pitchDeckUrl: "https://docsend.com/payroute-deck",
      motivation: "Cross-border payment infrastructure connecting mobile money networks across West Africa. Processing $4.2M monthly volume across Ghana, Nigeria, and Senegal. Building the payment rails for Route-based commerce.",
      status: "declined",
    },
    {
      type: "founder",
      firstName: "Nia",
      lastName: "Moyo",
      email: "nia@watertech.tz",
      referral: "Direct application",
      linkedinUrl: "https://linkedin.com/in/niamoyo",
      companyName: "WaterTech Tanzania",
      companyWebsite: "https://watertech.tz",
      location: "Dar es Salaam, Tanzania",
      role: "CEO & Founder",
      pitchDeckUrl: "https://docsend.com/watertech-pitch",
      motivation: "IoT-enabled water quality monitoring and purification systems for urban informal settlements. 12,000 households served in Dar es Salaam. Patent-pending filtration technology reduces contamination by 99.7%. Raising $1.5M for East Africa expansion.",
      status: "pending",
    },
  ];

  for (const app of applications) {
    await prisma.application.create({ data: app });
  }
  console.log(`  ✅ Created ${applications.length} applications`);

  // ─── Summary ───
  const totalSubs = await prisma.subscriber.count();
  const totalInq = await prisma.investmentInquiry.count();
  const totalApps = await prisma.application.count();
  const totalAmount = await prisma.investmentInquiry.aggregate({ _sum: { amount: true } });

  console.log("\n📊 Database summary:");
  console.log(`   Subscribers:         ${totalSubs}`);
  console.log(`   Investment Inquiries: ${totalInq}`);
  console.log(`   Applications:         ${totalApps}`);
  console.log(`   Total Invest Amount:  $${(totalAmount._sum.amount || 0).toLocaleString()}`);
  console.log("\n✨ Seeding complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
