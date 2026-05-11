// ─── Sub-types ───────────────────────────────────────────────────────────────

export interface CampaignCreator {
  initials: string;
  name: string;
  avatarGradient: string;
  verified: boolean;
  startedDate: string;         // e.g. "Apr 12, 2025"
  followerCount: number;
}

export interface CampaignUpdate {
  date: string;                // e.g. "May 2, 2025"
  title: string;
  body: string;
}

export interface CampaignComment {
  initials: string;
  avatarGradient: string;
  name: string;
  donatedAmount: string | null; // null if they didn't donate
  timeAgo: string;
  text: string;
  likes: number;
}

export interface CampaignDonor {
  initials: string;
  avatarGradient: string;
  name: string;
  timeAgo: string;
  amount: string;              // e.g. "+$100"
}

export interface StorySection {
  heading: string;
  body: string;                // plain text paragraphs separated by \n\n
  highlight?: string;          // optional amber callout box text
}

// ─── Main Campaign type ───────────────────────────────────────────────────────

export interface Campaign {
  // Core / card fields
  id: number;
  tag: string;
  urgent?: boolean;
  gradient: string;
  avatarGradient: string;
  initials: string;
  creator: string;             // display name (kept for card)
  title: string;
  description?: string;        // short blurb for featured card
  raised: string;              // e.g. "$36,500"
  goal: string;                // e.g. "$50,000"
  pct: number;                 // 0-100
  donors: number;
  daysLeft: number;
  featured?: boolean;
  saved?: boolean;
  links: string[];

  // Detail page fields
  creatorProfile: CampaignCreator;
  storySections: StorySection[];
  updates: CampaignUpdate[];
  comments: CampaignComment[];
  recentDonors: CampaignDonor[];
  category: string;            // for breadcrumb, e.g. "Medical"
  startedDate: string;         // e.g. "Apr 12, 2025"
  verifiedByAdmin: boolean;
}

// ─── Data ────────────────────────────────────────────────────────────────────

