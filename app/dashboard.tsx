"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import OllamaSupport from "./ollama-support";

type IconName =
  | "grid"
  | "book"
  | "flask"
  | "layers"
  | "database"
  | "people"
  | "settings"
  | "search"
  | "bell"
  | "chevron"
  | "arrow"
  | "clock"
  | "play"
  | "calendar"
  | "spark"
  | "menu"
  | "close";

function Icon({
  name,
  size = 18,
}: {
  name: IconName;
  size?: number;
}) {
  const paths: Record<IconName, React.ReactNode> = {
    grid: (
      <>
        <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
        <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
        <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
        <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" />
      </>
    ),
    book: (
      <>
        <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5z" />
        <path d="M4 5.5v16M8 7h8M8 11h7" />
      </>
    ),
    flask: (
      <>
        <path d="M9 3h6M10 3v6.2L5.5 17a2 2 0 0 0 1.7 3h9.6a2 2 0 0 0 1.7-3L14 9.2V3" />
        <path d="M8 15h8" />
      </>
    ),
    layers: (
      <>
        <path d="m12 3 9 5-9 5-9-5 9-5Z" />
        <path d="m3 12 9 5 9-5M3 16l9 5 9-5" />
      </>
    ),
    database: (
      <>
        <ellipse cx="12" cy="5" rx="8" ry="3" />
        <path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5" />
        <path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />
      </>
    ),
    people: (
      <>
        <path d="M16 20v-1.5a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4V20" />
        <circle cx="9.5" cy="7.5" r="3.5" />
        <path d="M17 11a3.5 3.5 0 0 0 0-7M21 20v-1.5a4 4 0 0 0-3-3.87" />
      </>
    ),
    settings: (
      <>
        <circle cx="12" cy="12" r="3" />
        <path d="m19.4 15 .1.1 1.4 1.1-1.4 2.4-1.7-.7a8 8 0 0 1-1.5.9l-.3 1.8h-2.8l-.3-1.8a8 8 0 0 1-1.5-.9l-1.7.7-1.4-2.4 1.4-1.1a7 7 0 0 1 0-1.8l-1.4-1.1 1.4-2.4 1.7.7a8 8 0 0 1 1.5-.9l.3-1.8h2.8l.3 1.8a8 8 0 0 1 1.5.9l1.7-.7 1.4 2.4-1.4 1.1a7 7 0 0 1 0 1.7Z" />
      </>
    ),
    search: (
      <>
        <circle cx="10.8" cy="10.8" r="6.8" />
        <path d="m16 16 4.5 4.5" />
      </>
    ),
    bell: (
      <>
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" />
        <path d="M10 21h4" />
      </>
    ),
    chevron: <path d="m7 10 5 5 5-5" />,
    arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    play: <path d="m9 6 10 6-10 6z" />,
    calendar: (
      <>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M16 3v4M8 3v4M3 10h18" />
      </>
    ),
    spark: (
      <>
        <path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" />
        <path d="m19 16 .8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z" />
      </>
    ),
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    close: <path d="m6 6 12 12M18 6 6 18" />,
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

const navigation: { label: string; id: string; icon: IconName }[] = [
  { label: "Overview", id: "overview", icon: "grid" },
  { label: "Project demos", id: "projects", icon: "layers" },
  { label: "Dataset sources", id: "datasets", icon: "database" },
  { label: "My learning", id: "learning", icon: "book" },
  { label: "Career labs", id: "labs", icon: "flask" },
  { label: "Community", id: "community", icon: "people" },
];

const courses = [
  {
    category: "PRODUCT DESIGN",
    title: "Product thinking for builders",
    instructor: "Aarav Menon",
    lessons: "8 of 12 lessons",
    duration: "4h 20m",
    progress: 68,
    art: "product",
    initials: "AM",
  },
  {
    category: "AI & ETHICS",
    title: "Shipping AI products responsibly",
    instructor: "Maya Chen",
    lessons: "4 of 10 lessons",
    duration: "2h 40m",
    progress: 32,
    art: "ai",
    initials: "MC",
  },
  {
    category: "ENGINEERING",
    title: "Systems design in practice",
    instructor: "Ibrahim Khan",
    lessons: "10 of 12 lessons",
    duration: "5h 10m",
    progress: 84,
    art: "systems",
    initials: "IK",
  },
];

type Project = {
  id: string;
  title: string;
  category: string;
  level: string;
  duration: string;
  modules: number;
  progress: number;
  art: string;
  artLabel: string;
  description: string;
  brief: string;
  stack: string[];
  outcomes: string[];
  milestones: string[];
};

const projects: Project[] = [
  {
    id: "research-assistant",
    title: "Build a local AI research assistant",
    category: "AI & ML",
    level: "Intermediate",
    duration: "4.5 hours",
    modules: 6,
    progress: 38,
    art: "research",
    artLabel: "LOCAL AI",
    description:
      "Create a private, source-aware assistant that can search and explain a library of documents.",
    brief:
      "Students and teams lose time searching through long reports. Build a local-first assistant that indexes documents, retrieves useful passages, and answers with clear source references.",
    stack: ["Next.js", "Ollama", "Embeddings", "RAG"],
    outcomes: [
      "Prepare and chunk source documents for retrieval.",
      "Connect a local language model with Ollama.",
      "Build a grounded answer flow with source references.",
    ],
    milestones: [
      "Map the user problem and define a useful research workflow.",
      "Build document ingestion and semantic search.",
      "Connect Ollama and return cited answers.",
      "Test quality, privacy, and edge cases.",
    ],
  },
  {
    id: "maker-marketplace",
    title: "Launch a marketplace for makers",
    category: "Web development",
    level: "Beginner",
    duration: "3 hours",
    modules: 5,
    progress: 72,
    art: "marketplace",
    artLabel: "MAKER MARKET",
    description:
      "Design a welcoming storefront that helps independent creators showcase and sell their work.",
    brief:
      "Independent makers need a simple way to present their work and reach buyers. Create a responsive marketplace experience with clear discovery, creator profiles, and product storytelling.",
    stack: ["React", "TypeScript", "CSS", "Figma"],
    outcomes: [
      "Structure a browsable catalog and product detail experience.",
      "Build reusable, accessible interface components.",
      "Use responsive layouts to support mobile shoppers.",
    ],
    milestones: [
      "Define creator and buyer needs.",
      "Create the marketplace information architecture.",
      "Build the catalog and product detail screens.",
      "Review the experience on desktop and mobile.",
    ],
  },
  {
    id: "support-insights",
    title: "Turn support tickets into insights",
    category: "Data & analytics",
    level: "Intermediate",
    duration: "3.5 hours",
    modules: 5,
    progress: 0,
    art: "insights",
    artLabel: "SIGNAL / NOISE",
    description:
      "Explore service patterns in a sample ticket dataset and turn them into a useful team dashboard.",
    brief:
      "A growing support team needs to spot recurring customer problems early. Analyze a sample ticket dataset, identify common themes, and present an actionable view of service health.",
    stack: ["Python", "Pandas", "SQL", "Data viz"],
    outcomes: [
      "Clean and inspect a real-world shaped dataset.",
      "Identify recurring issues and meaningful trends.",
      "Design a dashboard around decisions, not decoration.",
    ],
    milestones: [
      "Inspect and clean the sample ticket data.",
      "Explore volume, resolution time, and topic trends.",
      "Build a concise support-health dashboard.",
      "Present two evidence-backed recommendations.",
    ],
  },
  {
    id: "onboarding-flow",
    title: "Design an onboarding flow that converts",
    category: "Product design",
    level: "Beginner",
    duration: "2.5 hours",
    modules: 4,
    progress: 0,
    art: "onboarding",
    artLabel: "FIRST VALUE",
    description:
      "Help a new user reach their first useful outcome with less friction and more confidence.",
    brief:
      "A product has strong sign-ups but few users complete setup. Rework the onboarding journey to reduce uncertainty, show value sooner, and give the team clear validation signals.",
    stack: ["Figma", "User research", "Prototyping", "Analytics"],
    outcomes: [
      "Translate user friction into testable design opportunities.",
      "Map and prototype a focused onboarding journey.",
      "Choose product signals that measure activation.",
    ],
    milestones: [
      "Review a sample funnel and user feedback.",
      "Identify the highest-impact point of friction.",
      "Prototype a clearer first-run experience.",
      "Define an experiment to evaluate the redesign.",
    ],
  },
  {
    id: "campus-connect",
    title: "Create a campus community hub",
    category: "Web development",
    level: "Intermediate",
    duration: "4 hours",
    modules: 6,
    progress: 0,
    art: "community",
    artLabel: "FIND YOUR PEOPLE",
    description:
      "Build a small event and interest hub that makes it easier for students to find their people.",
    brief:
      "Students miss events and struggle to find peers with shared interests. Prototype a community hub with searchable events, interest groups, and a simple RSVP journey.",
    stack: ["Next.js", "TypeScript", "React", "UX"],
    outcomes: [
      "Model useful events, groups, and attendee states.",
      "Build a searchable, keyboard-friendly discovery flow.",
      "Create clear empty, loading, and success states.",
    ],
    milestones: [
      "Choose a target student group and core use case.",
      "Design the event and interest discovery experience.",
      "Build event cards, filters, and RSVP states.",
      "Test the main journey with a peer.",
    ],
  },
  {
    id: "finance-dashboard",
    title: "Build a personal finance dashboard",
    category: "Data & analytics",
    level: "Beginner",
    duration: "3 hours",
    modules: 5,
    progress: 0,
    art: "finance",
    artLabel: "MONEY, MADE CLEAR",
    description:
      "Turn a month of sample transactions into an approachable view of spending and savings.",
    brief:
      "People often know they want to save but have a hard time seeing where their money goes. Build a clear dashboard that groups spending, tracks a savings goal, and avoids overwhelming the user.",
    stack: ["React", "JavaScript", "Charts", "Product"],
    outcomes: [
      "Transform transaction records into meaningful categories.",
      "Visualize spending patterns and a savings target.",
      "Present personal financial information with care.",
    ],
    milestones: [
      "Review and categorize the sample transactions.",
      "Sketch a useful monthly overview.",
      "Build spending and savings visualizations.",
      "Check readability and accessible color contrast.",
    ],
  },
];

const projectCategories = [
  "All projects",
  "AI & ML",
  "Web development",
  "Data & analytics",
  "Product design",
];

const datasetSources = [
  {
    name: "Kaggle Datasets",
    label: "COMMUNITY DATA",
    initials: "K",
    description:
      "Community-shared datasets for analytics, machine learning, and project practice.",
    url: "https://www.kaggle.com/datasets",
  },
  {
    name: "Hugging Face Datasets",
    label: "AI & ML",
    initials: "HF",
    description:
      "Discover ML-ready text, image, audio, document, and tabular datasets.",
    url: "https://huggingface.co/datasets",
  },
  {
    name: "UCI Machine Learning Repository",
    label: "RESEARCH DATA",
    initials: "UCI",
    description:
      "A long-running collection of datasets for learning and research.",
    url: "https://archive.ics.uci.edu/datasets",
  },
  {
    name: "Google Dataset Search",
    label: "DATA DISCOVERY",
    initials: "G",
    description:
      "Search dataset listings from universities, publishers, and public sources.",
    url: "https://datasetsearch.research.google.com/",
  },
  {
    name: "OpenML",
    label: "OPEN SCIENCE",
    initials: "OML",
    description:
      "Find shareable datasets and benchmark tasks for reproducible experiments.",
    url: "https://www.openml.org/search?type=data",
  },
  {
    name: "Data.gov",
    label: "PUBLIC DATA",
    initials: "US",
    description:
      "Explore U.S. government open data across topics and agencies.",
    url: "https://data.gov/",
  },
];

const tutorSiteReference = [
  "COURSE CATALOG",
  ...courses.map(
    (course) =>
      `${course.title} (${course.category}) — ${course.instructor}; ${course.lessons}; ${course.duration}; ${course.progress}% progress.`,
  ),
  "COMPLETE PROJECT DEMOS",
  ...projects.map((project) =>
    [
      `${project.title} — ${project.category}, ${project.level}, ${project.duration}, ${project.modules} modules.`,
      project.description,
      `Brief: ${project.brief}`,
      `Tools: ${project.stack.join(", ")}`,
      `Learning outcomes: ${project.outcomes.join(" ")}`,
      `Milestones: ${project.milestones.join(" ")}`,
      `Current sample progress: ${project.progress}%.`,
    ].join("\n"),
  ),
  "DATASET SOURCES",
  ...datasetSources.map(
    (source) => `${source.name} (${source.label}): ${source.description} ${source.url}`,
  ),
].join("\n\n");

function Brand() {
  return (
    <a className="brand" href="#overview" aria-label="StageVerge Learn overview">
      <span className="brand-mark">S</span>
      <span className="brand-name">
        stageverge<span>learn</span>
      </span>
    </a>
  );
}

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState("overview");
  const [search, setSearch] = useState("");
  const [projectCategory, setProjectCategory] = useState("All projects");
  const [menuOpen, setMenuOpen] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [pageProgress, setPageProgress] = useState(0);
  const [startedProjects, setStartedProjects] = useState<string[]>(() =>
    projects.filter((project) => project.progress > 0).map((project) => project.id),
  );
  const [today, setToday] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setToday(
      new Date()
        .toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
        })
        .toUpperCase(),
    );

    function focusSearch(event: KeyboardEvent) {
      const target = event.target;
      const isTyping =
        target instanceof HTMLElement &&
        (target.isContentEditable ||
          ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName));
      if (event.key === "/" && !isTyping && !event.metaKey && !event.ctrlKey) {
        event.preventDefault();
        searchRef.current?.focus();
      }
      if (event.key === "Escape") {
        setSelectedProject(null);
        setMenuOpen(false);
        setSupportOpen(false);
      }
    }

    window.addEventListener("keydown", focusSearch);
    return () => window.removeEventListener("keydown", focusSearch);
  }, []);

  useEffect(() => {
    let frame = 0;
    const updateProgress = () => {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress =
        maxScroll > 0
          ? Math.round((window.scrollY / maxScroll) * 100)
          : 0;
      setPageProgress(Math.max(0, Math.min(100, progress)));
    };
    const scheduleUpdate = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  useEffect(() => {
    if (!selectedProject) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProject]);

  const filteredCourses = useMemo(
    () =>
      courses.filter((course) =>
        `${course.title} ${course.category} ${course.instructor}`
          .toLowerCase()
          .includes(search.toLowerCase()),
      ),
    [search],
  );

  const filteredProjects = useMemo(
    () =>
      projects.filter((project) => {
        const matchesCategory =
          projectCategory === "All projects" ||
          project.category === projectCategory;
        const matchesSearch =
          `${project.title} ${project.category} ${project.level} ${project.description} ${project.stack.join(" ")}`
            .toLowerCase()
            .includes(search.toLowerCase());
        return matchesCategory && matchesSearch;
      }),
    [projectCategory, search],
  );

  function startProject(projectId: string) {
    setStartedProjects((current) =>
      current.includes(projectId) ? current : [...current, projectId],
    );
  }

  return (
    <div className="app-shell">
      <aside className={`sidebar${menuOpen ? " sidebar-open" : ""}`}>
        <div className="sidebar-top">
          <Brand />
          <button
            className="icon-button sidebar-close"
            type="button"
            onClick={() => setMenuOpen(false)}
            aria-label="Close navigation"
          >
            <Icon name="close" />
          </button>
          <div className="workspace-switcher">
            <span className="workspace-avatar">S</span>
            <span className="workspace-copy">
              <span>Workspace</span>
              <strong>StageVerge Academy</strong>
            </span>
            <Icon name="chevron" size={15} />
          </div>
          <p className="nav-label">LEARNING SPACE</p>
          <nav className="side-nav" aria-label="Learning space">
            {navigation.map((item) => (
              <a
                className={`side-nav-link${activeSection === item.id ? " active" : ""}`}
                href={`#${item.id}`}
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  setMenuOpen(false);
                }}
              >
                <Icon name={item.icon} size={18} />
                <span>{item.label}</span>
                {item.id === "community" && <span className="nav-count">3</span>}
              </a>
            ))}
          </nav>

          <div className="sidebar-page-progress">
            <div className="sidebar-page-progress-heading">
              <span>PAGE PROGRESS</span>
              <strong>{pageProgress}%</strong>
            </div>
            <div
              className="sidebar-page-progress-track"
              role="progressbar"
              aria-label="Page scroll progress"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={pageProgress}
            >
              <span style={{ width: `${pageProgress}%` }} />
            </div>
            <p>Scroll or choose a section to explore</p>
          </div>

          <div className="sidebar-progress">
            <div className="progress-card-heading">
              <span className="progress-icon">
                <Icon name="spark" size={15} />
              </span>
              <span>YOUR MOMENTUM</span>
            </div>
            <strong>5 day streak</strong>
            <p>You&apos;re building a great habit. Keep it going.</p>
            <div className="streak-days" aria-label="Five day learning streak">
              {["M", "T", "W", "T", "F", "S", "S"].map((day, index) => (
                <span className={index < 5 ? "complete" : ""} key={index}>
                  {index < 5 ? "✓" : day}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="sidebar-bottom">
          <button
            className="side-nav-link"
            type="button"
            onClick={() => {
              setMenuOpen(false);
              setSupportOpen(true);
            }}
          >
            <Icon name="spark" size={18} />
            <span>AI tutor</span>
          </button>
          <div className="profile-card">
            <span className="profile-avatar">AM</span>
            <span className="profile-copy">
              <strong>Alex Morgan</strong>
              <span>Product builder</span>
            </span>
            <Icon name="chevron" size={15} />
          </div>
        </div>
      </aside>

      <div className="main-shell">
        <div className="page-scroll-progress" aria-hidden="true">
          <span style={{ width: `${pageProgress}%` }} />
        </div>
        <header className="topbar">
          <div className="topbar-left">
            <button
              className="icon-button mobile-menu"
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open navigation"
            >
              <Icon name="menu" />
            </button>
            <div className="breadcrumbs">
              <span>Learning space</span>
              <span className="breadcrumb-divider">/</span>
              <strong>
                {navigation.find((item) => item.id === activeSection)?.label ??
                  "Overview"}
              </strong>
            </div>
          </div>
          <div className="topbar-actions">
            <label className="search-field">
              <Icon name="search" size={17} />
              <input
                ref={searchRef}
                type="search"
                placeholder="Search projects & courses..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                aria-label="Search projects and courses"
              />
              <kbd>/</kbd>
            </label>
            <span className="topbar-divider" />
            <button
              className="icon-button notification-button"
              type="button"
              aria-label="Notifications"
            >
              <Icon name="bell" size={19} />
              <span />
            </button>
            <span className="topbar-avatar">AM</span>
          </div>
        </header>

        <main className="dashboard-main" id="overview">
          <div className="page-heading">
            <div>
              <p className="overline">{today || "YOUR LEARNING SPACE"}</p>
              <h1>
                Good morning, Alex<span className="heading-period">.</span>
              </h1>
              <p className="page-subtitle">
                A little progress each day adds up to big results.
              </p>
            </div>
            <a className="term-pill" href="#community">
              <span className="term-dot" />
              Fall term <span className="term-separator">·</span> 2026
              <Icon name="chevron" size={15} />
            </a>
          </div>

          <div className="dashboard-grid">
            <div className="primary-column">
              <section className="featured-course" aria-labelledby="featured-title">
                <div className="featured-copy">
                  <span className="featured-label">
                    <span className="live-dot" />
                    PROJECT DEMO · MENTOR-GUIDED BUILD
                  </span>
                  <h2 id="featured-title">
                    Build an AI
                    <br />
                    research assistant<span>.</span>
                  </h2>
                  <p>
                    Turn a library of documents into a private, source-aware
                    learning companion with Ollama.
                  </p>
                  <div className="featured-meta">
                    <span>
                      <Icon name="book" size={15} /> 6 project modules
                    </span>
                    <span className="meta-divider" />
                    <span>
                      <Icon name="clock" size={15} /> 38% complete
                    </span>
                  </div>
                  <button
                    className="featured-cta"
                    type="button"
                    onClick={() => setSelectedProject(projects[0])}
                  >
                    Explore project demo <Icon name="arrow" size={16} />
                  </button>
                  <div className="featured-progress">
                    <span style={{ width: "38%" }} />
                  </div>
                </div>
                <div className="featured-art" aria-hidden="true">
                  <div className="orbit orbit-one" />
                  <div className="orbit orbit-two" />
                  <div className="art-glow" />
                  <div className="art-core">
                    <span className="core-ring" />
                    <span className="core-dot" />
                  </div>
                  <span className="art-tag art-tag-top">LOCAL AI</span>
                  <span className="art-tag art-tag-bottom">BUILD · TEST · SHIP</span>
                  <span className="art-spark art-spark-one">✳</span>
                  <span className="art-spark art-spark-two">✦</span>
                </div>
                <span className="featured-index">01 / FEATURED PROJECT DEMO</span>
              </section>

              <section className="stats-grid" aria-label="Learning statistics">
                <article className="stat-card">
                  <span className="stat-icon stat-violet">
                    <Icon name="clock" size={18} />
                  </span>
                  <div>
                    <p>Learning time</p>
                    <strong>12.5<span> hrs</span></strong>
                    <span className="stat-caption">
                      <span className="positive">+2.4 hrs</span> this week
                    </span>
                  </div>
                  <span className="stat-sparkline sparkline-violet" aria-hidden="true">
                    <i /><i /><i /><i /><i /><i /><i /><i />
                  </span>
                </article>
                <article className="stat-card">
                  <span className="stat-icon stat-mint">
                    <Icon name="book" size={18} />
                  </span>
                  <div>
                    <p>Courses in progress</p>
                    <strong>04</strong>
                    <span className="stat-caption">Across 3 learning paths</span>
                  </div>
                  <span className="stat-sparkline sparkline-mint" aria-hidden="true">
                    <i /><i /><i /><i /><i /><i /><i /><i />
                  </span>
                </article>
                <article className="stat-card">
                  <span className="stat-icon stat-amber">
                    <Icon name="spark" size={18} />
                  </span>
                  <div>
                    <p>Average score</p>
                    <strong>86<span>%</span></strong>
                    <span className="stat-caption">Top 12% of your cohort</span>
                  </div>
                  <span className="stat-sparkline sparkline-amber" aria-hidden="true">
                    <i /><i /><i /><i /><i /><i /><i /><i />
                  </span>
                </article>
              </section>

              <section className="project-library" id="projects">
                <div className="section-title-row project-library-heading">
                  <div>
                    <p className="overline">PROJECT LIBRARY · SAMPLE DEMOS</p>
                    <h2>Explore project demos</h2>
                    <p className="project-library-subtitle">
                      Guided builds across AI, web development, data, and product design.
                    </p>
                  </div>
                  <span className="catalog-count">
                    {filteredProjects.length} OF {projects.length} PROJECTS
                  </span>
                </div>

                <div className="project-filters" aria-label="Filter project demos">
                  {projectCategories.map((category) => (
                    <button
                      className={`filter-chip${projectCategory === category ? " selected" : ""}`}
                      type="button"
                      key={category}
                      aria-pressed={projectCategory === category}
                      onClick={() => setProjectCategory(category)}
                    >
                      {category}
                      {category === "All projects" && (
                        <span>{projects.length}</span>
                      )}
                    </button>
                  ))}
                </div>

                {filteredProjects.length > 0 ? (
                  <div className="project-grid">
                    {filteredProjects.map((project, index) => {
                      const started = startedProjects.includes(project.id);
                      return (
                        <article className="project-card" key={project.id}>
                          <button
                            className={`project-visual project-visual-${project.art}`}
                            type="button"
                            onClick={() => setSelectedProject(project)}
                            aria-label={`Open project overview: ${project.title}`}
                          >
                            <span className="project-visual-top">
                              <span>STAGEVERGE · PROJECT {String(index + 1).padStart(2, "0")}</span>
                              <span className="project-open-icon">
                                <Icon name="arrow" size={14} />
                              </span>
                            </span>
                            <span className="project-visual-orbit" />
                            <span className="project-visual-core">
                              {project.art === "research"
                                ? "AI"
                                : project.art === "marketplace"
                                  ? "M"
                                  : project.art === "insights"
                                    ? "↗"
                                    : project.art === "onboarding"
                                      ? "01"
                                      : project.art === "community"
                                        ? "◌"
                                        : "$"}
                            </span>
                            <span className="project-visual-caption">
                              {project.artLabel}
                            </span>
                          </button>
                          <div className="project-card-content">
                            <div className="project-card-meta">
                              <span className="project-category">
                                {project.category}
                              </span>
                              <span className="project-level">{project.level}</span>
                            </div>
                            <h3>{project.title}</h3>
                            <p>{project.description}</p>
                            <div className="project-stack">
                              {project.stack.slice(0, 3).map((skill) => (
                                <span key={skill}>{skill}</span>
                              ))}
                            </div>
                            {started && (
                              <div className="project-progress">
                                <span>
                                  <i
                                    style={{
                                      width: `${Math.max(project.progress, 4)}%`,
                                    }}
                                  />
                                </span>
                                <small>
                                  {project.progress > 0
                                    ? `${project.progress}% complete`
                                    : "Added to your learning"}
                                </small>
                              </div>
                            )}
                            <div className="project-card-footer">
                              <span>
                                {project.modules} modules <i>·</i> {project.duration}
                              </span>
                              <button
                                type="button"
                                onClick={() => setSelectedProject(project)}
                              >
                                Overview <Icon name="arrow" size={14} />
                              </button>
                            </div>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                ) : (
                  <div className="empty-search project-empty">
                    No project demos match this search and category. Try another
                    filter.
                  </div>
                )}
              </section>

              <section className="dataset-sources" id="datasets">
                <div className="dataset-source-heading">
                  <div>
                    <p className="overline">RESEARCH & OPEN DATA</p>
                    <h2>Dataset websites for your next build</h2>
                    <p>
                      Find public and community datasets to explore new project
                      ideas.
                    </p>
                  </div>
                  <span className="dataset-source-count">
                    {datasetSources.length} REFERENCE SITES
                  </span>
                </div>
                <div className="dataset-source-grid">
                  {datasetSources.map((source, index) => (
                    <a
                      className="dataset-source-card"
                      href={source.url}
                      key={source.name}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className={`dataset-source-mark dataset-mark-${index}`}>
                        {source.initials}
                      </span>
                      <span className="dataset-source-copy">
                        <span className="dataset-source-label">{source.label}</span>
                        <strong>{source.name}</strong>
                        <span className="dataset-source-description">
                          {source.description}
                        </span>
                        <span className="dataset-source-visit">
                          Browse datasets <Icon name="arrow" size={13} />
                        </span>
                      </span>
                    </a>
                  ))}
                </div>
                <p className="dataset-source-note">
                  <Icon name="spark" size={14} />
                  Always review dataset licensing, attribution, and privacy
                  requirements before using or sharing data.
                </p>
              </section>

              <section className="learning-section" id="learning">
                <div className="section-title-row">
                  <div>
                    <p className="overline">YOUR CURRICULUM</p>
                    <h2>Courses to support your builds</h2>
                  </div>
                  <a className="subtle-link" href="#learning">
                    View all courses <Icon name="arrow" size={15} />
                  </a>
                </div>
                <div className="course-list">
                  {filteredCourses.length > 0 ? (
                    filteredCourses.map((course) => (
                      <article className="course-card" key={course.title}>
                        <div
                          className={`course-art course-art-${course.art}`}
                          aria-hidden="true"
                        >
                          <span className="course-art-orb" />
                          <span className="course-art-lines" />
                          <span className="course-art-label">
                            {course.art === "product"
                              ? "P."
                              : course.art === "ai"
                                ? "AI"
                                : "SYS"}
                          </span>
                        </div>
                        <div className="course-details">
                          <span className="course-category">{course.category}</span>
                          <h3>{course.title}</h3>
                          <div className="course-instructor">
                            <span className="instructor-avatar">
                              {course.initials}
                            </span>
                            <span>{course.instructor}</span>
                            <span className="course-meta-dot">·</span>
                            <span>{course.duration}</span>
                          </div>
                          <div className="course-progress-line">
                            <span>
                              <i style={{ width: `${course.progress}%` }} />
                            </span>
                            <small>
                              {course.progress}% <em>· {course.lessons}</em>
                            </small>
                          </div>
                        </div>
                        <a
                          className="course-play"
                          href="#featured-title"
                          aria-label={`Continue ${course.title}`}
                        >
                          <Icon name="play" size={17} />
                        </a>
                      </article>
                    ))
                  ) : (
                    <div className="empty-search">
                      No courses match “{search}”. Your project demos are
                      filtered above.
                    </div>
                  )}
                </div>
                {startedProjects.length > 0 && (
                  <div className="active-projects">
                    <div className="active-projects-heading">
                      <span>YOUR ACTIVE BUILDS</span>
                      <span>{startedProjects.length}</span>
                    </div>
                    {projects
                      .filter((project) => startedProjects.includes(project.id))
                      .map((project) => (
                        <button
                          className="active-project-row"
                          type="button"
                          key={project.id}
                          onClick={() => setSelectedProject(project)}
                        >
                          <span className={`active-project-icon project-visual-${project.art}`}>
                            {project.artLabel.slice(0, 2)}
                          </span>
                          <span className="active-project-title">
                            <strong>{project.title}</strong>
                            <small>
                              {project.progress > 0
                                ? `${project.progress}% complete`
                                : "Ready to start"}
                            </small>
                          </span>
                          <Icon name="arrow" size={15} />
                        </button>
                      ))}
                  </div>
                )}
              </section>

              <section className="lab-section" id="labs">
                <div className="section-title-row">
                  <div>
                    <p className="overline">LEARN BY DOING</p>
                    <h2>Career labs</h2>
                  </div>
                  <span className="coming-soon-pill">2 OPEN</span>
                </div>
                <div className="lab-card">
                  <div className="lab-icon">
                    <Icon name="flask" size={21} />
                  </div>
                  <div className="lab-copy">
                    <span className="course-category">LIVE CHALLENGE · 6 DAYS LEFT</span>
                    <h3>Design an onboarding flow that converts</h3>
                    <p>
                      Work in a small team, get mentor feedback, and ship a
                      portfolio-ready case study.
                    </p>
                  </div>
                  <a className="lab-action" href="#labs">
                    Explore lab <Icon name="arrow" size={15} />
                  </a>
                </div>
              </section>
            </div>

            <aside className="secondary-column">
              <section className="week-card">
                <div className="side-card-heading">
                  <div>
                    <p className="overline">YOUR ACTIVITY</p>
                    <h2>This week</h2>
                  </div>
                  <button className="mini-select" type="button">
                    This week <Icon name="chevron" size={13} />
                  </button>
                </div>
                <div className="activity-summary">
                  <strong>8.2<span> hrs</span></strong>
                  <span className="activity-change">↗ 18%</span>
                  <span className="activity-caption">vs. last week</span>
                </div>
                <div
                  className="activity-chart"
                  role="img"
                  aria-label="Weekly learning activity chart"
                >
                  {[42, 68, 51, 84, 58, 96, 36].map((height, index) => (
                    <div className="chart-column" key={index}>
                      <span className="chart-tooltip">
                        {Math.round((height / 100) * 2.5 * 10) / 10}h
                      </span>
                      <i
                        className={index === 5 ? "chart-bar chart-bar-today" : "chart-bar"}
                        style={{ height: `${height}%` }}
                      />
                      <small>{["M", "T", "W", "T", "F", "S", "S"][index]}</small>
                    </div>
                  ))}
                </div>
                <div className="chart-legend">
                  <span><i /> Daily learning time</span>
                  <span>Goal: 10 hrs</span>
                </div>
              </section>

              <section className="tutor-card">
                <div className="tutor-card-top">
                  <span className="tutor-spark">
                    <Icon name="spark" size={17} />
                  </span>
                  <span className="tutor-local"><i /> LOCAL AI</span>
                </div>
                <p className="overline">YOUR LEARNING COMPANION</p>
                <h2>Stuck on something?</h2>
                <p className="tutor-description">
                  Get an instant explanation, brainstorm an idea, or ask for a
                  nudge in the right direction.
                </p>
                <button
                  className="tutor-button"
                  type="button"
                  onClick={() => setSupportOpen(true)}
                >
                  Ask your AI tutor <Icon name="arrow" size={16} />
                </button>
                <span className="privacy-note">
                  <span className="privacy-lock">⌑</span>
                  Private by design · powered by your Ollama
                </span>
              </section>

              <section className="upcoming-card" id="community">
                <div className="side-card-heading">
                  <div>
                    <p className="overline">COMING UP</p>
                    <h2>On your calendar</h2>
                  </div>
                  <a className="calendar-link" href="#community" aria-label="View calendar">
                    <Icon name="calendar" size={17} />
                  </a>
                </div>
                <article className="event-card">
                  <span className="event-date"><strong>24</strong>NOV</span>
                  <span className="event-copy">
                    <strong>Design critique circle</strong>
                    <span>Tue · 4:30 PM <i>·</i> Innovation studio</span>
                  </span>
                  <span className="event-avatars" aria-label="Eight attendees">
                    <i>J</i><i>R</i><i>A</i><b>+5</b>
                  </span>
                </article>
                <article className="event-card">
                  <span className="event-date event-date-muted">
                    <strong>27</strong>NOV
                  </span>
                  <span className="event-copy">
                    <strong>Building with LLMs</strong>
                    <span>Fri · 6:00 PM <i>·</i> Live workshop</span>
                  </span>
                  <span className="event-arrow">
                    <Icon name="arrow" size={15} />
                  </span>
                </article>
              </section>
            </aside>
          </div>
          <footer className="dashboard-footer">
            <span>© 2026 StageVerge Learning</span>
            <span>Built for curious minds and real-world builders.</span>
            <button
              className="footer-help"
              type="button"
              onClick={() => setSupportOpen(true)}
            >
              Help &amp; support
            </button>
          </footer>
        </main>
      </div>

      {selectedProject && (
        <div
          className="project-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setSelectedProject(null);
          }}
        >
          <section
            className="project-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
          >
            <div
              className={`project-modal-art project-visual-${selectedProject.art}`}
              aria-hidden="true"
            >
              <span className="project-modal-art-index">STAGEVERGE · PROJECT DEMO</span>
              <span className="project-modal-art-orbit" />
              <span className="project-modal-art-core">
                {selectedProject.artLabel}
              </span>
              <span className="project-modal-art-footer">
                BRIEF <i /> BUILD <i /> SHARE
              </span>
            </div>
            <button
              className="project-modal-close"
              type="button"
              onClick={() => setSelectedProject(null)}
              aria-label="Close project overview"
            >
              <Icon name="close" size={18} />
            </button>
            <div className="project-modal-body">
              <div className="project-modal-heading">
                <div className="project-modal-badges">
                  <span>{selectedProject.category}</span>
                  <span>{selectedProject.level}</span>
                  <span>GUIDED PROJECT</span>
                </div>
                <h2 id="project-modal-title">{selectedProject.title}</h2>
                <p>{selectedProject.description}</p>
                <div className="project-modal-facts">
                  <span><Icon name="book" size={15} /> {selectedProject.modules} modules</span>
                  <span><Icon name="clock" size={15} /> {selectedProject.duration}</span>
                  <span><Icon name="layers" size={15} /> Portfolio-ready demo</span>
                </div>
              </div>

              <div className="project-modal-grid">
                <div className="project-modal-main-copy">
                  <p className="modal-section-label">THE PROJECT BRIEF</p>
                  <p className="project-brief">{selectedProject.brief}</p>
                  <h3>Your build milestones</h3>
                  <ol className="milestone-list">
                    {selectedProject.milestones.map((milestone, index) => (
                      <li key={milestone}>
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        <p>{milestone}</p>
                      </li>
                    ))}
                  </ol>
                </div>

                <aside className="project-modal-aside">
                  <h3>What you&apos;ll learn</h3>
                  <ul className="outcome-list">
                    {selectedProject.outcomes.map((outcome) => (
                      <li key={outcome}>
                        <span>✓</span>
                        {outcome}
                      </li>
                    ))}
                  </ul>
                  <div className="modal-stack-block">
                    <span className="modal-section-label">TOOLS & SKILLS</span>
                    <div className="project-stack modal-project-stack">
                      {selectedProject.stack.map((skill) => (
                        <span key={skill}>{skill}</span>
                      ))}
                    </div>
                  </div>
                  <div className="project-outcome-note">
                    <span className="outcome-note-icon"><Icon name="spark" size={16} /></span>
                    <span>
                      <strong>Made to be shared</strong>
                      Finish with a working demo and a clear story for your portfolio.
                    </span>
                  </div>
                  <button
                    className="modal-start-button"
                    type="button"
                    onClick={() => {
                      if (startedProjects.includes(selectedProject.id)) {
                        setSelectedProject(null);
                        setActiveSection("learning");
                        document
                          .getElementById("learning")
                          ?.scrollIntoView({ behavior: "smooth" });
                      } else {
                        startProject(selectedProject.id);
                      }
                    }}
                  >
                    {startedProjects.includes(selectedProject.id)
                      ? "Continue in My learning"
                      : "Add to My learning"}
                    <Icon name="arrow" size={16} />
                  </button>
                  {startedProjects.includes(selectedProject.id) && (
                    <p className="project-added-note" aria-live="polite">
                      This project is in your learning list.
                    </p>
                  )}
                </aside>
              </div>
            </div>
          </section>
        </div>
      )}

      <OllamaSupport
        open={supportOpen}
        onOpenChange={setSupportOpen}
        siteReference={tutorSiteReference}
      />
    </div>
  );
}
