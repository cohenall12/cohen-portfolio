export type TerminalLine =
  | { p: string; c: string; delay?: number; blink?: boolean }
  | { o: string };

export type Project = {
  id: string;
  name: string;
  tag: string[];
  type: string;
  status: string;
  desc: string;
  details: string;
  image?: string;
};

export type Pillar = { tag: string; line: string };

export type TimelineEntry = {
  date: string;
  title: string;
  sub: string;
  location?: string;
};

export type ContactAction = { label: string; href: string; primary?: boolean };

export type PortfolioData = {
  name: string;
  initials: string;
  location: string;
  email: string;
  github: string;
  linkedin: string;
  cvHref: string;
  hero: {
    eyebrow: string;
    headline: string;
    sub: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
    tertiaryCta: { label: string; href: string };
  };
  terminalLines: TerminalLine[];
  current: { title: string; body: string; pillars: Pillar[] };
  projects: Project[];
  stack: { using: string[]; base: string[] };
  about: string;
  experience: TimelineEntry[];
  education: TimelineEntry[];
  contact: { title: string; body: string; actions: ContactAction[] };
};

export const PORTFOLIO: PortfolioData = {
  name: "Cohen Allingham",
  initials: "CA",
  location: "Christchurch, NZ",
  email: "cohen.allingham@gmail.com",
  github: "github.com/cohenall12",
  linkedin: "linkedin.com/in/cohenallingham",
  cvHref: "#",

  hero: {
    eyebrow: "Cohen Allingham",
    headline: "Mechatronics + AI systems.",
    sub: "I build useful systems. Automations, prototypes, and the embedded work behind them. Mostly I'm just curious about how things fit together.",
    primaryCta: { label: "Contact me", href: "#contact" },
    secondaryCta: { label: "View projects", href: "#work" },
    tertiaryCta: { label: "Download CV", href: "#" },
  },

  terminalLines: [
    { p: "$ ", c: "whoami", delay: 280 },
    { o: "cohen.allingham — mechatronics + ai systems" },
    { p: "$ ", c: "cat ~/now.txt", delay: 520 },
    { o: "studying mechatronics at UC." },
    { o: "building AI automations, web app prototypes," },
    { o: "and engineering projects." },
    { p: "$ ", c: "ls ~/projects/", delay: 520 },
    { o: "n8n-workflows  scale-mate  sass-a-thon  line-follower  uni-projects" },
    { p: "$ ", c: "cat ~/focus.txt", delay: 520 },
    { o: "useful systems · practical automation · engineering thinking" },
    { p: "$ ", c: "_", blink: true, delay: 480 },
  ],

  current: {
    title: "Current focus",
    body: "I'm building practical AI automation systems and prototypes that turn messy work into clearer workflows. Recent work includes n8n automations, internal tools, and AI-assisted web app builds. The goal is simple: make useful systems that are easy for real people to use.",
    pillars: [
      { tag: "Automation", line: "n8n workflows that connect tools and remove manual admin." },
      { tag: "Prototypes", line: "AI-assisted web app builds that move quickly from idea to usable product." },
      { tag: "Engineering", line: "Mechatronics coursework and projects across hardware and embedded software." },
    ],
  },

  projects: [
    {
      id: "speed-to-lead",
      name: "Speed-to-Lead",
      tag: ["n8n", "OpenAI", "Notion API", "Gmail"],
      type: "AI / Automation",
      status: "2026",
      desc: "A real estate speed to lead system I built in n8n. The demo that won my first client. Now being deployed as a custom system for him.",
      details: "Built in n8n for a real estate use case. A new enquiry comes in through a Tally form, gets qualified by an LLM agent against the lead criteria, has its address validated, gets checked against the existing Notion CRM for duplicates, and triggers a follow up sequence that branches by urgency. The agent gets an internal email straight away, the lead gets an acknowledgement, and the CRM updates itself. Most of the work was making the deterministic parts deterministic. The LLM only handles the qualification step, where judgment is actually needed. Everything else, the routing, the CRM writes, the duplicate logic, the urgency split, runs on plain logic so it can never randomly fail or hallucinate. This was the demo I used to win my first client. I am now building a separate production deployment for them.",
      image: "/images/speed-to-lead.png",
    },
    {
      id: "scalemate",
      name: "ScaleMate",
      tag: ["React Native", "Expo", "Supabase", "TypeScript"],
      type: "AI / Software",
      status: "Apr 2026",
      desc: "A weight tracking app I built in around 10 days. It handles cases most trackers miss, like GLP-1 users, menstrual cycles, and thyroid conditions.",
      details: "Built end to end in about 10 days. React Native and Expo on the front, Supabase Postgres on the back with row level security, login, onboarding, a tab-based main app, and a personalized insights layer. Runs on iOS and Android through Expo Go. I made every product and architecture call and Claude Code wrote most of the actual code under my direction. The interesting bit was the insights layer. Most weight apps assume down is good and up is bad, which falls apart for anyone on GLP-1s, with a thyroid condition, or whose weight tracks their cycle. I went with plain rules instead of an LLM so the logic stays explainable and costs nothing to run.",
      image: "/images/scalemate.jpg",
    },
    {
      id: "ladder",
      name: "Ladder",
      tag: ["Next.js", "Supabase", "OpenAI", "Gmail API"],
      type: "AI / Software",
      status: "Entre SaaSathon · 2026",
      desc: "An AI career tool built at the Entre SaaSathon. It ranks live internship and graduate roles against your CV, syncs Gmail into a Kanban tracker, and runs voice driven interview prep.",
      details: "Built over a weekend at the Entre SaaSathon in a team environment with complete version control. Ladder scans a CV, ranks live internship and graduate roles against it, explains why each role fits, syncs Gmail to turn application emails into a Kanban tracker, and runs voice driven interview prep that gets graded on the fly. The interesting work was figuring out where AI actually earned its place. We did not want it to just be 'chat with your applications'. The useful version turned out to be four narrow jobs with clear inputs and outputs. Parse a CV. Compare to listings. Classify emails. Generate company specific prep. Built on Next.js, Supabase, OpenRouter, and Gmail OAuth. Biggest lesson was that scope beats feature count. The product got better every time we made the demo path simpler.",
      image: "/images/ladder.png",
    },
    {
      id: "step-counter",
      name: "STM32 Step Counter",
      tag: ["Embedded C", "STM32", "SPI / I2C", "FSM"],
      type: "Mechatronics",
      status: "UC · 2025",
      desc: "A step counter built on an STM32 Cortex-M0+ with an OLED display, joystick UI, and five state interface. ",
      details: "An embedded project using an STM32C071 nucleo board, an LSM6DS3TR-C IMU over SPI, and an SSD1306 OLED display over I2C. The IMU handles the actual step detection in hardware and pulses an interrupt line each time a step is registered. The interesting work was everything around that. A custom task scheduler running display updates, joystick polling, button polling, and LED progress at different frequencies. A five state GUI finite state machine for switching between current steps, distance, goal progression, a goal setting mode driven by the potentiometer, and a test mode. A layered architecture where tasks never touch hardware directly, they call peripheral drivers, which call the HAL.",
      image: "/images/step-counter.png",
    },
    {
      id: "linefollow",
      name: "Line-Following Robot",
      tag: ["Embedded", "PCB Design", "SolidWorks", "Control Systems"],
      type: "Mechatronics",
      status: "UC · 2025",
      desc: "An autonomous line-following robot. Custom PCB sensor array, SolidWorks chassis, embedded control loop on AAs.",
      details: "A mechatronics build pairing five custom-designed IR reflectance sensor PCBs with a SolidWorks designed 3D printed chassis and an Arduino-based control loop. Most of the engineering work was in tuning the response curve so the robot stays smooth on tight corners without overshooting the line. Designed the PCB, the chassis, and the control code, then assembled, soldered, and tested in the lab. The highlight group project of second year.",
      image: "/images/linefollow.jpg",
    },
    {
      id: "elevator-plc",
      name: "Elevator PLC",
      tag: ["PLC", "CX-Programmer", "State Machines", "PID Control"],
      type: "Mechatronics",
      status: "UC · 2025",
      desc: "A PLC controlled elevator with state machine logic, PID floor positioning, and a custom scheduling algorithm. Built and tested on a full size rig.",
      details: "Designed and tested a PLC program for a full size elevator rig using CX-Programmer. Mix of ladder logic and Structured Text, organised around a state machine that keeps door and carriage movement mutually exclusive. The most useful thing I took away was when each control term actually earns its place. The system used a PI controlled rather than PID because the floor positions are fixed after calibration, so there is nothing to predict. Gains were tuned differently for up and down directions because gravity and friction are not symmetric. Team project where I focused on the scheduling algorithm and the state machine architecture.",
      image: "/images/elevator-plc.jpg",
    },
  ],

  stack: {
    using: [
      "Embedded C",
      "STM32",
      "n8n",
      "Python",
      "TypeScript / JavaScript",
      "OpenAI / LLM tools",
      "Git",
    ],
    base: [
      "Mechatronics",
      "Embedded C (coursework)",
      "CAD / mechanical design",
      "Sensors & control fundamentals",
      "Electronics fundamentals",
    ],
  },

  about:
    "I like building things that sit between software and the physical world: automations, prototypes, robotics, and systems that make work less manual. My mechatronics degree gives me the engineering base; my AI automation work gives me practical reps turning messy ideas into working tools.",

  experience: [
    {
      date: "Mar 2026 — present",
      title: "Building Speed-to-Lead production version",
      sub: "Building out the n8n speed to lead system as a paid engagement with my first client.",
    },
    {
      date: "Nov 2025 — Feb 2026",
      title: "Engineering Intern, Davin Industries",
      sub: "Sheet metal design and CNC manufacturing internship. Developed and refined sheet metal component designs in CAD with proper geometric tolerancing and design for manufacture principles, then programmed TRUMPF CNC machinery for laser cutting and bending. Spent the internship moving designs from engineering drawings through to manufactured parts and got a real feel for the production side, scheduling, quality control, and the manufacturing constraints that change how you draw things in the first place.",
      location: "Christchurch, NZ",
    },
    {
      date: "Jul 2021 — present",
      title: "FOH crew, The Laboratory Brew Pub",
      sub: "Barista, bartender, server. Five years of consistent work alongside study.",
      location: "Lincoln, NZ",
    },
  ],

  education: [
    {
      date: "2024 — 2027",
      title: "BE(Hons) Mechatronics, University of Canterbury",
      sub: "GPA 8.19. Coursework includes control systems, embedded systems, mechatronics design, digital electronics, linear algebra and statistics, stress strain and dynamics.",
    },
    {
      date: "2023",
      title: "NCEA Level 3, Lincoln High School",
      sub: "Merit endorsement.",
    },
  ],

  contact: {
    title: "Contact",
    body: "Want to talk about AI systems, automation, engineering projects, or something you think I should see? Send me a message.",
    actions: [
      { label: "Email", href: "mailto:cohen.allingham@gmail.com", primary: true },
      { label: "LinkedIn", href: "https://linkedin.com/in/cohenallingham" },
      { label: "GitHub", href: "https://github.com/cohenall12" },
      { label: "Download CV", href: "#" },
    ],
  },
};

export type Theme = {
  bg: string;
  surface: string;
  panel: string;
  ink: string;
  inkSoft: string;
  muted: string;
  softer: string;
  quiet: string;
  hair: string;
  hairStrong: string;
  accent: string;
  termBg: string;
  termHead: string;
  termFg: string;
  termAccent: string;
  termMuted: string;
};

export const THEME: Theme = {
  bg: "#fafaf9",
  surface: "#ffffff",
  panel: "#f4f3ef",
  ink: "#18181b",
  inkSoft: "#27272a",
  muted: "#525252",
  softer: "#71717a",
  quiet: "#a1a1aa",
  hair: "rgba(24,24,27,0.10)",
  hairStrong: "rgba(24,24,27,0.18)",
  accent: "#18181b",
  termBg: "#0e0e10",
  termHead: "#1a1a1d",
  termFg: "#e8e8e6",
  termAccent: "#8bd2c4",
  termMuted: "rgba(232,232,230,0.55)",
};