export const campaigns: Campaign[] = [
  {
    id: 1,
    tag: "🏥 Medical",
    urgent: true,
    gradient: "linear-gradient(135deg, #2D5A8E 0%, #5B9BD5 100%)",
    avatarGradient: "linear-gradient(135deg, #2D5A8E, #5B9BD5)",
    initials: "SR",
    creator: "Sarah Rahman",
    title: "Help cover Maya's life-saving heart surgery at AIIMS Delhi",
    description: "Maya is a 7-year-old with a congenital heart defect requiring immediate surgery. Her family has exhausted all savings and needs community support.",
    raised: "$36,500",
    goal: "$50,000",
    pct: 68,
    donors: 412,
    daysLeft: 18,
    featured: true,
    saved: true,
    links: ["https://twitter.com", "https://wa.me", "https://facebook.com", ""],
    category: "Medical",
    startedDate: "Apr 12, 2025",
    verifiedByAdmin: true,

    creatorProfile: {
      initials: "SR",
      name: "Sarah Rahman",
      avatarGradient: "linear-gradient(135deg, #2D5A8E, #5B9BD5)",
      verified: true,
      startedDate: "Apr 12, 2025",
      followerCount: 142,
    },

    storySections: [
      {
        heading: "About Maya",
        body: "Maya is a bright, 7-year-old girl who loves painting and wants to become a doctor someday. Last October, she was diagnosed with a congenital ventricular septal defect — a hole in the wall between the two lower chambers of her heart. What began as mild breathlessness has progressed to the point where she can no longer attend school or play with her friends without losing breath.\n\nHer cardiologist at AIIMS Delhi, Dr. Ravi Sharma, has confirmed that open-heart surgery is the only viable treatment option and must be done within the next 60 days to prevent irreversible damage. The surgery has been scheduled for May 15th, pending funding.",
        highlight: "The total cost of surgery and post-operative care is ₹41,00,000 (~$50,000 USD). Sarah's family has already contributed ₹8 lakhs from their savings and are seeking help to cover the remaining amount. Every donation — no matter how small — brings Maya one step closer to a healthy, full life.",
      },
      {
        heading: "How the funds will be used",
        body: "100% of donations go directly to Maya's medical care. The funds will be used as follows: surgical procedure and OT charges at AIIMS (₹28L), anaesthesia and ICU care for 5–7 days (₹7L), post-surgery medication and follow-ups over 6 months (₹4L), and family travel and accommodation during the hospital stay (₹2L).\n\nAll hospital bills and expense records will be shared as campaign updates throughout the process. Sarah has provided her Aadhaar, PAN, and hospital documents to DFund for verification.",
      },
      {
        heading: "A message from Sarah",
        body: `"As a mother, watching Maya struggle to breathe while playing is the hardest thing I have ever endured. We have exhausted every option we had. I am reaching out to this community with all the hope I have left. If you can help — even ₹500 — you are giving my daughter a chance at life. Thank you from the bottom of my heart."`,
      },
    ],

    updates: [
      {
        date: "May 2, 2025",
        title: "Surgery date confirmed — May 15th",
        body: "AIIMS has confirmed the surgery slot for May 15th. We are 68% funded. Please share with your network — we need to reach the goal in the next 13 days.",
      },
      {
        date: "Apr 28, 2025",
        title: "Pre-op tests completed",
        body: "Maya completed all pre-operative tests today. Doctors say she is stable enough for surgery once funding is secured. Receipts uploaded below.",
      },
      {
        date: "Apr 12, 2025",
        title: "Campaign launched",
        body: "We have launched this campaign with the hope of the community. Thank you to everyone who has donated and shared so far.",
      },
    ],

    comments: [
      {
        initials: "RK",
        avatarGradient: "linear-gradient(135deg, #4A6741, #7DB56A)",
        name: "Rahul Kumar",
        donatedAmount: "$100",
        timeAgo: "2 hours ago",
        text: "Praying for little Maya's speedy recovery. Donated a small amount — hope it helps. Stay strong, Sarah! 🙏",
        likes: 12,
      },
      {
        initials: "AN",
        avatarGradient: "linear-gradient(135deg, #7B5EA7, #B09FD4)",
        name: "Anjali Nair",
        donatedAmount: null,
        timeAgo: "5 hours ago",
        text: "Shared this with my family and office group. Children deserve every chance at a healthy life. Wishing Maya a swift and full recovery.",
        likes: 8,
      },
      {
        initials: "DV",
        avatarGradient: "linear-gradient(135deg, #1A6B6B, #3AAFA9)",
        name: "Dr. Dev Verma",
        donatedAmount: "$250",
        timeAgo: "1 day ago",
        text: "As a cardiologist I can confirm the costs mentioned are accurate for this procedure at AIIMS. This is a legitimate and urgent need. Happy to help.",
        likes: 34,
      },
    ],

    recentDonors: [
      { initials: "RK", avatarGradient: "linear-gradient(135deg, #C0442A, #E8820C)", name: "Rahul Kumar", timeAgo: "2 hours ago", amount: "+$100" },
      { initials: "AN", avatarGradient: "linear-gradient(135deg, #4A6741, #7DB56A)", name: "Anjali Nair", timeAgo: "5 hours ago", amount: "+$25" },
      { initials: "DV", avatarGradient: "linear-gradient(135deg, #7B5EA7, #B09FD4)", name: "Dr. Dev Verma", timeAgo: "1 day ago", amount: "+$250" },
      { initials: "MS", avatarGradient: "linear-gradient(135deg, #1A6B6B, #3AAFA9)", name: "Meera Sharma", timeAgo: "1 day ago", amount: "+$50" },
      { initials: "A", avatarGradient: "linear-gradient(135deg, #2D5A8E, #5B9BD5)", name: "Anonymous", timeAgo: "2 days ago", amount: "+$500" },
    ],
  },

  // ── Campaign 2 ──────────────────────────────────────────────────────────────
  {
    id: 2,
    tag: "🏥 Medical",
    gradient: "linear-gradient(135deg, #C0442A 0%, #E8820C 100%)",
    avatarGradient: "linear-gradient(135deg, #C0442A, #E8820C)",
    initials: "JM",
    creator: "James Mitchell",
    title: "Fund Aiden's leukemia treatment — 3 cycles remaining",
    description: "Aiden, 9, needs 3 more chemotherapy cycles. His family can't afford the remaining cost without community support.",
    raised: "$21,000",
    goal: "$50,000",
    pct: 42,
    donors: 238,
    daysLeft: 12,
    featured: false,
    saved: true,
    links: ["https://twitter.com", "https://wa.me", "", ""],
    category: "Medical",
    startedDate: "Mar 28, 2025",
    verifiedByAdmin: true,

    creatorProfile: {
      initials: "JM",
      name: "James Mitchell",
      avatarGradient: "linear-gradient(135deg, #C0442A, #E8820C)",
      verified: true,
      startedDate: "Mar 28, 2025",
      followerCount: 87,
    },

    storySections: [
      {
        heading: "Aiden's Story",
        body: "Aiden is a 9-year-old boy who was diagnosed with acute lymphoblastic leukemia eight months ago. He has already completed 4 cycles of chemotherapy and responded well, but his oncologist has prescribed 3 more cycles to achieve full remission.\n\nEach cycle costs approximately $8,000–$10,000 at the private hospital where his treatment is ongoing. His father James works two jobs to keep up, but the family's savings ran out after the second cycle.",
        highlight: "Three remaining cycles will cost an estimated $29,000. Every dollar raised goes directly to Aiden's hospital account. James has provided all medical records and treatment plans to DFund for verification.",
      },
      {
        heading: "Treatment plan",
        body: "Aiden's oncologist, Dr. Preethi Suresh, has outlined a 6-month timeline for the remaining treatment. Cycles 5 and 6 will be administered over the next 3 months. Cycle 7 (maintenance) will follow 3 months after. All treatment is at Fortis Hospital, Bangalore.",
      },
      {
        heading: "From James",
        body: `"Aiden asks me every day if he's going to get better. I tell him yes — and I need your help to keep that promise. He's a fighter. He just needs a chance."`,
      },
    ],

    updates: [
      {
        date: "Apr 20, 2025",
        title: "Cycle 5 started today",
        body: "Aiden began his 5th chemotherapy cycle this morning. He's in good spirits. Thank you all for the support — 42% funded so far!",
      },
      {
        date: "Mar 28, 2025",
        title: "Campaign launched",
        body: "We're reaching out to the community for help with Aiden's remaining treatment costs.",
      },
    ],

    comments: [
      {
        initials: "PS",
        avatarGradient: "linear-gradient(135deg, #2D5A8E, #5B9BD5)",
        name: "Pooja Sinha",
        donatedAmount: "$50",
        timeAgo: "3 hours ago",
        text: "Donated for Aiden. Stay strong little one! 💪",
        likes: 7,
      },
      {
        initials: "MR",
        avatarGradient: "linear-gradient(135deg, #8B3A52, #C0567A)",
        name: "Mohan Rao",
        donatedAmount: null,
        timeAgo: "1 day ago",
        text: "Shared across my LinkedIn network. Hope this reaches the goal soon.",
        likes: 4,
      },
    ],

    recentDonors: [
      { initials: "PS", avatarGradient: "linear-gradient(135deg, #2D5A8E, #5B9BD5)", name: "Pooja Sinha", timeAgo: "3 hours ago", amount: "+$50" },
      { initials: "VK", avatarGradient: "linear-gradient(135deg, #4A6741, #7DB56A)", name: "Vikram Khanna", timeAgo: "6 hours ago", amount: "+$200" },
      { initials: "A", avatarGradient: "linear-gradient(135deg, #8B3A52, #C0567A)", name: "Anonymous", timeAgo: "12 hours ago", amount: "+$75" },
      { initials: "SR", avatarGradient: "linear-gradient(135deg, #7B5EA7, #B09FD4)", name: "Sunita Rao", timeAgo: "1 day ago", amount: "+$25" },
    ],
  },

  // ── Campaign 3 ──────────────────────────────────────────────────────────────
  {
    id: 3,
    tag: "🏥 Medical",
    urgent: true,
    gradient: "linear-gradient(135deg, #8B3A52 0%, #C0567A 100%)",
    avatarGradient: "linear-gradient(135deg, #8B3A52, #C0567A)",
    initials: "PK",
    creator: "Priya Kapoor",
    title: "Spinal surgery for Rohan, 34 — accident left him paralysed",
    description: "Rohan was paralysed in a road accident. Spinal decompression surgery could restore mobility — but his family can't afford it alone.",
    raised: "$44,500",
    goal: "$50,000",
    pct: 89,
    donors: 601,
    daysLeft: 5,
    featured: true,
    saved: false,
    links: ["https://twitter.com", "https://wa.me", "https://facebook.com", "https://example.com"],
    category: "Medical",
    startedDate: "Apr 1, 2025",
    verifiedByAdmin: true,

    creatorProfile: {
      initials: "PK",
      name: "Priya Kapoor",
      avatarGradient: "linear-gradient(135deg, #8B3A52, #C0567A)",
      verified: true,
      startedDate: "Apr 1, 2025",
      followerCount: 310,
    },

    storySections: [
      {
        heading: "What happened to Rohan",
        body: "On March 18th, Rohan Kapoor — 34, a schoolteacher and father of two — was hit by a truck while commuting to work. The accident caused a T6 spinal fracture, leaving him with complete paralysis below the chest.\n\nHis neurosurgeon at NIMHANS Bangalore, Dr. Arun Menon, believes that spinal decompression surgery within the next 10 days could partially or fully restore sensation and mobility. Without surgery, paralysis will be permanent.",
        highlight: "The surgery window closes in 10 days. We are 89% funded — just $5,500 away from the goal. Please share and donate urgently.",
      },
      {
        heading: "About the surgery",
        body: "Spinal decompression and stabilisation surgery costs ₹40,00,000 (~$50,000). This includes the procedure, spinal implants, ICU care, and 6 weeks of post-operative physiotherapy. Priya has submitted all accident reports, MRI scans, and surgeon notes to DFund.",
      },
    ],

    updates: [
      {
        date: "May 3, 2025",
        title: "89% funded — almost there!",
        body: "We are so close. Just $5,500 left. Surgery is scheduled for May 8th. Please share this with everyone you know.",
      },
      {
        date: "Apr 20, 2025",
        title: "Rohan's condition stable",
        body: "Doctors confirm Rohan is stable. The surgery window is still open. Keep sharing!",
      },
      {
        date: "Apr 1, 2025",
        title: "Campaign launched",
        body: "We are reaching out urgently after Rohan's accident last month.",
      },
    ],

    comments: [
      {
        initials: "GS",
        avatarGradient: "linear-gradient(135deg, #1A6B6B, #3AAFA9)",
        name: "Geeta Sharma",
        donatedAmount: "$500",
        timeAgo: "1 hour ago",
        text: "Almost there! Donated $500. Come on everyone — $5,000 left!",
        likes: 52,
      },
      {
        initials: "TM",
        avatarGradient: "linear-gradient(135deg, #C0442A, #E8820C)",
        name: "Tarun Mehta",
        donatedAmount: "$100",
        timeAgo: "4 hours ago",
        text: "Shared with 3 WhatsApp groups. Praying for Rohan's recovery.",
        likes: 18,
      },
    ],

    recentDonors: [
      { initials: "GS", avatarGradient: "linear-gradient(135deg, #1A6B6B, #3AAFA9)", name: "Geeta Sharma", timeAgo: "1 hour ago", amount: "+$500" },
      { initials: "TM", avatarGradient: "linear-gradient(135deg, #C0442A, #E8820C)", name: "Tarun Mehta", timeAgo: "4 hours ago", amount: "+$100" },
      { initials: "A", avatarGradient: "linear-gradient(135deg, #7B5EA7, #B09FD4)", name: "Anonymous", timeAgo: "5 hours ago", amount: "+$1,000" },
      { initials: "RL", avatarGradient: "linear-gradient(135deg, #2D5A8E, #5B9BD5)", name: "Ravi Lal", timeAgo: "8 hours ago", amount: "+$250" },
      { initials: "NK", avatarGradient: "linear-gradient(135deg, #4A6741, #7DB56A)", name: "Neha Kulkarni", timeAgo: "12 hours ago", amount: "+$50" },
    ],
  },

  // ── Campaign 4 ──────────────────────────────────────────────────────────────
  {
    id: 4,
    tag: "🏥 Medical",
    gradient: "linear-gradient(135deg, #7B5EA7 0%, #B09FD4 100%)",
    avatarGradient: "linear-gradient(135deg, #7B5EA7, #B09FD4)",
    initials: "AN",
    creator: "Ananya Nair",
    title: "Dialysis costs for my mother — 3 sessions a week",
    description: "Ananya's mother needs dialysis 3 times a week. The ongoing cost is unsustainable for the family without help.",
    raised: "$7,750",
    goal: "$25,000",
    pct: 31,
    donors: 89,
    daysLeft: 24,
    featured: false,
    saved: true,
    links: ["https://twitter.com", "", "", ""],
    category: "Medical",
    startedDate: "Apr 18, 2025",
    verifiedByAdmin: true,

    creatorProfile: {
      initials: "AN",
      name: "Ananya Nair",
      avatarGradient: "linear-gradient(135deg, #7B5EA7, #B09FD4)",
      verified: true,
      startedDate: "Apr 18, 2025",
      followerCount: 43,
    },

    storySections: [
      {
        heading: "My mother's condition",
        body: "My mother, Lakshmi Nair, 61, was diagnosed with chronic kidney disease (Stage 5) two years ago. She requires haemodialysis three times a week to survive. Each session costs ₹2,500 at our local clinic — that's ₹7,500 a week, or ₹30,000 a month.\n\nMy father passed away last year, and I am her only caregiver. I work as a school teacher and my salary simply cannot cover both our living expenses and her treatment.",
        highlight: "This campaign covers 6 months of dialysis costs (~$25,000). Any surplus will go towards her medicines and follow-up care.",
      },
      {
        heading: "Why I need your help",
        body: "I have tried government schemes and local charities but the wait times are too long. My mother's condition is stable only because of dialysis — without it, she has days, not months. I am asking for your support to keep her alive while I explore long-term options including a kidney transplant.",
      },
    ],

    updates: [
      {
        date: "Apr 25, 2025",
        title: "31% funded — thank you!",
        body: "We've raised $7,750 in the first week. My mother and I are deeply grateful. Please keep sharing.",
      },
    ],

    comments: [
      {
        initials: "LP",
        avatarGradient: "linear-gradient(135deg, #C0442A, #E8820C)",
        name: "Lata Pillai",
        donatedAmount: "$30",
        timeAgo: "6 hours ago",
        text: "A small contribution from our family. Wishing Lakshmi aunty good health. 🙏",
        likes: 5,
      },
    ],

    recentDonors: [
      { initials: "LP", avatarGradient: "linear-gradient(135deg, #C0442A, #E8820C)", name: "Lata Pillai", timeAgo: "6 hours ago", amount: "+$30" },
      { initials: "A", avatarGradient: "linear-gradient(135deg, #4A6741, #7DB56A)", name: "Anonymous", timeAgo: "1 day ago", amount: "+$200" },
      { initials: "SK", avatarGradient: "linear-gradient(135deg, #2D5A8E, #5B9BD5)", name: "Suresh Kumar", timeAgo: "2 days ago", amount: "+$100" },
    ],
  },

  // ── Campaign 5 ──────────────────────────────────────────────────────────────
  {
    id: 5,
    tag: "🏥 Medical",
    gradient: "linear-gradient(135deg, #1A6B6B 0%, #3AAFA9 100%)",
    avatarGradient: "linear-gradient(135deg, #1A6B6B, #3AAFA9)",
    initials: "DV",
    creator: "Dev Verma",
    title: "Cochlear implant for Zara — give her the gift of sound",
    description: "Zara, 4, was born deaf. A cochlear implant could change her life — but it costs $30,000, far beyond her family's reach.",
    raised: "$16,800",
    goal: "$30,000",
    pct: 56,
    donors: 174,
    daysLeft: 31,
    featured: false,
    saved: false,
    links: ["https://twitter.com", "https://wa.me", "", ""],
    category: "Medical",
    startedDate: "Mar 15, 2025",
    verifiedByAdmin: true,

    creatorProfile: {
      initials: "DV",
      name: "Dev Verma",
      avatarGradient: "linear-gradient(135deg, #1A6B6B, #3AAFA9)",
      verified: true,
      startedDate: "Mar 15, 2025",
      followerCount: 205,
    },

    storySections: [
      {
        heading: "Meet Zara",
        body: "Zara is 4 years old and has been profoundly deaf since birth due to bilateral sensorineural hearing loss. She communicates through gestures and has not yet been able to learn spoken language.\n\nHer audiologist at AIIMS confirms she is an ideal candidate for a cochlear implant — the earlier the surgery, the better the language outcomes. The optimal window for her is the next 6 months.",
        highlight: "A cochlear implant, including device, surgery, and 1-year speech therapy, costs $30,000. We are 56% there. Your donation could give Zara her first words.",
      },
      {
        heading: "What the money covers",
        body: "Device cost: $18,000 (Cochlear Nucleus 8). Surgery and hospital stay: $6,000. Audiological mapping and programming (6 sessions): $2,000. Speech therapy for 12 months: $4,000.",
      },
      {
        heading: "From Dev",
        body: `"Watching Zara light up when she feels music vibrate through the floor, knowing she can't hear it — it breaks you. She deserves to hear her mother say 'I love you.' Please help us get there."`,
      },
    ],

    updates: [
      {
        date: "Apr 30, 2025",
        title: "Audiologist confirms implant suitability",
        body: "Zara's full audiological report is back. She is confirmed suitable for the Cochlear Nucleus 8 implant. Surgery can be booked once funding is complete.",
      },
      {
        date: "Mar 15, 2025",
        title: "Campaign launched",
        body: "We're starting this journey with hope. Every share matters.",
      },
    ],

    comments: [
      {
        initials: "RM",
        avatarGradient: "linear-gradient(135deg, #8B3A52, #C0567A)",
        name: "Radha Menon",
        donatedAmount: "$75",
        timeAgo: "2 days ago",
        text: "This made me cry. I have a daughter the same age. Donated and shared. Come on everyone! 💕",
        likes: 41,
      },
      {
        initials: "AT",
        avatarGradient: "linear-gradient(135deg, #2D5A8E, #5B9BD5)",
        name: "Arjun Tiwari",
        donatedAmount: null,
        timeAgo: "3 days ago",
        text: "Shared in my audiologist community group. You'll get donations from there too.",
        likes: 14,
      },
    ],

    recentDonors: [
      { initials: "RM", avatarGradient: "linear-gradient(135deg, #8B3A52, #C0567A)", name: "Radha Menon", timeAgo: "2 days ago", amount: "+$75" },
      { initials: "A", avatarGradient: "linear-gradient(135deg, #7B5EA7, #B09FD4)", name: "Anonymous", timeAgo: "3 days ago", amount: "+$500" },
      { initials: "PD", avatarGradient: "linear-gradient(135deg, #4A6741, #7DB56A)", name: "Priti Desai", timeAgo: "4 days ago", amount: "+$100" },
      { initials: "VN", avatarGradient: "linear-gradient(135deg, #C0442A, #E8820C)", name: "Vijay Nambiar", timeAgo: "5 days ago", amount: "+$50" },
    ],
  },

  // ── Campaign 6 ──────────────────────────────────────────────────────────────
  {
    id: 6,
    tag: "🏥 Medical",
    gradient: "linear-gradient(135deg, #4A6741 0%, #7DB56A 100%)",
    avatarGradient: "linear-gradient(135deg, #4A6741, #7DB56A)",
    initials: "RG",
    creator: "Riya Ghosh",
    title: "Bone marrow transplant for Kabir, 9 years old",
    description: "Kabir has aplastic anaemia. A bone marrow transplant is his only cure — and a matching donor has been found. Help fund the procedure.",
    raised: "$57,750",
    goal: "$75,000",
    pct: 77,
    donors: 823,
    daysLeft: 9,
    featured: true,
    saved: false,
    links: ["", "", "", ""],
    category: "Medical",
    startedDate: "Mar 5, 2025",
    verifiedByAdmin: true,

    creatorProfile: {
      initials: "RG",
      name: "Riya Ghosh",
      avatarGradient: "linear-gradient(135deg, #4A6741, #7DB56A)",
      verified: true,
      startedDate: "Mar 5, 2025",
      followerCount: 489,
    },

    storySections: [
      {
        heading: "Kabir's fight",
        body: "Kabir Ghosh, 9, was diagnosed with severe aplastic anaemia 14 months ago. His bone marrow has stopped producing blood cells, requiring frequent transfusions to keep him alive. His younger sister Nia has been found to be a 10/10 HLA match — a rare and fortunate development.\n\nHis transplant physician at Tata Medical Centre, Dr. Shyam Aggarwal, has cleared him for the procedure. The transplant must happen within 30 days of conditioning therapy, which begins next week.",
        highlight: "The total cost of the bone marrow transplant including conditioning, transplant, 60-day isolation, and follow-up is $75,000. We are 77% there — $17,250 remains.",
      },
      {
        heading: "Breakdown of costs",
        body: "Conditioning chemotherapy (7 days): $8,000. Bone marrow harvesting from donor: $5,000. Transplant procedure: $20,000. 60-day isolation room and nursing: $28,000. Post-transplant medications and 6-month follow-up: $14,000.",
      },
      {
        heading: "From Riya",
        body: `"Kabir draws comics in his hospital bed. His latest one is about a superhero who defeats 'the bad blood.' He doesn't know how close we are to running out of options. Please help us write a better ending to his story."`,
      },
    ],

    updates: [
      {
        date: "May 4, 2025",
        title: "Conditioning therapy begins Monday",
        body: "Kabir's conditioning chemotherapy begins this Monday. We have 9 days and $17,250 left to raise. Please share urgently.",
      },
      {
        date: "Apr 15, 2025",
        title: "Donor match confirmed!",
        body: "Incredible news — Kabir's sister Nia is a perfect HLA match. Transplant is now possible. We are accelerating the campaign.",
      },
      {
        date: "Mar 5, 2025",
        title: "Campaign launched",
        body: "Launching with the hope of our community behind us.",
      },
    ],

    comments: [
      {
        initials: "BB",
        avatarGradient: "linear-gradient(135deg, #C0442A, #E8820C)",
        name: "Bindu Bose",
        donatedAmount: "$300",
        timeAgo: "30 minutes ago",
        text: "We're so close! Just donated $300. Everyone please share — 9 days left!!",
        likes: 67,
      },
      {
        initials: "SA",
        avatarGradient: "linear-gradient(135deg, #7B5EA7, #B09FD4)",
        name: "Sanjay Agarwal",
        donatedAmount: "$1,000",
        timeAgo: "3 hours ago",
        text: "Donated $1,000. Kabir's story got to me. Come on people — let's get this done today.",
        likes: 89,
      },
      {
        initials: "MG",
        avatarGradient: "linear-gradient(135deg, #1A6B6B, #3AAFA9)",
        name: "Meena Gupta",
        donatedAmount: null,
        timeAgo: "5 hours ago",
        text: "Shared across Twitter, Instagram and my company Slack. Go Kabir! 🦸",
        likes: 23,
      },
    ],

    recentDonors: [
      { initials: "BB", avatarGradient: "linear-gradient(135deg, #C0442A, #E8820C)", name: "Bindu Bose", timeAgo: "30 min ago", amount: "+$300" },
      { initials: "SA", avatarGradient: "linear-gradient(135deg, #7B5EA7, #B09FD4)", name: "Sanjay Agarwal", timeAgo: "3 hours ago", amount: "+$1,000" },
      { initials: "A", avatarGradient: "linear-gradient(135deg, #4A6741, #7DB56A)", name: "Anonymous", timeAgo: "4 hours ago", amount: "+$500" },
      { initials: "PV", avatarGradient: "linear-gradient(135deg, #2D5A8E, #5B9BD5)", name: "Poonam Verma", timeAgo: "6 hours ago", amount: "+$150" },
      { initials: "AJ", avatarGradient: "linear-gradient(135deg, #8B3A52, #C0567A)", name: "Anil Joshi", timeAgo: "8 hours ago", amount: "+$75" },
    ],
  },
];