import ChallengeForm from "@/components/ChallengeForm";

const audiences = [
  {
    icon: "▦",
    title: "Businesses & Startups",
    description:
      "Offload focused R&D, validate AI and software prototypes faster, and evaluate pre-vetted builders through working demos instead of resumes.",
    link: "Bring us a challenge"
  },
  {
    icon: "◇",
    title: "Educational Institutions",
    description:
      "Turn textbook assignments into real-world industry case studies, strengthen student portfolios, and make placement outcomes more measurable.",
    link: "Partner with StageVerge"
  },
  {
    icon: "◎",
    title: "Student Builders",
    description:
      "Ship production-minded B2B projects, receive direct industry feedback, and turn validated demos into meaningful career opportunities.",
    link: "Build what matters"
  }
];

const steps = [
  {
    number: "01",
    title: "Scope the challenge",
    description:
      "Define the operational problem, success criteria, boundaries, and a practical proof-of-concept target with the business team."
  },
  {
    number: "02",
    title: "Build with guidance",
    description:
      "Match the brief with verified student builders and mentor support. Turn ideas into an iterative, reviewable prototype."
  },
  {
    number: "03",
    title: "Evaluate the demo",
    description:
      "See the software in action, review the approach, and decide what to validate, improve, or take forward."
  }
];

export default function Home() {
  return (
    <>
      <header className="topbar">
        <nav className="nav wrap" aria-label="Main navigation">
          <a className="wordmark" href="#home" aria-label="StageVerge home">
            <span className="mark" aria-hidden="true">S</span>
            <span>StageVerge</span>
          </a>
          <div className="nav-links">
            <a href="#model">How it works</a>
            <a href="#audiences">Who it&apos;s for</a>
            <a href="#demos">Live demos</a>
          </div>
          <a className="button button-small" href="#challenge-form">
            Share a challenge <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </header>

      <main id="home">
        <section className="hero">
          <div className="wrap hero-grid">
            <div>
              <p className="eyebrow">Industry meets emerging talent</p>
              <h1>
                Where real business challenges meet{" "}
                <span className="accent">verified student builders.</span>
              </h1>
              <p className="hero-copy">
                StageVerge is a B2B innovation platform that turns real operational problems into
                live, mentor-guided proof-of-concept demos—bridging the gap between industry needs,
                academic talent, and working software.
              </p>
              <div className="hero-actions">
                <a className="button" href="#challenge-form">
                  Share a business challenge <span aria-hidden="true">↗</span>
                </a>
                <a className="button button-light" href="#demos">
                  Explore the model <span aria-hidden="true">↓</span>
                </a>
              </div>
              <p className="hero-note">
                <span aria-hidden="true">✓</span>
                Start with a real challenge. Leave with a demo you can evaluate.
              </p>
            </div>

            <div className="demo-card" aria-label="Illustration of a mentor-guided proof-of-concept project">
              <div className="demo-window">
                <div className="window-bar" aria-hidden="true">
                  <span className="window-dot" /><span className="window-dot" /><span className="window-dot" />
                  <span className="window-label">STAGEVERGE / CHALLENGE ROOM</span>
                </div>
                <div className="demo-content">
                  <p className="demo-kicker">Challenge in progress</p>
                  <h2 className="demo-title">Smarter operations, built together.</h2>
                  <p className="demo-description">
                    A business challenge becomes a scoped prototype, built with student talent and industry mentorship.
                  </p>
                  <div className="demo-status"><span>Discovery</span><span>Prototype</span><span>Demo</span></div>
                  <div className="demo-progress" aria-label="Illustrative project stages"><span /></div>
                  <div className="demo-status"><span>Mentor-guided delivery</span><span>POC</span></div>
                  <div className="demo-tags">
                    <span className="tag">Real-world brief</span>
                    <span className="tag">Verified builders</span>
                    <span className="tag">Working demo</span>
                  </div>
                </div>
              </div>
              <div className="note-card">
                <span className="note-icon" aria-hidden="true">✦</span>
                <span><strong>Proof before promises</strong>Evaluate the thinking, collaboration, and working software—not just a resume.</span>
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
              <p className="eyebrow">One platform, three perspectives</p>
              <h2>Better outcomes when everyone builds together.</h2>
              <p>StageVerge connects business needs with emerging talent in a practical, measurable way.</p>
            </div>
            <div className="audience-grid">
              {audiences.map((audience) => (
                <article className="audience-card" key={audience.title}>
                  <div className="icon-box" aria-hidden="true">{audience.icon}</div>
                  <h3>{audience.title}</h3>
                  <p>{audience.description}</p>
                  <a className="text-link" href="#challenge-form">
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
              <p className="eyebrow">From challenge to proof of concept</p>
              <h2>A clear path from business need to working demo.</h2>
              <p>Focused engagements keep the problem grounded, the build supported, and the outcome visible.</p>
            </div>
            <div className="steps">
              {steps.map((step) => (
                <article className="step" key={step.number}>
                  <span className="step-number">{step.number}</span>
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
              <p className="eyebrow">See the work, not just the pitch</p>
              <h2>Live demos make potential tangible.</h2>
              <p>StageVerge is designed around hands-on proof-of-concept work—so teams can learn from the process and evaluate the result.</p>
            </div>
            <div className="demo-banner">
              <div>
                <h3>Want a first look at the demo experience?</h3>
                <p>
                  Share a challenge or tell us about your institution partnership or builder interest.
                  A public demo gallery can be added as projects are approved for sharing.
                </p>
              </div>
              <a className="button button-light" href="#challenge-form">
                Get in touch <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </section>

        <section className="cta-section" id="challenge">
          <div className="wrap">
            <div className="cta-panel">
              <div className="cta-content">
                <p className="eyebrow">Start with a real problem</p>
                <h2>Have a challenge worth solving?</h2>
                <p>Tell us what your team is working through. We&apos;ll follow up to explore whether a mentor-guided proof of concept is the right next step.</p>
                <ChallengeForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap footer-inner">
          <a className="wordmark" href="#home" aria-label="StageVerge home">
            <span className="mark" aria-hidden="true">S</span>
            <span>StageVerge</span>
          </a>
          <p>Real challenges. Verified builders. Working demos.</p>
          <div className="footer-links">
            <a href="#model">How it works</a>
            <a href="#audiences">Who it&apos;s for</a>
            <a href="#challenge-form">Get in touch</a>
          </div>
        </div>
      </footer>
    </>
  );
}
