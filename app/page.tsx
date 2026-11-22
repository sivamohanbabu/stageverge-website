const audiences = [
  {
    icon: (
      <path
        d="M4 20V8l8-4 8 4v12M8 20v-6h8v6M8 9h.01M12 9h.01M16 9h.01"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
    title: "Businesses & Startups",
    description:
      "Offload focused R&D, validate AI and software prototypes faster, and evaluate pre-vetted builders through working demos instead of resumes.",
    link: "Bring us a challenge",
  },
  {
    icon: (
      <path
        d="M3 10 12 4l9 6-9 6-9-6ZM6 12.5V17c3.5 3 8.5 3 12 0v-4.5M21 10v6"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
    title: "Educational Institutions",
    description:
      "Turn textbook assignments into real-world industry case studies, strengthen student portfolios, and make placement outcomes more measurable.",
    link: "Partner with StageVerge",
  },
  {
    icon: (
      <path
        d="M16 20v-1.5a4.5 4.5 0 0 0-4.5-4.5h-3A4.5 4.5 0 0 0 4 18.5V20M10 10a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM16 3.5a3.5 3.5 0 0 1 0 6.8M17 14h1.5a3.5 3.5 0 0 1 3.5 3.5V20"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
    title: "Student Builders",
    description:
      "Ship production-minded B2B projects, receive direct industry feedback, and turn validated demos into meaningful career opportunities.",
    link: "Build what matters",
  },
];

const steps = [
  {
    title: "Scope the challenge",
    description:
      "Define the operational problem, success criteria, boundaries, and a practical proof-of-concept target with the business team.",
  },
  {
    title: "Build with guidance",
    description:
      "Match the brief with verified student builders and mentor support. Turn ideas into an iterative, reviewable prototype.",
  },
  {
    title: "Evaluate the demo",
    description:
      "See the software in action, review the approach, and decide what to validate, improve, or take forward.",
  },
];

function Wordmark() {
  return (
    <a className="wordmark" href="#" aria-label="StageVerge home">
      <span className="mark" aria-hidden="true">
        S
      </span>
      <span>StageVerge</span>
    </a>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}

export default function Home() {
  return (
    <>
      <header className="topbar">
        <nav className="nav wrap" aria-label="Main navigation">
          <Wordmark />
          <div className="nav-links">
            <a href="#model">How it works</a>
            <a href="#audiences">Who it&apos;s for</a>
            <a href="#demos">Live demos</a>
          </div>
          <a className="button button-small" href="#booking">
            Book a discovery call <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </header>

      <main>
        <section className="hero">
          <div className="wrap hero-grid">
            <div>
              <Eyebrow>Industry meets emerging talent</Eyebrow>
              <h1>
                Where real business challenges meet{" "}
                <span className="accent">verified student builders.</span>
              </h1>
              <p className="hero-copy">
                StageVerge is a B2B innovation platform that turns real
                operational problems into live, mentor-guided proof-of-concept
                demos—bridging the gap between industry needs, academic talent,
                and working software.
              </p>
              <div className="hero-actions">
                <a className="button" href="#booking">
                  Book a 15-Min Discovery Call{" "}
                  <span aria-hidden="true">↗</span>
                </a>
                <a className="button button-light" href="#demos">
                  Explore Live Demos <span aria-hidden="true">↓</span>
                </a>
              </div>
              <p className="hero-note">
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 20 20"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="m5 10 3.2 3.2L15.5 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="10"
                    cy="10"
                    r="8"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
                Start with a real challenge. Leave with a demo you can evaluate.
              </p>
            </div>

            <div
              className="demo-card"
              aria-label="Illustration of a mentor-guided proof-of-concept project"
            >
              <div className="demo-window">
                <div className="window-bar" aria-hidden="true">
                  <span className="window-dot" />
                  <span className="window-dot" />
                  <span className="window-dot" />
                  <span className="window-label">
                    STAGEVERGE / CHALLENGE ROOM
                  </span>
                </div>
                <div className="demo-content">
                  <p className="demo-kicker">Challenge in progress</p>
                  <h2 className="demo-title">
                    Smarter operations, built together.
                  </h2>
                  <p className="demo-description">
                    A business challenge becomes a scoped prototype, built with
                    student talent and industry mentorship.
                  </p>
                  <div className="demo-status">
                    <span>Discovery</span>
                    <span>Prototype</span>
                    <span>Demo</span>
                  </div>
                  <div
                    className="demo-progress"
                    aria-label="Illustrative project stages"
                  >
                    <span />
                  </div>
                  <div className="demo-status">
                    <span>Mentor-guided delivery</span>
                    <span>POC</span>
                  </div>
                  <div className="demo-tags">
                    <span className="tag">Real-world brief</span>
                    <span className="tag">Verified builders</span>
                    <span className="tag">Working demo</span>
                  </div>
                </div>
              </div>
              <div className="note-card">
                <span className="note-icon" aria-hidden="true">
                  ✦
                </span>
                <span>
                  <strong>Proof before promises</strong> Evaluate the thinking,
                  collaboration, and working software—not just a resume.
                </span>
              </div>
            </div>
          </div>
        </section>

        <div className="trust-strip" aria-label="StageVerge principles">
          <div className="wrap trust-inner">
            <span>Built around outcomes</span>
            <span className="trust-item">Real industry challenges</span>
            <span className="trust-item">Mentor-guided projects</span>
            <span className="trust-item">Demo-first evaluation</span>
          </div>
        </div>

        <section id="audiences">
          <div className="wrap">
            <div className="section-heading">
              <Eyebrow>One platform, three perspectives</Eyebrow>
              <h2>Better outcomes when everyone builds together.</h2>
              <p>
                StageVerge connects business needs with emerging talent in a
                practical, measurable way.
              </p>
            </div>
            <div className="audience-grid">
              {audiences.map((audience) => (
                <article className="audience-card" key={audience.title}>
                  <div className="icon-box" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none">
                      {audience.icon}
                    </svg>
                  </div>
                  <h3>{audience.title}</h3>
                  <p>{audience.description}</p>
                  <a className="text-link" href="#booking">
                    {audience.link} <span aria-hidden="true">→</span>
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="how-section" id="model">
          <div className="wrap">
            <div className="section-heading">
              <Eyebrow>From challenge to proof of concept</Eyebrow>
              <h2>A clear path from business need to working demo.</h2>
              <p>
                Focused engagements keep the problem grounded, the build
                supported, and the outcome visible.
              </p>
            </div>
            <div className="steps">
              {steps.map((step, index) => (
                <article className="step" key={step.title}>
                  <span className="step-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="demo-section" id="demos">
          <div className="wrap">
            <div className="section-heading">
              <Eyebrow>See the work, not just the pitch</Eyebrow>
              <h2>Live demos make potential tangible.</h2>
              <p>
                StageVerge is designed around hands-on proof of concept
                work—so teams can learn from the process and evaluate the
                result.
              </p>
            </div>
            <div className="demo-banner">
              <div>
                <h3>Want a first look at the demo experience?</h3>
                <p>
                  Book a short discovery call to discuss your challenge,
                  institution partnership, or builder interest. A public demo
                  gallery can be added here as projects are approved for
                  sharing.
                </p>
              </div>
              <a className="button button-light" href="#booking">
                Request a preview <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </section>

        <section className="cta-section" id="booking">
          <div className="wrap">
            <div className="cta-panel">
              <div className="cta-content">
                <Eyebrow>Start with a real problem</Eyebrow>
                <h2>Have a challenge worth solving?</h2>
                <p>
                  Let&apos;s explore whether a mentor-guided proof of concept is
                  the right next step for your team.
                </p>
                <a className="button button-lime" href="#booking-link-note">
                  Book a 15-Min Discovery Call{" "}
                  <span aria-hidden="true">↗</span>
                </a>
                <span className="cta-meta" id="booking-link-note">
                  Template note: connect this button to your scheduling link
                  before launch.
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap footer-inner">
          <Wordmark />
          <p>Real challenges. Verified builders. Working demos.</p>
          <div className="footer-links">
            <a href="#model">How it works</a>
            <a href="#audiences">Who it&apos;s for</a>
            <a href="#booking">Get in touch</a>
          </div>
        </div>
      </footer>
    </>
  );
}
