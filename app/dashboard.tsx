"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import OllamaSupport from "./ollama-support";

type IconName =
  | "grid"
  | "book"
  | "flask"
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
  const [menuOpen, setMenuOpen] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);
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
    }

    window.addEventListener("keydown", focusSearch);
    return () => window.removeEventListener("keydown", focusSearch);
  }, []);

  const filteredCourses = useMemo(
    () =>
      courses.filter((course) =>
        `${course.title} ${course.category} ${course.instructor}`
          .toLowerCase()
          .includes(search.toLowerCase()),
      ),
    [search],
  );

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
            onClick={() => setSupportOpen(true)}
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
                placeholder="Search courses..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                aria-label="Search courses"
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
                    PICK UP WHERE YOU LEFT OFF
                  </span>
                  <h2 id="featured-title">
                    Product thinking
                    <br />
                    for builders<span>.</span>
                  </h2>
                  <p>
                    Turn customer problems into products people can&apos;t wait
                    to use.
                  </p>
                  <div className="featured-meta">
                    <span>
                      <Icon name="book" size={15} /> Lesson 8 of 12
                    </span>
                    <span className="meta-divider" />
                    <span>
                      <Icon name="clock" size={15} /> 18 min left
                    </span>
                  </div>
                  <a className="featured-cta" href="#learning">
                    Continue learning <Icon name="arrow" size={16} />
                  </a>
                  <div className="featured-progress">
                    <span style={{ width: "68%" }} />
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
                  <span className="art-tag art-tag-top">DISCOVER</span>
                  <span className="art-tag art-tag-bottom">BUILD · LEARN · GROW</span>
                  <span className="art-spark art-spark-one">✳</span>
                  <span className="art-spark art-spark-two">✦</span>
                </div>
                <span className="featured-index">01 / YOUR LEARNING PATH</span>
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

              <section className="learning-section" id="learning">
                <div className="section-title-row">
                  <div>
                    <p className="overline">YOUR CURRICULUM</p>
                    <h2>Keep your momentum</h2>
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
                      No courses match “{search}”. Try a different search.
                    </div>
                  )}
                </div>
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

      <OllamaSupport open={supportOpen} onOpenChange={setSupportOpen} />
    </div>
  );
}
